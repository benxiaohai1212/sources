在 Ubuntu 14 安装

使用国内安装源镜像，加快安装速度。修改/etc/apt/sources.list.d/gitlab-ce.list，添加以下行

deb https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/debian jessie main

开始安装：

# 安装依赖包
sudo apt-get install curl openssh-server ca-certificates postfix
# 安装 GitLab 社区版
apt-get install gitlab-ce
# 初始化，初始化完自动启动 GitLab
sudo gitlab-ctl reconfigure

在 CentOS 6 安装

使用国内镜像安装，新建 /etc/yum.repos.d/gitlab-ce.repo，添加以下内容

[gitlab-ce]
name=gitlab-ce
baseurl=http://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6
repo_gpgcheck=0
gpgcheck=0
enabled=1
gpgkey=https://packages.gitlab.com/gpg.key

安装步骤：

# 安装依赖包
sudo yum install curl openssh-server openssh-clients postfix cronie
# 启动 postfix 邮件服务
sudo service postfix start
# 检查 postfix
sudo chkconfig postfix on
# 安装 GitLab 社区版
sudo yum install gitlab-ce
# 初始化 GitLab
sudo gitlab-ctl reconfigure

Ubuntu 14 国内安装源镜像
https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/ubuntu/pool/trusty/main/g/gitlab-ce/
CentOS 国内安装源镜像
https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/


https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/ubuntu/pool/trusty/main/g/gitlab-ce/gitlab-ce_8.5.7-ce.0_amd64.deb

https://git.coding.net/larryli/gitlab.git

添加访问的 host，修改/etc/gitlab/gitlab.rb的external_url
external_url 'http://git.home.com'

vi /etc/hosts，添加 host 映射
127.0.0.1 git.home.com

每次修改/etc/gitlab/gitlab.rb，都要运行以下命令，让配置生效
sudo gitlab-ctl reconfigure

安装中文语言包（汉化）
以下汉化步骤参考此篇文章，首先确认当前安装版本

cat /opt/gitlab/embedded/service/gitlab-rails/VERSION

当前安装版本是8.5.7，因此中文补丁需要打8.5版本。

克隆 GitLab 源码仓库：

# 克隆 GitLab.com 仓库
git clone https://gitlab.com/larryli/gitlab.git
＃或 Gitcafe.com 镜像，速度更快
git clone https://gitcafe.com/larryli/gitlab.git

运行汉化补丁：

# 8.5 版本的汉化补丁（8-5-stable是英文稳定版，8-5-zh是中文版，两个 diff 结果便是汉化补丁）
sudo git diff origin/8-5-stable..8-5-zh > /tmp/8.5.diff
# 停止 gitlab
sudo gitlab-ctl stop
# 应用汉化补丁
cd /opt/gitlab/embedded/service/gitlab-rails
git apply /tmp/8.5.diff  
# 启动gitlab
sudo gitlab-ctl start

至此，汉化完毕。打开地址http://git.home.com，便会看到中文版的GitLab。

备份

如果是生产环境，备份是必须的。需要备份的文件：配置文件和数据文件。
备份配置文件

配置文件含密码等敏感信息，不要和数据备份文件放在一起。

sh -c 'umask 0077; tar -cf $(date "+etc-gitlab-%s.tar") -C /etc/gitlab'

备份数据文件

默认数据备份目录是/var/opt/gitlab/backups，手动创建备份文件：

# Omnibus 方式安装使用以下命令备份
sudo gitlab-rake gitlab:backup:create

日常备份，添加 crontab，运行crontab -e

# 每天2点执行备份
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create CRON=1

如要修改备份周期和目录，在/etc/gitlab/gitlab.rb中修改以下两个选项

# 设置备份周期为7天 - 604800秒
gitlab_rails['backup_keep_time'] = 604800
# 备份目录
gitlab_rails['backup_path'] = '/mnt/backups'

恢复

恢复之前，确保备份文件所安装 GitLab 和当前要恢复的 GitLab 版本一致。首先，恢复配置文件：

sudo mv /etc/gitlab /etc/gitlab.$(date +%s)
# 将下面配置备份文件的时间戳改为你所备份的文件的时间戳
sudo tar -xf etc-gitlab-1399948539.tar -C /

恢复数据文件

# 将数据备份文件拷贝至备份目录
sudo cp 1393513186_gitlab_backup.tar /var/opt/gitlab/backups/

# 停止连接数据库的进程
sudo gitlab-ctl stop unicorn
sudo gitlab-ctl stop sidekiq

# 恢复1393513186这个备份文件，将覆盖GitLab数据库！
sudo gitlab-rake gitlab:backup:restore BACKUP=1393513186

# 启动 GitLab
sudo gitlab-ctl start

# 检查 GitLab
sudo gitlab-rake gitlab:check SANITIZE=true

文／yanging（简书作者）
原文链接：http://www.jianshu.com/p/7a0d6917e009
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。
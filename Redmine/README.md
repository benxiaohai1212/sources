
1. docker-compose.yml
```
docker版部署redmine
分为mysql和postsql两版
```
2. git_pull
```text
redmine与gitlab关联后，redmine上执行pull版本库代码的脚本
```

## bitnami版redmine迁移升级

### 1、版本说明
  
* 迁移版本：3.1.1-1
* 升级版本：3.4.6-5

### 2、备份迁移版本

#### 2.1 、查询数据库密码
root@localhost:# cat /opt/redmine-3.1.1-1/apps/redmine/htdocs/config/database.yml
```
---
# Default setup is given for MySQL with ruby1.9.
# Examples for PostgreSQL, SQLite3 and SQL Server can be found at the end.
# Line indentation must be 2 spaces (no tabs).
production:
  adapter: mysql2
  database: bitnami_redmine
  host: localhost
  username: bitnami
  password: a3a0a5782d
  encoding: utf8
  socket: /opt/redmine-3.1.1-1/mysql/tmp/mysql.sock
development:
  adapter: mysql2
  database: redmine_development
  host: localhost
  username: root
  password: ""
  encoding: utf8
# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  adapter: mysql2
  database: redmine_test
  host: localhost
  username: root
  password: ""
  encoding: utf8
# PostgreSQL configuration example
#production:
#  adapter: postgresql
#  database: redmine
#  host: localhost
#  username: postgres
#  password: "postgres"
# SQLite3 configuration example
#production:
#  adapter: sqlite3
#  database: db/redmine.sqlite3
# SQL Server configuration example
#production:
#  adapter: sqlserver
#  database: redmine
#  host: localhost
#  username: jenkins
#  password: jenkins
```
#### 2.2、备份迁移版数据库及数据
```
root@localhost:# cat /opt/redmine-3.1.1-1/mysql/bin/mysqldump -ubitnami -pa3a0a5782d bitnami_redmine > ~/3.1.1-1backup.sql

数据：
cp -rf /opt/redmine-3.1.1-1/apps/redmine/htdocs/files ~/
插件：
cp -rf /opt/redmine-3.1.1-1/apps/redmine/htdocs/plugins ~/
```
### 3、安装升级版
#### 3.1、下载
查看bitnami_redmine历史版本:(https://bitnami.com/stack/redmine/changelog.txt)

`wget https://downloads.bitnami.com/files/stacks/redmine/3.4.6-5/bitnami-redmine-3.4.6-5-linux-x64-installer.run`
OR `curl -O https://downloads.bitnami.com/files/stacks/redmine/3.4.6-5/bitnami-redmine-3.4.6-5-linux-x64-installer.run`

#### 3.2、安装bitnami_redmine
root@localhost:# chmod +x bitnami-redmine-3.4.6-5-linux-x64-installer.run  
root@localhost:# ./bitnami-redmine-3.4.6-5-linux-x64-installer.run
```
[root@localhost ~]# ./bitnami-redmine-3.4.6-5-linux-x64-installer.run 
Language Selection

Please select the installation language
[1] English - English
[2] Spanish - Español
[3] Japanese - 日本語
[4] Korean - 한국어
[5] Simplified Chinese - 简体中文
[6] Hebrew - עברית
[7] German - Deutsch
[8] Romanian - Română
[9] Russian - Русский
Please choose an option [1] : 5
----------------------------------------------------------------------------
欢迎使用 Bitnami Redmine Stack 安装向导。

----------------------------------------------------------------------------
选择您想要安装的组件，清除您不想安装的组件。当您准备继续时，点击“前进”。

Subversion [Y/n] :Y

PhpMyAdmin [Y/n] :Y

Redmine : Y (Cannot be edited)

Git [Y/n] :Y

上述选择是否正确？ [Y/n]: Y

----------------------------------------------------------------------------
安装文件夹

请选择安装Bitnami Redmine Stack的文件夹

选择一个文件夹 [/opt/redmine-3.4.6-5]: 

----------------------------------------------------------------------------
创建管理员帐户

Bitnami Redmine Stack admin 用户创建

您的真实姓名 [User Name]: redmine

Email地址 [user@example.com]: redmine@asiacom.net.cn

登录 [user]: redmine

密码 :
请确认密码 :
----------------------------------------------------------------------------
缺省数据配置语言

选择缺省数据配置语言：

[1] Bosnian
[2] 保加利亚语
[3] Catalan
[4] 捷克语
[5] Danish
[6] 德语
[7] 英语
[8] 西班牙
[9] 法语
[10] Galician
[11] 希伯来语
[12] Hungarian
[13] 意大利语
[14] 日语
[15] 朝鲜语
[16] Lithuanian
[17] 荷兰语
[18] Norwegian
[19] 波兰语
[20] 葡萄牙语
[21] 罗马尼亚语
[22] 俄语
[23] Slovak
[24] Slovenian
[25] 塞尔维亚语
[26] 瑞典语
[27] Turkish
[28] Ukrainian
[29] Vietnamese
[30] 中文
请选择选项 [30] : 30

Do you want to configure mail support? [y/N]: y

----------------------------------------------------------------------------
配置SMTP设置

This is required so your application can send notifications via email.

默认电子邮件提供商：

[1] GMail
[2] 自定义
请选择选项 [1] : 2

----------------------------------------------------------------------------
配置SMTP设置

This data is stored in the application configuration files and may be visible to 
others. For this reason, it is recommended that you do not use your personal 
account credentials.

用户名 []: redmine@example.com

密码 :
重新输入 :
SMTP 主机 []: smtp.example.com

SMTP端口 [587]: 25

安全连接

[1] 没有
[2] SSL
[3] TLS
请选择选项 [3] : 3

----------------------------------------------------------------------------
安装程序已经准备好将 Bitnami Redmine Stack 安装到您的电脑。

您确定要继续吗？ [Y/n]: Y

----------------------------------------------------------------------------
正在安装 Bitnami Redmine Stack 至您的电脑中，请稍候。

 正在安装
 0% ______________ 50% ______________ 100%
 #########################################

----------------------------------------------------------------------------
安装程序已经将 Bitnami Redmine Stack 安装于您的电脑中。

启动Redmine应用程序。 [Y/n]: Y

信息: To access the Bitnami Redmine Stack, go to
http://127.0.0.1:80 from your browser.
按 [Enter] 继续：
```
#### 3.3、备份升级版数据库
如上2.2操作不在赘述

#### 3.4、删除升级版数据库并新建全新数据库
```
DROP DATABASE bitnami_redmine;
CREATE DATABASE bitnami_remine;
```
#### 3.5、将备份迁移版数据库导入升级版新建数据库
```
use bitnami_remine;
source ~/3.1.1-1backup.sql
```
将迁移数据及插件导入升级版中
```
cp -rf ~/files /opt/redmine-3.4.6-5/apps/redmine/htdocs/
cp -rf ~/plugin /opt/redmine-3.4.6-5/apps/redmine/htdocs/
```

#### 3.6、升级导入的迁移版数据库结构到升级版数据库版本
```
[root@localhost]# cd /opt/redmine-3.4.6-5/apps/redmine/htdocs/
[root@localhost htdocs]# /opt/redmine-3.4.6-5/ruby/bin/ruby bin/rake db:migrate RAILS_ENV=production
```
**注意：迁移升级部署的关键是在此处操作**
```
[root@localhost htdocs]# /opt/redmine-3.4.6-5/ruby/bin/ruby bin/rake db:migrate RAILS_ENV=production
== 20150725112753 InsertAllowedStatusesForNewIssues: migrating ================
== 20150725112753 InsertAllowedStatusesForNewIssues: migrated (0.0714s) =======

== 20150730122707 CreateImports: migrating ====================================
-- create_table(:imports)
   -> 0.0193s
== 20150730122707 CreateImports: migrated (0.0193s) ===========================

== 20150730122735 CreateImportItems: migrating ================================
-- create_table(:import_items)
   -> 0.0254s
== 20150730122735 CreateImportItems: migrated (0.0256s) =======================

== 20150921204850 ChangeTimeEntriesCommentsLimitTo1024: migrating =============
-- change_column(:time_entries, :comments, :string, {:limit=>1024})
   -> 0.0503s
== 20150921204850 ChangeTimeEntriesCommentsLimitTo1024: migrated (0.0504s) ====

== 20150921210243 ChangeWikiContentsCommentsLimitTo1024: migrating ============
-- change_column(:wiki_content_versions, :comments, :string, {:limit=>1024, :default=>""})
   -> 0.2874s
-- change_column(:wiki_contents, :comments, :string, {:limit=>1024, :default=>""})
   -> 0.0387s
== 20150921210243 ChangeWikiContentsCommentsLimitTo1024: migrated (0.3264s) ===

== 20151020182334 ChangeAttachmentsFilesizeLimitTo8: migrating ================
-- change_column(:attachments, :filesize, :integer, {:limit=>8, :default=>0, :null=>false})
   -> 0.4087s
== 20151020182334 ChangeAttachmentsFilesizeLimitTo8: migrated (0.4500s) =======

== 20151020182731 FixCommaInUserFormatSettingValue: migrating =================
== 20151020182731 FixCommaInUserFormatSettingValue: migrated (0.0270s) ========

== 20151021184614 ChangeIssueCategoriesNameLimitTo60: migrating ===============
-- change_column(:issue_categories, :name, :string, {:limit=>60, :default=>"", :null=>false})
   -> 0.0577s
== 20151021184614 ChangeIssueCategoriesNameLimitTo60: migrated (0.0578s) ======

== 20151021185456 ChangeAuthSourcesFilterToText: migrating ====================
-- change_column(:auth_sources, :filter, :text)
   -> 0.0188s
== 20151021185456 ChangeAuthSourcesFilterToText: migrated (0.0189s) ===========

== 20151021190616 ChangeUserPreferencesHideMailDefaultToTrue: migrating =======
-- change_column(:user_preferences, :hide_mail, :boolean, {:default=>true})
   -> 0.0028s
== 20151021190616 ChangeUserPreferencesHideMailDefaultToTrue: migrated (0.0029s) 

== 20151024082034 AddTokensUpdatedOn: migrating ===============================
-- add_column(:tokens, :updated_on, :timestamp)
   -> 0.0922s
== 20151024082034 AddTokensUpdatedOn: migrated (0.0986s) ======================

== 20151025072118 CreateCustomFieldEnumerations: migrating ====================
-- create_table(:custom_field_enumerations)
   -> 0.0127s
== 20151025072118 CreateCustomFieldEnumerations: migrated (0.0128s) ===========

== 20151031095005 AddProjectsDefaultVersionId: migrating ======================
-- column_exists?(:projects, :default_version_id, :integer)
   -> 0.0012s
-- add_column(:projects, :default_version_id, :integer, {:default=>nil})
   -> 0.0541s
== 20151031095005 AddProjectsDefaultVersionId: migrated (0.0555s) =============

== 20160404080304 ForcePasswordResetDuringSetup: migrating ====================
== 20160404080304 ForcePasswordResetDuringSetup: migrated (0.0525s) ===========

== 20160416072926 RemovePositionDefaults: migrating ===========================
-- change_column("boards", :position, :integer, {:default=>nil})
   -> 0.0027s
-- change_column("custom_fields", :position, :integer, {:default=>nil})
   -> 0.0036s
-- change_column("enumerations", :position, :integer, {:default=>nil})
   -> 0.0029s
-- change_column("issue_statuses", :position, :integer, {:default=>nil})
   -> 0.0034s
-- change_column("roles", :position, :integer, {:default=>nil})
   -> 0.0027s
-- change_column("trackers", :position, :integer, {:default=>nil})
   -> 0.0024s
== 20160416072926 RemovePositionDefaults: migrated (0.0468s) ==================

== 20160529063352 AddRolesSettings: migrating =================================
-- add_column(:roles, :settings, :text)
   -> 0.0341s
== 20160529063352 AddRolesSettings: migrated (0.0342s) ========================

== 20161001122012 AddTrackerIdIndexToWorkflows: migrating =====================
-- add_index(:workflows, :tracker_id)
   -> 0.0292s
== 20161001122012 AddTrackerIdIndexToWorkflows: migrated (0.0293s) ============

== 20161002133421 AddIndexOnMemberRolesInheritedFrom: migrating ===============
-- add_index(:member_roles, :inherited_from)
   -> 0.0184s
== 20161002133421 AddIndexOnMemberRolesInheritedFrom: migrated (0.0184s) ======

== 20161010081301 ChangeIssuesDescriptionLimit: migrating =====================
-- change_column(:issues, :description, :text, {:limit=>16777216})
   -> 0.3232s
== 20161010081301 ChangeIssuesDescriptionLimit: migrated (0.3233s) ============

== 20161010081528 ChangeJournalDetailsValueLimit: migrating ===================
-- change_column(:journal_details, :value, :text, {:limit=>16777216})
   -> 0.8376s
-- change_column(:journal_details, :old_value, :text, {:limit=>16777216})
   -> 0.3035s
== 20161010081528 ChangeJournalDetailsValueLimit: migrated (1.1413s) ==========

== 20161010081600 ChangeJournalsNotesLimit: migrating =========================
-- change_column(:journals, :notes, :text, {:limit=>16777216})
   -> 0.6222s
== 20161010081600 ChangeJournalsNotesLimit: migrated (0.6223s) ================

== 20161126094932 AddIndexOnChangesetsIssuesIssueId: migrating ================
-- add_index(:changesets_issues, :issue_id)
   -> 0.0195s
== 20161126094932 AddIndexOnChangesetsIssuesIssueId: migrated (0.0196s) =======

== 20161220091118 AddIndexOnIssuesParentId: migrating =========================
-- add_index(:issues, :parent_id)
   -> 0.0227s
== 20161220091118 AddIndexOnIssuesParentId: migrated (0.0228s) ================

== 20170207050700 AddIndexOnDiskFilenameToAttachments: migrating ==============
-- add_index(:attachments, :disk_filename)
   -> 0.0270s
== 20170207050700 AddIndexOnDiskFilenameToAttachments: migrated (0.0270s) =====

== 20170302015225 ChangeAttachmentsDigestLimitTo64: migrating =================
-- change_column(:attachments, :digest, :string, {:limit=>64})
   -> 0.4800s
== 20170302015225 ChangeAttachmentsDigestLimitTo64: migrated (0.4802s) ========

== 20170309214320 AddProjectDefaultAssignedToId: migrating ====================
-- add_column(:projects, :default_assigned_to_id, :integer, {:default=>nil})
   -> 0.0772s
-- column_exists?(:projects, :default_assignee_id, :integer)
   -> 0.0014s
== 20170309214320 AddProjectDefaultAssignedToId: migrated (0.0787s) ===========

== 20170320051650 ChangeRepositoriesExtraInfoLimit: migrating =================
-- change_column(:repositories, :extra_info, :text, {:limit=>16777216})
   -> 0.0268s
== 20170320051650 ChangeRepositoriesExtraInfoLimit: migrated (0.0269s) ========

== 20170418090031 AddViewNewsToAllExistingRoles: migrating ====================
== 20170418090031 AddViewNewsToAllExistingRoles: migrated (0.1620s) ===========

== 20170419144536 AddViewMessagesToAllExistingRoles: migrating ================
== 20170419144536 AddViewMessagesToAllExistingRoles: migrated (0.1156s) =======
[root@localhost htdocs]# /opt/redmine-3.4.6-5/ctlscript.sh restart
/opt/redmine-3.4.6-5/subversion/scripts/ctl.sh : subversion stopped
Syntax OK
/opt/redmine-3.4.6-5/apache2/scripts/ctl.sh : httpd stopped
/opt/redmine-3.4.6-5/mysql/scripts/ctl.sh : mysql stopped
/opt/redmine-3.4.6-5/mysql/scripts/ctl.sh : mysql  started at port 3306
Syntax OK
/opt/redmine-3.4.6-5/apache2/scripts/ctl.sh : httpd started at port 80
/opt/redmine-3.4.6-5/subversion/scripts/ctl.sh : subversion started at port 3690
[root@localhost htdocs]#
```
至此迁移升级完成。

### 使用bitnami_redmine中的Phpmyadmin
修改配置： `vim cat /opt/redmine-3.4.6-5/apps/phpmyadmin/conf/httpd-app.conf`
```
<IfVersion >= 2.3>
# Require local
Require all granted
</IfVersion>
```
**将`Require local`改成`Require all granted`**  
重启`/opt/redmine-3.4.6-5/apache2/scripts/ctl.sh restart`及可以访问`http://$IP/phpmyadmin/`

### 修改redmine发邮件，由`同步`改为`异步`
`cat /opt/redmine-3.4.6-5/apps/redmine/htdocs/config/configuration.yml`
同步配置：
```
# = Redmine configuration file
#
# Each environment has it's own configuration options.  If you are only
# running in production, only the production block needs to be configured.
# Environment specific configuration options override the default ones.
#
# Note that this file needs to be a valid YAML file.
# DO NOT USE TABS! Use 2 spaces instead of tabs for identation.

# default configuration options for all environments
default:
  # Outgoing emails configuration
  # See the examples below and the Rails guide for more configuration options:
  # http://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration
  email_delivery:
    delivery_method: :smtp
    smtp_settings:
      address: smtp.example.net
      port: 25
      domain: example.net
      authentication: :login
      user_name: redmine@example.net
      password: ******
          

  # ==== Simple SMTP server at localhost
  #
  #  email_delivery:
  #    delivery_method: :smtp
  #    smtp_settings:
  #      address: "localhost"
  #      port: 25
  #
  # ==== SMTP server at example.com using LOGIN authentication and checking HELO for foo.com
  #
  #  email_delivery:
  #    delivery_method: :smtp
  #    smtp_settings:
  #      address: "example.com"
  #      port: 25
  #      authentication: :login
  #      domain: 'foo.com'
  #      user_name: 'myaccount'
  #      password: 'password'
  #
  # ==== SMTP server at example.com using PLAIN authentication
  #
  #  email_delivery:
  #    delivery_method: :smtp
  #    smtp_settings:
  #      address: "example.com"
  #      port: 25
  #      authentication: :plain
  #      domain: 'example.com'
  #      user_name: 'myaccount'
  #      password: 'password'
  #
  # ==== SMTP server at using TLS (GMail)
  # This might require some additional configuration. See the guides at:
  # http://www.redmine.org/projects/redmine/wiki/EmailConfiguration
  #
  #  email_delivery:
  #    delivery_method: :smtp
  #    smtp_settings:
  #      enable_starttls_auto: true
  #      address: "smtp.gmail.com"
  #      port: 587
  #      domain: "smtp.gmail.com" # 'your.domain.com' for GoogleApps
  #      authentication: :plain
  #      user_name: "your_email@gmail.com"
  #      password: "your_password"
  #
  # ==== Sendmail command
  #
  #  email_delivery:
  #    delivery_method: :sendmail

  # Absolute path to the directory where attachments are stored.
  # The default is the 'files' directory in your Redmine instance.
  # Your Redmine instance needs to have write permission on this
  # directory.
  # Examples:
  # attachments_storage_path: /var/redmine/files
  # attachments_storage_path: D:/redmine/files
  attachments_storage_path:

  # Configuration of the autologin cookie.
  # autologin_cookie_name: the name of the cookie (default: autologin)
  # autologin_cookie_path: the cookie path (default: /)
  # autologin_cookie_secure: true sets the cookie secure flag (default: false)
  autologin_cookie_name:
  autologin_cookie_path:
  autologin_cookie_secure:

  # Configuration of SCM executable command.
  #
  # Absolute path (e.g. /usr/local/bin/hg) or command name (e.g. hg.exe, bzr.exe)
  # On Windows + CRuby, *.cmd, *.bat (e.g. hg.cmd, bzr.bat) does not work.
  #
  # On Windows + JRuby 1.6.2, path which contains spaces does not work.
  # For example, "C:\Program Files\TortoiseHg\hg.exe".
  # If you want to this feature, you need to install to the path which does not contains spaces.
  # For example, "C:\TortoiseHg\hg.exe".
  #
  # Examples:
  # scm_subversion_command: svn                                       # (default: svn)
  # scm_mercurial_command:  C:\Program Files\TortoiseHg\hg.exe        # (default: hg)
  # scm_git_command:        /usr/local/bin/git                        # (default: git)
  # scm_cvs_command:        cvs                                       # (default: cvs)
  # scm_bazaar_command:     bzr.exe                                   # (default: bzr)
  # scm_darcs_command:      darcs-1.0.9-i386-linux                    # (default: darcs)
  #
  scm_subversion_command:
  scm_mercurial_command:
  scm_git_command:
  scm_cvs_command:
  scm_bazaar_command:
  scm_darcs_command:

  # SCM paths validation.
  #
  # You can configure a regular expression for each SCM that will be used to
  # validate the path of new repositories (eg. path entered by users with the
  # "Manage repositories" permission and path returned by reposman.rb).
  # The regexp will be wrapped with \A \z, so it must match the whole path.
  # And the regexp is case sensitive.
  #
  # You can match the project identifier by using %project% in the regexp.
  #
  # You can also set a custom hint message for each SCM that will be displayed
  # on the repository form instead of the default one.
  #
  # Examples:
  # scm_subversion_path_regexp: file:///svnpath/[a-z0-9_]+
  # scm_subversion_path_info: SVN URL (eg. file:///svnpath/foo)
  #
  # scm_git_path_regexp: /gitpath/%project%(\.[a-z0-9_])?/
  #
  scm_subversion_path_regexp:
  scm_mercurial_path_regexp:
  scm_git_path_regexp:
  scm_cvs_path_regexp:
  scm_bazaar_path_regexp:
  scm_darcs_path_regexp:
  scm_filesystem_path_regexp:

  # Absolute path to the SCM commands errors (stderr) log file.
  # The default is to log in the 'log' directory of your Redmine instance.
  # Example:
  # scm_stderr_log_file: /var/log/redmine_scm_stderr.log
  scm_stderr_log_file:

  # Key used to encrypt sensitive data in the database (SCM and LDAP passwords).
  # If you don't want to enable data encryption, just leave it blank.
  # WARNING: losing/changing this key will make encrypted data unreadable.
  #
  # If you want to encrypt existing passwords in your database:
  # * set the cipher key here in your configuration file
  # * encrypt data using 'rake db:encrypt RAILS_ENV=production'
  #
  # If you have encrypted data and want to change this key, you have to:
  # * decrypt data using 'rake db:decrypt RAILS_ENV=production' first
  # * change the cipher key here in your configuration file
  # * encrypt data using 'rake db:encrypt RAILS_ENV=production'
  database_cipher_key:

  # Set this to false to disable plugins' assets mirroring on startup.
  # You can use `rake redmine:plugins:assets` to manually mirror assets
  # to public/plugin_assets when you install/upgrade a Redmine plugin.
  #
  #mirror_plugins_assets_on_startup: false

  # Your secret key for verifying cookie session data integrity. If you
  # change this key, all old sessions will become invalid! Make sure the
  # secret is at least 30 characters and all random, no regular words or
  # you'll be exposed to dictionary attacks.
  #
  # If you have a load-balancing Redmine cluster, you have to use the
  # same secret token on each machine.
  #secret_token: 'change it to a long random string'

  # Requires users to re-enter their password for sensitive actions (editing
  # of account data, project memberships, application settings, user, group,
  # role, auth source management and project deletion). Disabled by default.
  # Timeout is set in minutes.
  #
  #sudo_mode: true
  #sudo_mode_timeout: 15

  # Absolute path (e.g. /usr/bin/convert, c:/im/convert.exe) to
  # the ImageMagick's `convert` binary. Used to generate attachment thumbnails.
  imagemagick_convert_command: '/opt/redmine-3.4.6-5/common/bin/convert'

  # Configuration of RMagick font.
  #
  # Redmine uses RMagick in order to export gantt png.
  # You don't need this setting if you don't install RMagick.
  #
  # In CJK (Chinese, Japanese and Korean),
  # in order to show CJK characters correctly,
  # you need to set this configuration.
  #
  # Because there is no standard font across platforms in CJK,
  # you need to set a font installed in your server.
  #
  # This setting is not necessary in non CJK.
  #
  # Examples for Japanese:
  #   Windows:
  #     rmagick_font_path: C:\windows\fonts\msgothic.ttc
  #   Linux:
  #     rmagick_font_path: /usr/share/fonts/ipa-mincho/ipam.ttf
  #
  rmagick_font_path:

  # Maximum number of simultaneous AJAX uploads
  #max_concurrent_ajax_uploads: 2

  # Configure OpenIdAuthentication.store
  #
  # allowed values: :memory, :file, :memcache
  #openid_authentication_store: :memory

# specific configuration options for production environment
# that overrides the default ones
production:

# specific configuration options for development environment
# that overrides the default ones
development:
```
异步配置：
```
# = Redmine configuration file
#
# Each environment has it's own configuration options.  If you are only
# running in production, only the production block needs to be configured.
# Environment specific configuration options override the default ones.
#
# Note that this file needs to be a valid YAML file.
# DO NOT USE TABS! Use 2 spaces instead of tabs for identation.

# default configuration options for all environments
default:
  # Outgoing emails configuration
  # See the examples below and the Rails guide for more configuration options:
  # http://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration
  email_delivery:
    delivery_method: :async_smtp
    async_smtp_settings:
      address: smtp.example.net
      port: 25
      domain: smtp.example.net
      authentication: :login
      user_name: redmine@example.net
      password: ******



  # Absolute path to the directory where attachments are stored.
  # The default is the 'files' directory in your Redmine instance.
  # Your Redmine instance needs to have write permission on this
  # directory.
  # Examples:
  # attachments_storage_path: /var/redmine/files
  # attachments_storage_path: D:/redmine/files
  attachments_storage_path:

  # Configuration of the autologin cookie.
  # autologin_cookie_name: the name of the cookie (default: autologin)
  # autologin_cookie_path: the cookie path (default: /)
  # autologin_cookie_secure: true sets the cookie secure flag (default: false)
  autologin_cookie_name:
  autologin_cookie_path:
  autologin_cookie_secure:

  # Configuration of SCM executable command.
  #
  # Absolute path (e.g. /usr/local/bin/hg) or command name (e.g. hg.exe, bzr.exe)
  # On Windows + CRuby, *.cmd, *.bat (e.g. hg.cmd, bzr.bat) does not work.
  #
  # On Windows + JRuby 1.6.2, path which contains spaces does not work.
  # For example, "C:\Program Files\TortoiseHg\hg.exe".
  # If you want to this feature, you need to install to the path which does not contains spaces.
  # For example, "C:\TortoiseHg\hg.exe".
  #
  # Examples:
  # scm_subversion_command: svn                                       # (default: svn)
  # scm_mercurial_command:  C:\Program Files\TortoiseHg\hg.exe        # (default: hg)
  # scm_git_command:        /usr/local/bin/git                        # (default: git)
  # scm_cvs_command:        cvs                                       # (default: cvs)
  # scm_bazaar_command:     bzr.exe                                   # (default: bzr)
  # scm_darcs_command:      darcs-1.0.9-i386-linux                    # (default: darcs)
  #
  scm_subversion_command:
  scm_mercurial_command:
  scm_git_command:
  scm_cvs_command:
  scm_bazaar_command:
  scm_darcs_command:

  # SCM paths validation.
  #
  # You can configure a regular expression for each SCM that will be used to
  # validate the path of new repositories (eg. path entered by users with the
  # "Manage repositories" permission and path returned by reposman.rb).
  # The regexp will be wrapped with \A \z, so it must match the whole path.
  # And the regexp is case sensitive.
  #
  # You can match the project identifier by using %project% in the regexp.
  #
  # You can also set a custom hint message for each SCM that will be displayed
  # on the repository form instead of the default one.
  #
  # Examples:
  # scm_subversion_path_regexp: file:///svnpath/[a-z0-9_]+
  # scm_subversion_path_info: SVN URL (eg. file:///svnpath/foo)
  #
  # scm_git_path_regexp: /gitpath/%project%(\.[a-z0-9_])?/
  #
  scm_subversion_path_regexp:
  scm_mercurial_path_regexp:
  scm_git_path_regexp:
  scm_cvs_path_regexp:
  scm_bazaar_path_regexp:
  scm_darcs_path_regexp:
  scm_filesystem_path_regexp:

  # Absolute path to the SCM commands errors (stderr) log file.
  # The default is to log in the 'log' directory of your Redmine instance.
  # Example:
  # scm_stderr_log_file: /var/log/redmine_scm_stderr.log
  scm_stderr_log_file:

  # Key used to encrypt sensitive data in the database (SCM and LDAP passwords).
  # If you don't want to enable data encryption, just leave it blank.
  # WARNING: losing/changing this key will make encrypted data unreadable.
  #
  # If you want to encrypt existing passwords in your database:
  # * set the cipher key here in your configuration file
  # * encrypt data using 'rake db:encrypt RAILS_ENV=production'
  #
  # If you have encrypted data and want to change this key, you have to:
  # * decrypt data using 'rake db:decrypt RAILS_ENV=production' first
  # * change the cipher key here in your configuration file
  # * encrypt data using 'rake db:encrypt RAILS_ENV=production'
  database_cipher_key:

  # Set this to false to disable plugins' assets mirroring on startup.
  # You can use `rake redmine:plugins:assets` to manually mirror assets
  # to public/plugin_assets when you install/upgrade a Redmine plugin.
  #
  #mirror_plugins_assets_on_startup: false

  # Your secret key for verifying cookie session data integrity. If you
  # change this key, all old sessions will become invalid! Make sure the
  # secret is at least 30 characters and all random, no regular words or
  # you'll be exposed to dictionary attacks.
  #
  # If you have a load-balancing Redmine cluster, you have to use the
  # same secret token on each machine.
  #secret_token: 'change it to a long random string'

  # Requires users to re-enter their password for sensitive actions (editing
  # of account data, project memberships, application settings, user, group,
  # role, auth source management and project deletion). Disabled by default.
  # Timeout is set in minutes.
  #
  #sudo_mode: true
  #sudo_mode_timeout: 15

  # Absolute path (e.g. /usr/bin/convert, c:/im/convert.exe) to
  # the ImageMagick's `convert` binary. Used to generate attachment thumbnails.
  imagemagick_convert_command: '/home/ubuntu/redmine-3.1.1-1/common/bin/convert'

  # Configuration of RMagcik font.
  #
  # Redmine uses RMagcik in order to export gantt png.
  # You don't need this setting if you don't install RMagcik.
  #
  # In CJK (Chinese, Japanese and Korean),
  # in order to show CJK characters correctly,
  # you need to set this configuration.
  #
  # Because there is no standard font across platforms in CJK,
  # you need to set a font installed in your server.
  #
  # This setting is not necessary in non CJK.
  #
  # Examples for Japanese:
  #   Windows:
  #     rmagick_font_path: C:\windows\fonts\msgothic.ttc
  #   Linux:
  #     rmagick_font_path: /usr/share/fonts/ipa-mincho/ipam.ttf
  #
  rmagick_font_path:

  # Maximum number of simultaneous AJAX uploads
  #max_concurrent_ajax_uploads: 2

  # Configure OpenIdAuthentication.store
  #
  # allowed values: :memory, :file, :memcache
  #openid_authentication_store: :memory

# specific configuration options for production environment
# that overrides the default ones
production:
  #async_email_delivery:
  email_delivery:
    delivery_method: :async_smtp
    async_smtp_settings:
      address: smtp.example.net
      port: 25
      domain: smtp.example.net
      authentication: :login
      user_name: redmine@.example.net
      password: ******

# specific configuration options for development environment
# that overrides the default ones
development:
You have new mail in /var/mail/root
```
**重点：**  
异步：
```
delivery_method: :async_smtp
async_smtp_settings:
```
同步：
```
delivery_method: :smtp
smtp_settings:
```










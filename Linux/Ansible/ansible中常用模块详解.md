[模块查询](https://docs.ansible.com/ansible/2.6/modules/list_of_all_modules.html)
```
[root@docker5 ~]# ansible-doc -s file
- name: Sets attributes of files
  file:
      attributes:            # Attributes the file or directory should have. To get supported flags look at the man page for `chattr' on the target system. This
                               string should contain the attributes in the same order as the one displayed by `lsattr'.
      follow:                # This flag indicates that filesystem links, if they exist, should be followed. Previous to Ansible 2.5, this was `no' by default.
      force:                 # force the creation of the symlinks in two cases: the source file does not exist (but will appear later); the destination exists and
                               is a file (so, we need to unlink the "path" file and create symlink to the "src" file in place of
                               it).
      group:                 # Name of the group that should own the file/directory, as would be fed to `chown'.
      mode:                  # Mode the file or directory should be. For those used to `/usr/bin/chmod' remember that modes are actually octal numbers (like `0644'
                               or `'). Leaving off the leading zero will likely have unexpected results. As of version 1.8, the
                               mode may be specified as a symbolic mode (for example, `u+rwx' or `u=rw,g=r,o=r').
      owner:                 # Name of the user that should own the file/directory, as would be fed to `chown'.
      path:                  # (required) path to the file being managed.  Aliases: `dest', `name'
      recurse:               # recursively set the specified file attributes (applies only to state=directory)
      selevel:               # Level part of the SELinux file context. This is the MLS/MCS attribute, sometimes known as the `range'. `_default' feature works as
                               for `seuser'.
      serole:                # Role part of SELinux file context, `_default' feature works as for `seuser'.
      setype:                # Type part of SELinux file context, `_default' feature works as for `seuser'.
      seuser:                # User part of SELinux file context. Will default to system policy, if applicable. If set to `_default', it will use the `user'
                               portion of the policy if available.
      src:                   # path of the file to link to (applies only to `state=link' and `state=hard'). Will accept absolute, relative and nonexisting paths.
                               Relative paths are not expanded.
      state:                 # If `directory', all immediate subdirectories will be created if they do not exist, since 1.7 they will be created with the supplied
                               permissions. If `file', the file will NOT be created if it does not exist, see the [copy] or
                               [template] module if you want that behavior.  If `link', the symbolic link will be created or
                               changed. Use `hard' for hardlinks. If `absent', directories will be recursively deleted, and files or
                               symlinks will be unlinked. Note that `absent' will not cause `file' to fail if the `path' does not
                               exist as the state did not change. If `touch' (new in 1.4), an empty file will be created if the
                               `path' does not exist, while an existing file or directory will receive updated file access and
                               modification times (similar to the way `touch` works from the command line).
      unsafe_writes:         # Normally this module uses atomic operations to prevent data corruption or inconsistent reads from the target files, sometimes
                               systems are configured or just broken in ways that prevent this. One example are docker mounted
                               files, they cannot be updated atomically and can only be done in an unsafe manner. This boolean
                               option allows ansible to fall back to unsafe methods of updating files for those cases in which you
                               do not have any other choice. Be aware that this is subject to race conditions and can lead to data
                               corruption.
[root@docker5 ~]# 
```

## file模块
`ansible-doc -s file`   
> file模块用来设置文件属性，并且创建或者删除目录，创建连接
```
[root@docker5 ~]# ansible -i hosts all -m file -a "path=/tmp/test state=touch owner=root group=root"
10.0.102.162 | SUCCESS => {
    "changed": true,
    "dest": "/tmp/test",
    "gid": ,
    "group": "root",
    "mode": "",
    "owner": "root",
    "secontext": "unconfined_u:object_r:user_tmp_t:s0",
    "size": ,
    "state": "file",
    "uid":
}

相关选项如下：
force：需要在两种情况下强制创建软链接，一种是源文件不存在，但之后会建立的情况下；另一种是目标软链接已存在，需要先取消之前的软链，然后创建新的软链，有两个选项：yes|no
group：定义文件/目录的属组
mode：定义文件/目录的权限
owner：定义文件/目录的属主
path：必选项，定义文件/目录的路径
recurse：递归设置文件的属性，只对目录有效
src：被链接的源文件路径，只应用于state=link的情况
dest：被链接到的路径，只应用于state=link的情况
state：
       directory：如果目录不存在，就创建目录
       file：即使文件不存在，也不会被创建
       link：创建软链接
       hard：创建硬链接
       touch：如果文件不存在，则会创建一个新的文件，如果文件或目录已存在，则更新其最后修改时间
       absent：删除目录、文件或者取消链接文件
```
  
## copy模块   
> 主要的作用是复制文件到远程主机
```
相关选项如下：
backup：在覆盖之前，将源文件备份，备份文件包含时间信息。有两个选项：yes|no
content：用于替代“src”，可以直接设定指定文件的值
dest：必选项。要将源文件复制到的远程主机的绝对路径，如果源文件是一个目录，那么该路径也必须是个目录
directory_mode：递归设定目录的权限，默认为系统默认权限
force：如果目标主机包含该文件，但内容不同，如果设置为yes，则强制覆盖，如果为no，则只有当目标主机的目标位置不存在该文件时，才复制。默认为yes
others：所有的file模块里的选项都可以在这里使用
src：被复制到远程主机的本地文件，可以是绝对路径，也可以是相对路径。如果路径是一个目录，它将递归复制。在这种情况下，如果路径使用“/”来结尾，则只复制目录里的内容，如果没有使用“/”来结尾，则包含目录在内的整个内容全部复制，类似于rsync
```
 
## cron模块   
> 制定定时计划任务，cron模块的主要作用和crontab命令是一样的
```
[root@zxwd05 ~]# ansible cluster_hosts -m cron -a 'name="custom job" minute=*/3 hour=* day=* month=* weekday=* job="/usr/sbin/ntpdate 192.168.30.139"'
 
name： 指定计划任务的名字，
分，时，日，月，周分别指定计划任务执行的时间点。
job：指定计划任务指定的命令。
state：指定此计划任务的状态。present表示当前添加，absent表示删除。
```

## service模块    
> service模块主要用来对系统中的服务进行管理 
```
[root@docker5 ~]# ansible -i /root/hosts all -m service -a "name=mysqld state=started enabled=no"

相关参数如下：
name： 指定服务的名称。
state：指定对服务进行的操作，started, stopped, restarted, reloaded。【是对应动词的过去分词形式】
enabled: yes|no, 是否加入开机自启动。
runlevel： 启动的级别。
```

## command模块  
> command 模块可以帮助我们在远程主机上执行命令。
> 注意：使用 command 模块在远程主机中执行命令时，不会经过远程主机的 shell 处理，在使用 command 模块时，如果需要执行的命令中含有重定向、管道符等操作时，这些符号也会失效，比如"<", ">", "|", ";" 和 "&" 这些符号，如果你需要这些功能，可以参考后面介绍的 shell 模块。还有一点需要注意，如果远程节点是 windows 操作系统，则需要使用 win_command 模块。执行 ansible 时，不加 -m 默认使用 command ，可以在 /etc/ansible/ansible.cfg 中修改
```
相关选项如下：
creates：一个文件名，当该文件存在，则该命令不执行
free_form：要执行的linux指令，这里的free_form不需要写成赋值的形式，直接写要执行的命令即可。
chdir：在执行指令之前，先切换到该目录
removes：一个文件名，当该文件不存在，则该选项不执行
executable：切换shell来执行指令，该执行路径必须是一个绝对路径
```

## script模块
> script 模块可以帮助我们在远程主机上执行 ansible 管理主机上的脚本，也就是说，脚本一直存在于 ansible 管理主机本地，不需要手动拷贝到远程主机后再执行
```
[root@docker5 tasks]# ansible-doc -s script
- name: Runs a local script on a remote node after transferring it
  script:
      chdir:                 # cd into this directory on the remote node before running the script
      creates:               # a filename, when it already exists, this step will *not* be run.
      decrypt:               # This option controls the autodecryption of source files using vault.
      free_form:             # (required) Path to the local script file followed by optional arguments. There is no parameter actually named 'free form'; see the
                               examples!
      removes:               # a filename, when it does not exist, this step will *not* be run.
[root@docker5 tasks]# 
```
> 把本地的脚本在远程主机上执行。这个命令的选项和command差不多，不同的是这里执行的是shell脚本而已

## unarchive模块
> 这个模块的主要作用就是解压。模块有两种用法：
> 1：如果参数copy=yes，则把本地的压缩包拷贝到远程主机，然后执行压缩。
> 2：如果参数copy=no，则直接解压远程主机上给出的压缩包。
```
[root@docker5 tasks]# ansible -i /root/hosts all  -m unarchive -a 'src=/usr/loca/src/mysql.tar.gz dest=/usr/local/ copy=no'

creates：指定一个文件名，当该文件存在时，则解压指令不执行 
dest：远程主机上的一个路径，即文件解压的路径  
grop：解压后的目录或文件的属组 
list_files：如果为yes，则会列出压缩包里的文件，默认为no，.0版本新增的选项 
mode：解决后文件的权限 
src：如果copy为yes，则需要指定压缩文件的源路径  
owner：解压后文件或目录的属主
```
> 与之相对的压缩命令的模块是archive


## archive压缩命令
```
[root@docker5 tasks]# ansible-doc -s archive
- name: Creates a compressed archive of one or more files or trees
  archive:
      attributes:            # Attributes the file or directory should have. To get supported flags look at the man page for `chattr' on the target system. This string should contain the attributes in
                               the same order as the one displayed by `lsattr'.
      dest:                  # The file name of the destination archive. This is required when `path' refers to multiple files by either specifying a glob, a directory or multiple paths in a list.
      exclude_path:          # Remote absolute path, glob, or list of paths or globs for the file or files to exclude from the archive
      format:                # The type of compression to use. Support for xz was added in version 2.5.
      group:                 # Name of the group that should own the file/directory, as would be fed to `chown'.
      mode:                  # Mode the file or directory should be. For those used to `/usr/bin/chmod' remember that modes are actually octal numbers (like `0644' or `'). Leaving off the leading
                               zero will likely have unexpected results. As of version 1.8, the mode may be specified as a symbolic mode (for example, `u+rwx' or
                               `u=rw,g=r,o=r').
      owner:                 # Name of the user that should own the file/directory, as would be fed to `chown'.
      path:                  # (required) Remote absolute path, glob, or list of paths or globs for the file or files to compress or archive.
      remove:                # Remove any added source files and trees after adding to archive.
      selevel:               # Level part of the SELinux file context. This is the MLS/MCS attribute, sometimes known as the `range'. `_default' feature works as for `seuser'.
      serole:                # Role part of SELinux file context, `_default' feature works as for `seuser'.
      setype:                # Type part of SELinux file context, `_default' feature works as for `seuser'.
      seuser:                # User part of SELinux file context. Will default to system policy, if applicable. If set to `_default', it will use the `user' portion of the policy if available.
      unsafe_writes:         # Normally this module uses atomic operations to prevent data corruption or inconsistent reads from the target files, sometimes systems are configured or just broken in
                               ways that prevent this. One example are docker mounted files, they cannot be updated atomically and can only be done in an unsafe manner.
                               This boolean option allows ansible to fall back to unsafe methods of updating files for those cases in which you do not have any other
                               choice. Be aware that this is subject to race conditions and can lead to data corruption.
```

## replace模块
> 这个模块可以根据我们指定的正则表达式替换文件的匹配的内容。
```
 - name: change the start script
   #shell: sed -i "s/^datadir=/datadir=\/data\/mysql/" /etc/init.d/mysqld
   replace: path=/etc/init.d/mysqld replace="datadir={{ datadir_name }}" regexp="^datadir=" backup=yes
 
#安装MySQL的时候，需要修改MySQL的启动脚本，配置datadir参数，这里两行的作用是一样的。只是在执行playbook的时候，使用shell模块会报出警告说建议使用replcae模块。
 
#模块参数如下：
path： 指定远程主机要替换的文件的路径。
regexp: 指定在文件中匹配的正则表达式，上面匹配以“datadir=”开头的行
replace: 指定替换的文件，就是把上面正则匹配到的文件，替换成这里的内容。
backup：表示在对文件操作之前是否备份文件。
```

## lineinfile模块
> 这个模块会遍历文本中每一行，然后对其中的行进行操作。
```
path参数 ：必须参数，指定要操作的文件。
 
line参数 : 使用此参数指定文本内容。
 
regexp参数 ：使用正则表达式匹配对应的行，当替换文本时，如果有多行文本都能被匹配，则只有最后面被匹配到的那行文本才会被替换，当删除文本时，如果有多行文本都能被匹配，
　　　　　　　　这么这些行都会被删除。
 
state参数：当想要删除对应的文本时，需要将state参数的值设置为absent，absent为缺席之意，表示删除，state的默认值为present。
 
backrefs参数：默认情况下，当根据正则替换文本时，即使regexp参数中的正则存在分组，在line参数中也不能对正则中的分组进行引用，除非将backrefs参数的值设置为yes。
　　　　　　backrefs=yes表示开启后向引用，这样，line参数中就能对regexp参数中的分组进行后向引用了，这样说不太容易明白，可以参考后面的示例命令理解。backrefs=yes
　　　　　　除了能够开启后向引用功能，还有另一个作用，默认情况下，当使用正则表达式替换对应行时，如果正则没有匹配到任何的行，那么line对应的内容会被插入到文本的末尾，
　　　　　　不过，如果使用了backrefs=yes，情况就不一样了，当使用正则表达式替换对应行时，同时设置了backrefs=yes，那么当正则没有匹配到任何的行时，
　　　　　　则不会对文件进行任何操作，相当于保持原文件不变。
 
insertafter参数：借助insertafter参数可以将文本插入到“指定的行”之后，insertafter参数的值可以设置为EOF或者正则表达式，EOF为End Of File之意，表示插入到文档的末尾，
 　　　　　默认情况下insertafter的值为EOF，如果将insertafter的值设置为正则表达式，表示将文本插入到匹配到正则的行之后，如果正则没有匹配到任何行，则插入到文件末尾，
  　　　　当使用backrefs参数时，此参数会被忽略。
 
insertbefore参数：借助insertbefore参数可以将文本插入到“指定的行”之前，insertbefore参数的值可以设置为BOF或者正则表达式，BOF为Begin Of File之意，
　　　　　　表示插入到文档的开头，如果将insertbefore的值设置为正则表达式，表示将文本插入到匹配到正则的行之前，如果正则没有匹配到任何行，则插入到文件末尾，
　　　　　　当使用backrefs参数时，此参数会被忽略。
 
backup参数：是否在修改文件之前对文件进行备份。
 
create参数 ：当要操作的文件并不存在时，是否创建对应的文件。
```

[参考](https://www.shuzhiduo.com/A/mo5kZbOMJw/) https://www.shuzhiduo.com/A/mo5kZbOMJw/
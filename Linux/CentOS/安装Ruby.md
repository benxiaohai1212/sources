
### Step 1 – Installing Requirements   
First of all, you need to install all required packages for ruby installation on our system using the following command.
```
yum install -y gcc-c++ patch readline readline-devel zlib zlib-devel ibffi-devel openssl-devel make bzip2 autoconf automake libtool bison sqlite-devel
```

### Step 2 – Install RVM  
Now, install the latest stable version of RVM on your system using the following command. This command will automatically download all required files and install them on your system.
```
curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import -
```
After that install the latest stable RVM version on your system.
```
curl -L get.rvm.io | bash -s stable
```
Once the installation finished, run below command to load the RVM environment.
```
source /etc/profile.d/rvm.sh
rvm reload
```
### Step 3 – Verify Dependencies  
Now use the following command to verify all dependencies are properly installed. This will install any missing dependencies on your system.
```
rvm requirements run

Checking requirements for centos.
Requirements installation successful.
```

### Step 4 – Install Ruby on CentOS  
Now, your system is ready for the Ruby installation. You can find the available Ruby version for installation using the below command.
```
rvm list known
```
Then install the required Ruby version on your system. Here, I am installing Ruby 2.6 on my CentOS system. You can simply replace the version to below command of your choice and install.
```
rvm install 2.6
```

### Step 5 – Setup Default Ruby Version  
First of all, check the currently installed ruby versions on your system. So that we can find which version is using currently by the system and which is set to default.
```
rvm list 

   ruby-2.4.4 [ x86_64 ]
 * ruby-2.5.1 [ x86_64 ]
=> ruby-2.6.0 [ x86_64 ]

# => - current
# =* - current && default
#  * - default
```
After that use rvm command to set up the default ruby version to be used by applications.
```
rvm use 2.6 --default

Using /usr/local/rvm/gems/ruby-2.6.0
```

### Step 6 – Verify Active Ruby Version  
Using the following command you can check the currently active ruby version.
```
ruby --version

ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-linux]
```
Congratulation’s, Finally you have successfully installed Ruby on your system

引用：https://tecadmin.net/install-ruby-latest-stable-centos/
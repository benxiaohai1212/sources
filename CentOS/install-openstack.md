### 用CentOS的RDO做一键部署单节点openstack

[文档](http://openstack.redhat.com/install/packstack/)
[资源](https://repos.fedorapeople.org/repos/openstack/)

Summary for the impatient

If you are using non-English locale make sure your /etc/environment is populated:
```sh
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```
If your system meets all the prerequisites mentioned below, proceed with running the following commands.
On RHEL:
```sh
$ sudo yum install -y https://www.rdoproject.org/repos/rdo-release.rpm
$ sudo yum update -y
$ sudo yum install -y openstack-packstack
$ sudo packstack --allinone
```
On CentOS:
```sh
$ sudo yum install -y centos-release-openstack-ocata
$ sudo yum update -y
$ sudo yum install -y openstack-packstack
$ sudo packstack --allinone
```
#### Step 0: Prerequisites

Software
Red Hat Enterprise Linux (RHEL) 7 is the minimum recommended version, or the equivalent version of one of the RHEL-based Linux distributions such as CentOS, Scientific Linux, and so on. x86_64 is currently the only supported architecture.
See RDO repositories for details on required repositories.
Name the host with a fully qualified domain name rather than a short-form name to avoid DNS issues with Packstack.
Hardware
Machine with at least 4GB RAM, preferably 6GB RAM, processors with hardware virtualization extensions, and at least one network adapter.
Network
If you plan on having external network access to the server and instances, this is a good moment to properly configure your network settings. A static IP address to your network card, and disabling NetworkManager are good ideas.
```sh
$ sudo systemctl disable firewalld
$ sudo systemctl stop firewalld
$ sudo systemctl disable NetworkManager
$ sudo systemctl stop NetworkManager
$ sudo systemctl enable network
$ sudo systemctl start network
```
If you are planning on something fancier, read the document on advanced networking before proceeding.
#### Step 1: Software repositories

On RHEL, download and install the RDO repository RPM to set up the OpenStack repository:
```sh
$ sudo yum install -y https://rdoproject.org/repos/rdo-release.rpm
```
On CentOS, the Extras repository provides the RPM that enables the OpenStack repository. Extras is enabled by default on CentOS 7, so you can simply install the RPM to set up the OpenStack repository:
$ sudo yum install -y centos-release-openstack-ocata
Update your current packages:
```text
$ sudo yum update -y
```
Looking for an older version? See http://rdoproject.org/repos/ for the full listing.
#### Step 2: Install Packstack Installer
```sh
$ sudo yum install -y openstack-packstack
```
#### Step 3: Run Packstack to install OpenStack

Packstack takes the work out of manually setting up OpenStack. For a single node OpenStack deployment, run the following command:
```sh
$ sudo packstack --allinone
```
If you encounter failures, see the Workarounds page for tips.
If you have run Packstack previously, there will be a file in your home directory named something like packstack-answers-20130722-153728.txt You will probably want to use that file again, using the --answer-file option, so that any passwords you have already set (for example, mysql) will be reused.
The installer will ask you to enter the root password for each host node you are installing on the network, to enable remote configuration of the host so it can remotely configure each node using Puppet.
Once the process is complete, you can log in to the OpenStack web interface Horizon by going to http://$YOURIP/dashboard. The user name is admin. The password can be found in the file keystonerc_admin in the /root directory of the control node.
Next steps

Now that your single node OpenStack instance is up and running, you can read on about running an instance, configuring a floating IP range, configuring RDO to work with your existing network, or about expanding your installation by adding a compute node.

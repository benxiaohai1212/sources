### 用Asible在线安装oracle

```
---
- hosts: 10.10.35.30
  remote_user: root
  #sudo: yes
  become: true
  vars:
    env_file_dir: /root/.bashrc
    jdk_dir: 8u321-b07
    jdk_archive: jdk-8u321-linux-x64.tar.gz
    jdk_local_dir: jdk1.8.0_321
    download_folder: /opt/oracle
    java_name: "{{ download_folder }}/{{ jdk_local_dir }}"
    java_archive: "{{ download_folder }}/{{ jdk_archive }}"
    download_url: http://download.oracle.com/otn-pub/java/jdk/{{jdk_dir}}/{{jdk_archive}}
    java_version: 8
    java_subversion: 321
    java_build_custom: "07"
    jdk_version_detail_custom: "{{ java_version }}u{{ java_subversion }}-b{{ java_build_custom }}"
    jdk_tarball_hash: df5ad55fdd604472a86a45a217032c7d
    jdk_tarball_url: "http://download.oracle.com/otn-pub/java/jdk/{{ jdk_dir }}/{{ jdk_tarball_hash }}/{{ jdk_archive }}"
    database_host: "127.0.0.1"

  tasks:
  - name: check jdk variable 
    shell: cat {{env_file_dir}}
    register: result

  - debug:
      var: result.stdout.find('JAVA_HOME')

  - name: Check jdk java
    command: java -version
    register: java_version_result

  - debug: 
      var: java_version_result.failed

  - name: Create Directory structure
    command: mkdir -p {{download_folder}} {{java_name}}
    when: result.stdout.find('JAVA_HOME') == -1 or java_version_result.failed

  - name: Download Java
    command: wget -O /opt/oracle/jdk-8u321-linux-x64.tar.gz --no-cookies --no-check-certificate --header "Cookie:oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u321-b07/df5ad55fdd604472a86a45a217032c7d/jdk-8u321-linux-x64.tar.gz"
    # when: result.stdout.find('JAVA_HOME') == -1 or java_version_result.failed
    register: download_result
  - debug:
      var: download_result

  - name: Get_url Download Java
    get_url: 
      url: "http://download.oracle.com/otn-pub/java/jdk/8u321-b07/df5ad55fdd604472a86a45a217032c7d/jdk-8u321-linux-x64.tar.gz"
      dest: "/opt/jdk-8u321-linux-x64.tar.gz"
      validate_certs: no 
      headers:
        Cookie: 'gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie'
      owner: root 
      group: root 
      mode: 744
    register: get_url_download_result
  - debug: 
      var: get_url_download_result

  - name: Unpack archive
    action: shell tar -xzvf {{java_archive}} -C {{download_folder}}
    when: result.stdout.find('JAVA_HOME') == -1 or java_version_result.failed

  - name: Fix ownership
    file: state=directory path={{java_name}} owner=root group=root recurse=yes
    when: result.stdout.find('JAVA_HOME') == -1 or java_version_result.failed

  - name: jdk variable configuration profile file
    shell: /bin/echo {{ item }} >> {{env_file_dir}}; source {{env_file_dir}}
    when: result.stdout.find('JAVA_HOME') == -1 and java_version_result.failed
    with_items:
    - export JAVA_HOME={{ java_name }}
    - export JRE_HOME={{ java_name }}/jre
    - export CLASSPATH=.:{{ java_name }}/lib:{{ java_name }}/jre/lib
    - export PATH=$PATH:{{ java_name }}/bin

  # Export the env on th fly to make system wide change
  - name: Source the profile file 
    action: shell source {{env_file_dir}}

  - name: check database host configuration file /etc/hosts
    shell: cat /etc/hosts
    register: check_database_host_result

  - name: database host variadble configuration /etc/hosts file
    shell: /bin/echo {{ item }} >> /etc/hosts
    when: check_database_host_result.stdout.find('mariadb.swanclouds.com') == -1
    with_items:
      - "{{ database_host }}  mariadb.swanclouds.com"

```
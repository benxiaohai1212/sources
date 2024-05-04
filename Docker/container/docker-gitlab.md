
### 1、安装docker，docker-compose

 * [ubuntu 14.04](https://github.com/benxiaohai1212/sources/blob/master/Linux/Ubuntu/install-docker.md)
 
 * [centos 7](https://github.com/benxiaohai1212/sources/blob/master/Linux/CentOS/install-docker.md)

### 2、编辑docker-compose.yml文件

#### mysql:
  
```xml
version: '2'

services:
  redis:
    restart: always
    image: sameersbn/redis:latest
    container_name: redis
    command:
    - --loglevel warning
    volumes:
    - /srv/docker/redis:/var/lib/redis:Z

  mysql:
    restart: always
    image: sameersbn/mysql:latest
    container_name: mysql
    volumes:
    - /srv/docker/mysql:/var/lib/mysql:Z
    environment:
    - MYSQL_ROOT_PASSWORD=mysql
    - DB_USER=gitlab
    - DB_PASS=1q2w3e4r
    - DB_NAME=gitlabhq_production    
    ports:
    - "3306:3306"    

  gitlab:
    restart: always
    image: sameersbn/gitlab:8.17.4
    container_name: gitlab
    depends_on:
    - redis
    - mysql
    ports:
    - "80:80"
    - "2222:22"
    - "8443:443"
    volumes:
    - /srv/docker/gitlab:/home/git/data:Z
    environment:
    - DEBUG=true

    - DB_ADAPTER=mysql2
    - DB_HOST=mysql
    - DB_PORT=3306
    - DB_USER=gitlab
    - DB_PASS=1q2w3e4r
    - DB_NAME=gitlabhq_production

    - REDIS_HOST=redis
    - REDIS_PORT=6379

    - GITLAB_TIMEZONE=Beijing

    - GITLAB_HTTPS=false
    - SSL_SELF_SIGNED=false

    - GITLAB_HOST=xxx.xxx.xxx.xxx
    - GITLAB_PORT=80
    - GITLAB_SSH_PORT=22
    - GITLAB_SECRETS_DB_KEY_BASE=fvXhxg7tthcg4jpxpfg9MbrWJbbHTqsRj3xpLNxdrMpsWmgnMNjRdhc73qX7dsgz
    - GITLAB_SECRETS_SECRET_KEY_BASE=fvXhxg7tthcg4jpxpfg9MbrWJbbHTqsRj3xpLNxdrMpsWmgnMNjRdhc73qX7dsgz
    - GITLAB_SECRETS_OTP_KEY_BASE=fvXhxg7tthcg4jpxpfg9MbrWJbbHTqsRj3xpLNxdrMpsWmgnMNjRdhc73qX7dsgz

    - GITLAB_BACKUP_SCHEDULE=daily
    - GITLAB_BACKUP_TIME=01:00
    - UNICORN_TIMEOUT=120

    - SMTP_ENABLED=true
    - SMTP_DOMAIN=mail.x.x.x
    - SMTP_HOST=mail.x.x.x
    - SMTP_PORT=25
    - SMTP_USER=admin@x.x.x
    - SMTP_PASS=***
    - SMTP_STARTTLS=true
    - SMTP_AUTHENTICATION=login
```
  
#### postgresql:
  
```xml
version: '2'

services:
  redis:
    restart: always
    image: sameersbn/redis:latest
    command:
    - --loglevel warning
    volumes:
    - /srv/docker/gitlab/redis:/var/lib/redis:Z

  postgresql:
    restart: always
    image: sameersbn/postgresql:9.4-22
    volumes:
    - /srv/docker/gitlab/postgresql:/var/lib/postgresql:Z
    environment:
    - DB_USER=gitlab
    - DB_PASS=password
    - DB_NAME=gitlabhq_production
    - DB_EXTENSION=pg_trgm

  gitlab:
    restart: always
    image: sameersbn/gitlab:8.8.5-1
    depends_on:
    - redis
    - postgresql
    ports:
    - "10080:80"
    - "10022:22"
    volumes:
    - /srv/docker/gitlab/gitlab:/home/git/data:Z
    environment:
    - DEBUG=false

    - DB_ADAPTER=postgresql
    - DB_HOST=postgresql
    - DB_PORT=5432
    - DB_USER=gitlab
    - DB_PASS=password
    - DB_NAME=gitlabhq_production

    - REDIS_HOST=redis
    - REDIS_PORT=6379

    - TZ=Asia/Kolkata
    - GITLAB_TIMEZONE=Kolkata

    - GITLAB_HTTPS=false
    - SSL_SELF_SIGNED=false

    - GITLAB_HOST=localhost
    - GITLAB_PORT=10080
    - GITLAB_SSH_PORT=10022
    - GITLAB_RELATIVE_URL_ROOT=
    - GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alphanumeric-string

    - GITLAB_ROOT_PASSWORD=
    - GITLAB_ROOT_EMAIL=

    - GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
    - GITLAB_NOTIFY_PUSHER=false

    - GITLAB_EMAIL=notifications@example.com
    - GITLAB_EMAIL_REPLY_TO=noreply@example.com
    - GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com

    - GITLAB_BACKUP_SCHEDULE=daily
    - GITLAB_BACKUP_TIME=01:00

    - SMTP_ENABLED=false
    - SMTP_DOMAIN=www.example.com
    - SMTP_HOST=smtp.gmail.com
    - SMTP_PORT=587
    - SMTP_USER=mailer@example.com
    - SMTP_PASS=password
    - SMTP_STARTTLS=true
    - SMTP_AUTHENTICATION=login

    - IMAP_ENABLED=false
    - IMAP_HOST=imap.gmail.com
    - IMAP_PORT=993
    - IMAP_USER=mailer@example.com
    - IMAP_PASS=password
    - IMAP_SSL=true
    - IMAP_STARTTLS=false

    - OAUTH_ENABLED=false
    - OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=
    - OAUTH_ALLOW_SSO=
    - OAUTH_BLOCK_AUTO_CREATED_USERS=true
    - OAUTH_AUTO_LINK_LDAP_USER=false
    - OAUTH_AUTO_LINK_SAML_USER=false
    - OAUTH_EXTERNAL_PROVIDERS=

    - OAUTH_CAS3_LABEL=cas3
    - OAUTH_CAS3_SERVER=
    - OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false
    - OAUTH_CAS3_LOGIN_URL=/cas/login
    - OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate
    - OAUTH_CAS3_LOGOUT_URL=/cas/logout

    - OAUTH_GOOGLE_API_KEY=
    - OAUTH_GOOGLE_APP_SECRET=
    - OAUTH_GOOGLE_RESTRICT_DOMAIN=

    - OAUTH_FACEBOOK_API_KEY=
    - OAUTH_FACEBOOK_APP_SECRET=

    - OAUTH_TWITTER_API_KEY=
    - OAUTH_TWITTER_APP_SECRET=

    - OAUTH_GITHUB_API_KEY=
    - OAUTH_GITHUB_APP_SECRET=
    - OAUTH_GITHUB_URL=
    - OAUTH_GITHUB_VERIFY_SSL=

    - OAUTH_GITLAB_API_KEY=
    - OAUTH_GITLAB_APP_SECRET=

    - OAUTH_BITBUCKET_API_KEY=
    - OAUTH_BITBUCKET_APP_SECRET=

    - OAUTH_SAML_ASSERTION_CONSUMER_SERVICE_URL=
    - OAUTH_SAML_IDP_CERT_FINGERPRINT=
    - OAUTH_SAML_IDP_SSO_TARGET_URL=
    - OAUTH_SAML_ISSUER=
    - OAUTH_SAML_LABEL="Our SAML Provider"
    - OAUTH_SAML_NAME_IDENTIFIER_FORMAT=urn:oasis:names:tc:SAML:2.0:nameid-format:transient
    - OAUTH_SAML_GROUPS_ATTRIBUTE=
    - OAUTH_SAML_EXTERNAL_GROUPS=
    - OAUTH_SAML_ATTRIBUTE_STATEMENTS_EMAIL=
    - OAUTH_SAML_ATTRIBUTE_STATEMENTS_NAME=
    - OAUTH_SAML_ATTRIBUTE_STATEMENTS_FIRST_NAME=
    - OAUTH_SAML_ATTRIBUTE_STATEMENTS_LAST_NAME=

    - OAUTH_CROWD_SERVER_URL=
    - OAUTH_CROWD_APP_NAME=
    - OAUTH_CROWD_APP_PASSWORD=

    - OAUTH_AUTH0_CLIENT_ID=
    - OAUTH_AUTH0_CLIENT_SECRET=
    - OAUTH_AUTH0_DOMAIN=

    - OAUTH_AZURE_API_KEY=
    - OAUTH_AZURE_API_SECRET=
    - OAUTH_AZURE_TENANT_ID=
```
  
### 3、执行命令

```sh
  docker-compose up -d
```

### 4、gitlab迁移

#### Creating backups

GitLab defines a rake task to take a backup of your gitlab installation. The backup consists of all git repositories, uploaded files and as you might expect, the sql database.

Before taking a backup make sure the container is stopped and removed to avoid container name conflicts.
```sh
docker stop gitlab && docker rm gitlab
```
Execute the rake task to create a backup.
```sh
docker run --name gitlab -it --rm [OPTIONS] \
    sameersbn/gitlab:9.4.3 app:rake gitlab:backup:create
```
A backup will be created in the backups folder of the Data Store. You can change the location of the backups using the GITLAB_BACKUP_DIR configuration parameter.

P.S. Backups can also be generated on a running instance using docker exec as described in the Rake Tasks section. However, to avoid undesired side-effects, I advice against running backup and restore operations on a running instance.

When using docker-compose you may use the following command to execute the backup.
```sh
docker-compose run --rm gitlab app:rake gitlab:backup:create
```

#### Restoring Backups

GitLab also defines a rake task to restore a backup.

Before performing a restore make sure the container is stopped and removed to avoid container name conflicts.
```sh
docker stop gitlab && docker rm gitlab
```
If this is a fresh database that you're doing the restore on, first you need to prepare the database:
```sh
docker run --name gitlab -it --rm [OPTIONS] \
    sameersbn/gitlab:9.4.3 app:rake db:setup
```
Execute the rake task to restore a backup. Make sure you run the container in interactive mode -it.
```sh
docker run --name gitlab -it --rm [OPTIONS] \
    sameersbn/gitlab:9.4.3 app:rake gitlab:backup:restore
```
The list of all available backups will be displayed in reverse chronological order. Select the backup you want to restore and continue.

To avoid user interaction in the restore operation, specify the timestamp of the backup using the BACKUP argument to the rake task.
```sh
docker run --name gitlab -it --rm [OPTIONS] \
    sameersbn/gitlab:9.4.3 app:rake gitlab:backup:restore BACKUP=1417624827
```
When using docker-compose you may use the following command to execute the restore.
```sh
docker-compose run --rm gitlab app:rake gitlab:backup:restore # List available backups
docker-compose run --rm gitlab app:rake gitlab:backup:restore BACKUP=1417624827 # Choose to restore from 1417624827
```


### 5、迁移升级：

Note: Since GitLab **8.0.0** you need to provide the **GITLAB_SECRETS_DB_KEY_BASE** parameter while starting the image.  
Note: Since GitLab **8.11.0** you need to provide the **GITLAB_SECRETS_SECRET_KEY_BASE** and **GITLAB_SECRETS_OTP_KEY_BASE**

GITLAB_SECRETS_DB_KEY_BASE GITLAB_SECRETS_SECRET_KEY_BASE GITLAB_SECRETS_OTP_KEY_BASE 由`pwgen -Bsv1 64`生成

升级的gitlab配置GITLAB_SECRETS_DB_KEY_BASE必须与原gitlab配置相同；

如果只是升级可以在原地升级，修改docker-compose.yml时只需修改sameersbn/gitlab:9.4.3后面的版本即可，需要注意的是不能直接跨版本升级，如：8.2.0升级到11.0.1，应该从8.2.0到9.x.x,10.x.x，最后到11.0.1；

如果是迁移升级，需要在目标服务器先将源服务器上gitlab运行起来(gitlab版本必须相同)按照上述方式备份、恢复数据，然后可以按照原地升级方法继续在目标服务器上升级；


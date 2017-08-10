
1、安装docker，docker-compose

 * [ubuntu 14.04](https://github.com/benxiaohai1212/sources/blob/master/ubuntu/install-docker.md)
 
 * [centos 7](https://github.com/benxiaohai1212/sources/blob/master/CentOS/install-docker.md)

2、编辑docker-compose.yml文件

mysql:
  
  ```xml
version: '2'

services:
  redis:
    container_name: redis
    restart: always
    image: sameersbn/redis:latest
    command:
    - --loglevel warning
    volumes:
    - /opt/docker/gitlab/redis:/var/lib/redis:Z

  mysql:
    container_name: mysql
    restart: always
    image: sameersbn/mysql:latest
    volumes:
    - /opt/docker/gitlab/mysql:/var/lib/mysql:Z
    environment:
    - DB_USER=gitlab
    - DB_PASS=1q2w3e4r
    - DB_NAME=gitlabhq_production

  gitlab:
    container_name: gitlab
    restart: always
    image: sameersbn/gitlab:8.14.5
    depends_on:
    - redis
    - mysql
    ports:
    - "80:80"
    - "2222:22"
    - "8443:443"
    volumes:
    - /opt/docker/gitlab/gitlab:/home/git/data:Z
    environment:
    - DEBUG=1

    - DB_USER=gitlab
    - DB_PASS=1q2w3e4r
    - DB_NAME=gitlabhq_production

    - TZ=Asia/Shanghai
    - GITLAB_TIMEZONE=Shanghai

    - GITLAB_HTTPS=false
    - SSL_SELF_SIGNED=false

    - GITLAB_HOST=gitlab.wjw.com
    - GITLAB_PORT=80
    - GITLAB_SSH_PORT=22
    - GITLAB_SECRETS_DB_KEY_BASE=4tKKsH9fHpVrLxFgL3C4mngvjvbbfVbPsdhRzHgP4RjmJwgF9KwCPgcLVjJbfWn3

    - GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
    - GITLAB_NOTIFY_PUSHER=false

    # - GITLAB_EMAIL=xxx@xxx.com
    # - GITLAB_EMAIL_REPLY_TO=xxx@xxx.com
    # - GITLAB_INCOMING_EMAIL_ADDRESS=xxx@xxx.com

    - GITLAB_BACKUP_SCHEDULE=daily
    - GITLAB_BACKUP_TIME=01:00
    
    - NGINX_MAX_UPLOAD_SIZE=100m
    - UNICORN_TIMEOUT=120

    # - SMTP_ENABLED=true
    # - SMTP_DOMAIN=mail.xxx.com
    # - SMTP_HOST=smtp.xxx.com
    # - SMTP_PORT=25
    # - SMTP_USER=xxx@xxx.com
    # - SMTP_PASS=xxx@
    # - SMTP_STARTTLS=true
    # - SMTP_AUTHENTICATION=login
    links:
    - mysql:mysql
    - redis:redisio
  ```
  
postgresql:
  
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
  
3、执行命令

```sh
  docker-compose up -d
```

4、gitlab迁移

Creating backups

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

Restoring Backups

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

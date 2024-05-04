FROM ubuntu:14.04
MAINTAINER Zliqiang <benxiaohai1212@163.com>

RUN set -x \
    && sed 's/archive/cn.archive/' -i /etc/apt/sources.list \
    && apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get autoclean \
    && apt-get --purge -y autoremove \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

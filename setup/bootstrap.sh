#!/usr/bin/env bash

#links the web directory to /var/www
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant/www /var/www
fi

#mariadb
apt-get install software-properties-common
apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
add-apt-repository 'deb http://mirrors.accretive-networks.net/mariadb/repo/10.0/ubuntu trusty main'

apt-get -y update

apt-get install -y curl
curl -sL https://deb.nodesource.com/setup | sudo bash -

apt-get install -y python2.7
apt-get install -y python-pip
apt-get install -y nodejs
apt-get install -y mariadb-server

#Python and pip packages
pip install flask
pip install Flask-RESTful
pip install Flask-SQLAlchemy
pip install psycopg2
pip install flask-migrate
pip install flask-restless


#NodeJS and packages
npm cache clean -f

cd /vagrant
npm install

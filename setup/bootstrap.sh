#!/usr/bin/env bash

#links the web directory to /var/www
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant/www /var/www
fi

#mariadb
export DEBIAN_FRONTEND=noninteractive
sudo debconf-set-selections <<< 'mariadb-server-10.0 mysql-server/root_password password PASS'
sudo debconf-set-selections <<< 'mariadb-server-10.0 mysql-server/root_password_again password PASS'
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

#allows remote connections
sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/my.cnf
mysql -uroot -pPASS < /vagrant/setup/root.sql
service mysql restart

cd /vagrant
npm install

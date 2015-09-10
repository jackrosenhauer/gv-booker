#!/usr/bin/env bash

#links the web directory to /var/www
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant/www /var/www
fi

apt-get install -y curl
curl -sL https://deb.nodesource.com/setup | sudo bash -

apt-get -y update

apt-get install -y python2.7
apt-get install -y python-pip
apt-get install -y nodejs

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

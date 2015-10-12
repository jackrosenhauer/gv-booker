// localStorage["gv-booker"] = {}
// var booker = localStorage["gv-booker"]
// booker["rooms"] = [];
// booker["reservations"] = [];
// booker["users"] = [];

(function(window){
  'use strict';

  function Model(name){
    this.name = name;
    if (!localStorage[name]){
      var data = {
        "users": [],
        "rooms": [],
        "reservations": [],
        "permissions": {
          "user": 0,
          "admin": 1
        },
        "sessions": {},
        "sessionSeed": 0
      };

      localStorage[this.name] = JSON.stringify(data);
      this.storage = data;
    }else{
      //we already have local storage
      this.storage = JSON.parse(localStorage[name]);
    }
    window.storage = this.storage;
  }

  Model.prototype.getUser = function(username){
    var self = this;
    //var user = this.storage["users"][username];
    if (typeof self.storage["users"][username] === "undefined"){
      return false;
    }else{
      return user;
    }
  }

  Model.prototype.createUser = function(username, password, email){
    var self = this;
    var user = {"username": username, "password": password, "email": email};
    this.storage["users"].push(user);
    this.saveState();
    return user;
  };

  Model.prototype.createRoom = function(){

  };

  Model.prototype.createReservation = function(){

  };

  Model.prototype.read = function(){

  };

  Model.prototype.update = function(){

  };

  Model.prototype.remove = function(){

  };

  Model.prototype.removeAll = function(){

  };

  Model.prototype.getSession = function(){

  };

  Model.prototype.createSession = function(){

  };

  Model.prototype.saveState = function(){
    var self = this;
    localStorage[this.name] = JSON.stringify(this.storage);
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);

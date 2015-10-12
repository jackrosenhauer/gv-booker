(function (window){
  'use strict';
  function Store(name, callback){
    callback = callback || function(){};
    this.dbName = name;
    if (!localStorage[name]){
      var data = {
        "users": [],
        "rooms": [],
        "reservations": [],
        "permissions": {
          "user": 0,
          "admin": 1
        }
      };

      localStorage[name] = JSON.stringify(data);
    }

    callback.call(this, JSON.parse(localStorage[name]));
  }

  Store.prototype.findUser = function(username){
    var self = this;
    return self.localStorage[self.dbName]["users"][username];
  };

  Store.prototype.find = function(){

  };

  Store.prototype.findAll = function(){

  };

  Store.prototype.save = function(){

  };

  Store.prototype.remove = function(){

  };

  Store.prototype.drop = function(){

  };

  window.app = window.app || {};
  window.app.Store = Store;
})(window);

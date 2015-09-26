(function (window){
  'use strict';
  function Store(name, callback){
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

    callback.call(this, JSOn.parse(localStorage[name]));
  }

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

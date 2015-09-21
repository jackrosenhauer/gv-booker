(function (window){
  'use strict';
  function Store(name, callback){
    this.dbName = name;
    if (!localStorage[name]){
      var data = {
        "users": [],
        "rooms": [],
        "reservations": []
      }
      localStorage[name] = JSON.stringify(data);
    }

    callback.call(this, JSOn.parse(localStorage[name]));
  }

  Store.prototype.find(){

  }

  Store.prototype.findAll(){

  }

  Store.prototype.save(){

  }

  Store.prototype.remove(){

  }

  Store.prototype.drop(){

  }

  window.app = window.app || {};
  window.app.Store = Store;
})(window)

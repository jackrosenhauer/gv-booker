(function(window){
  'use strict';

  function Controller(model, view){
    var self = this;
    self.model = model;
    self.view = view;
    self.currentDate = new Date();

    self.view.bind('login', function(){
      // self.setView("#login");
      // window.location.hash = "#login";
    });

    self.view.bind('default', function(){
      // window.location.hash = ""
    })

  }

  Controller.prototype.createUser = function(data){
    var self = this;

    if (data["username"] && data["password"]){

    }else{

    }

  }

  Controller.prototype.createRoom = function(data){

  }

  Controller.prototype.createReservation = function(data){

  }

  Controller.prototype.setView = function(hash){
    var self = this;
    hash = hash.split("/")[1];
    console.log("(controller) setView => '" + hash + "'");
    switch (hash){
      case '#login':
        // window.location.hash = "#/login"
        self.view.render("login");
        // window.location.hash = "#/login"
        break;

      default:
        console.log("hash: '" + hash + "'");
        self.view.render("month", new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), 1));
        console.log("(controller) setView -> default");
    }
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

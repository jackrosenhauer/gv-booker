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
  //User functions
  Controller.prototype.userRegistration = function(username, password, email){
    var self = this;

    if (username && password && email){

    }else{

    }
  }

  Controller.prototype.userLogin = function(username, password){

  }

  //Reservation functions
  Controller.prototype.userCreateReservation = function(date, user, startTime, endTime){

  }

  Controller.prototype.userVoidReservation = function(date, user, startTime){

  }

  Controller.prototype.extendReservation = function(date, user, startTime, endTime){

  }

  //Admin functions
  Controller.prototype.adminCreateRoom = function(data){

  }

  Controller.prototype.adminUpdateRoomInfo = function(){

  }

  Controller.prototype.adminCreateReservation = function(data){

  }

  Controller.prototype.adminVoidReservation = function(){

  }

  Controller.prototype.adminCreateUser = function(){

  }

  Controller.prototype.adminRemoveUser = function(){

  }

  //View functions
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
        // self.view.render("month", new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), 1));
        console.log("(controller) setView -> default");
    }
  }

  Controller.prototype.test = function(){
    return "do you see this";
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

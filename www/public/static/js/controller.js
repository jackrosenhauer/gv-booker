(function(window){
  'use strict';

  function Controller(model, view){
    this.model = model;
    this.view = view;
    this.currentDate = new Date();
    var self = this;

    this.view.bind('login', function(){
      // self.setView("#login");
      // window.location.hash = "#login";
    });

    // self.view.bind('default', function(){
    //   // window.location.hash = ""
    // })

    this.view.bind('reg', function(){
      window.location.hash = "#register"
    })

    this.view.bind('reg-submit', function(username, password, email){
      self.userRegistration(username, password, email);
    });

    this.currentSession;

  }
  //User functions
  Controller.prototype.userRegistration = function(username, password, email){
    var self = this;
    console.log("user reg: " + username + ", password: " + password + ", email: " + email);
    if (validator.username(username) && validator.password(password) && validator.email(email)){
      //check if username exists in the model
      //if false, create user else return false
      if (!self.model.getUser(username)){
        self.model.createUser(username, password, email);
        self.setView("#registration-success");
        return true;
      }
    }
    self.setView("#registration-failed");
    return false;
  }

  Controller.prototype.userLogin = function(username, password){
    var self = this;
    if (validator.username(username) && validator.password(password)){
      var user = self.model.getUser(username);
      if (user){
        if( user.username === username && user.password === password){
          //successful login
          self.setview("#login-success");
          return true;
        }
      }
    }
    self.setView("#login-failed");
    return false;
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
    console.log("hash: " + hash);
    if (hash.indexOf("/") !== -1){
      hash = hash.split("/")[1];
    }
    // hash = hash.split("/")[1];
    switch (hash){
      case '#login':
        // window.location.hash = "#/login"
        self.view.render("login");
        break;
      case '#login-success':
        console.log("setView #login-success");
        break;
      case "#registration-failed":
        self.view.render("registration-failed");
        break;
      case '#login-failed':
        console.log("setView #login-failed");
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

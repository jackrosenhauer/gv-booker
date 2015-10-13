(function(window){
  "use strict";

  function Controller(model, view){
    this.model = model;
    this.view = view;
    this.currentDate = new Date();
    var self = this;

    this.view.bind("login", function(username, password){
      self.userLogin(username, password);
    });

    this.view.bind("logout", function(){
      self.userLogout();
      self.setView("#default");
    });

    this.view.bind("reg", function(){
      window.location.hash = "#register";
    });

    this.view.bind("reg-submit", function(username, password, email){
      self.userRegistration(username, password, email);
    });

    this.currentUser;

  }
  //User functions
  Controller.prototype.userRegistration = function(username, password, email){
    var self = this;

    if (validator.username(username) && validator.password(password) && validator.email(email)){
      // console.log('valid inputs');
      //check if username exists in the model
      //if false, create user else return false
      if (!self.model.getUser(username)){
        self.model.createUser(username, password, email);
        self.setView("#registration-success");
        // console.log("reg success");
        return true;
      }

      // console.log ("valid inputs");
    }
    // console.log('reg failure');
    self.setView("#registration-failed");
    return false;
  }

  Controller.prototype.userLogin = function(username, password){
    console.log("logging in user");
    var self = this;
    if (validator.username(username) && validator.password(password)){
      console.log("login creds match validation scheme");
      var user = self.model.getUser(username);
      //console.log(user);
      if (typeof user !== "undefined"){
        if( user.username === username && user.password === password){
          //successful login
          console.log("login success");
          self.currentUser = user;
          self.setView("#login-success");

          return true;
        }
      }
    }
    // console.log("login failed");
    self.setView("#login-failed");
    return false;
  }

  Controller.prototype.userLogout = function(){
    var self = this;
    self.currentUser = undefined;
    self.setView("#default");
    //show default
  }

  //Reservation functions
  Controller.prototype.userCreateReservation = function(date, user, startTime, endTime){

  }

  Controller.prototype.userVoidReservation = function(date, user, startTime){

  }

  Controller.prototype.userExtendReservation = function(date, user, startTime, newEndTime){

  }

  //Admin functions
  Controller.prototype.adminCreateRoom = function(roomInfo){
    var self = this;
    if (typeof roomInfo === "undefined"){
      return false;
    }
    //roomInfo is undefined
    // if (!!roomInfo){ console.log("roomInfo is undefiend"); return false }

    if (self.isAdmin(self.currentUser)){
      if (!roomInfo["building"] || (roomInfo["building"] === undefined) || (roomInfo["building"].length === 0)){
        //invalid building
        //console.log("invalid building");
        return false;
      }else if (!roomInfo["roomNumber"] || (roomInfo["roomNumber"] === undefined) || (roomInfo["roomNumber"].length === 0)){
        //invalid roomNumber
        //console.log("invalid roomNumber");
        return false;
      }else if (!roomInfo["seating"] || (roomInfo["seating"] === undefined) || (roomInfo["seating"].length === 0)){
        //invalid seating
        //console.log("invalid seating");
        return false;
      }else{

        roomInfo["whiteboard"] = roomInfo["whiteboard"] || false;
        roomInfo["polycom"] = roomInfo["polycom"] || false;
        roomInfo["tv"] = roomInfo["tv"] || false;
        roomInfo["webcam"] = roomInfo["webcam"] || false;

        return self.model.createRoom(roomInfo["building"], roomInfo["roomNumber"], roomInfo["seating"], roomInfo["whiteboard"], roomInfo["polycom"], roomInfo["tv"], roomInfo["webcam"]);
      }

    }else{
      //return "You don't have admin privs, sorry";
      return false;
    }
    return false;
  }

  Controller.prototype.adminUpdateRoomInfo = function(building, roomNumber){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }
    //user is not admin
    return false;
  }

  Controller.prototype.adminCreateReservation = function(username, password, email){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }
    //user is not admin
    return false;
  }

  Controller.prototype.adminVoidReservation = function(){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }

    //user is not admin
    return false;
  }

  Controller.prototype.adminCreateUser = function(username, password, email){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      console.log("Im an admin!");
      return self.userRegistration(username, password, email);
    }
    console.log("not an admin");
    //user is not admin
    return false;
  }

  Controller.prototype.adminRemoveUser = function(username){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //do stuff
      return self.model.deleteUser(username);

    }
    //user is not admin
    return false;
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
        window.location.hash = "#login-success";
        self.view.render("login-success", {"currentUser" : self.currentUser});
        break;
      case "#registration-failed":
        self.view.render("registration-failed");
        window.location.hash = "#registration-failed";
        break;
      case '#login-failed':
        console.log("setView #login-failed");
        window.location.hash = "#login-failed";
        self.view.render("login-failed");
        break;
        case "#registration-success":
          window.location.hash = "#registration-success";
          self.view.render("registration-success");
          break;
      default:
        console.log("hash: '" + hash + "'");
        // self.view.render("month", new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), 1));
        console.log("(controller) setView -> default");
        window.location.hash = "#default";
        self.view.render("default");
    }
  }


  //return true for now until we figure out user permissions
  Controller.prototype.isAdmin = function(user){
    console.log("I'm an admiN!");
    return true;
  };

  Controller.prototype.test = function(){
    return "do you see this";
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

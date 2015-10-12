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

  Model.prototype.deleteUser = function(username){
    var self = this;
    if (self.getUser(username)){
      delete self.storage["users"][username];
      console.log("deleteing user");
      return true;
    }else{
      console.log("user does not exist123");
      return false;
    }
  }

  Model.prototype.getUser = function(username){
    var self = this;
    console.log("getting user");
    //var user = this.storage["users"][username];
    if (typeof self.storage["users"][username] !== "undefined"){
      return self.storage["users"][username];
    }

    console.log("user does not exist321");
    return false;
  }

  Model.prototype.createUser = function(username, password, email){
    var self = this;
    var user = {"username": username, "password": password, "email": email};
    this.storage["users"][username] = user;
    // this.storage["users"].push(user);
    this.saveState();
    return this.storage["users"][username];
  };


  //building, roomNumber and seating are all required (and are used as a primary key)
  //whiteboard, polycom, tv and webcam are optional and if not provided
  Model.prototype.createRoom = function(building, roomNumber, seating, whiteboard, polycom, tv, webcam){
    var self = this;
    var key = building + roomNumber;

    //create a room object for storage and checking
    var room = {
      "building": building,
      "roomNumber": roomNumber,
      "seating": seating,
      "whiteboard": whiteboard,
      "polycom": polycom,
      "tv": tv,
      "webcam": webcam
    };

    if (self.storage["rooms"][key]){
      //room already exists
      return false;
    }else{
      //store it
      self.storage["rooms"][key] = room;
    }

    //created the room
    self.saveState();
    return true;
    //or we could return the room object to the Controller -> View
    // return room;
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

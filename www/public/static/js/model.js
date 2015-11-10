(function(window){
  "use strict";

  /**
   *
   * @param name - name of our store (we can possibly have multiple stores with different names)
   * @constructor - creates our storage data object (this.storage), builds its structure and then saves to localStorage
     */
  function Model(name){
    var self = this;
    self.name = name;
    if (!localStorage[name]){
      var storage = {
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

      localStorage[self.name] = JSON.stringify(storage);
      self.storage = storage;
    }else{
      //we already have local storage
      self.storage = JSON.parse(localStorage[name]);
    }
    window.storage = self.storage;
  }

  /**
   * Deletes a user from our storage object and saves it to localStorage
   * @param username - Username of the user to delete
   * @returns {boolean} - Returns true if the user is deleted, false otherwise
     */
  Model.prototype.deleteUser = function(username){
    var self = this;
    if (self.getUser(username)){
      delete self.storage["users"][username];
      console.log("deleteing user");
      return true;
    }else{
      return false;
    }
  };

  /**
   * Gets a user from our storage object
   * @param username - Username to retrieve
   * @returns {*} - Returns a user, false otherwise
     */
  Model.prototype.getUser = function(username){
    var self = this;
    if (typeof self.storage["users"][username] !== "undefined"){
      return self.storage["users"][username];
    }
    return false;
  };

  /**
   * Creates a user to our storage object and saves it to localStorage
   * @param username - Username of the new user
   * @param password - Password of the new user
   * @param email - Email of the new user
   * @returns {*} - Returns the user with the user created, false otherwise
     */
  Model.prototype.createUser = function(username, password, email, permissions){
    var self = this;
    //checks if user exists

    if (self.getUser(username)) return "username already exists";

    var user = {
      "username": username,
      "password": password,
       "email": email,
       "permissions": permissions
    };

    self.storage["users"][username] = user;
    self.saveState();
    return self.storage["users"][username];
  };


  //building, roomNumber and seating are all required (and are used as a primary key)
  //whiteboard, polycom, tv and webcam are optional and if not provided

  /**
   * Creates a room in our storage object and saves it to localStorage
   * @param building - Building number of the room to be created
   * @param roomNumber - roomNumber of the room to be created
   * @param seating - seating of the room to be created
   * @param whiteboard - true/false if the room has a whiteboard
   * @param polycom - true/false if the room has a phone
   * @param tv - true/false if the room has a tv
   * @param webcam - true/false if the room has a webcam
     * @returns {boolean} returns true if the room is created, false otherwise
     */
  Model.prototype.createRoom = function(building, roomNumber, seating, whiteboard, polycom, tv, webcam){
    var self = this;
    var key = building + roomNumber;

    //default to false
    whiteboard = whiteboard || false;
    polycom = polycom || false;
    tv = tv || false;
    webcam = webcam || false;

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
      return "room already exists";
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

  Model.prototype.getReservation = function(roomkey, startTime){
    var self  = this;
    return self.storage["reservations"][startTime.getFullYear()][startTime.getMonth()][startTime.getDay()][roomkey][d.getHours() + "" + d.getMinutes()];
  }

  //creates a reservation into our storage and save it
  Model.prototype.createReservation = function(roomkey, user, startTime, endTime){
    var self = this;

    //if the room exists, return an error
    if (self.getReservation(roomkey, startTime)) return;

    var reservation = {
      "roomkey": roomkey,
      "startTime": startTime,
      "endTime": endTime,
      "user": user
    };

    self.storage["reservations"][startTime.getFullYear()][startTime.getMonth()][startTime.getDay()][roomkey][d.getHours() + "" + d.getMinutes()] = reservation;
    self.saveState();
    return reservation;
  };

  /**
   * Will eventually remove all of a type ("user", "rooms") or something
   */
  Model.prototype.removeAll = function(key){
    var self = this;
    if (key !== "permissions"){
      if (Array.isArray(self.storage[key])){
        self.storage[key] = [];
      }else{
        self.storage[key] = {};
      }
    }
  };

  /**
   * Will get a session from the db
   */
  Model.prototype.getSession = function(sessionID){
    var self = this;
    return self.storage["sessions"][sessionID];
  };

  /**
   * Will eventually create a backend(in python) that uses sessionids
   */
  Model.prototype.createSession = function(userID){
    var self = this;
    var d = new Date();
    var sessionID = self.storage["sessionSeed"];

    var session = {
      "sessionID": sessionID,
      "userID": userID,
      "createdTime": d
    };

    self.storage["sessionSeed"] = self.storage["sessionSeed"]++;
    self.storage["sessions"][userID] = session;
    self.saveState();
    return sessionID;
  };

  Model.prototype.getPermissions = function(){
    var self = this;
    return self.storage["permissions"];
  }

  Model.prototype.addPermission = function(id, bitmask){
    var self = this;
  }

  /**
   * Saves our storage object to localStorage
   */
  Model.prototype.saveState = function(){
    var self = this;
    localStorage[self.name] = JSON.stringify(self.storage);
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);

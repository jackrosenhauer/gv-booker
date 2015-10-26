(function(window){
  'use strict';

  /**
   *
   * @param name - name of our store (we can possibly have multiple stores with different names)
   * @constructor - creates our storage data object (this.storage), builds its structure and then saves to localStorage
     */
  function Model(name){
    this.name = name;
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

      localStorage[this.name] = JSON.stringify(storage);
      this.storage = storage;
    }else{
      //we already have local storage
      this.storage = JSON.parse(localStorage[name]);
    }
    window.storage = this.storage;
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
      //console.log("deleteing user");
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

  //creates a reservation into our storage and save it
  Model.prototype.createReservation = function(){

  };

  Model.prototype.read = function(){

  };

  Model.prototype.update = function(){

  };

  /*
  Will Eventually remove a single object
   */
  Model.prototype.remove = function(){

  };

  /**
   * Will eventually remove all of a type ("user", "rooms") or something
   */
  Model.prototype.removeAll = function(){

  };

  /**
   * Will get a session from the db
   */
  Model.prototype.getSession = function(){

  };

  /**
   * Will eventually create a backend(in python) that uses sessionids
   */
  Model.prototype.createSession = function(){

  };

  /**
   * Saves our storage object to localStorage
   */
  Model.prototype.saveState = function(){
    var self = this;
    localStorage[this.name] = JSON.stringify(this.storage);
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);

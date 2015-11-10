(function(window){
  "use strict";

  /**
   * Main constructor
   * @param model - model for the controller (holds our data)
   * @param view - view for the controller (controls what the user sees)
   * @constructor - Also binds our views callbacks
     */
  function Controller(model, view){
    var self = this;
    this.model = model;
    this.view = view;
    this.currentDate = new Date();

    this.currentUser;

    this.view.bind("nav", this.navHandler);

    this.view.bind("filter", this.filterHandler);

    this.view.bind("body", this.bodyHandler);





    // this.view.bind("login", function(username, password){
    //   self.userLogin(username, password);
    // });
    //
    // this.view.bind("logout", function(){
    //   self.userLogout();
    //   self.setView("#default");
    // });
    //
    // this.view.bind("reg", function(){
    //   window.location.hash = "#register";
    // });
    //
    // this.view.bind("reg-submit", function(username, password, email){
    //   self.userRegistration(username, password, email);
    // });

    this.defaultStartTime = {
      "hours": 8,
      "minutes": 0
    };
    this.defaultEndTime = {
      "hours": 23,
      "minutes": 0
    };
  }

  Controller.prototype.navHandler = function(event){
    var target = event.target;
    var id = target.id;
    var classes = target.className;
    switch (id){
      case "login":

        console.log(id);
        break;
      case "register":
        console.log(id);
        break;
      case "nav":
        console.log(id);
        break;
      default:
        //do nothing
        break;
    }
  };

  Controller.prototype.filterHandler = function(event){
    var type = event.type, target = event.target, id = target.id, classes = target.className;
    console.log(target);
    console.log(event.target + ", " + type + ", id: " + id);
    if (type === "keyup"){
      switch (id){
        case "seating-number-selection":
          break;
        default:
          //console.log("uncaught filter handler.. type:" + type + ", id: " + id);
      }
    }else if (type === "click"){
      switch (id){
        case "whiteboard-selection":
          break;
        case "phone-selection":
          break;
        case "tv-selection":
          break;
        case "webcam-selection":
          break;
        default:
          //console.log("uncaught filter handler.. type:" + type + ", id: " + id);
      }
    }else{
      //do nothing

      console.log("uncaught filter handler.. type:" + type + ", id: " + id);
    }
  };

  Controller.prototype.bodyHandler = function(event){

  };

  Controller.prototype.useTemplate = function(){

  };

  //User functions
  /**
   * Registers a user with a username, pasword and email
   * @param username - Username of the user being registered
   * @param password - Password of the user being registered
   * @param email - Email of the user being registered
   * @returns {boolean} - Returns true if the user was successfully registered, false otherwise
     */
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
  };

  /**
   * Logs in a user with a supplied username/password
   * @param username - Username to login with
   * @param password - Password for the username
   * @returns {boolean} - Returns true if successfully logged in, false otherwise
     */
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
  };

  /**
   * Logs out the current user and resets the view to default
   */
  Controller.prototype.userLogout = function(){
    var self = this;
    self.currentUser = undefined;
    self.setView("#default");
    //show default
  };

  //Reservation functions
  Controller.prototype.userCreateReservation = function(date, user, startTime, endTime){

  };

  Controller.prototype.userVoidReservation = function(date, user, startTime){

  };

  Controller.prototype.userExtendReservation = function(date, user, startTime, newEndTime){

  };

  //Admin functions

  /**
   * As admin, creates a room
   * @param roomInfo - Contains the rooms building, room number, seating and optional params such as tv, whiteboard, polycom or webcam
   * @returns {boolean} - returns true if the room was created, false otherwise
     */
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

    }

    //return "You don't have admin privs, sorry";
    return false;
  };

  /**
   * As admin, changes the room information (will eventually include tv, whiteboard, etc)
   * @param building - Building that the room is in
   * @param roomNumber - Room number
   * @returns {boolean} - Returns true if the room was updated, false otherwise
     */
  Controller.prototype.adminUpdateRoomInfo = function(building, roomNumber){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }
    //user is not admin
    return false;
  };


  /**
   * As admin, creates a reservation
   * @param username - Username to create the reservation under
   * @param building - Building that the reservation is fore
   * @param roomNumber - Room number of the reservation
   * @param startTime - Start time of the reservation
   * @param endTime - Ending time of the reservation
     * @returns {boolean}
     */
  Controller.prototype.adminCreateReservation = function(username, building, roomNumber, startTime, endTime){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }
    //user is not admin
    return false;
  };

  /**
   * As admin, void a reservation and free the slot
   * @returns {boolean} - returns true if the reservation with voided, false otherwise
     */
  Controller.prototype.adminVoidReservation = function(){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //admin stuff
    }

    //user is not admin
    return false;
  };

  /**
   * As admin, creates a user with a specified username, password and email
   * @param username - New user username
   * @param password - New user password
   * @param email - New User email
   * @returns {boolean} - Returns true if the user was created, false otherwise
     */
  Controller.prototype.adminCreateUser = function(username, password, email){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      console.log("Im an admin!");
      return self.userRegistration(username, password, email);
    }
    console.log("not an admin");
    //user is not admin
    return false;
  };

  /**
   * As admin, remove a user
   * @param username - Username to remove
   * @returns {boolean} - returns true if use is removed, false is failure occurs
     */
  Controller.prototype.adminRemoveUser = function(username){
    var self = this;
    if (self.isAdmin(self.currentuser)){
      //do stuff
      return self.model.deleteUser(username);

    }
    //user is not admin
    return false;
  };

  //View functions

  /**
   * Tells the view to change views depending what the hash is
   * @param hash - window.location.hash or hash to switch view to
     */
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
        self.view.render("day");
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
  };

  //return true for now until we figure out user permissions
  /**
   * Returns true if the current user is an admin
   * @returns {boolean}
     */
  Controller.prototype.isAdmin = function(){
    console.log("I'm an admiN!");
    return true;
  };

  /**
   * Test function
   * @returns {string}
     */
  Controller.prototype.test = function(){
    return "do you see this";
  };

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

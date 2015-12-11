var model = (function (window) {
    "use strict";

    /**
     *
     * @param name - name of our store (we can possibly have multiple stores with different names)
     * @constructor - creates our storage data object (this.storage), builds its structure and then saves to localStorage
     */
    function Model(name) {
        this.name = name;
        var storage;
        if (!localStorage[name]) {
            storage = {
                "users": {
                    ids: [],
                    userList: {}
                },
                "rooms": {
                    ids: [],
                    roomList: {}
                },
                "reservations": {
                    ids: [],
                    reservationList: {}
                },
                "permissions": {
                    "user": 0,
                    "admin": 1
                },
                "sessions": [],
                "sessionSeed": 0
            };

            window.localStorage[this.name] = JSON.stringify(storage);
            this.save();
            this.storage = storage;
        } else {
            //we already have local storage
            storage = JSON.parse(localStorage[name]);
        }

        this.storage = storage;
        //window.storage = this.storage;
    }


    /**
     * Gets a user from our storage object
     * @param username - Username to retrieve
     * @returns {*} - Returns a user, false otherwise
     */
    Model.prototype.getUser = function (username) {
        var self = this;
        if (typeof self.storage.users.userList) {

        };
        return self.storage.users.userList[username];
    };

    /**
     * Creates a user to our storage object and saves it to localStorage
     * @param username - Username of the new user
     * @param password - Password of the new user
     * @param email - Email of the new user
     * @returns {*} - Returns the user with the user created, false otherwise
     */
    Model.prototype.createUser = function (username, password, email, permissions) {
        var self = this;
        var key = username;
        var newUser = {
            "username": username,
            "password": password,
            "email": email,
            "permissions": permissions
        };

        if (!self.storage.users.userList[key]){
            self.storage.users.ids.push(key);
            self.storage.users.userList[key] = newUser;
            self.save();
            return true;
        }

        console.log("user already exists: " + username);
        return false;
    };


    /**
     * Deletes a user from our storage object and saves it to localStorage
     * @param username - Username of the user to delete
     * @returns {boolean} - Returns true if the user is deleted, false otherwise
     */
    Model.prototype.deleteUser = function (username) {
        var self = this;
        if (self.storage.users.userList[username]){
            delete self.storage.users.userList[username];
            for (var i = 0, len = self.storage.users.ids.length; i < len; i++){
                if (self.storage.users.ids[i] === username){
                    self.storage.users.ids.splice(i, i + 1);
                    return true;
                }
            }
        }
        return false;
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
    Model.prototype.createRoom = function (building, roomNumber, seating, whiteboard, polycom, tv, webcam) {
        var self = this;
        var key = building + roomNumber;

        //create a new room object for storage
        var newRoomObj = {
            "key": building + roomNumber,
            "building": building,
            "roomNumber": roomNumber,
            "seating": seating,
            "whiteboard": whiteboard,
            "polycom": polycom,
            "tv": tv,
            "webcam": webcam
        };


        //created the room and it does not exist, now we save it
        if (!self.storage.rooms.roomList[key]) {
            self.storage.rooms.ids.push(key);
            self.storage.rooms.roomList[key] = newRoomObj;
            self.save();
            return true;
        }

        console.log("room already exists: " + key);
        return false;
    };
    //returns true if a room has been deleted, false otherwise
    //no ui yet
    Model.prototype.deleteRoom = function (building, roomNumber) {
        var self = this;
        var key = building + roomNumber;
        if (self.storage.rooms.roomList[key]){
            delete self.storage.rooms.roomList[key];
            for (var i = 0, len = self.storage.rooms.ids.length; i < len; i++){
                if (self.storage.rooms.ids[i] === key){
                    self.storage.rooms.ids.splice(i, i + 1);
                    return true;
                }
            }
        }
        console.log("room does not exist: " + key);
        return false;
    };

    //creates a reservation into our storage and save it
    //startTime and endTime are date objects
    Model.prototype.createReservation = function (building, roomNumber, username, startTime, endTime) {
        var self = this;
        var room = self.getRoom(building, roomNumber);
        if (!room){
            //move to controller
            console.log("tried to create a reservation for a room that does not exist");
            return false;
        }

        var key = room.key + startTime;
        var reservation = {
            "key": key,
            "room": room,
            "user": username,
            "startTime": startTime,
            "endTime": endTime
        };

        if (!self.storage.reservations.reservationList[key]){
            self.storage.reservations.ids.push(key);
            self.storage.reservations.reservationList[key] = reservation;
            self.save();
            return reservation;
        }


        console.log("reservation already exists!!");
        return false;

    };

    Model.prototype.deleteReservation = function(building, roomNumber, startTime){
        var self = this;
        var key = building + roomNumber + startTime;

        if (self.storage.reservations.reservationList[key]){
            delete self.storage.reservations.reservationList[key];

            for (var i = 0, len = self.storage.reservations.ids.length; i < len; i++){
                if (self.storage.reservations.ids[i] === key){
                    self.storage.reservations.ids.splice(i, i + 1);
                    self.save();
                    return true;
                }
            }
        }

        console.log("reservation did not exist");
        return false;
    };


    //returns the rooms we have
    Model.prototype.getRoom = function (building, roomNumber) {
        var self = this;
        return self.storage.rooms.roomList[building + roomNumber];
    };

    Model.prototype.getRooms = function(){
        var self = this;
        var rooms = [];

        var ids = self.storage.rooms.ids;

        for (var i = 0, len = ids.length; i < len; i++){
            rooms.push(self.storage.rooms.roomList[ids[i]]);
        }

        return rooms;
    };

    Model.prototype.getReservation = function(building, roomNumber, startTime){
        var self = this;
        var key = building + roomNumber + startTime;
        return self.storage.reservations.reservationList[key];

    };

    Model.prototype.getNumberOfRooms = function(){
        var self = this;
        return self.storage.rooms.ids.length
    };

    //returns an array of all reservations
    // or
    // all reservations for rooms starting at the given time

    Model.prototype.getAllReservationsAtTime = function(startTime){
        var self = this;
        var reservations = [];

        for (var key in self.storage.reservations.reservationList){
            var reservation = self.storage.reservations.reservationList[key];
            if (reservation.startTime === startTime){
                reservations.push(reservation);
            }
        }

        //console.log("Reservations: " + reservations.length);
        return reservations;
    };


    /**
     * Will eventually remove all of a type ("user", "rooms") or something
     */
    Model.prototype.removeAll = function (key) {
        var self = this;
        if (key !== "permissions") {
            if (Array.isArray(self.storage[key])) {
                self.storage[key] = [];
            } else {
                self.storage[key] = {};
            }
        }
    };

    /**
     * Will get a session from the db
     */
    Model.prototype.getSession = function (sessionID) {
        var self = this;
        return self.storage["sessions"][sessionID];
    };

    /**
     * Will eventually create a backend(in python) that uses sessionids
     */
    Model.prototype.createSession = function (userID) {
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
        self.save();
        return sessionID;
    };

    Model.prototype.getPermissions = function () {
        var self = this;
        return self.storage["permissions"];
    };

    Model.prototype.addPermission = function (id, bitmask) {
        var self = this;
    };

    /**
     * Saves our storage object to localStorage
     */
    Model.prototype.saveState = function () {
        var self = this;
        localStorage[self.name] = JSON.stringify(self.storage);
        return true;
    };

    Model.prototype.save = Model.prototype.saveState;

    window.app = window.app || {};
    return Model;
})(window);

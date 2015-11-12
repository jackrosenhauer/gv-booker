(function (window) {
    "use strict";

    /**
     * Main constructor
     * @param model - model for the controller (holds our data)
     * @param view - view for the controller (controls what the user sees)
     * @constructor - Also binds our views callbacks
     */
    function Controller(model, view) {
        var self = this;
        this.model = model;
        this.view = view;

        this.defaultStartTime = {
            "hours": 8,
            "minutes": 0
        };
        this.defaultEndTime = {
            "hours": 23,
            "minutes": 0
        };

        var currentDate = new Date();
        currentDate.setHours(this.defaultStartTime.hours);
        currentDate.setMinutes(this.defaultStartTime.minutes);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        this.currentDate = currentDate;


        this.currentUser = null;

        view.bind("nav", function (event) {
            event.stopPropagation();
            self.navHandler(event);
        });

        view.bind("filter", function (event) {
            event.stopPropagation();
            self.filterHandler(event);
        });

        view.bind("calendar", function (event) {
            event.stopPropagation();
            self.bodyHandler(event);
        });

        var defaultStartTime = {
            "hours": 8,
            "minutes": 0
        };
        var defaultEndTime = {
            "hours": 23,
            "minutes": 0
        };

        this.months = {
            0: {
                "name": "January",
                "abbrev": "Jan",
                "numbrer": 1
            },
            1: {
                "name": "February",
                "abbrev": "Feb",
                "number": 2
            },
            2: {
                "name": "March",
                "abbrev": "Mar",
                "number": 3
            },
            3: {
                "name": "April",
                "abbrev": "Apr",
                "number": 4
            },
            4: {
                "name": "May",
                "abbrev": "May",
                "number": 5
            },
            5: {
                "name": "June",
                "abbrev": "Jun",
                "number": 6
            },
            6: {
                "name": "July",
                "abbrev": "Jul",
                "number": 7
            },
            7: {
                "name": "August",
                "abbrev": "Aug",
                "number": 8
            },
            8: {
                "name": "September",
                "abbrev": "Sep",
                "number": 9
            },
            9: {
                "name": "October",
                "abbrev": "Oct",
                "number": 10
            },
            10: {
                "name": "November",
                "abbrev": "Nov",
                "number": 11
            },
            11: {
                "name": "December",
                "abbrev": "Dec",
                "number": 12
            }
        };

        this.oneSecond = 1000;
        this.oneMinute = this.oneSecond * 60;
        this.oneHour = this.oneMinute * 60;
        this.oneDay = (this.defaultEndTime.hours * this.oneHour + this.defaultEndTime.minutes * this.oneMinute) - (this.defaultStartTime.hours * this.oneHour + this.defaultStartTime.minutes * this.oneMinute);
    }

    Controller.prototype.navHandler = function (event) {
        var self = this;
        //target is the element that was clicked, we then switch it based on its id to fire various events
        var target = event.target, id = target.id, classes = target.className;
        event.stopPropagation();
        switch (id) {
            case "login":
                //user clicked "login button"
                var login = qs("#login-username").value;
                var password = qs("#login-password").value;
                self.userLogin(login, password);
                break;
            case "register":
                //show registration
                var source = document.getElementById("register-template").text;
                var template = Handlebars.compile(source);
                var html = template();
                qs("#bar-title").innerText = "Registration Form";
                qs("#calendar-body").innerHTML = html;
                break;
            case "nav":
                //go home?
                break;
            case "logout":
                //logout
                self.currentUser = null;
                var source = document.getElementById("login-template").text;
                var template = Handlebars.compile(source);
                var html = template();
                //console.log(html);
                qs("#nav").innerHTML = html;
                break;
            default:
                //do nothing
                break;
        }
    };

    Controller.prototype.filterHandler = function (event) {
        var type = event.type, target = event.target, id = target.id, classes = target.className;
        if (type === "keyup") {
            switch (id) {
                case "seating-number-selection":
                    break;
                default:
                //console.log("uncaught filter handler.. type:" + type + ", id: " + id);
            }
        } else if (type === "click") {
            switch (id) {
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
        } else {
            //do nothing

            console.log("uncaught filter handler.. type:" + type + ", id: " + id);
        }
    };

    Controller.prototype.bodyHandler = function (event) {
        var self = this;
        //target is the element that was clicked, we then switch it based on its id to fire various events
        var target = event.target;
        while (target.id === "" && target.className === ""){
            target = target.parentNode;
        }

        var id = target.id;
        var classes = target.className;
        //console.log(classes);
        switch (id || classes) {
            case "viewDay-button":
                self.buildDayView();
                break;
            case "viewWeek-button":
                self.view.setHTML("body", self.buildWeekView());
                break;
            case "viewMonth-button":
                self.view.setHTML("body", self.buildMonthView());
                break;
            case "register-cancel":
                self.view.setHTML("body", self.buildDayView());
                break;
            case "register-clear":
                qs("#register-username").value = "";
                qs("#register-password1").value = "";
                qs("#register-password2").value = "";
                qs("#register-email").value = "";
                console.log("registration form cleared");
                break;
            case "register-submit":
                var username = qs("#register-username").value;
                var password1 = qs("#register-password1").value;
                var password2 = qs("#register-password2").value;
                var email = qs("#register-email").value;

                //default to no permissions
                var permissions = 0;

                if (password1 === password2) {
                    if (validator.username(username) && validator.password(password1) && validator.email(email)) {
                        var newUser = self.model.createUser(username, password1, email, permissions);
                    }
                } else {
                    alert("passwords do not match");
                }
                break;
            case "reservation available-reservation":
                //alert("you've reserved this room!");
                var divs = target.getElementsByTagName("div");

                var building = divs[1].innerText.split(": ")[1];
                var roomNumber = divs[2].innerText.split(": ")[1];
                var time = target.parentNode.previousSibling.innerText;
                time = time.split(":");

                var date = new Date(self.currentDate.valueOf());
                date.setHours(time[0]);
                date.setMinutes(time[1]);

                console.log(building + " " + roomNumber + " " + time.join(":") + ", " +  date.valueOf());


                //create reservation
                //update view
                break;

            case "reservation unavailable-reservation":
                console.log("unavail click");
                //alert("you've reserved this room!");
                var divs = target.getElementsByTagName("div");


                console.log(divs[0].innerText);
                //console.log(divs[1].innerText.split(": ")[1]);
                //console.log(divs[2].innerText.split(": ")[1]);
                //console.log(target.getElementsByTagName("div"));
                break;
            default:
                //do nothing
                break;
        }
    };

    //User functions
    /**
     * Registers a user with a username, pasword and email
     * @param username - Username of the user being registered
     * @param password - Password of the user being registered
     * @param email - Email of the user being registered
     * @returns {boolean} - Returns true if the user was successfully registered, false otherwise
     */
    Controller.prototype.userRegistration = function (username, password, email) {
        var self = this;

        if (validator.username(username) && validator.password(password) && validator.email(email)) {
            // console.log('valid inputs');
            //check if username exists in the model
            //if false, create user else return false
            if (!self.model.getUser(username)) {
                var permissions = 0;
                self.model.createUser(username, password, email, permissions);
                console.log("registration success");
                return true;
            }
        }
        console.log("registration failure");
        return false;
    };

    /**
     * Logs in a user with a supplied username/password
     * @param username - Username to login with
     * @param password - Password for the username
     * @returns {boolean} - Returns true if successfully logged in, false otherwise
     */
    Controller.prototype.userLogin = function (username, password) {
        var self = this;
        if (validator.username(username) && validator.password(password)) {
            var user = self.model.getUser(username);
            if (typeof user !== "undefined") {
                if (user.username === username && user.password === password) {
                    self.currentUser = user;
                    var source = qs("#loggedin-template").text;
                    var template = Handlebars.compile(source);
                    var html = template({"username": user.username});
                    qs("#nav").innerHTML = html;
                    self.view.dayView(self.currentDate.getMonth(), self.currentDate.getDay(), self.currentDate.getFullYear(), self.defaultStartTime, self.defaultEndTime);
                    return true;
                }
            }
        } else {
            qs("#login-message").innerHTML = "Invalid username/password";
        }

        qs("#login-message").innerHTML = "Invalid username/password";
        return false;
    };

    /**
     * Logs out the current user and resets the view to default
     */
    Controller.prototype.userLogout = function () {
        var self = this;
        self.currentUser = null;
    };

    //Reservation functions
    Controller.prototype.userCreateReservation = function (date, user, startTime, endTime) {

    };

    Controller.prototype.userVoidReservation = function (date, user, startTime) {

    };

    Controller.prototype.userExtendReservation = function (date, user, startTime, newEndTime) {

    };

    //lots of work for a day work of timeslots that are available for reservation
    //8am to 11pm
    Controller.prototype.getAvailableReservations = function (startTime, endTime) {
        //console.log("start: " + startTime + ", endTime: " + endTime);
        var self = this;
        var diff = endTime - startTime;
        var interval = self.oneMinute * 30;
        var timeslots = {};


        var rooms = self.model.getRooms();

        for (var i = startTime; i <= endTime; i += interval) {
            timeslots[i] = self.model.getAllReservationsAtTime(i);
            //console.log(timeslots[i]);

            for (var j = 0, roomLength = rooms.length; j < roomLength; j++) {
                //console.log(rooms[j]);
                var wtf = timeslots[i];

                var found = false;
                for (var w in wtf) {
                    if (rooms[j].key + i === wtf[w].key) {
                        //console.log("true");
                        found = wtf[w];
                    }
                    //console.log(rooms[j].key + i);
                    //console.log(wtf[w].key);

                }
                ;

                if (!found) {
                    timeslots[i].push(rooms[j]);
                    //console.log("avail");
                }

            }
        }

        return timeslots;
    };

    //Admin functions

    /**
     * As admin, creates a room
     * @param roomInfo - Contains the rooms building, room number, seating and optional params such as tv, whiteboard, polycom or webcam
     * @returns {boolean} - returns true if the room was created, false otherwise
     */
    Controller.prototype.adminCreateRoom = function (roomInfo) {
        var self = this;
        if (typeof roomInfo === "undefined") {
            return false;
        }
        //roomInfo is undefined
        // if (!!roomInfo){ console.log("roomInfo is undefiend"); return false }

        if (self.isAdmin(self.currentUser)) {
            if (!roomInfo["building"] || (roomInfo["building"] === undefined) || (roomInfo["building"].length === 0)) {
                //invalid building
                //console.log("invalid building");
                return false;
            } else if (!roomInfo["roomNumber"] || (roomInfo["roomNumber"] === undefined) || (roomInfo["roomNumber"].length === 0)) {
                //invalid roomNumber
                //console.log("invalid roomNumber");
                return false;
            } else if (!roomInfo["seating"] || (roomInfo["seating"] === undefined) || (roomInfo["seating"].length === 0)) {
                //invalid seating
                //console.log("invalid seating");
                return false;
            } else {

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
    Controller.prototype.adminUpdateRoomInfo = function (building, roomNumber) {
        var self = this;
        if (self.isAdmin(self.currentuser)) {
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
    Controller.prototype.adminCreateReservation = function (username, building, roomNumber, startTime, endTime) {
        var self = this;
        if (self.isAdmin(self.currentuser)) {
            //admin stuff
        }
        //user is not admin
        return false;
    };

    /**
     * As admin, void a reservation and free the slot
     * @returns {boolean} - returns true if the reservation with voided, false otherwise
     */
    Controller.prototype.adminVoidReservation = function () {
        var self = this;
        if (self.isAdmin(self.currentuser)) {
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
    Controller.prototype.adminCreateUser = function (username, password, email) {
        var self = this;
        if (self.isAdmin(self.currentuser)) {
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
    Controller.prototype.adminRemoveUser = function (username) {
        var self = this;
        if (self.isAdmin(self.currentuser)) {
            //do stuff
            return self.model.deleteUser(username);

        }
        //user is not admin
        return false;
    };

    //return true for now until we figure out user permissions
    /**
     * Returns true if the current user is an admin
     * @returns {boolean}
     */
    Controller.prototype.isAdmin = function () {
        console.log("I'm an admin! Everyone is!");
        return true;
    };

    /**
     * Test function
     * @returns {string}
     */
    Controller.prototype.test = function () {
        return "do you see this";
    };

    Controller.prototype.init = function () {
        var self = this;
        self.buildDayView();
        //self.view.dayView(self.currentDate.getMonth(), self.currentDate.toString().split(" ")[2], self.currentDate.getFullYear(), self.defaultStartTime, self.defaultEndTime);
    };

    Controller.prototype.buildWeekView = function () {
        return "week view stuff in here";
    };

    Controller.prototype.buildMonthView = function () {
        return "month view stuff in here";
    };

    Controller.prototype.buildDayView = function () {
        var self = this;
        var source = document.getElementById("bar-template").text;
        var template = Handlebars.compile(source);

        var context = {
            "month": self.months[self.currentDate.getMonth()].name,
            "day": self.currentDate.toString().split(" ")[2],
            "year": self.currentDate.getFullYear()
        };

        calBar.innerHTML = template(context);

        //get reservations

        //a list of reservations
        var reservations = self.getAvailableReservations(self.currentDate.valueOf(), new Date((self.currentDate.valueOf() + self.oneDay)).valueOf());

        console.log("Reservations: ");
        console.log(reservations);
        var html = "dayView!";

        html = "";

        for (var time in reservations) {
            var date = new Date(parseInt(time));

            html += "<div class='row' style=''>";
            html += "<div style='width: 10%;'>" + date.toString().split(" ")[4] + "</div>";

            html += "<div style='width: 90%; display: flex;'>";
            for (var i = 0, len = reservations[time].length; i < len; i++) {
                var x = reservations[time][i];

                //html += "<div style='border: solid black 2px; margin: 5px;'>";
                if (x.user) {
                    var source = document.getElementById("unavailable-reservation").text;
                    var template = Handlebars.compile(source);

                    var context = {
                        user: x.user,
                        start: new Date(x.startTime).toString().split(" ")[4],
                        end: new Date(x.endTime).toString().split(" ")[4],
                        building: x.room.building,
                        roomNumber: x.room.roomNumber

                    };

                    html += template(context);

                } else {
                    //its a room thats available
                    var source = document.getElementById("available-reservation").text;
                    var template = Handlebars.compile(source);
                    var context = {
                        building: x.building,
                        roomNumber: x.roomNumber
                    };

                    html += template(context);
                }

                //html += "</div>";
                //console.log(reservations[time][i]);

            }
            html += "</div>";

            html += "</div>";
        }

        calBody.innerHTML = html;

    };
    Controller.prototype.buildDayView2 = function () {
        var self = this;

        var startDate = new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), self.currentDate.toString().split(" ")[2], self.defaultStartTime.hours, self.defaultStartTime.minutes);
        var endDate = new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), self.currentDate.toString().split(" ")[2], self.defaultEndTime.hours, self.defaultEndTime.minutes);

        var source = document.getElementById("bar-template").text;
        var template = Handlebars.compile(source);

        var context = {
            "month": self.months[startDate.getMonth()].name,
            "day": self.currentDate.toString().split(" ")[2],
            "year": self.currentDate.getFullYear()
        };

        calBar.innerHTML = template(context);

        //cal body
        source = document.getElementById("day-template").text;
        template = Handlebars.compile(source);

        context = {
            start: defaultStartTime,
            end: defaultEndTime
        };


        // var html = '<table class="day-table">';
        // var times = getArrayOfTimes(startDate, endDate);
        // for (var i = 0, len = times.length; i < len; i++){
        //   console.log(times[i]);
        //   //i % 5 is where the # of openings should go
        //   html += '<tr><td>' + times[i] + '</td><td>' + i % 5 + '</td></tr>';
        // }
        //
        // html += '</table>';
        //console.log(html);

        var html = "<table style='height: 100%; width: 100%; background-color: red;'>";

        var times = getArrayOfTimes(startDate, endDate);
        for (var i = 0, len = times.length; i < len; i++) {
            html += "<tr style='width: auto; height: auto;'>";
            html += "<td style='float: left; width: 20%; text-align: center; background-color: lime;'>" + times[i] + "</td>";
            html += "<td style='float: left;'>" + times[i] + "</td>";
            html += "</tr>";
        }

        html += "</table>";

        calBody.innerHTML = html;
        return html;
    };

    window.app = window.app || {};
    window.app.Controller = Controller;


})(window);

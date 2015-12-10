localStorage.clear();

suite("Controller", function() {

  setup(function() {
    //god mode
      window.app.controller.isAdmin = function(){
      return true;
    };
  });

  suite("#userRegistration(username, password, email)", function() {
    test("all params are undefined", function() {
      assert.equal(false, window.app.controller.userRegistration());
    });

    test("all params are null", function() {
      assert.equal(false, window.app.controller.userRegistration(null, null, null));
    });

    test("username is an empty string", function() {
      assert.equal(false, window.app.controller.userRegistration(""));
    });

    test("username,password and email are empty strings", function() {
      assert.equal(false, window.app.controller.userRegistration("", "", ""));
    });

    test("returns false when an invalid email is provided", function() {
      assert.equal(false, window.app.controller.userRegistration("testuser", "testpass", ""));
    });

    test("returns false when an invalid password is provided", function() {
      assert.equal(false, window.app.controller.userRegistration("testuser", "", "test@email.com"));
    });

    test("returns true when a valid username, password and email are provided", function() {
      assert.equal(true, window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com"));
    });

    test("returns false when username already exists", function() {
      window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com"));
    });

  });

  suite("#userLogin(username, password)", function(){
    test("returns false when username and password are undefined", function(){
      assert.equal(false, window.app.controller.userLogin());
    });

    test("returns false when username and password are null", function(){
      assert.equal(false, window.app.controller.userLogin(null, null));
    });

    test("returns false when username and password are '' (empty strings)", function(){
      assert.equal(false, window.app.controller.userLogin("", ""));
    });

    test("returns false when username does not exist", function(){
      assert.equal(false, window.app.controller.userLogin("testing", "testpass"));
    });

    test("returns true when username and password are valid", function(){
      window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(true, window.app.controller.userLogin("testuser", "testpass"));
    });

    test("returns false when username and password are invalid", function(){
      window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.app.controller.userLogin("testuser123", "testpass23"));
    });

    test("returns false when username is invalid", function(){
      window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.app.controller.userLogin("testuser123", "testpass"));
    });

    test("returns false when pasword is invalid", function(){
      window.app.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.app.controller.userLogin("testuser", "testpass123"));
    });
  });

  suite("#userCreateReservation(date, user, startTime, endTime)", function(){
    test("", function(){
      assert.equal(true, true);
    });
  });

  suite("#userVoidRegistration(date, user, startTime)", function(){
    test("", function(){
      assert.equal(true, true);
    });
  });

  suite("#userExtendReservation(date, user, startTime, endTime)", function(){
    test("", function(){
      assert.equal(true, true);
    });
  });


  suite("#adminCreateRoom(roomInfo)", function(){
    setup(function(){

    });

    test("retrun false when all roomInfo is undefined", function(){
      var room = window.app.controller.adminCreateRoom();
      assert.equal(false, room);
    });

    test("retrun false when all params are undefined", function(){
      var room = window.app.controller.adminCreateRoom({});
      assert.equal(false, room);
    });

    test("return false when all params are null", function(){
      assert.equal(false, window.app.controller.adminCreateRoom({
          "building": null,
          "roomNumber": null,
          "seating": null
      }));
    });

    test("return false when roomNumber and seating are null", function(){
      assert.equal(false, window.app.controller.adminCreateRoom({
          "building": "mac",
          "roomNumber": null,
          "seating": null
      }));
    });

    test("return false when only seating is null", function(){
      assert.equal(false, window.app.controller.adminCreateRoom({
          "building": "MAK",
          "roomNumber": "C-2-206",
          "seating": null
      }));
    });

    test("return true for valid room", function(){
      assert.equal(true, window.app.controller.adminCreateRoom({
          "building": "MAK",
          "roomNumber": "C-2-206",
          "seating": 25
      }));
    });

    test("return 'room already exists'; when room already exists", function(){
      assert.notEqual(true, window.app.controller.adminCreateRoom({
          "building": "MAK",
          "roomNumber": "C-2-206",
          "seating": 25
      }));
    });

  });

  suite("#adminUpdateRoomInfo()", function(){
    test("", function(){
      assert.equal(true, true);
    });
  });

  suite("#isAdmin()", function(){
    test("true by default", function(){

      window.app.controller.isAdmin = function(){
        return true;
      };
      assert.equal(true, window.app.controller.isAdmin());
    });

    test("true when we inject our method", function(){
      window.app.controller.isAdmin = function(){
        return false;
      };
      assert.equal(false, window.app.controller.isAdmin());
    });
  });

  suite("#adminCreateUser()", function(){
    setup(function(){
      window.app.controller.isAdmin = function(){
        return true;
      };
    });

    //when admin is true
    test("when currentUser is an admin", function(){
      assert.equal(true, window.app.controller.adminCreateUser("testuser2", "testpass", "test@gmail.com"));
    });

    //when admin is false
    test("when currentUser is not an admin", function(){
      //injection, we replace the method
      window.app.controller.isAdmin = function(){
        console.log("god mode not enabled :(");
        return false;
      };

      assert.equal(false, window.app.controller.adminCreateUser("testuser", "testpass", "test@gmail.com"));
    });
  });

  suite("#adminRemoveUser()", function(){

    test("returns false when user is undefined", function(){
      assert.equal(false, window.app.controller.adminRemoveUser());
    });

    test("returns false when user is null", function(){
      assert.equal(false, window.app.controller.adminRemoveUser(null));
    });

    test("returns false when user does not exist", function(){
      assert.equal(false, window.app.controller.adminRemoveUser("doesnotexist"));
    });

    test("returns true when user does exist", function(){
      window.app.controller.adminCreateUser("testuser", "testpass", "test@gmail.com");
      assert.equal(true, window.app.controller.adminRemoveUser("testuser"));
    });
  });
});

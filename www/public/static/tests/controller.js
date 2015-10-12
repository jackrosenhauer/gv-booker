suite('Controller', function() {
  setup(function() {
    localStorage.clear();
    gvbooker.controller.setView = function(){}
    window.gvbooker.controller.isAdmin = function(){
      return true;
    };
    window.gvbooker.model.storage["users"] = {};
  });

  suite('#userRegistration(username, password, email)', function() {
    test('all params are undefined', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration());
    });

    test('all params are null', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration(null, null, null));
    });

    test('username is an empty string', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration(""));
    });

    test('username,password and email are empty strings', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration("", "", ""));
    });

    test('returns false when an invalid email is provided', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration("testuser", "testpass", ""));
    });

    test('returns false when an invalid password is provided', function() {
      assert.equal(false, window.gvbooker.controller.userRegistration("testuser", "", "test@email.com"));
    });

    test('returns true when a valid username, password and email are provided', function() {
      assert.equal(true, window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com"));
    });

    test('returns false when username already exists', function() {
      window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com"));
    });

  });

  suite('#userLogin(username, password)', function(){
    test('returns false when username and password are undefined', function(){
      assert.equal(false, window.gvbooker.controller.userLogin());
    });

    test('returns false when username and password are null', function(){
      assert.equal(false, window.gvbooker.controller.userLogin(null, null));
    });

    test('returns false when username and password are ""', function(){
      assert.equal(false, window.gvbooker.controller.userLogin("", ""));
    });

    test('returns false when username does not exist', function(){
      assert.equal(false, window.gvbooker.controller.userLogin("testing", "testpass"));
    });

    test('returns true when username and password are valid', function(){
      window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(true, window.gvbooker.controller.userLogin("testuser", "testpass"));
    });

    test('returns false when username and password are invalid', function(){
      window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.gvbooker.controller.userLogin("testuser123", "testpass23"));
    });

    test('returns false when username is invalid', function(){
      window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.gvbooker.controller.userLogin("testuser123", "testpass"));
    });

    test('returns false when pasword is invalid', function(){
      window.gvbooker.controller.userRegistration("testuser", "testpass", "test@gmail.com");
      assert.equal(false, window.gvbooker.controller.userLogin("testuser", "testpass123"));
    });
  });

  suite('#userCreateReservation(date, user, startTime, endTime)', function(){
    test('', function(){
      assert.equal(true, true);
    });
  });

  suite('#userVoidRegistration(date, user, startTime)', function(){
    test('', function(){
      assert.equal(true, true);
    });
  });

  suite('#userExtendReservation(date, user, startTime, endTime)', function(){
    test('', function(){
      assert.equal(true, true);
    });
  });


  suite('#adminCreateRoom(roomInfo)', function(){
    setup(function(){

    });

    test('retrun false when all roomInfo is undefined', function(){
      var room = window.gvbooker.controller.adminCreateRoom();
      assert.equal(false, room);
    });

    test('retrun false when all params are undefined', function(){
      var room = window.gvbooker.controller.adminCreateRoom({});
      assert.equal(false, room);
    });

    test('return false when all params are null', function(){
      assert.equal(false, window.gvbooker.controller.adminCreateRoom({
          "building": null,
          "roomNumber": null,
          "seating": null
      }));
    });

    test('return false when roomNumber and seating are null', function(){
      assert.equal(false, window.gvbooker.controller.adminCreateRoom({
          "building": "mac",
          "roomNumber": null,
          "seating": null
      }));
    });

    test('return false when only seating is null', function(){
      assert.equal(false, window.gvbooker.controller.adminCreateRoom({
          "building": "mac",
          "roomNumber": "A-118",
          "seating": null
      }));
    });

    test('return true for valid room', function(){
      assert.equal(true, window.gvbooker.controller.adminCreateRoom({
          "building": "mac",
          "roomNumber": "A-118",
          "seating": 25
      }));
    });

    test('return false when room already exists', function(){
      assert.equal(false, window.gvbooker.controller.adminCreateRoom({
          "building": "mac",
          "roomNumber": "A-118",
          "seating": 25
      }));
    });

  });

  suite('#adminUpdateRoomInfo()', function(){
    test('', function(){
      assert.equal(true, true);
    });
  });

  suite('#isAdmin()', function(){
    test('true by default', function(){

      window.gvbooker.controller.isAdmin = function(){
        return true;
      };
      console.log(window.gvbooker.controller.isAdmin);
      assert.equal(true, window.gvbooker.controller.isAdmin());
    });

    test('true when we inject our method', function(){
      window.gvbooker.controller.isAdmin = function(){
        return false;
      };
      assert.equal(false, window.gvbooker.controller.isAdmin());
    });
  })

  suite('#adminCreateUser()', function(){
    setup(function(){
      window.gvbooker.controller.isAdmin = function(){
        return true;
      };
    })
    //when admin is true
    test('when currentUser is an admin', function(){
      assert.equal(true, window.gvbooker.controller.adminCreateUser("testuser2", "testpass", "test@gmail.com"));
    });

    //when admin is false
    test('when currentUser is not an admin', function(){
      //injection, we replace the method
      window.gvbooker.controller.isAdmin = function(){
        console.log("god mode not enabled :()");
        return false;
      };

      assert.equal(false, window.gvbooker.controller.adminCreateUser("testuser", "testpass", "test@gmail.com"));
    });
  });

  suite('#adminRemoveUser()', function(){
    test('returns false when user is undefined', function(){
      assert.equal(false, window.gvbooker.controller.adminRemoveUser());
    });

    test('returns false when user is null', function(){
      assert.equal(false, window.gvbooker.controller.adminRemoveUser(null));
    });

    test('returns false when user does not exist', function(){
      assert.equal(false, window.gvbooker.controller.adminRemoveUser("testuser"));
    });

    test('returns true when user does exist', function(){
      window.gvbooker.controller.adminCreateUser("testuser", "testpass", "test@gmail.com")
      assert.equal(true, window.gvbooker.controller.adminRemoveUser("testuser"));
    });
  });

  suite('#test()', function(){
    test('returns "do you see this"', function(){
      assert.equal("do you see this", window.gvbooker.controller.test());
    });
  });

});

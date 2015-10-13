suite('Validator', function(){

  setup(function(){

  });

  suite('#isEmail(email)', function(){
    test('email = undefined', function(){
      assert.equal(false, validator.email());
    });
    test('email = null', function(){
      assert.equal(false, validator.email(null));
    });
    test('email = "', function(){
      assert.equal(false, validator.email(""));
    });
    test('email = "testemail"', function(){
      assert.equal(false, validator.email("testemail"));
    });
    test('email = "testemail@test"', function(){
      assert.equal(false, validator.email("testemail@test"));
    });
    test('email = "testemail@test.com"', function(){
      assert.equal(true, validator.email("testemail@test.com"));
    });
    test('email = "testemail123@test.com"', function(){
      assert.equal(true, validator.email("testemail123@test.com"));
    });
    test('email = "testemail123@test123.com"', function(){
      assert.equal(true, validator.email("testemail123@test123.com"));
    });
  });

  suite('#isUsername(username)', function(){
    test('username = undefined', function(){
      assert.equal(false, validator.username());
    });
    test('username = null', function(){
      assert.equal(false, validator.username(null));
    });
    test('username = ""', function(){
      assert.equal(false, validator.username(""));
    });
    test('username = "testuser"', function(){
      assert.equal(true, validator.username("testuser"));
    });
    test('username = "testuser123"', function(){
      assert.equal(true, validator.username("testuser123"));
    });
    test('username = "123testuser123"', function(){
      assert.equal(true, validator.username("123testuser123"));
    });
  });

  suite('#isPassword(password)', function(){
    test('password = undefined', function(){
      assert.equal(false, validator.password());
    });
    test('password = null', function(){
      assert.equal(false, validator.password(null));
    });
    test('password = ""', function(){
      assert.equal(false, validator.password(""));
    });
    test('password = "testpassword"', function(){
      assert.equal(true, validator.password("testpassword"));
    });
    test('password = "123testpassword"', function(){
      assert.equal(true, validator.password("123testpassword"));
    });
    test('password = "123testpassword123"', function(){
      assert.equal(true, validator.password("123testpassword123"));
    });
  })
});

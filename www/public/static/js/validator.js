var validator = (function(window){

  var isEmail = function(email){
    if (!email) return false;
    var regex = new RegExp(/^[a-zA-Z0-9_.]+@[a-zA-Z]+\.[a-zA-Z0-9]+$/);
    return regex.test(email);
  }

  var isUsername = function(username){
    if (!username) return false;
    var regex = new RegExp(/^[a-zA-Z0-9_-]+$/);
    return regex.test(username);
  }

  var isPassword = function(password){
    if (!password) return false;
    var regex = new RegExp(/^[a-zA-Z]+$/);
    return regex.test(password);
  }

  return {
    email: isEmail,
    username: isUsername,
    password: isPassword
  }

  window.validator = validator;
})(window);

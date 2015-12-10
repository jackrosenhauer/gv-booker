var validator = (function(window){

  /**
   * Checks the validity of an email
   * Format: Username only contains numbers, letters, _ and .
   *         also contains a valid domain name
   * @param email - Email to check
   * @returns {boolean} - Returns true if the email is valid, false otherwise
     */
  var isEmail = function(email){
    if (!email) return false;
    var regex = new RegExp(/^[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9]+$/);
    return regex.test(email);
  };

  /**
   * Checks the validity of a username
   * Contains only a-z, A-Z, 0-9, _ and -
   * @param username - Username to check
   * @returns {boolean} - Returns true if the email is valid, false otherwise
     */
  var isUsername = function(username){
    if (!username) return false;
    var regex = new RegExp(/^[a-zA-Z0-9_-]+$/);
    return regex.test(username);
  };

  /**
   * Checks the validity of a username
   * Contains only a-z A-Z and 0-9
   * @param password - Password to check
   * @returns {boolean} - Returns true if the email is valid, false otherwise
     */
  var isPassword = function(password){
    if (!password) return false;
    var regex = new RegExp(/^[a-zA-Z0-9]+$/);
    return regex.test(password);
  };

  return {
    email: isEmail,
    username: isUsername,
    password: isPassword
  };
})(window);

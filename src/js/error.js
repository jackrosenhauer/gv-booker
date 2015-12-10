(function(window){
  "use strict";

  /**
   * An error object
   * @param  description of the error e.g. "Invalid Username"
   * @param  message to the user e.g. "Username not found."
   */
  function error(description, message){
    var self = this;
    self.description = description;
    self.message = message;
  };

  error.prototype.getMessage = function(){
    var self = this;
    return self.message;
  };

  error.prototype.getDescription = function(){
    var self = this;
    return self.description;
  };

  window.app.error = error;
})(window);

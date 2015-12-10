"use strict";
var view = (function(window){
  /**
   * Sets all of our 'global' variables
   * Creates the links between the view controller and the elements on the page with queryselectors (qs) so we can references them later in our functions
   * Note: needs to be cleaned up, not sure how to correctly do this with single page apps I'll take a loot at react/angularjs and see how they do it
   * @constructor
     */
  function View(){
    var self = this;
    this.$login = qs("#login");
    this.$home = qs(".home");
    this.$register = qs("#register");
    this.$calWin = qs("#calendar-window");
    this.$loginusername = qs("#login-username");
    this.$loginpassword = qs("#login-password");
    this.$loginMessage = qs("#login-message");
    this.$logout = qs("#logout");
    this.$defaultBodyHTML = document.getElementsByTagName("body")[0].innerHTML;

    this.$nav = qs("#nav");
    this.$filter = qs("#filter");
    this.$title = qs("#bar-title");
    this.bar = qs("#calendar-bar");
    this.$body = qs("#calendar-body");

    //registration
    this.$submitRegistration = qs("reg-submit");

    this.$defaultNavHTML = (function(){
      var home = self.$home;
      if (home !== null){
        return self.$home.innerHTML;
      }
      return "";
    })();

    this.$defaultCalWinHTML = (function(){
      var calWin = self.$calWin;
      if (calWin !== null){
        return self.$calWin.innerHTML;
      }
      return "";
    })();
  }

  /**
   * Sets up a function that the controller will call to bind events.
   * This sets up the view to callback to the controller when a elements on the page is clicked
   * @param event - The event that the controller is binding
   * @param handler - The callback function from the controller
     */
  View.prototype.setHTML = function(element, html){
    var self = this;
    switch (element){
      case "nav":
        self.$nav.innerHTML = html;
      break;
      case "filter":
        self.$filter.innerHTML = html;
      break;
      case "body":
        self.$body.innerHTML = html;
      break;
    }
  };

  View.prototype.bind = function(event, handler){
    var self = this;
    if (document.getElementById("nav") !== null){
      switch (event){
        case "nav":
          this.$nav.addEventListener("click", handler);
          break;
        case "filter":
          this.$filter.addEventListener("change", handler);
          this.$filter.addEventListener("keyup", handler);
          break;
        case "calendar":
          this.$calWin.addEventListener("click", handler);
          break;
        default:
          console.log("unknown bind event: " + event);
      }
    }else{
      console.log("no view, nothing to do");
    }
  };

  /**
   * Updates the view
   * @param viewCmd - The view to display
   * @param args - An object containing arguments for the individual views
     */
  View.prototype.render = function(viewCmd, args){
    var self = this;
    console.log("render: " + viewCmd);
  };

  /**
   * Displays the failed registration message to the user
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showRegistrationFailedView = function(element){
    element.innerHTML = "Failed to register, try a different username";
  };

  /**
   * Shows the registration form to the user
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showRegistrationView = function(element){
    var self = this;
    var html = "";
    html += "<div>";
    html += "<div>Username: <input id='reg-username' type='text'></div>";
    html += "<div>password: <input id='reg-password' type='text'></div>";
    html += "<div>E-mail: <input id='reg-email' type='text'></div>";
    html += "<button id='reg-submit'>Okay</button><button id='reg-cancel'>Cancel</button><br>";
    html += "<label id='registration-message'></label>";
    html += "</div>";
    self.$body.innerHTML = html;
  };

  window.app = window.app || {};
  return View;
})(window);

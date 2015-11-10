(function(window){
  "use strict";

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
    this.$body = qs("#calendar-window");

    console.log(this.$nav);
    console.log(this.$filter);
    console.log(this.$body);

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

    var defaultStartTime = {
      "hours": 8,
      "minutes": 0
    };
    var defaultEndTime = {
      "hours": 23,
      "minutes": 0
    };

    var months = {
      0: {
        "name": "January",
        "abbrev": "Jan",
        "numbrer": 1
      },
      1:{
        "name": "Feb",
        "abbrev": "Feb",
        "number": 2
      },
      2:{
        "name": "March",
        "abbrev": "Mar",
        "number": 3
      },
      3:{
        "name": "April",
        "abbrev": "Apr",
        "number": 4
      },
      4:
      {  "name": "May",
        "abbrev": "May",
        "number": 5
      },
      5:{
        "name": "June",
        "abbrev": "Jun",
        "number": 6
      },
      6:{
        "name": "July",
        "abbrev": "Jul",
        "number": 7
      },
      7:{
        "name": "August",
        "abbrev": "Aug",
        "number": 8
      },
      8:{
        "name": "September",
        "abbrev": "Sep",
        "number": 9
      },
      9:{
        "name": "October",
        "abbrev": "Oct",
        "number": 10
      },
      10:{
        "name": "November",
        "abbrev": "Nov",
        "number": 11
      },
      11:{
        "name": "December",
        "abbrev": "Dec",
        "number": 12
      }
    };
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
        this.$nav.innerHTML = html;
      break;
      case "filter":
        this.$filter.innerHTML = html;
      break;
      case "body":
        this.$body.innerHTML = html;
      break;
    }
  }
  View.prototype.bind = function(event, handler){
    var self = this;
    if (this.$login){
      switch (event){
          case "login":
            $delegate(self.$home, "#login", "click", function(){
              console.log("(view) bind => 'login')");
              var username = self.$loginusername.value;
              var password = self.$loginpassword.value;

              console.log("username: " + username + ", password: " + password);
              if (!validator.username(username)){
                console.log("invalid username");
              }else if (!validator.password(password)){
                console.log("invalid password");
              }else{
                handler(username, password);
              }
            });
            break;
          case "logout":
            $delegate(self.$home, "#logout", "click", function(){
              console.log("Logout?");
              handler();
            });
            break;
          case "default":
            $on(self.$home, "click", function(){
              console.log("(view) bind => 'default'");
              self.showDefaultView(self.$calWin);
              handler();
            });
            break;
          case "reg":
            $delegate(self.$home, "#register", "click", function(){
              self.showRegistrationView(self.$calWin);
              console.log("(view) bind => 'register'");
              handler();
            });
            break;
          case "reg-submit":
            $delegate(self.$calWin, "#reg-submit", "click", function(){
              console.log("submit registration");
              var username = qs("#reg-username").value + "";
              var password = qs("#reg-password").value + "";
              var email = qs("#reg-email").value + "";

              handler(username, password, email);
            });

            $delegate(self.$calWin, "#reg-cancel", "click", function(){
              self.$calWin.innerHTML = self.$defaultCalWinHTML;
            });
            break;
          case "nav":
            this.$nav.addEventListener("click", handler);
            break;
          case "filter":
            this.$filter.addEventListener("click", handler);
            this.$filter.addEventListener("keyup", handler);
            break;
          case "body":
            this.$body.addEventListener("click", handler);
            break;
          default:
            console.log("(view) bind => '" + event + "'");
            handler();
          }
        }

  };

  /**
   * Updates the view
   * @param viewCmd - The view to display
   * @param args - An object containing arguments for the individual views
     */
  View.prototype.render = function(viewCmd, args){
    var self = this;
    console.log("viewCmd => " + viewCmd);

    var body = document.getElementById("calendar-window");

    switch (viewCmd){
      case "login":
        console.log("(view) render => login");
        var template = document.getElementById("login-template").text;
        template = Handlebars.compile(template);
        body.innerHTML = template();
        break;

      case "nav":
        console.log("(view) render => nav");
        break;

      case "filter":
        console.log("(view) render => filter");
        break;

      case "month":
        console.log("(view) render => month");
        console.log(args);

        var template = document.getElementById("month-cal").text;
        template = Handlebars.compile(template);
        var result = template();
        console.log(result);
        body.innerHTML = template();
        break;

      case "week":
        console.log("(view) render => week");
        break;

      case "day":
        console.log("(view) render => days");
        self.dayView();
        break;
      case "register":
        self.showRegistration(body);
        break;
      case "registration-success":
        self.$calWin.innerText = "Successfully registered, please login with your new credentials";
        break;
      case "registration-failed":
        self.showRegistrationFailedView(qs("#registration-message"));
        break;
      case "login-failed":
        self.$loginMessage.innerText = "Login failed, try again";
        break;
      case "login-success":
        var currentUser = args["currentUser"];
        var html = "";
        html += "<div>Logged in as " + currentUser.username + "</div>";
        html += "<input id='logout' type='button' value='logout'></input>";
        self.$home.innerHTML = html;
        //check back to the default view (month, week or day)
        break;
      default:
        //document.getElementsByTagName("body")[0].innerHTML = self.$defaultBodyHTML;
        self.$home.innerHTML = self.$defaultNavHTML;
    }

  };

  /**
   * Displays the failed registration message to the user
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showRegistrationFailedView = function(element){
    element.innerHTML = "Failed to register, try a different username";
  };

  View.prototype.dayView = function(){
    var self = this;
    self.$calWin.innerHTML = "NOPE";
  }
  /**
   * Shows the registration form to the user
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showRegistrationView = function(element){
    var html = "";
    html += "<div>";
    html += "<div>Username: <input id='reg-username' type='text'></input></div>";
    html += "<div>password: <input id='reg-password' type='text'></input></div>";
    html += "<div>E-mail: <input id='reg-email' type='text'></input></div>";
    html += "<button id='reg-submit'>Okay</button><button id='reg-cancel'>Cancel</button><br>";
    html += "<label id='registration-message'></label>";
    html += "</div>";
    element.innerHTML = html;
  };

  /**
   * Shows the login view
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showLoginView = function(element){
    var html = "loginView";
    element.innerHTML = html;
  };

  /**
   * Shows the default view (is set when the view is created)
   * @param element - Element to change the innerHTML of
     */
  View.prototype.showDefaultView = function(element){
    var html = "defaultView";

    element.innerHTML = html;
  };

  window.app = window.app || {};
  window.app.View = View;
})(window);

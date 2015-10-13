(function(window){
  "use strict";

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
    // this.$defaultNavHTML = this.$home.innerHTML;
    // this.$defaultCalWinHTML = this.$calWin.innerHTML;
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

    //registration
    this.$submitRegistration = qs("reg-submit");
  }

  View.prototype.bind = function(event, handler){
    var self = this;
    if (this.$login){
      switch (event){
          case "login":
            $delegate(self.$home, "#login", "click", function(){
              console.log("(view) bind => 'login')");
              var username = self.$loginusername.value + "";
              var password = self.$loginpassword.value + "";

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
            })
            break;
          case "default":
            $on(self.$home, "click", function(){
              console.log("(view) bind => 'default'");
              self.showDefaultView(self.$calWin);
              handler();
            })
            break;
          case "reg":
            $delegate(self.$home, "#register", "click", function(){
              self.showRegistrationView(self.$calWin);
              console.log("(view) bind => 'register'");
              handler();
            })
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
          default:
            console.log("(view) bind => '" + event + "'");
            handler();
          }
        }

  }

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
        console.log("(view) render => day");
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
        break;
      default:

        //document.getElementsByTagName("body")[0].innerHTML = self.$defaultBodyHTML;
        self.$home.innerHTML = self.$defaultNavHTML;
    }

  }

  View.prototype.showRegistrationFailedView = function(element){
    element.innerHTML = "Failed to register, try a different username";
  }
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
  }

  View.prototype.showLoginView = function(element){
    var html = "loginView";
    element.innerHTML = html;
  }

  View.prototype.showDefaultView = function(element){
    var html = "defaultView";

    element.innerHTML = html;
  }

  window.app = window.app || {};
  window.app.View = View;
})(window);

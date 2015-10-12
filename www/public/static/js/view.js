(function(window){
  "use strict";

  function View(){
    this.$login = qs("#login");
    this.$home = qs("#home");
    this.$register = qs("#register");
    this.$calWin = qs("#calendar-window");

    //registration
    this.$submitRegistration = qs("reg-submit");
  }

  View.prototype.bind = function(event, handler){
    var self = this;
    if (this.$login){
      switch (event){

          case "login":
            $on(self.$login, "click", function(){
              // event.stopPropiation();
              console.log("(view) bind => 'login')");
              handler();
            });
            break;
          case "default":
            $on(self.$home, "click", function(){
              console.log("(view) bind => 'default'");
              self.showDefaultView(self.$calWin);
              handler();
            })
            break;
          case "reg":
            $on(self.$register, "click", function(){
              self.showRegistrationView(self.$calWin);
              console.log("(view) bind => 'register'");
              handler();
            })
            break;
          case "reg-submit":
            $delegate(self.$calWin, "#reg-submit", "click", function(){
              console.log("submit registration");
              var username = qs("#reg-username").value;
              var password = qs("#reg-password").value;
              var email = qs("#reg-email").value;

              handler(username, password, email);
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
      case "registration-failed":
        self.showRegistrationFailedView(qs("#registration-message"));
        break;
      default:
        console.log("viewcmd default");
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
    html += "<button id='reg-submit'>Okay</button><br>";
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

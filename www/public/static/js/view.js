(function(window){
  'use strict';

  function View(){
    this.$login = qs("#login");
    this.$home = qs("#home");
  }

  View.prototype.bind = function(event, handler){
    var self = this;

    switch (event){
      case "login":
        $on(self.$login, 'click', function(){
          // event.stopPropiation();
          console.log("(view) bind => 'login')");
          handler();
        });
        break;
      case "default":
        $on(self.$home, "click", function(){
          console.log("(view) bind => 'default'");
          handler();
        })
        break;
      default:
        console.log("(view) bind => '" + event + "'");
        handler();
    }
  }

  View.prototype.render = function(viewCmd, args){
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

      default:
        console.log('viewcmd default');
    }

  }

  window.app = window.app || {};
  window.app.View = View;
})(window);

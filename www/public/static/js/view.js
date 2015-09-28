(function(window){
  'use strict';

  function View(){

  }

  View.prototype.bind = function(event, handler){

  }

  View.prototype.render = function(viewCmd, args){
    switch (viewCmd){
      case "month":
        console.log("(view) render => month");
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

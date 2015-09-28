(function(window){
  'use strict';

  function View(){

  }

  View.prototype.bind = function(event, handler){

  }

  View.prototype.render = function(viewCmd, args){
    switch (viewCmd){
      default:
        console.log('viewcmd default');
    }
  }

  window.app = window.app || {};
  window.app.View = View;
})(window);

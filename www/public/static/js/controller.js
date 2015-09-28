(function(window){
  'use strict';

  function Controller(model, view){
    self = this;
    self.model = model;
    self.view = view;
  }

  Controller.prototype.setView = function(hash){
    console.log("(controller) setView -> \"" + hash + "\"");
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

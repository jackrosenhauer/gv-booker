(function(window){
  'use strict';

  function Controller(model, view){
    self = this;
    self.model = model;
    self.view = view;
    self.currentDate = new Date();
  }

  Controller.prototype.setView = function(hash){
    var self = this;
    switch (hash){
      default:
        self.view.render("month", new Date(self.currentDate.getFullYear(), self.currentDate.getMonth(), 1));
        console.log("(controller) setView -> default");
    }
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

})(window);

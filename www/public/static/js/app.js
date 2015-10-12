var app = (function(window){
  'use strict';
  var name = "gv-booker";

  function Booker(name){
    //this.storage = new app.Store(name);

    this.view = new app.View();
    this.model = new app.Model(name);
    this.controller = new app.Controller(this.model, this.view);
    // console.log(this.model);
  }

  var gvbooker = new Booker(name);

  function setView() {
		gvbooker.controller.setView(document.location.hash);
  }

  // $on(window, 'load', setView);
	// $on(window, 'hashchange', setView);

  window.gvbooker = gvbooker;
  window.app = Booker;
})(window);

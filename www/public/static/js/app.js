(function(window){
  'use strict';

  function Booker(name){
    this.storage = new app.Store(name);
    this.model = new app.Model(this.storage);

    this.controller = new app.Controller(this.model, this.view);
  }

  var gvbooker = new Booker("gv-booker");

  function setView() {
    console.log("set view...");
		gvbooker.controller.setView(document.location.hash);
  }

  $on(window, 'load', setView);
	$on(window, 'hashchange', setView);

})(window);

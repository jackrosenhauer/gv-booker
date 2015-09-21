(function(window){
  'use strict';

  function Booker(name){
    this.storage = new app.Store(name);
    this.model = new app.Model(this.storage);
  }

  var gvbooker = new Booker("gv-booker");

})(window)

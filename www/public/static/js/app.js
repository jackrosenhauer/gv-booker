/**
 *  much of this js design (MVC) detail is taken from the vanillajs MVC todo
 *  https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs
 *  Not sure how its currently working out but it seems to be pretty weird with all of the callbacks
 *  Javascript does not have classes like java does (currently)
 *
 *  I still want to checkout ES6 and see how to implement classes
 *  Configure blanketjs to be more accurate with code coverage (it is including globals and such, I don't need to test globals just functins)
 *
 *
 */

var app = (function(window){
  "use strict";

  var name = "gv-booker";

  /**
   * Creates the instance of our application
   * @param name - the string name of the instance
   * @constructor - creates the MVC Triad
     */
  function Booker(name){
    this.model = new model(name);
    this.view = new view();
    this.controller = new controller(this.model, this.view);
    return this;
  }

  //clears local storage everytime, for testing
  localStorage.clear();

  var gvbooker = new Booker(name);
  gvbooker.controller.init();
  return gvbooker;
})(window);

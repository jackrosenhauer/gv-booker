(function(window){
  'use strict';

  window.$qs = function(selector, scope){
    return (scope || document).querySelector(selector);
  }

  window.$qsa = function(selection, scope){
    return (scope || document).querySelectorAll(selector);
  }
  
})(window)

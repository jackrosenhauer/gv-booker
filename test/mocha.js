<html>
<head>
  <meta charset="utf-8">
  <title>Mocha Tests</title>
  <link href="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.css" rel="stylesheet" />
</head>
<body>
  <div id="mocha"></div>

  <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
  <script src="../www/public/static/js/helpers.js"></script>
  <script src="../www/public/static/js/model.js"></script>
  <script src="../www/public/static/js/view.js"></script>
  <script src="../www/public/static/js/controller.js"></script>
  <script src="../www/public/static/js/store.js"></script>
  <script src="../www/public/static/js/app.js"></script>

  <script>mocha.setup('tdd')</script>
  
  <script>
    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    mocha.run();
  </script>
</body>
</html>

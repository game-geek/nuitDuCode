const shell = require("shelljs");

// Copy all the view templates
shell.cp("-R", "src/views", "build/");

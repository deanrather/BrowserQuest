requirejs([
	'/bower_components/modernizr/modernizr.js',
	'/browserquest/js/detect.js',
	'/browserquest/js/lib/class.js',
	'/browserquest/js/lib/underscore.min.js',
	'/browserquest/js/lib/stacktrace.js',
	'/browserquest/js/util.js'
],
function() {
    requirejs(["/browserquest/js/main.js"]);
});

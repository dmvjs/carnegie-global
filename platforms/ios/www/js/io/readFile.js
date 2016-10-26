/*global module, require*/
var removeFile = require('./removeFile');

module.exports = function (fileentry) {
	var reader = new FileReader()
		, errorHandler = window.onerror
		, restoreHandler = function () {
			window.onerror = errorHandler;
		};

	return new Promise(function (resolve, reject) {
		var rejection = function (err) {
			restoreHandler();
			reject(err);
		};
		window.onerror = function (err) {
			removeFile(fileentry).then(rejection, rejection)
		};
		fileentry.file(function (f) {
			reader.onloadend = function (s) {
                var req = new XMLHttpRequest();
                req.open('GET', s.target._result, false);
                req.overrideMimeType('application\/json; charset=utf-8');
                req.send(null);
                s.target._result = req.responseText;

			    restoreHandler();
                resolve(s);
			};
			reader.onerror = rejection;

			reader.readAsDataURL(f)
		})
	});
};

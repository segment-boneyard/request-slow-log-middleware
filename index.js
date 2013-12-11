
var defaults = require('defaults');
var extend = require('extend');
var onResponse = require('on-response');


/**
 * Expose `generate`.
 */

module.exports = generate;


/**
 * Generate a request slow log middleware.
 *
 * @param {Logger} logger
 * @param {Object} thresholds
 * @return {Function}
 */

function generate (logger, thresholds) {

  thresholds = defaults(thresholds, {
    warn: 2000,   // logger.warn after 3000ms
    error: 3000   // logger.error after 5000ms
  });

  var levels = Object.keys(thresholds).sort(function (level) {
    return -thresholds[level];
  });

  return function requestSlowLog (req, res, next) {
    onResponse(req, res, function (err, summary) {
      var time = summary.response.time;
      var log = null;
      for (var i = 0; i < levels.length; i += 1) {
        var level = levels[i];
        var threshold = thresholds[level];
        if (time >= threshold) log = logger[level];
      }

      if (log) {
        extend(summary.request, { body: req.body });
        var msg = format(summary);
        log.bind(logger)(msg, summary);
      }
    });

    next();
  };
}


/**
 * Formats the request log message.
 *
 * @param {Object} summary
 * @return {String}
 */

function format (summary) {
  var request = summary.request;
  var response = summary.response;
  return 'Slow request (' + response.time + 'ms): ' +
    request.method + ' ' + request.url + ' ' + response.status;
}
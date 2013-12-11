# request-slowlog-middleware

    A slow response logger middleware.

## Example

```js
var requestLog = require('request-log');
var slowLog = require('request-slow-log');
var logger = new require('winston').Logger();

var app = express();

app.configure('production', function () {
  app.use(requestLog(logger));
  app.use(slowLog(logger));
});
```

## API

### requestLog(logger, thresholds)

    Return a request logger middleware with custom `thresholds`:

```js
{
    "warn": 3000,   // logger.warn after 3000ms
    "error": 5000   // logger.error after 5000ms
}
```


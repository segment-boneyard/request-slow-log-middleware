# request-slow-log-middleware

  Log an [express](https://github.com/visionmedia/express) request if the response is slow.

## Example

```js
var requestLog = require('request-log-middleware');
var slowLog = require('request-slow-log-middleware');
var logger = new require('winston').Logger();

var app = express();

app.configure('production', function () {
  app.use(requestLog(logger));
  app.use(slowLog(logger));
});
```

## API

### requestLog(logger, thresholds)

  Return a slow request logger middleware with custom `thresholds`:

```js
{
    "warn": 3000,   // logger.warn after 3000ms
    "error": 5000   // logger.error after 5000ms
}
```

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

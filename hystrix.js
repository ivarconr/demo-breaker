var CommandFactory = require('hystrixjs').commandFactory;

var q = require("q");
var service = require('./external-service');

var run = function(arg) {
  var deferred = q.defer();
  service.fetchSlowData(arg, function(err, data) {
    if(err) {
      console.log("error!");
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

var serviceCommand = CommandFactory.getOrCreate('test slow service')
    .circuitBreakerErrorThresholdPercentage(20)
    .timeout(600)
    .run(run)
    .circuitBreakerRequestVolumeThreshold(10)
    .circuitBreakerSleepWindowInMilliseconds(10)
    .statisticalWindowLength(10000)
    .statisticalWindowNumberOfBuckets(10)
    .build();


function handleSuccess(data) {
  console.log(`SUCCESS: ${data}`);
}

function handleError(err) {
  console.log(`ERROR: ${err}`);
}

for(var i=0;i<1000;i++) {
  serviceCommand.execute(800).then(handleSuccess, handleError);
}

var CircuitBreaker = require('circuit-breaker-js');
var service = require('./external-service');

var breaker = new CircuitBreaker({
  timeoutDuration: 500,
  numBuckets: 10,
  volumeThreshold: 10,
  errorThreshold: 1
});

var fallback = function() {
  console.log('500  - fallback loaded!');
}

breaker.onCircuitOpen = function(metrics) {
  console.warn('Circuit open', metrics);
};

breaker.onCircuitClose = function(metrics) {
  console.warn('Circuit close', metrics);
};

var command = function(count, success, failure) {
  service.fetchSlowData(1000, function(error, data) {
    if(error) {
      failure();
      return;
    }
    console.log(`#${count}: ${data}`);
    success();
  });
};

breaker.run(command.bind(this, i), fallback);

for(var i=0;i<100;i++) {
  breaker.run(command.bind(this, i), fallback);
}

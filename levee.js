var Levee = require('levee');
var service = require('./external-service');


var options, circuit;

options = {
    maxFailures: 5,
    timeout: 500,
    resetTimeout: 0
};

circuit = Levee.createBreaker(service.fetchSlowData, options);

//feedback!
// circuit.on('timeout', function () {
//     console.log('Request timed out.');
// });
//
// circuit.on('failure', function (err) {
//     console.log('Request failed.', err);
// });

for(var i=0;i<100;i++) {
  circuit.run(900, function (i, err, payload) {
      // If the service fails or timeouts occur 5 consecutive times,
      // the breaker opens, fast failing subsequent requests.
      console.log(`${i} ${err || payload} is open: ${circuit.isOpen()}`);
  }.bind(null, i));
}

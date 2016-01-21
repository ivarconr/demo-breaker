var circuit_breaker  = require('circuit-breaker');
var service = require('./external-service');


var gated_function = circuit_breaker.new_circuit_breaker(service.fetchSlowData,
                                                           5 /* max_failures */,
                                                           300 /* call_timeout_ms */,
                                                           10 /* reset_timeout_ms */);
for(var i=0;i<100;i++) {
  gated_function(1000, function (error, result) {
    if(error) {
      console.log(`Error: ${error}`);
      return;
    }
    console.log(`Success: ${result}`);
  });
}

var minLatency = 100;

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fetchSlowData(latency, callback) {
  var timeout = getRandomArbitrary(minLatency, latency);
  setTimeout(callback, timeout, undefined, "service data");
}

module.exports = {
  fetchSlowData: fetchSlowData
}

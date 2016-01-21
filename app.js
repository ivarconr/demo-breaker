var koa = require('koa');
var app = koa();

var PORT = process.env.PORT || 3000;

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(PORT);

console.log(`server running at http://localhost:${PORT}`);

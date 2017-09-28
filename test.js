var express = require('express')
var session = require('express-session')
//var cookieParser = require('cookie-parser')
var flash = require('connect-flash')

var app = express()

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}))
//app.use(cookieParser());
app.use(flash());

app.get('/flash', function(req, res){
	req.flash('error', '已登录')
	res.redirect('/')
})

app.get('/', function(req, res, next){
	res.end('ok')

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

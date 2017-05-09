const express = require('express');
const path = require('path')

const indexRouter = require('./routes/index.js');

const port = process.env.PORT || 1994;
const host = process.env.HOST || '0.0.0.0';

const app = express()
	.use(express.static('dist'))
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, './views'))
	.use(socketMiddleware)
	.use('/', indexRouter);
const server = app.listen(port, host, listening);

function listening() {
	console.log('Listening on port ' + port);
}

class Caterer {
	constructor(title, ratio, image) {
		this.title = title;
		this.ratio = ratio;
		this.image = image;
	}
}

const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log(`Client ${socket.id} connected`);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

function socketMiddleware(req, res, next) {
	req.io = io;
	next();
}

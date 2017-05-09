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

const ranking = [
	new Caterer('CURRYUP', .4, '//www.curryup.nl/wp-content/uploads/bfi_thumb/DSC_2399_low-m1kpvub638062sle3p0m72omgf1bzvs5iidnv0x5q8.jpg'),
	new Caterer('Tea & Crumpets', .1, '//s-media-cache-ak0.pinimg.com/736x/77/d0/0e/77d00e080f016966f2c1bd67573f744c.jpg'),
	new Caterer('Taco - Border grill', .8, '//theorangecat.lajoiedevivremedia.com/files/2014/07/Fancy-Food-Truck-Fridays-at-Websters-Pharmacy-Orange-Cat-dot-Net.png')
];

const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log(`Client ${socket.id} connected`);
	socket.emit('publishRanking', ranking);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

function socketMiddleware(req, res, next) {
	req.io = io;
	next();
}

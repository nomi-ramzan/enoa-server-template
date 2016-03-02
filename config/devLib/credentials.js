var orientAdapter = require('sails-orientdb');

CONF.DB = {
	defaults: {migrate: 'safe'},
	adapters: {'default': orientAdapter,orient: orientAdapter},
	connections: {
		myLocalOrient: {
			adapter: 'orient',
			host: process.env.IP || 'localhost', // 127.0.0.1
			port:2424,
			user: 'root',
			password: process.env.PASS || 'root',
			database: process.env.DB || 'enoaDB'
		}
	}
}
CONF.TOKEN = {
	EXP:{ minutes:1 }, /* years/y | quarters/Q | months/M | weeks/w | days/d | hours/h | minutes/m | seconds/s | milliseconds/s */
	SECR:{
		HEADER:{ alg: 'HS256' },
		KEY:process.env.TOKEN_SECRATE || "enoaTokenKey"
	}
}
const Client = require("mysql-pro")
const client = new Client({
	mysql:{
		user:'root',
		password:'123qwe',
		database:'server',
		host:'127.0.0.1',
		port:3306
	}
})
module.exports = client
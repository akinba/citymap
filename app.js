const express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	pg = require('pg'),
	Sequelize = require('sequelize'),
	os = require('os')
;

let app = express();
let port = process.env.PORT || '3002';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);
app.set("view engine", "ejs");

//set database
/*if (os.hostname()=='raspi') {
    let db = new Sequelize("postgres://postgres:pi@localhost:5432/maks");
} else {
    let db = new Sequelize("postgres://postgres:pi@www.akinba.com:5432/maks"
        //,{logging:false}
    );
}*/
let db = new Sequelize("postgres://postgres:pi@192.168.2.225:5432/maks");


app.get("/", (req,res)=>{
    db.query("select 'Feature' as type, id, geom geometry from yapi", {type: Sequelize.QueryTypes.SELECT})
        .then((rows)=>{
            console.log(rows);
            res.render('index', {yapi: rows});
        });
});

app.listen(port, ()=>{
	console.log(`App is running at ${port}`);
});
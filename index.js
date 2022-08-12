const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const PORT = 3001;
const db = mysql.createPool({
    hostname: 'us-cdbr-east-06.cleardb.net',
    user: 'be67012758069e',
    password: '9d65f2d4',
    database: 'heroku_22b6e1917685152',
    connectionLimit: 10

});
//mysql://be67012758069e:9d65f2d4@us-cdbr-east-06.cleardb.net/heroku_22b6e1917685152?reconnect=true trayinfo
//mysql://b71f2d33ce9385:a02a3a4d@us-cdbr-east-06.cleardb.net/heroku_e8ff83b01220c86?reconnect=true login


const dblogin = mysql.createPool({
    hostname: 'us-cdbr-east-06.cleardb.net',
    user: 'b71f2d33ce9385',
    password: 'a02a3a4d',
    database: 'heroku_e8ff83b01220c86',
    connectionLimit: 2

});
app.use(cors({
    origin: ['https://superb-churros-56b022.netlify.app', 'https://superb-churros-56b022.netlify.app/reporter', 'https://superb-churros-56b022.netlify.app/viewer', 'https://mlmdb.herokuapp.com'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'UserID',
    secret: 'thissessionissecret',
    resave: false,
    saveUnintialized: false,
    cookie: {expires: 60 * 60 * 24 }
}));

app.get('/api/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, loggedUser: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

app.post('/api/login', (req, res) => {
    const username = req.body.fusername;
    const password = req.body.fpassword;

    dblogin.query("SELECT * FROM staff WHERE username = ?;", [username], (err, result) => {
        if (err) {
            res.send({ err: err });
            console.log(err);
        }

        if (result.length > 0) {
            if (password === result[0].password) {
                req.session.user = result;
                res.send(result);
            }else{
                res.send({ message: "Wrong username or password!" });
            }
        } else {
            res.send({ message: "User Does not exists!" });
        }
    });
});
app.post('/api/logoff', (req, res) => {
    //console.log('init logoff');
    req.session.destroy();
    res.send(true);
});

app.post('/api/insert', (req, res) => {
    const newTrayname = req.body.ftrayname;
    const newCurrentLocation = req.body.fcurrentlocation;
    const newNotes = req.body.fnotes;
    const newRoomVal = req.body.fradioVal;
    const newUrgentVal = req.body.fisUrgent;
    const newTime = req.body.fdate;
    const newCasecart = req.body.fcasecart;

    console.log(newTrayname + ' ' + newCurrentLocation + ' ' + newNotes + ' ' + newRoomVal + ' ' + newUrgentVal);
    const sqlquery = `INSERT INTO trayinfo (trayname, currentLocation, notes, roomnum, isUrgent, timeadded, casecartnum) VALUES (?,?,?,?,?,?,?)`;
    db.query(sqlquery, [newTrayname, newCurrentLocation, newNotes, newRoomVal, newUrgentVal, newTime, newCasecart], (err, result) => {
        if (err) { console.log("..." + err); }
        res.send('post added...');

    });

});




app.get('/api/get/or1', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 1 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or2', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 2 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or3', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 3 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or4', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 4 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or5', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 5 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or6', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 6 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or7', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 7 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or8', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 8 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or9', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 9 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or10', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 10 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or11', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 11 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or12', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 12 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or13', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 13 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or14', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 14 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or15', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 15 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or16', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 16 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or17', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 17 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or18', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 18 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or19', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 19 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or20', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 20 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or21', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 21 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or22', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 22 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or23', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 23 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or24', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 24 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or25', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 25 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or26', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 26 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or27', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 27 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or28', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 28 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or29', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 29 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or30', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 30 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/or31', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 31 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/get/or32', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE roomnum = 32 AND isUrgent = 0";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});

app.get('/api/get/urgentTrays', (req, res) => {
    const sqlselect = "SELECT * FROM trayinfo WHERE isUrgent = 1";
    db.query(sqlselect, (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    });
});



app.delete('/api/delete/:tname', (req, res) => {

    const name = req.params.tname;
    const sqlquery = "DELETE FROM trayinfo WHERE id = ?";
    db.query(sqlquery, name, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });

});

app.put('/api/update/location', (req, res) => {
    const id = req.body.fid;
    const location = req.body.fcurrentLocation;


    const sqlquery = 'UPDATE trayinfo SET currentLocation = ? WHERE id = ?';
    db.query(sqlquery, [location, id], (err, result) => {
        if (err) { console.log("..." + err); }
        res.send('updated location...');

    });
});
app.put('/api/update/casecart', (req, res) => {
    const id = req.body.fid;
    const casecart = req.body.fcasecart;


    const sqlquery = 'UPDATE trayinfo SET casecartnum = ? WHERE id = ?';
    db.query(sqlquery, [casecart, id], (err, result) => {
        if (err) { console.log("..." + err); }
        res.send('updated case cart num...');

    });
});

app.put('/api/update/trayname', (req, res) => {
    const id = req.body.fid;
    const name = req.body.fname;


    const sqlquery = 'UPDATE trayinfo SET trayname = ? WHERE id = ?';
    db.query(sqlquery, [name, id], (err, result) => {
        if (err) { console.log("..." + err); }
        res.send('updated tray name...');

    });
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`running on port ${PORT}`);

});

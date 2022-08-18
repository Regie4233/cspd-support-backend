const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 3001;

let or1 = [];
let or2 = [];
let or3 = [];
let or4 = [];
let or5 = [];
let or6 = [];
let or7 = [];
let or8 = [];
let or9 = [];
let or10 = [];
let or11 = [];
let or12 = [];
let or13 = [];
let or14 = [];
let or15 = [];
let or16 = [];
let or17 = [];
let or18 = [];
let or19 = [];
let or20 = [];
let or21 = [];
let or22 = [];
let or23 = [];
let or24 = [];
let or25 = [];
let or26 = [];
let or27 = [];
let or28 = [];
let or29 = [];
let or30 = [];
let or31 = [];
let or32 = [];
let room_arr = [or1, or2, or3, or4, or5, or6, or7, or8, or9, or10, or11, or12, or13, or14, or15, or16, or17, or18, or19, or20,
    or21, or22, or23, or24, or25, or26, or27, or28, or29, or30, or31, or32];
// let room_arr = [];

const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be67012758069e',
    password: '9d65f2d4',
    database: 'heroku_22b6e1917685152',

});
//mysql://be67012758069e:9d65f2d4@us-cdbr-east-06.cleardb.net/heroku_22b6e1917685152?reconnect=true trayinfo
//mysql://b71f2d33ce9385:a02a3a4d@us-cdbr-east-06.cleardb.net/heroku_e8ff83b01220c86?reconnect=true login


// const dblogin = mysql.createPool({
//     hostname: 'us-cdbr-east-06.cleardb.net',
//     user: 'b71f2d33ce9385',
//     password: 'a02a3a4d',
//     database: 'heroku_e8ff83b01220c86',
//     connectionLimit: 2

// });
app.use(cors({
    origin: ['https://regie4233.github.io', 'https://regie4233.github.io/cspd-support', 'https://regie4233.github.io/cspd-support/reporter', 'https://regie4233.github.io/cspd-support/viewer', 'https://regie4233.github.io/cspd-support/login'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'UserID',
    secret: 'thissessionissecret',
    resave: false,
    saveUnintialized: false,
    // cookie: { expires: 60 * 60 * 24},

    cookie: { expires: 60 * 60 * 24 * 1000, secure: true, sameSite: 'none' },

}));
// app.get('/api/loginstatus', (req, res) => {
//     if(req.session.user){
//         res.send({loggedIn: true, loggedUser: req.session.user});
//     }else{
//         res.send({loggedIn: false});
//     }
// });

app.post('/api/login', (req, res) => {
    const username = req.body.fusername;
    const password = req.body.fpassword;

    db.query("SELECT * FROM usrlogin WHERE username = ?", [username], (err, result) => {
        if (err) {
            res.send({ err: err });
            console.log(err);
        }

        if (result.length > 0) {
            if (password === result[0].password) {
                req.session.user = result;
                res.send(result);
            } else {
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
// function populateRoom(roomarray, newarray){

// }
app.get('/api/get/traydata', (req, res) => {
    db.query('SELECT * FROM trayinfo', (err, result) => {
        if (err) console.log(err); //took out throw eerro

        // let temp_or1 = []; 
        // let temp_or12 = [];let temp_or13 = [];
        // let temp_or2 = []; let temp_or14 = [];
        // let temp_or3 = []; let temp_or15 = [];
        // let temp_or4 = []; let temp_or16 = [];
        // let temp_or5 = []; let temp_or17 = [];
        // let temp_or6 = []; let temp_or18 = [];
        // let temp_or7 = []; let temp_or19 = [];
        // let temp_or8 = []; let temp_or20 = [];
        // let temp_or9 = []; let temp_or21 = [];
        // let temp_or10 = []; let temp_or22 = [];
        // let temp_or24 = [];let temp_or27 = [];
        // let temp_or11 = []; let temp_or25 = [];
        // let temp_or23 = []; let temp_or28 = [];
        // let temp_or26 = []; let temp_or31 = [];
        // let temp_or29 = []; let temp_or32 = [];
        // let temp_or30 = [];
        // for (let i = 0; i < result.length; i++) {
        //     if (result[i].roomnum === 1) {
        //         temp_or1.push(result[i]);
        //     } else if (result[i].roomnum === 2) {
        //         temp_or2.push(result[i]);
        //     } else if (result[i].roomnum === 3) {
        //         temp_or3.push(result[i]);
        //     } else if (result[i].roomnum === 4) {
        //         temp_or4.push(result[i]);
        //     } else if (result[i].roomnum === 5) {
        //         temp_or5.push(result[i]);
        //     } else if (result[i].roomnum === 6) {
        //         temp_or6.push(result[i]);
        //     } else if (result[i].roomnum === 7) {
        //         temp_or7.push(result[i]);
        //     } else if (result[i].roomnum === 8) {
        //         temp_or8.push(result[i]);
        //     } else if (result[i].roomnum === 9) {
        //         temp_or9.push(result[i]);
        //     } else if (result[i].roomnum === 10) {
        //         temp_or10.push(result[i]);
        //     }else if (result[i].roomnum === 11) {
        //         temp_or11.push(result[i]);
        //     } else if (result[i].roomnum === 12) {
        //         temp_or12.push(result[i]);
        //     } else if (result[i].roomnum === 13) {
        //         temp_or13.push(result[i]);
        //     } else if (result[i].roomnum === 14) {
        //         temp_or14.push(result[i]);
        //     } else if (result[i].roomnum === 15) {
        //         temp_or15.push(result[i]);
        //     } else if (result[i].roomnum === 16) {
        //         temp_or16.push(result[i]);
        //     } else if (result[i].roomnum === 17) {
        //         temp_or17.push(result[i]);
        //     } else if (result[i].roomnum === 18) {
        //         temp_or18.push(result[i]);
        //     } else if (result[i].roomnum === 19) {
        //         temp_or19.push(result[i]);
        //     } else if (result[i].roomnum === 20) {
        //         temp_or20.push(result[i]);
        //     } else if (result[i].roomnum === 21) {
        //         temp_or21.push(result[i]);
        //     } else if (result[i].roomnum === 22) {
        //         temp_or22.push(result[i]);
        //     } else if (result[i].roomnum === 23) {
        //         temp_or23.push(result[i]);
        //     } else if (result[i].roomnum === 24) {
        //         temp_or24.push(result[i]);
        //     } else if (result[i].roomnum === 25) {
        //         temp_or25.push(result[i]);
        //     } else if (result[i].roomnum === 26) {
        //         temp_or26.push(result[i]);
        //     } else if (result[i].roomnum === 27) {
        //         temp_or27.push(result[i]);
        //     } else if (result[i].roomnum === 28) {
        //         temp_or28.push(result[i]);
        //     } else if (result[i].roomnum === 29) {
        //         temp_or29.push(result[i]);
        //     } else if (result[i].roomnum === 30) {
        //         temp_or30.push(result[i]);
        //     }else if (result[i].roomnum === 31) {
        //         temp_or31.push(result[i]);
        //     } else if (result[i].roomnum === 32) {
        //         temp_or32.push(result[i]);
        //     }
        //     or1 = temp_or1;
        //     or2 = temp_or2;
        //     or3 = temp_or3;
        //     or4 = temp_or4;
        //     or5 = temp_or5;
        //     or6 = temp_or6;
        //     or7 = temp_or7;
        //     or8 = temp_or8;
        //     or9 = temp_or9;
        //     or10 = temp_or10;
        //     or11 = temp_or11;
        //     or12 = temp_or12;
        //     or13 = temp_or13;
        //     or14 = temp_or14;
        //     or15 = temp_or15;
        //     or16 = temp_or16;
        //     or17 = temp_or17;
        //     or18 = temp_or18;
        //     or19 = temp_or19;
        //     or20 = temp_or20;
        //     or21 = temp_or21;
        //     or22 = temp_or22;
        //     or23 = temp_or23;
        //     or24 = temp_or24;
        //     or25 = temp_or25;
        //     or26 = temp_or26;
        //     or27 = temp_or27;
        //     or28 = temp_or28;
        //     or29 = temp_or29;
        //     or30 = temp_or30;
        //     or31 = temp_or31;
        //     or32 = temp_or32;
        // }
        // res.send({ or1, or2, or3, or4, or5, or6, or7, or8, or9, or10, or11, or12, or13, or14, or15, or16, or17, or18, or19, or20,
        //     or21, or22, or23, or24, or25, or26, or27, or28, or29, or30, or31, or32});
        for (let i = 0; i < 31; i++) {
            let temp_arr = [];
            for (let y = 0; y < result.length; y++) {
                if (result[y].roomnum === i) {
                    temp_arr.push(result[y]);
                }
            }
            const copied = copied.push(temp_arr);
            room_arr[i] = copied;
            //room_arr[i].push(...temp_arr);

        }
        res.send({
            or1, or2, or3, or4, or5, or6, or7, or8, or9, or10, or11, or12, or13, or14, or15, or16, or17, or18, or19, or20,
            or21, or22, or23, or24, or25, or26, or27, or28, or29, or30, or31, or32
        });
        
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


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);

});

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'post_office_db'
});

con.connect(function(err) {
    if(!err) {
        console.log('Connection has been established successfully!');
    }
    else if(err) {
        console.log('Unable to connect to the database: ', err);
    }
});

router.post('/users', function(req, res) {
    let sql = 'INSERT INTO user (first_name, last_name, username, phone_number, status, e_mail, password, gender, age) VALUES ?';
    let values = [
        [
            req.body.first_name,
            req.body.last_name,
            req.body.username,
            req.body.phone_number,
            'user',
            req.body.e_mail,
            req.body.password,
            req.body.gender,
            req.body.age
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.post('/authenticate', function(req, res) {
    console.log('body: ', req.body);
    let email = req.body.e_mail;
    let password = req.body.password;
    let sql = 'SELECT * from user WHERE e_mail = ? AND password = ? LIMIT 1';
    con.query(sql, [email, password], function(err, rows, fields) {
        if(!err) {
            res.json(rows[0]);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.get('/cities', function(req, res) {
    let sql = 'SELECT * from city';
    con.query(sql, function(err, rows, results) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.get('/offices', function(req, res) {
    let value = req.query.value;
    let sql = 'SELECT * from office WHERE city_id = ?';
    con.query(sql, value, function(err, rows, results) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
   })
});

router.post('/statements', function(req, res) {
    let sql = 'INSERT INTO statement (user_id, product_name, weight, storage_conditions, count, status, delivery_status, recipient_first_name, recipient_last_name, recipient_phone, shipping_city, shipping_address, delivery_city, delivery_address) VALUES ?';
    let values = [
        [
            req.body.user_id,
            req.body.order.product_name,
            req.body.order.weight,
            req.body.order.storage_conditions,
            req.body.order.count,
            'none',
            'waiting for sending',
            req.body.order.recipient.first_name,
            req.body.order.recipient.last_name,
            req.body.order.recipient.phone_number,
            req.body.order.shipping_city.city_name,
            req.body.order.shipping_address,
            req.body.order.delivery_city.city_name,
            req.body.order.delivery_address
        ]
];
    con.query(
        sql, [values], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.post('/statements1', function(req, res) {
    let sql = 'INSERT INTO statement (user_id, product_name, weight, storage_conditions, count, status, delivery_status, recipient_first_name, recipient_last_name, recipient_phone, shipping_city, shipping_address, delivery_city, delivery_address) VALUES ?';
    let values = [
        [
            req.body.user_id,
            req.body.order1.product_name,
            req.body.order1.weight,
            req.body.order1.storage_conditions,
            req.body.order1.count,
            'none',
            'waiting for sending',
            req.body.order1.recipient_first_name,
            req.body.order1.recipient_last_name,
            req.body.order1.recipient_phone,
            req.body.order1.shipping_city.city_name,
            req.body.order1.shipping_address,
            req.body.order1.delivery_city.city_name,
            req.body.order1.delivery_address
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    });
});

router.get('/statements', function(req, res) {
    let sql = 'SELECT * from statement WHERE status = "none"';
    con.query(sql, function(err, rows ,fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.put('/approve/:statement_id', function(req, res) {
    let sql = 'UPDATE statement SET status = "true" WHERE statement_id = ? AND status = "none"';
    let statementId = req.params.statement_id;
    con.query(sql, statementId, function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.put('/refuse/:statement_id', function(req, res) {
    let sql = 'UPDATE statement SET status = "false" WHERE statement_id = ? AND status = "none"';
    let statementId = req.params.statement_id;
    con.query(sql, statementId, function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.get('/users', function(req, res) {
    let sql = 'SELECT * from user';
    con.query(sql, function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.post('/moder', function(req, res) {
    let sql = 'INSERT INTO user (first_name, last_name, username, phone_number, status, e_mail, password, gender, age) VALUES ?';
    let values = [
        [
            req.body.first_name,
            req.body.last_name,
            req.body.username,
            req.body.phone_number,
            'moderator',
            req.body.e_mail,
            req.body.password,
            req.body.gender,
            req.body.age
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.get('/myorder/:user_id', function(req, res) {
    let userId = req.params.user_id;
    let sql = 'SELECT * from statement WHERE user_id = ? AND status = "true"';
    con.query(sql, userId, function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.get('/drivers', function(req, res) {
    let sql = 'SELECT * from drivers';
    con.query(sql, function(err, rows, result) {
      if(!err) {
          res.json(rows);
      } else if(err) {
          res.status(500).send(err);
      }
   });
});

module.exports = router;
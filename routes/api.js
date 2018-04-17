const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: 'Nikita06021999',
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

router.post('/users', (req, res) => {
    let sql = 'INSERT INTO user (e_mail, password) VALUES ?';
    let values = [
        [
            req.body.user.e_mail,
            req.body.user.password
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if (err) {
            return res.status(500).send(err);
        }
        let sql = 'INSERT INTO client(user_id, client_first_name, client_last_name, client_username, client_phone_number, client_status, client_gender, client_age) VALUES ?';
        let values = [
            [
                rows.insertId,
                req.body.client.client_first_name,
                req.body.client.client_last_name,
                req.body.client.client_username,
                req.body.client.client_phone_number,
                'user',
                req.body.client.client_gender,
                req.body.client.client_age
            ]
        ];
        con.query(sql, [ values ], function(err, rows, fields) {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rows);
        });

    });
});

router.post('/sender', function(req, res) {
   let sql = 'INSERT INTO client(client_first_name, client_last_name, client_phone_number) VALUES ?';
   let values = [
       [
           req.body.client.client_first_name,
           req.body.client.client_last_name,
           req.body.client.client_phone
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

router.post('/recipient', function(req, res) {
    let sql = 'INSERT INTO client(client_first_name, client_last_name, client_phone_number) VALUES ?';
    let values = [
        [
            req.body.client1.recipient_first_name,
            req.body.client1.recipient_last_name,
            req.body.client1.recipient_phone
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err)
        }
    })
});

router.post('/authenticate', function(req, res) {
    console.log('body: ', req.body);
    let email = req.body.e_mail;
    let password = req.body.password;
    let sql = 'SELECT * FROM client WHERE client.user_id IN (SELECT user_id from user WHERE user.e_mail = ? AND user.password = ?) LIMIT 1';
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
    console.log(req.body);
    let sql = 'INSERT INTO statement (client_id, sender_first_name, sender_last_name, sender_phone, product_name, weight, storage_conditions, count, status, delivery_status, recipient_first_name, recipient_last_name, recipient_phone, shipping_city, shipping_address, delivery_city, delivery_address) VALUES ?';
    let values = [
        [
            req.body.client_id,
            req.body.sender_fn,
            req.body.sender_ln,
            req.body.sender_ph,
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
    con.query(sql, [values], function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.post('/statements1', function(req, res) {
    console.log(req.body);
    let sql = 'INSERT INTO statement (client_id, sender_first_name, sender_last_name, sender_phone, product_name, weight, storage_conditions, count, status, delivery_status, recipient_first_name, recipient_last_name, recipient_phone, shipping_city, shipping_address, delivery_city, delivery_address) VALUES ?';
    let values = [
        [
            req.body.client_id,
            req.body.sender_fn1,
            req.body.sender_ln1,
            req.body.sender_ph1,
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

router.post('/statements2', function(req, res) {
   let sql = 'INSERT INTO statement (sender_first_name, sender_last_name, sender_phone, product_name, weight, storage_conditions, count, status, delivery_status, recipient_first_name, recipient_last_name, recipient_phone, shipping_city, shipping_address, delivery_city, delivery_address) VALUES ?';
   let values = [
       [
           req.body.order2.client_first_name,
           req.body.order2.client_last_name,
           req.body.order2.client_phone,
           req.body.order2.product_name,
           req.body.order2.weight,
           req.body.order2.storage_conditions,
           req.body.order2.count,
           'true',
           'waiting for sending',
           req.body.order2.recipient_first_name,
           req.body.order2.recipient_last_name,
           req.body.order2.recipient_phone,
           req.body.order2.shipping_city.city_name,
           req.body.order2.shipping_address,
           req.body.order2.delivery_city.city_name,
           req.body.order2.delivery_address
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
    let sql = 'SELECT * from client';
    con.query(sql, function(err, rows, fields) {
        if(!err) {
            res.json(rows);
        } else if(err) {
            res.status(500).send(err);
        }
    })
});

router.post('/moder', (req, res) => {
    console.log(req.body);
    let sql = 'INSERT INTO user (e_mail, password) VALUES ?';
    let values = [
        [
            req.body.user1.e_mail,
            req.body.user1.password
        ]
    ];
    con.query(sql, [ values ], function(err, rows, fields) {
        if (err) {
            return res.status(500).send(err);
        }
        let sql = 'INSERT INTO client(user_id, client_first_name, client_last_name, client_username, client_phone_number, client_status, client_gender, client_age) VALUES ?';
        let values = [
            [
                rows.insertId,
                req.body.client1.client_first_name,
                req.body.client1.client_last_name,
                req.body.client1.client_username,
                req.body.client1.client_phone_number,
                'moderator',
                req.body.client1.client_gender,
                req.body.client1.client_age
            ]
        ];
        con.query(sql, [ values ], function(err, rows, fields) {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rows);
        });

    });
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
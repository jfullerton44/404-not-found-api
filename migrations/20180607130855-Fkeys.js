'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.addForeignKey('project', 'charity', 'charity_id',
    {
      'charity_id': 'id'
    },
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }, db.addForeignKey('address', 'user', 'Auser_id',
      {
        'user_id': 'id'
      },
      {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }, db.addForeignKey('donation', 'user', 'Duser_id',
        {
          'user_id': 'id'
        },
        {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        }, db.addForeignKey('donation', 'charity', 'Dcharity_id',
          {
            'charity_id': 'id'
          },
          {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          }, db.addForeignKey('payment_method', 'user', 'Puser_id',
            {
              'user_id': 'id'
            },
            {
              onDelete: 'RESTRICT',
              onUpdate: 'RESTRICT'
            }, db.addForeignKey('post', 'project', 'project_id',
              {
                'project_id': 'id'
              },
              {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              }, callback))))));
};

exports.down = function (db, callback) {
  db.removeForeignKey('project', 'charity_id',
    db.removeForeignKey('address', 'Auser_id',
      db.removeForeignKey('donation', 'Duser_id',
        db.removeForeignKey('donation', 'Dcharity_id',
          db.removeForeignKey('payment_method', 'Puser_id',
            db.removeForeignKey('post', 'project_id', callback))))));
};

exports._meta = {
  "version": 1
};

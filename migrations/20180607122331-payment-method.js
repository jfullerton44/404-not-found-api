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
  db.createTable('payment_method', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: 'int',
      notNull: true
    },
    creditCardNumber: {
      type: 'string',
      length: 16,
      notNull: true
    },
    expirationDate: {
      type: 'datetime',
      notNull: true
    },
    securityCode: {
      type: 'string',
      length: 4,
      notNull: true
    },
    nameOnCard: {
      type: 'text',
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('payment_method', callback);
};


exports._meta = {
  "version": 1
};

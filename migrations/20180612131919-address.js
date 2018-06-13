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
  db.createTable('address', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: 'int',
      defaultValue: -1
    },
    charity_id: {
      type: 'int',
      defaultValue: -1
    },
    bank_id: {
      type: 'int',
      defaultValue: -1
    },
    street: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string',
    },
    zip: {
      type: 'number'
    }
  }, callback);
};

exports.down = function (db, callback) {

  db.dropTable('address', callback);
};

exports._meta = {
  "version": 1
};

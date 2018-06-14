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
      notNull: true,
      foreignKey: {
        name: 'payment_method_user_id_foreign',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    name: {
      type: 'string',
      notNull: true
    },
    lastFourCardNum: {
      type: 'string',
      length: 4,
      notNull: true
    },
    cardToken: {
      type: 'string',
      length: 2048,
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

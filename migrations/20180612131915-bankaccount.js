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
  db.createTable('bankaccount', {
    charity_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'bankaccount_charity_id_foreign',
        table: 'charity',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    bank_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'bankaccount_bank_id_foreign',
        table: 'bank',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    accountNum: {
      type: 'int',
      notNull: true
    },
    routingNum: {
      type: 'int',
      notNull: true
    }
  }, callback);
};


exports.down = function (db, callback) {
  return db.dropTable('bankaccount', callback);
};

exports._meta = {
  "version": 1
};

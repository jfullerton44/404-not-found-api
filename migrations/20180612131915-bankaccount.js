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
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    charity_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'bankaccount_charity_id_foreign',
        table: 'charity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
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
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    accountNum: {
      type: 'string',
      notNull: true
    },
    routingNum: {
      type: 'string',
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

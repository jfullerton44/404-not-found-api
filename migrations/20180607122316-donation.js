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
  db.createTable('donation', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    amount_donated: {
      type: 'int',
      notNull: true
    },
    charity_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'donation_charity_id_foreign',
        table: 'charity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'donation_user_id_foreign',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    date: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('donation', callback);
};


exports._meta = {
  "version": 1
};

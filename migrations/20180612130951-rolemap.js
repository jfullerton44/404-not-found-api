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
  db.createTable('rolemap', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'rolemap_user_id_foreign',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    role_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'rolemap_role_id_foreign',
        table: 'role',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  }, callback);
};


exports.down = function (db, callback) {
  return db.dropTable('rolemap', callback);
};

exports._meta = {
  "version": 1
};

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
  db.createTable('project', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    charity_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'project_charity_id_foreign',
        table: 'charity',
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
    description: {
      type: 'text'
    },
    photolink: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('project', callback);
};


exports._meta = {
  "version": 1
};

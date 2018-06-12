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
  db.createTable('post', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'post_project_id_foreign',
        table: 'project',
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
    body: {
      type: 'string'
    },
    photoLink: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('post', callback);
};


exports._meta = {
  "version": 1
};

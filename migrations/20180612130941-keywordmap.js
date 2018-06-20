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
  db.createTable('keywordmap', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'keywordmap_project_id_foreign',
        table: 'project',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    keyword_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'keywordmap_keyword_id_foreign',
        table: 'keyword',
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
  return db.dropTable('keywordmap', callback);
};

exports._meta = {
  "version": 1
};

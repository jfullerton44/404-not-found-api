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
  db.createTable('keyword', {
    id: {
      type: 'int',
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    },
    keyword: {
      type: 'string',
      notNull: true
    }
  }, callback);
};


exports.down = function (db, callback) {
  return db.dropTable('keyword', callback);
};

exports._meta = {
  "version": 1
};

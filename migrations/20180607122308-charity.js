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
  db.createTable('charity', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    description: {
      type: 'text'
    },
    descriptionFull: {
      type: 'text'
    },
    email: {
      type: 'text'
    },
    photoLink: {
      type: 'string'
    },
    photoLink2: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    website: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('charity', callback);
};

exports._meta = {
  "version": 1
};

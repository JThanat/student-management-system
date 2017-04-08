// this file contains the script which we might run automatically to create Table

// This is user creating example, it should be replaced soon
// DON'T FORGET TO  DROP TABLE IF EXIST
const createUserTableQuery = '' +
  'CREATE TABLE users ( ' +
  'id                    	INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
  'display_name						VARCHAR(100) NULL, ' +
  'email										VARCHAR(45) NULL, ' +
  'password								VARCHAR(255) NULL, ' +
  'last_updated						DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
  'date_created						DATETIME DEFAULT CURRENT_TIMESTAMP, ' +
  'PRIMARY KEY(id) ' + ');'

// -------------------------------------------- query strings ---------------------------------------------//
// --------------------------------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------//

const queryString = {
  createUserTableQuery: createUserTableQuery
}
module.exports = queryString

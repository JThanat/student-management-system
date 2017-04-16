// You can test your own connection using any database from your local

module.exports = {
  test: true,
  db: {
    hostName: 'localhost',
    port: 3306,
    user: 'username_should_be_replaced',
    password: 'password_should_be_secret',
    databaseName: 'databaseName_should_be_replaced',
    debug: true
  }
}

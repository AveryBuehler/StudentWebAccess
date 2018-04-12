
let knex = require('./dbconnection.js').connection(process.argv);

// This is primarily for testing

knex.schema.createTable('users', function(table) {
  table.increments('id');
  table.string('username');
  table.string('password');
})// ...and another
.createTable('accounts', function(table) {
  table.increments('id');
  table.string('account_name');
  table.integer('user_id').unsigned().references('users.id');
})// Then query the table...
.then(function() {
  return knex.insert({username: 'Jacob', password: 'testtest'}).into('users'); // TODO: remove test accounts
})// ...and using the insert id, insert into the other table.
.then(function(rows) {
  return knex.table('accounts').insert({account_name: 'knex', user_id: rows[0]});
})// Query both of the rows.
.then(function() {
  return knex('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.username as user', 'accounts.account_name as account');
})// .map over the results
.map(function(row) {
  console.log(row);
}) // Finally, add a .catch handler for the promise chain
.catch(function(e) {
  console.error(e);
});
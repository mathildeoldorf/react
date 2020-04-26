
exports.up = function(knex) {
  return knex.schema
    .createTable("user", (table) => {
        table.increments("ID");
        table.string("username").unique();
        table.string("name");
        table.string("lastName");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.boolean("isActive").defaultTo('1');
        table.string("password");
    })
    .createTable("email", (table) => {
        table.increments("emailID");
        table.string("email");
        table.integer('userID').unsigned().notNullable();
        table.foreign('userID').references('user.ID');
    })
    .createTable("address", (table) => {
        table.increments('addressID');
        table.string('street');
        table.string('streetNumber');
        table.string('postalCode');
        table.string('city');
        table.integer('userID').unsigned().notNullable();
        table.foreign('userID').references('user.ID');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("email")
    .dropTableIfExists("address")
    .dropTableIfExists("user");
};

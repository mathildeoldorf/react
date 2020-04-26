
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('address').del()
  .then(() => {
    return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([ // insert the hashed password instead password
        {username: 'admin', name: 'admin_name', lastName: 'admin_lastname', password: '$2a$10$XLkoswxdlOfwvbtGTpjT.uuS.jGtyrE.AzIX0yQh0e6yo/vXFkFDG'},
        {username: 'poweruser', password: '$2a$10$XLkoswxdlOfwvbtGTpjT.uuS.jGtyrE.AzIX0yQh0e6yo/vXFkFDG'}
      ]);
    }).then((userID) => {
        return knex('address').insert([
          { userID: userID[0],  street: "street", streetNumber: "2", postalCode: "2100", city: "Copenhagen"}
        ])
    });
  })
  
};

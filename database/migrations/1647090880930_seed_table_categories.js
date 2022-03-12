const up = `
    INSERT INTO categories(name) 
    VALUES ('Makanan'),
    ('Minuman'),
    ('Kue')
`;
const down = `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE categories;`;

module.exports = {
    'up': up,
    'down': down,
};

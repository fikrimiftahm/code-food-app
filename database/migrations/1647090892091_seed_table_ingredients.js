const up = `
    INSERT INTO ingredients(recipe_id, item, unit, value) 
    VALUES (1, 'Ayam Negeri', 'Ekor', 1),
    (1, 'Minyak Sayur', 'Sdm', 3),
    (1, 'Air Kelapa', 'Ml', 500),
    (1, 'Daun Salam', 'Lembar', 2),
    (1, 'Daun Jeruk', 'Lembar', 2),
    (1, 'Lengkuas', 'Cm', 3),
    (1, 'Bawang Merah', 'Butir', 8),
    (1, 'Bawang Putih', 'Butir', 4),
    (1, 'Kemiri', 'Butir', 4),
    (1, 'Merica Butiran', 'Sdt', 0.5),
    (1, 'Jahe', 'Cm', 1),
    (1, 'Kunyit', 'Cm', 3),
    (1, 'Gula Merah', 'Gr', 20),
    (1, 'Garam', 'Sdt', 2),
    (2, 'Alpukat', 'Buah', 1),
    (2, 'Susu Kental Manis', 'Sdm', 2),
    (2, 'Gula Pasir', 'Sdm', 1),
    (2, 'Air', 'Ml', 200),
    (2, 'Es Batu', 'Butir', 5)
`;
const down = `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE ingredients;`;

module.exports = {
    'up': up,
    'down': down,
};

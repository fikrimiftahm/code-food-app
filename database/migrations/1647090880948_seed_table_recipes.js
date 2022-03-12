const up = `
    INSERT INTO recipes(category_id, name, image) 
    VALUES (1, 'Ayam Goreng', 'https://www.resepistimewa.com/wp-content/uploads/ayam-goreng-kalasan-khas-yogya.jpg'),
    (2, 'Jus Alpukat', 'https://www.resepmami.info/wp-content/uploads/2021/04/Cara-membuat-jus-alpukat-susu-630x380.jpg.webp')
`;
const down = `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE recipes;`;

module.exports = {
    'up': up,
    'down': down,
};

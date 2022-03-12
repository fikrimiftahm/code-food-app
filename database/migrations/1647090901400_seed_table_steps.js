const up = `
    INSERT INTO steps(recipe_id, step_order, description) 
    VALUES (1, 1, 'Potong-potong ayam menjadi 8 bagian. Cuci bersih lalu tiriskan hingga tidak berair.'),
    (1, 2, 'Bumbu: Giling semua bahan bumbu hingga halus benar.'),
    (1, 3, 'Panaskan minyak, tumis bumbu halus hingga wangi.'),
    (1, 4, 'Tambahkan daun salam, daun jeruk, lengkuas dan serai, aduk rata.'),
    (1, 5, 'Masukkan potongan ayam, aduk hingga kaku.'),
    (1, 6, 'Tuangi air kelapa, tutup wajan. Masak dengan api sedang hingga bumbu meresap dan ayam empuk. Angkat dan dinginkan.'),
    (1, 7, 'Panaskan minyak banyak dalam wajan di atas api sedang.'),
    (1, 8, 'Panaskan minyak banyak dalam wajan di atas api sedang.'),
    (1, 9, 'Panaskan minyak banyak dalam wajan di atas api sedang.'),
    (2, 1, 'Pertama haluskan semua bahan kecuali gula merah cair.'),
    (2, 2, 'Setelah itu tambahkan gula merah cair pada dinding gelas, lalu tuang jus alpukat.'),
    (2, 3, 'Jus alpukat siap disajikan.')
`;
const down = `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE steps;`;

module.exports = {
    'up': up,
    'down': down,
};

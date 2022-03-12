const up = `
    CREATE TABLE recipes (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        category_id INT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        name VARCHAR(255) NOT NULL,
        image TEXT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE recipes`;

module.exports = {
    'up': up,
    'down': down,
};

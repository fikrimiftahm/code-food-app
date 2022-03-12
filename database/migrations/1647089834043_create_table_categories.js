const up = `
    CREATE TABLE categories (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        name VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE categories`;

module.exports = {
    'up': up,
    'down': down,
};

const up = `
    CREATE TABLE users (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        username VARCHAR(255) NOT NULL, 
        UNIQUE KEY username (username), 
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE users`;

module.exports = {
    'up': up,
    'down': down,
};

const up = `
    CREATE TABLE login_attempts (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        username VARCHAR(255) NOT NULL,
        status INT(1) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
        INDEX (created_at, username)
    )
`;
const down = `DROP TABLE login_attempts`;

module.exports = {
    'up': up,
    'down': down,
};

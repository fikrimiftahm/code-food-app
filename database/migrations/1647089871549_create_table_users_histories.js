const up = `
    CREATE TABLE users_histories (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        recipe_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        status VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE users_histories`;

module.exports = {
    'up': up,
    'down': down,
};

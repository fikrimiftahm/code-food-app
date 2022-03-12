const up = `
    CREATE TABLE users_cooks (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        recipe_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        n_of_serving INT NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE users_cooks`;

module.exports = {
    'up': up,
    'down': down,
};

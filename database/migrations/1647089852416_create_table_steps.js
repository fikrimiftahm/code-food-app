const up = `
    CREATE TABLE steps (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        recipe_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        step_order INT NOT NULL,
        description TEXT NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
        UNIQUE KEY steps (recipe_id, step_order)
    )
`;
const down = `DROP TABLE steps`;

module.exports = {
    'up': up,
    'down': down,
};

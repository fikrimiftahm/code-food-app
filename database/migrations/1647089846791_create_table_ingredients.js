const up = `
    CREATE TABLE ingredients (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        recipe_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        item VARCHAR(255) NOT NULL,
        unit VARCHAR(255) NOT NULL,
        value DOUBLE NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
        UNIQUE KEY ingredients (recipe_id, item)
    )
`;
const down = `DROP TABLE ingredients`;

module.exports = {
    'up': up,
    'down': down,
};

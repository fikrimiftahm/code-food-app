const up = `
    CREATE TABLE users_steps (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        step_id INT NOT NULL,
        FOREIGN KEY (step_id) REFERENCES steps(id),
        status VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        updated_at DATETIME DEFAULT NOW() ON UPDATE NOW()
    )
`;
const down = `DROP TABLE users_steps`;

module.exports = {
    'up': up,
    'down': down,
};

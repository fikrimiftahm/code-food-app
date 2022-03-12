const up = `
    CREATE TABLE authentications (
        id INT AUTO_INCREMENT NOT NULL, 
        PRIMARY KEY (id), 
        token TEXT NOT NULL
    )
`;
const down = `DROP TABLE authentications`;

module.exports = {
    'up': up,
    'down': down,
};

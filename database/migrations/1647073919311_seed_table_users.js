const up = `
    INSERT INTO users(username, password) 
    VALUES ('Admin', 'Admin')
`;
const down = `TRUNCATE TABLE users`;

module.exports = {
    'up': up,
    'down': down,
};

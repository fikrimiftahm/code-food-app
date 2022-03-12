const { mySqlCon } = require('../utils/mysql-con');
const moment = require('moment');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const AuthorizationError = require('../exceptions/AuthorizationError');

class UsersService {
    async addUser({ username, hashedPassword }) {
        return new Promise((resolve, reject) => {
            try {
                const query = `INSERT INTO users(username, password) VALUES(?, ?); SELECT id, username FROM users WHERE id = LAST_INSERT_ID()`;

                mySqlCon.query(query, [username, hashedPassword], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        resolve(results[1][0]);
                    } else {
                        reject(new InvariantError(`Failed to insert users`));
                    }
                });
            } catch (err) {
                reject(reject(new InvariantError(err)));
            }
        });
    }

    async verifyNewUsername(username) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT username FROM users WHERE username = ?';

                mySqlCon.query(query, [username], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        reject(new InvariantError(`username ${username} already registered`));
                    } else {
                        resolve();
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async addLoginAttempt(username) {
        return new Promise((resolve, reject) => {
            try {
                const query = `INSERT INTO login_attempts(username, status) VALUES(?, ?)`;

                mySqlCon.query(query, [username, 0], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results) {
                        resolve(results[0]);
                    } else {
                        reject(new InvariantError(`Failed to insert login attempt`));
                    }
                });
            } catch (err) {
                reject(reject(new InvariantError(err)));
            }
        });
    }

    async verifyLoginAttempt(username) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    SELECT COUNT(*) total
                    FROM login_attempts 
                    WHERE created_at >= ?
                    AND username = ?
                    AND status = ?
                `;
                const oneMinuteAgo = moment().subtract(1, 'minutes').format('yyyy/MM/DD HH:mm:ss');

                mySqlCon.query(query, [oneMinuteAgo, username, 0], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results[0].total > 3) {
                        reject(new AuthorizationError('Too many invalid login, please wait for 1 minute'));
                    } else {
                        resolve();
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async updateLoginAttempt(username) {
        return new Promise((resolve, reject) => {
            try {
                const query = `UPDATE login_attempts SET status = ? WHERE username = ? ORDER BY created_at DESC LIMIT 1`;

                mySqlCon.query(query, [1, username], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results) {
                        resolve();
                    } else {
                        reject(new InvariantError(`Failed to update login attempt`));
                    }
                });
            } catch (err) {
                reject(reject(new InvariantError(err)));
            }
        });
    }

    async verifyUserCredential(username, password) {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT id, password FROM users WHERE username = ?';

                mySqlCon.query(query, [username], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject(new AuthenticationError('Invalid username or Password'));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }
}

module.exports = UsersService;

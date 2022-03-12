const { mySqlCon } = require('../utils/mysql-con');
const InvariantError = require('../exceptions/InvariantError');

class AuthenticationsService {
    async addRefreshToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const query = `INSERT INTO authentications(token) VALUES(?)`;

                mySqlCon.query(query, [token], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results) {
                        resolve();
                    } else {
                        reject(new InvariantError(`Failed to insert refresh token`));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async verifyRefreshToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak valid');
        }
    }

    async deleteRefreshToken(token) {
        await this.verifyRefreshToken(token);

        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };
        await this._pool.query(query);
    }
}

module.exports = AuthenticationsService;

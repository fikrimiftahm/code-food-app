const { mySqlCon } = require('../utils/mysql-con');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class CategoriesService {
    async getCategories() {
        return new Promise((resolve, reject) => {
            try {
                const query = 'SELECT id, name, created_at createdAt, updated_at updatedAt FROM categories ORDER BY id ASC';

                mySqlCon.query(query, (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        resolve(results);
                    } else {
                        reject(new InvariantError('Categories empty'));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async addCategories(name) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    INSERT INTO categories(name) VALUES(?); 
                    SELECT id, name, created_at createdAt, updated_at updatedAt FROM categories WHERE id = LAST_INSERT_ID() ORDER BY id ASC
                `;

                mySqlCon.query(query, [name], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.length > 0) {
                        resolve(results[1][0]);
                    } else {
                        reject(new InvariantError('Failed to add categories'));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async updateCategories(name, id) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    UPDATE categories SET name = ? WHERE id = ?; 
                    SELECT id, name, created_at createdAt, updated_at updatedAt FROM categories WHERE id = ? ORDER BY id ASC
                `;

                mySqlCon.query(query, [name, id, id], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results[0].affectedRows > 0) {
                        resolve(results[1][0]);
                    } else {
                        reject(new NotFoundError(`Recipe Category with id ${id} not found`));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }

    async deleteCategories(id) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    DELETE FROM categories WHERE id = ?;
                `;

                mySqlCon.query(query, [id], (error, results, fields) => {
                    if (error) reject(new InvariantError(error));

                    if (results.affectedRows > 0) {
                        resolve();
                    } else {
                        reject(new NotFoundError(`Recipe Category with id ${id} not found`));
                    }
                });
            } catch (err) {
                reject(new InvariantError(err));
            }
        });
    }
}

module.exports = CategoriesService;

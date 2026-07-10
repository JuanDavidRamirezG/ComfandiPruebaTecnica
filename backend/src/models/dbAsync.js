import db from '../db/database.js';

export const runQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function onRun(err) {
    if (err) {
      reject(err);
      return;
    }

    resolve({ lastID: this.lastID, changes: this.changes });
  });
});

export const getQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(row);
  });
});

export const allQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(rows);
  });
});

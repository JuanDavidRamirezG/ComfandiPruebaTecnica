import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a SQLite');
  }
});

const runAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) {
      reject(err);
      return;
    }
    resolve(this);
  });
});

const allAsync = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(rows);
  });
});

const migrateVotesTableIfNeeded = async () => {
  const columns = await allAsync('PRAGMA table_info(votes)');
  const hasCandidateId = columns.some((column) => column.name === 'candidateId');
  const hasLegacyCandidate = columns.some((column) => column.name === 'candidate');

  if (hasCandidateId || !hasLegacyCandidate) {
    return;
  }

  await runAsync(
    `
      CREATE TABLE IF NOT EXISTS votes_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER NOT NULL UNIQUE,
        candidateId INTEGER NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `
  );

  await runAsync(
    `
      INSERT OR IGNORE INTO votes_new (voterId, candidateId, createdAt)
      SELECT v.voterId, c.id, v.createdAt
      FROM votes v
      INNER JOIN candidates c ON c.name = v.candidate;
    `
  );

  await runAsync('DROP TABLE votes');
  await runAsync('ALTER TABLE votes_new RENAME TO votes');
};

export const initDb = () => new Promise((resolve, reject) => {
  db.serialize(() => {
    db.exec(
      `
        CREATE TABLE IF NOT EXISTS voters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          studentCode TEXT NOT NULL UNIQUE,
          hasVoted INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS candidates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS professors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          code TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS votes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          voterId INTEGER NOT NULL UNIQUE,
          candidateId INTEGER NOT NULL,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `,
      (err) => {
        if (err) {
          console.error('Error creando tablas:', err.message);
          reject(err);
          return;
        }

        const seedTasks = [];

        const baseVoters = [
          { name: 'Laura Díaz', studentCode: '20241001', hasVoted: 0 },
          { name: 'Mateo Pérez', studentCode: '20241002', hasVoted: 0 },
          { name: 'Camila Rojas', studentCode: '20241003', hasVoted: 0 },
          { name: 'Daniel Torres', studentCode: '20241004', hasVoted: 0 },
          { name: 'Valentina Cruz', studentCode: '20241005', hasVoted: 0 },
          { name: 'Juan Esteban López', studentCode: '20241006', hasVoted: 0 },
          { name: 'Paula Ramírez', studentCode: '20241007', hasVoted: 0 },
          { name: 'Sofía Vargas', studentCode: '20241008', hasVoted: 0 },
          { name: 'Andrés Moreno', studentCode: '20241009', hasVoted: 0 },
          { name: 'Mónica Salazar', studentCode: '20241010', hasVoted: 0 },
          { name: 'Tomás Ariza', studentCode: '20241011', hasVoted: 0 },
          { name: 'Natalia Peña', studentCode: '20241012', hasVoted: 0 },
          { name: 'Sebastián Castaño', studentCode: '20241013', hasVoted: 0 },
          { name: 'Isabella Gutiérrez', studentCode: '20241014', hasVoted: 0 },
          { name: 'Felipe Ortega', studentCode: '20241015', hasVoted: 0 }
        ];

        baseVoters.forEach((voter) => {
          seedTasks.push(
            new Promise((resolveSeed) => {
              db.run(
                'INSERT OR IGNORE INTO voters (name, studentCode, hasVoted) VALUES (?, ?, ?)',
                [voter.name, voter.studentCode, voter.hasVoted],
                (err) => {
                  if (err) {
                    console.error('Error insertando usuario base:', err.message);
                  }
                  resolveSeed();
                }
              );
            })
          );
        });

        const baseProfessors = [
          { name: 'Prof. Ana Gómez', code: 'profesor123' },
          { name: 'Prof. Carlos Ríos', code: 'profesor456' }
        ];

        baseProfessors.forEach((professor) => {
          seedTasks.push(
            new Promise((resolveSeed) => {
              db.run(
                'INSERT OR IGNORE INTO professors (name, code) VALUES (?, ?)',
                [professor.name, professor.code],
                (err) => {
                  if (err) {
                    console.error('Error insertando profesor base:', err.message);
                  }
                  resolveSeed();
                }
              );
            })
          );
        });

        const baseCandidates = ['Ana Morales', 'Santiago Ruiz'];
        baseCandidates.forEach((candidateName) => {
          seedTasks.push(
            new Promise((resolveSeed) => {
              db.run(
                'INSERT OR IGNORE INTO candidates (name) VALUES (?)',
                [candidateName],
                (err) => {
                  if (err) {
                    console.error('Error insertando candidato base:', err.message);
                  }
                  resolveSeed();
                }
              );
            })
          );
        });

        Promise.all(seedTasks)
          .then(() => migrateVotesTableIfNeeded())
          .then(() => resolve())
          .catch(reject);
      }
    );
  });
});

export default db;

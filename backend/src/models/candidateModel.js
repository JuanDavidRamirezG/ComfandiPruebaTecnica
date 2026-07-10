import { allQuery, getQuery, runQuery } from './dbAsync.js';

export const listCandidates = () => allQuery('SELECT * FROM candidates ORDER BY id ASC');

export const findCandidateById = (id) => getQuery(
  'SELECT * FROM candidates WHERE id = ?',
  [id]
);

export const findCandidateByName = (name) => getQuery(
  'SELECT * FROM candidates WHERE name = ?',
  [name]
);

export const createCandidate = async (name) => {
  const result = await runQuery('INSERT INTO candidates (name) VALUES (?)', [name]);
  return { id: result.lastID, name };
};

export const updateCandidate = async (id, name) => {
  const result = await runQuery('UPDATE candidates SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name, changes: result.changes };
};

export const deleteCandidate = async (id) => {
  const result = await runQuery('DELETE FROM candidates WHERE id = ?', [id]);
  return { id: Number(id), changes: result.changes };
};

export const renameCandidateByName = async (previousName, newName) => {
  const result = await runQuery('UPDATE candidates SET name = ? WHERE name = ?', [newName, previousName]);
  return { previousName, newName, changes: result.changes };
};

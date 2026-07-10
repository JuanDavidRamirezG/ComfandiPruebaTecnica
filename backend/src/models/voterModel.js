import { allQuery, getQuery, runQuery } from './dbAsync.js';

export const listVoters = () => allQuery('SELECT * FROM voters ORDER BY id DESC');

export const createVoter = async (name, studentCode) => {
  const result = await runQuery(
    'INSERT INTO voters (name, studentCode, hasVoted) VALUES (?, ?, 0)',
    [name, studentCode]
  );

  return {
    id: result.lastID,
    name,
    studentCode,
    hasVoted: false
  };
};

export const findVoterByStudentCode = (studentCode) => getQuery(
  'SELECT * FROM voters WHERE studentCode = ?',
  [studentCode]
);

export const findVoterById = (id) => getQuery(
  'SELECT * FROM voters WHERE id = ?',
  [id]
);

export const updateVoterName = async (id, name) => {
  const result = await runQuery('UPDATE voters SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name, changes: result.changes };
};

export const deleteVoterById = async (id) => {
  const result = await runQuery('DELETE FROM voters WHERE id = ?', [id]);
  return { id: Number(id), changes: result.changes };
};

export const markVoterAsVoted = (voterId) => runQuery(
  'UPDATE voters SET hasVoted = 1 WHERE id = ?',
  [voterId]
);

export const countVoters = async () => {
  const row = await getQuery('SELECT COUNT(*) as totalVoters FROM voters');
  return row?.totalVoters ?? 0;
};

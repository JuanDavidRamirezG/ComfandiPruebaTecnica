import { allQuery, getQuery, runQuery } from './dbAsync.js';

export const createVote = (voterId, candidateId) => runQuery(
  'INSERT INTO votes (voterId, candidateId) VALUES (?, ?)',
  [voterId, candidateId]
);

export const countVotes = async () => {
  const row = await getQuery('SELECT COUNT(*) as totalVoted FROM votes');
  return row?.totalVoted ?? 0;
};

export const listVoteResults = () => allQuery(
  `SELECT c.id, c.name, COUNT(v.id) as votes
   FROM candidates c
   LEFT JOIN votes v ON v.candidateId = c.id
   GROUP BY c.id, c.name
   ORDER BY votes DESC, c.name ASC`
);

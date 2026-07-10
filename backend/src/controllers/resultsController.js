import { countVoters } from '../models/voterModel.js';
import { countVotes, listVoteResults } from '../models/voteModel.js';

export const getResults = async (req, res) => {
  try {
    const [results, totalVoters, totalVoted] = await Promise.all([
      listVoteResults(),
      countVoters(),
      countVotes()
    ]);

    return res.json({
      totalVoters,
      totalVoted,
      results: results.map((row) => ({ ...row, votes: Number(row.votes) }))
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

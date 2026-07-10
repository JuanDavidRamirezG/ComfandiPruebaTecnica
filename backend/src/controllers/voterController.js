import { findProfessorByCode } from '../models/professorModel.js';
import {
  createVoter,
  deleteVoterById,
  findVoterById,
  findVoterByStudentCode,
  listVoters,
  markVoterAsVoted,
  updateVoterName
} from '../models/voterModel.js';
import { findCandidateById, findCandidateByName } from '../models/candidateModel.js';
import { createVote } from '../models/voteModel.js';
import { renameCandidateByName } from '../models/candidateModel.js';

export const getVoters = async (req, res) => {
  try {
    const rows = await listVoters();
    res.json(rows.map((row) => ({ ...row, hasVoted: Boolean(row.hasVoted) })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerVoter = async (req, res) => {
  const { name, studentCode, professorCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  if (!name || !studentCode) {
    return res.status(400).json({ error: 'Nombre y código estudiantil son requeridos' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());
    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    const voter = await createVoter(name.trim(), studentCode.trim());
    return res.status(201).json(voter);
  } catch (err) {
    return res.status(400).json({ error: 'El código estudiantil ya existe' });
  }
};

export const registerVote = async (req, res) => {
  const { studentCode, candidateId } = req.body;

  if (!studentCode || !candidateId) {
    return res.status(400).json({ error: 'Código y candidato son requeridos' });
  }

  try {
    const voter = await findVoterByStudentCode(studentCode);
    if (!voter) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    if (voter.hasVoted) {
      return res.status(400).json({ error: 'Este estudiante ya votó' });
    }

    const candidate = await findCandidateById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }

    await createVote(voter.id, candidate.id);
    await markVoterAsVoted(voter.id);

    return res.json({ message: 'Voto registrado correctamente' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const editVoterName = async (req, res) => {
  const { id } = req.params;
  const { name, professorCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'El nombre del estudiante es requerido' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());
    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    const voter = await findVoterById(id);
    if (!voter) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const newName = name.trim();
    const updated = await updateVoterName(id, newName);
    if (updated.changes === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    try {
      await renameCandidateByName(voter.name, newName);
    } catch (err) {
      return res.status(400).json({ error: 'No se pudo actualizar el nombre porque ya existe un candidato con ese nombre' });
    }

    return res.json({ id: Number(id), name: newName, studentCode: voter.studentCode, hasVoted: Boolean(voter.hasVoted) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const removeVoter = async (req, res) => {
  const { id } = req.params;
  const { professorCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());
    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    const voter = await findVoterById(id);
    if (!voter) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    if (voter.hasVoted) {
      return res.status(400).json({ error: 'No se puede eliminar un estudiante que ya votó' });
    }

    const candidate = await findCandidateByName(voter.name);
    if (candidate) {
      return res.status(400).json({ error: 'Primero elimina la candidatura de este estudiante' });
    }

    const deleted = await deleteVoterById(id);
    if (deleted.changes === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    return res.json({ success: true, id: Number(id) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

import { findProfessorByCode } from '../models/professorModel.js';
import { findVoterByStudentCode } from '../models/voterModel.js';
import {
  createCandidate,
  deleteCandidate,
  listCandidates,
  updateCandidate
} from '../models/candidateModel.js';

export const getCandidates = async (req, res) => {
  try {
    const rows = await listCandidates();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCandidate = async (req, res) => {
  const { professorCode, studentCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  if (!studentCode || !studentCode.trim()) {
    return res.status(400).json({ error: 'Debes seleccionar un estudiante registrado' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());
    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    const voter = await findVoterByStudentCode(studentCode.trim());
    if (!voter) {
      return res.status(404).json({ error: 'Estudiante no encontrado para postulación' });
    }

    try {
      const candidate = await createCandidate(voter.name);
      return res.status(201).json({ ...candidate, studentCode: voter.studentCode });
    } catch (err) {
      return res.status(400).json({ error: 'Ese estudiante ya es candidato' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const editCandidate = async (req, res) => {
  const { id } = req.params;
  const { professorCode, studentCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  if (!studentCode || !studentCode.trim()) {
    return res.status(400).json({ error: 'Debes seleccionar un estudiante registrado' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());
    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    const voter = await findVoterByStudentCode(studentCode.trim());
    if (!voter) {
      return res.status(404).json({ error: 'Estudiante no encontrado para postulación' });
    }

    try {
      const updated = await updateCandidate(id, voter.name);

      if (updated.changes === 0) {
        return res.status(404).json({ error: 'Candidato no encontrado' });
      }

      return res.json({ id: Number(id), name: voter.name, studentCode: voter.studentCode });
    } catch (err) {
      return res.status(400).json({ error: 'No se pudo actualizar el candidato' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const removeCandidate = async (req, res) => {
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

    const deleted = await deleteCandidate(id);

    if (deleted.changes === 0) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }

    return res.json({ success: true, id: Number(id) });
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo eliminar el candidato' });
  }
};

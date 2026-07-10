import { findProfessorByCode } from '../models/professorModel.js';

export const validateProfessorCode = async (req, res) => {
  const { professorCode } = req.body;

  if (!professorCode || !professorCode.trim()) {
    return res.status(400).json({ error: 'El código del profesor es requerido' });
  }

  try {
    const professor = await findProfessorByCode(professorCode.trim());

    if (!professor) {
      return res.status(403).json({ error: 'Código del profesor incorrecto' });
    }

    return res.json({
      valid: true,
      professor: {
        id: professor.id,
        name: professor.name,
        code: professor.code
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

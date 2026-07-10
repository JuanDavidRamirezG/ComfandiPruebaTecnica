import { useEffect, useMemo, useState } from 'react';
import {
  createCandidate,
  createVoter,
  deleteCandidate,
  deleteVoter,
  getCandidates,
  getResults,
  getVoters,
  updateCandidate,
  updateVoter,
  validateProfessor,
  voteCandidate
} from '../services/api';

export function useVotingApp() {
  const [view, setView] = useState('home');
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [resultsData, setResultsData] = useState({ totalVoters: 0, totalVoted: 0, results: [] });
  const [voterForm, setVoterForm] = useState({ name: '', studentCode: '' });
  const [voteForm, setVoteForm] = useState({ studentCode: '', candidateId: '' });
  const [professorCodeInput, setProfessorCodeInput] = useState('');
  const [professorAccess, setProfessorAccess] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [editingCandidateId, setEditingCandidateId] = useState(null);
  const [editingVoterId, setEditingVoterId] = useState(null);
  const [editingVoterName, setEditingVoterName] = useState('');
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [votersResponse, candidatesResponse, resultsResponse] = await Promise.all([
        getVoters(),
        getCandidates(),
        getResults()
      ]);

      setVoters(votersResponse.data || []);
      setCandidates(candidatesResponse.data || []);
      setResultsData(resultsResponse.data || { totalVoters: 0, totalVoted: 0, results: [] });
    } catch (error) {
      setMessage('No se pudo cargar la información desde el backend.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = useMemo(() => {
    const total = voters.length;
    const voted = voters.filter((voter) => voter.hasVoted).length;
    const pending = total - voted;
    return { total, voted, pending };
  }, [voters]);

  const leader = useMemo(() => {
    if (!resultsData.results?.length) {
      return null;
    }

    return resultsData.results[0];
  }, [resultsData.results]);

  const candidateOptions = useMemo(() => {
    const editingCandidate = candidates.find((candidate) => candidate.id === editingCandidateId);
    const currentEditingName = editingCandidate?.name;
    const usedNames = new Set(candidates.map((candidate) => candidate.name));

    return voters.filter((voter) => !usedNames.has(voter.name) || voter.name === currentEditingName);
  }, [voters, candidates, editingCandidateId]);

  const handleRegisterVoter = async (event) => {
    event.preventDefault();
    if (!voterForm.name.trim() || !voterForm.studentCode.trim()) {
      setMessage('Completa los datos del votante para continuar.');
      return;
    }

    try {
      const response = await createVoter({
        name: voterForm.name.trim(),
        studentCode: voterForm.studentCode.trim(),
        professorCode: professorCodeInput.trim()
      });

      setVoters([response.data, ...voters]);
      setVoterForm({ name: '', studentCode: '' });
      setMessage('Votante registrado correctamente.');
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo registrar el votante.');
    }
  };

  const handleProfessorAccess = async (event) => {
    event.preventDefault();

    if (!professorCodeInput.trim()) {
      setProfessorAccess(false);
      setMessage('Ingresa el código del profesor para continuar.');
      return;
    }

    try {
      const response = await validateProfessor({
        professorCode: professorCodeInput.trim()
      });

      setProfessorAccess(true);
      setMessage(`Acceso habilitado para ${response.data.professor.name}.`);
    } catch (error) {
      setProfessorAccess(false);
      setMessage(error.response?.data?.error || 'Código de profesor incorrecto.');
    }
  };

  const handleAddCandidate = async (event) => {
    event.preventDefault();
    if (!candidateName.trim()) {
      setMessage('Selecciona un estudiante para postularlo como candidato.');
      return;
    }

    try {
      if (editingCandidateId) {
        const response = await updateCandidate(editingCandidateId, {
          professorCode: professorCodeInput.trim(),
          studentCode: candidateName.trim()
        });

        setCandidates(candidates.map((candidate) => (candidate.id === editingCandidateId ? response.data : candidate)));
        setMessage(`Candidato actualizado: ${response.data.name}`);
      } else {
        const response = await createCandidate({
          professorCode: professorCodeInput.trim(),
          studentCode: candidateName.trim()
        });

        setCandidates([...candidates, response.data]);
        setMessage(`Candidato agregado: ${response.data.name}`);
      }

      setCandidateName('');
      setEditingCandidateId(null);
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo guardar el candidato.');
    }
  };

  const handleEditCandidate = (candidate) => {
    const matchingVoter = voters.find((voter) => voter.name === candidate.name);
    setEditingVoterId(null);
    setEditingVoterName('');
    setEditingCandidateId(candidate.id);
    setCandidateName(matchingVoter?.studentCode || '');
    setMessage(`Editando a ${candidate.name}`);
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      await deleteCandidate(candidateId, {
        professorCode: professorCodeInput.trim()
      });

      setCandidates(candidates.filter((candidate) => candidate.id !== candidateId));
      setMessage('Candidato eliminado correctamente.');
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo eliminar el candidato.');
    }
  };

  const handleStartEditVoter = (voter) => {
    setEditingCandidateId(null);
    setCandidateName('');
    setEditingVoterId(voter.id);
    setEditingVoterName(voter.name);
    setMessage(`Editando estudiante ${voter.studentCode}`);
  };

  const handleCancelEditVoter = () => {
    setEditingVoterId(null);
    setEditingVoterName('');
  };

  const handleUpdateVoter = async (event) => {
    event.preventDefault();

    if (!editingVoterId) {
      setMessage('Selecciona un estudiante para editar.');
      return;
    }

    if (!editingVoterName.trim()) {
      setMessage('El nombre del estudiante es requerido.');
      return;
    }

    try {
      const response = await updateVoter(editingVoterId, {
        name: editingVoterName.trim(),
        professorCode: professorCodeInput.trim()
      });

      setVoters(voters.map((voter) => (voter.id === editingVoterId ? response.data : voter)));
      setMessage('Estudiante actualizado correctamente.');
      setEditingVoterId(null);
      setEditingVoterName('');
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo actualizar el estudiante.');
    }
  };

  const handleDeleteVoter = async (voterId) => {
    try {
      await deleteVoter(voterId, {
        professorCode: professorCodeInput.trim()
      });

      setVoters(voters.filter((voter) => voter.id !== voterId));
      if (editingVoterId === voterId) {
        setEditingVoterId(null);
        setEditingVoterName('');
      }
      setMessage('Estudiante eliminado correctamente.');
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo eliminar el estudiante.');
    }
  };

  const handleVote = async (event) => {
    event.preventDefault();
    if (!voteForm.studentCode.trim() || !voteForm.candidateId) {
      setMessage('Ingresa el código y elige un candidato.');
      return;
    }

    try {
      const response = await voteCandidate({
        studentCode: voteForm.studentCode.trim(),
        candidateId: Number(voteForm.candidateId)
      });

      await loadData();
      setVoteForm({ studentCode: '', candidateId: '' });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'No se pudo registrar el voto.');
    }
  };

  return {
    view,
    setView,
    voters,
    candidates,
    resultsData,
    voterForm,
    setVoterForm,
    voteForm,
    setVoteForm,
    professorCodeInput,
    setProfessorCodeInput,
    professorAccess,
    candidateName,
    setCandidateName,
    editingCandidateId,
    editingVoterId,
    editingVoterName,
    setEditingVoterName,
    message,
    stats,
    leader,
    candidateOptions,
    handleRegisterVoter,
    handleProfessorAccess,
    handleAddCandidate,
    handleEditCandidate,
    handleDeleteCandidate,
    handleStartEditVoter,
    handleCancelEditVoter,
    handleUpdateVoter,
    handleDeleteVoter,
    handleVote
  };
}

import Header from './components/Header';
import AlertMessage from './components/AlertMessage';
import HomePage from './pages/HomePage';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';
import { useVotingApp } from './hooks/useVotingApp';

function App() {
  const {
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
  } = useVotingApp();

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header view={view} onViewChange={setView} />
        <AlertMessage message={message} />

        {view === 'home' && <HomePage stats={stats} resultsData={resultsData} leader={leader} />}

        {view === 'professor' && (
          <ProfessorPage
            professorAccess={professorAccess}
            professorCodeInput={professorCodeInput}
            setProfessorCodeInput={setProfessorCodeInput}
            candidateName={candidateName}
            setCandidateName={setCandidateName}
            voters={voters}
            candidates={candidates}
            candidateOptions={candidateOptions}
            voterForm={voterForm}
            setVoterForm={setVoterForm}
            editingCandidateId={editingCandidateId}
            editingVoterId={editingVoterId}
            editingVoterName={editingVoterName}
            setEditingVoterName={setEditingVoterName}
            onProfessorAccess={handleProfessorAccess}
            onAddCandidate={handleAddCandidate}
            onEditCandidate={handleEditCandidate}
            onDeleteCandidate={handleDeleteCandidate}
            onRegisterVoter={handleRegisterVoter}
            onStartEditVoter={handleStartEditVoter}
            onCancelEditVoter={handleCancelEditVoter}
            onUpdateVoter={handleUpdateVoter}
            onDeleteVoter={handleDeleteVoter}
          />
        )}

        {view === 'student' && (
          <StudentPage
            voteForm={voteForm}
            setVoteForm={setVoteForm}
            candidates={candidates}
            onVote={handleVote}
          />
        )}
      </div>
    </div>
  );
}

export default App;

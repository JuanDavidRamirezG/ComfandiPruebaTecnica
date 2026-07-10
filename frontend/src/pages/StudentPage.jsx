function StudentPage({
  voteForm,
  setVoteForm,
  candidates,
  onVote
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Votación estudiantil</h2>
        <p className="mt-1 text-sm text-slate-500">Ingresa tu código estudiantil para votar una sola vez.</p>

        <form onSubmit={onVote} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Código estudiantil</label>
            <input
              type="text"
              value={voteForm.studentCode}
              onChange={(event) => setVoteForm({ ...voteForm, studentCode: event.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Ej: 20241001"
            />
          </div>

          <div className="space-y-3">
            {candidates.length ? candidates.map((candidate) => (
              <label key={candidate.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  checked={voteForm.candidateId === String(candidate.id)}
                  onChange={(event) => setVoteForm({ ...voteForm, candidateId: event.target.value })}
                  className="h-4 w-4"
                />
                <span className="font-medium">{candidate.name}</span>
              </label>
            )) : <p className="text-sm text-slate-500">No hay candidatos disponibles para votar aún.</p>}
          </div>

          <button
            disabled={!candidates.length}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Confirmar voto
          </button>
        </form>
    </section>
  );
}

export default StudentPage;

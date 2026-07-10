function ProfessorPage({
  professorAccess,
  professorCodeInput,
  setProfessorCodeInput,
  candidateName,
  setCandidateName,
  voters,
  candidates,
  candidateOptions,
  voterForm,
  setVoterForm,
  editingCandidateId,
  editingVoterId,
  editingVoterName,
  setEditingVoterName,
  onProfessorAccess,
  onAddCandidate,
  onEditCandidate,
  onDeleteCandidate,
  onRegisterVoter,
  onStartEditVoter,
  onCancelEditVoter,
  onUpdateVoter,
  onDeleteVoter
}) {
  const candidateByName = Object.fromEntries(candidates.map((candidate) => [candidate.name, candidate]));

  return (
    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Panel del profesor</h2>
        <p className="mt-1 text-sm text-slate-500">Ingresa el código especial para agregar candidatos a la votación.</p>

        {!professorAccess ? (
          <form onSubmit={onProfessorAccess} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Código del profesor</label>
              <input
                type="password"
                value={professorCodeInput}
                onChange={(event) => setProfessorCodeInput(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Ingresa el código"
              />
            </div>
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700">
              Entrar al panel
            </button>
          </form>
        ) : (
          <div className="mt-5 space-y-6">
            <form onSubmit={onAddCandidate} className="space-y-4">
              <h3 className="text-base font-semibold text-slate-800">Gestionar candidatos</h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Seleccionar estudiante candidato</label>
                <select
                  value={candidateName}
                  onChange={(event) => setCandidateName(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Selecciona un estudiante</option>
                  {candidateOptions.map((voter) => (
                    <option key={voter.id} value={voter.studentCode}>
                      {voter.name} ({voter.studentCode})
                    </option>
                  ))}
                </select>
                {!candidateOptions.length && (
                  <p className="mt-2 text-xs text-slate-500">No hay estudiantes disponibles para postular.</p>
                )}
              </div>
              <button
                disabled={!candidateOptions.length && !editingCandidateId}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {editingCandidateId ? 'Guardar cambios' : 'Agregar candidato'}
              </button>
            </form>

            <form onSubmit={onRegisterVoter} className="space-y-4 border-t border-slate-200 pt-5">
              <h3 className="text-base font-semibold text-slate-800">Registrar estudiantes</h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre completo</label>
                <input
                  type="text"
                  value={voterForm.name}
                  onChange={(event) => setVoterForm({ ...voterForm, name: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Ej: Ana Gómez"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Código estudiantil</label>
                <input
                  type="text"
                  value={voterForm.studentCode}
                  onChange={(event) => setVoterForm({ ...voterForm, studentCode: event.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Ej: 20241010"
                />
              </div>
              <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700">
                Registrar estudiante
              </button>
            </form>

            {editingVoterId ? (
              <form onSubmit={onUpdateVoter} className="space-y-4 border-t border-slate-200 pt-5">
                <h3 className="text-base font-semibold text-slate-800">Editar estudiante</h3>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Nuevo nombre</label>
                  <input
                    type="text"
                    value={editingVoterName}
                    onChange={(event) => setEditingVoterName(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Edita el nombre del estudiante"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">
                    Guardar nombre
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEditVoter}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-base font-semibold text-slate-800">Editar estudiante</h3>
                <p className="mt-1 text-sm text-slate-500">Selecciona un estudiante en la lista para abrir el formulario de edición.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Tabla de estudiantes y candidatos</h2>
        <p className="mt-1 text-sm text-slate-500">Cada fila te indica si es estudiante o candidato, con acciones directas para editar o eliminar.</p>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="px-3 py-2 font-semibold">Nombre</th>
                <th className="px-3 py-2 font-semibold">Código</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {voters.length ? voters.map((voter) => {
                const candidate = candidateByName[voter.name];
                const isCandidate = Boolean(candidate);

                return (
                  <tr key={voter.id}>
                    <td className="px-3 py-3 font-medium text-slate-800">{voter.name}</td>
                    <td className="px-3 py-3 text-slate-600">{voter.studentCode}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isCandidate ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                        {isCandidate ? 'Candidato' : 'Estudiante'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onStartEditVoter(voter)}
                          className="rounded-lg border border-blue-200 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                          Editar nombre
                        </button>

                        {isCandidate ? (
                          <>
                            <button
                              type="button"
                              onClick={() => onEditCandidate(candidate)}
                              className="rounded-lg border border-indigo-200 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50"
                            >
                              Editar candidato
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteCandidate(candidate.id)}
                              className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                            >
                              Eliminar candidatura
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onDeleteVoter(voter.id)}
                            className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                          >
                            Eliminar estudiante
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-sm text-slate-500">
                    No hay estudiantes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProfessorPage;

function HomePage({ stats, resultsData, leader }) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total de votantes</p>
          <p className="mt-2 text-3xl font-semibold">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-emerald-700">Ya votaron</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-800">{stats.voted}</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-blue-700">Pendientes</p>
          <p className="mt-2 text-3xl font-semibold text-blue-800">{stats.pending}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Resultados en tiempo real</h2>
          <p className="mt-1 text-sm text-slate-500">Aquí puedes ver quién va ganando y cuánto ha avanzado la votación.</p>

          <div className="mt-6 space-y-4">
            {resultsData.results?.length ? resultsData.results.map((candidate) => {
              const percent = resultsData.totalVoted === 0 ? 0 : Math.round((candidate.votes / resultsData.totalVoted) * 100);
              return (
                <div key={candidate.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold">{candidate.name}</span>
                    <span>{candidate.votes} votos</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            }) : <p className="text-sm text-slate-500">Aún no hay resultados para mostrar.</p>}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Quién va ganando</h2>
          <p className="mt-1 text-sm text-slate-500">Liderazgo actual de la votación.</p>
          {leader ? (
            <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Candidato líder</p>
              <p className="mt-2 text-2xl font-semibold">{leader.name}</p>
              <p className="mt-2 text-slate-300">{leader.votes} votos registrados</p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Todavía no hay un candidato líder.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;

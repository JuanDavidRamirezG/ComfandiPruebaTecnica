function Header({ view, onViewChange }) {
  return (
    <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-800 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium">Sistema de votación</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Votación para personero</h1>
          <p className="mt-3 text-base text-slate-200 sm:text-lg">
            Una interfaz para inicio con resultados, otra para que el profesor agregue candidatos y otra para que los estudiantes voten con su código.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onViewChange('home')} className={`rounded-full px-4 py-2 text-sm font-semibold ${view === 'home' ? 'bg-white text-slate-900' : 'bg-white/10 text-white'}`}>
            Inicio
          </button>
          <button onClick={() => onViewChange('professor')} className={`rounded-full px-4 py-2 text-sm font-semibold ${view === 'professor' ? 'bg-white text-slate-900' : 'bg-white/10 text-white'}`}>
            Profesor
          </button>
          <button onClick={() => onViewChange('student')} className={`rounded-full px-4 py-2 text-sm font-semibold ${view === 'student' ? 'bg-white text-slate-900' : 'bg-white/10 text-white'}`}>
            Estudiantes
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

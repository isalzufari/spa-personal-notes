import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Navigation from './components/Navigation';

import ActiveNotes from './pages/ActiveNotes';
import ArchivesNotes from './pages/ArchivesNotes';
import DetailNote from './pages/DetailNote';
import NewNote from './pages/NewNote';
import PageNotFound from './pages/PageNotFound';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// import { getActiveNotes, getArchivedNotes, addNote } from './utils/local-data';
import { getUserLogged, putAccessToken, getActiveNotes, getArchivedNotes, addNote } from './utils/api-data';

import ThemeContext from './context/ThemeContext';

function App() {
  const navigate = useNavigate();

  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  const localTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = React.useState(localTheme);

  const [activeNotes, setActiveNotes] = React.useState(() => {
    getActiveNotes().then(({ data }) => {
      setActiveNotes(data);
    });
  });
  const [archivesNotes, setArchivesNotes] = React.useState(() => {
    getArchivedNotes().then(({ data }) => {
      setArchivesNotes(data);
    });
  });

  React.useEffect(() => {
    async function getUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };

    function getTheme() {
      document.documentElement.setAttribute('data-theme', localTheme);
    }

    getUser();
    getTheme();
  }, []);

  async function onAddNoteHandler(note) {
    await addNote(note);
    const { data } = await getActiveNotes();
    setActiveNotes(data);
    navigate('/');
  }

  async function refreshNoteHandler() {
    const { activeNotes } = await getActiveNotes();
    setActiveNotes(activeNotes);

    const { archivesNotes } = await getArchivedNotes();
    setArchivesNotes(archivesNotes);
  }

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);

    putAccessToken('');
  }

  const toggleTheme = () => {
    console.log(theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });;
  };

  const localContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme
    }
  }, [theme]);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <div className='app-container'>
        <header>
          <h1>Aplikasi Catatan</h1>
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={localContextValue}>
      <div className='app-container'>
        <header>
          <Navigation logout={onLogout} name={authedUser.name} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ActiveNotes activeNotes={activeNotes} />} />
            <Route path="/archives" element={<ArchivesNotes archivesNotes={archivesNotes} />} />
            <Route path="/notes/:id" element={<DetailNote refreshNotes={refreshNoteHandler} />} />
            <Route path="/notes/new" element={<NewNote addNote={onAddNoteHandler} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

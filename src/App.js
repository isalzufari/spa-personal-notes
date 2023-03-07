import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Navigation from './components/Navigation';

import ActiveNotes from './pages/ActiveNotes';
import ArchivesNotes from './pages/ArchivesNotes';
import DetailNote from './pages/DetailNote';
import NewNote from './pages/NewNote';

import { getActiveNotes, getArchivedNotes, addNote } from './utils/local-data';

function App() {
  const navigate = useNavigate();

  const activeNotes = getActiveNotes();
  const archivesNotes = getArchivedNotes();

  function onAddNoteHandler(note) {
    console.log(addNote(note));
    navigate('/');
  }

  return (
    <div className='app-container'>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ActiveNotes activeNotes={activeNotes} />} />
          <Route path="/archives" element={<ArchivesNotes archivesNotes={archivesNotes} />} />
          <Route path="/notes/:id" element={<DetailNote />} />
          <Route path="/notes/new" element={<NewNote addNote={onAddNoteHandler} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

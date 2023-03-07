import React from 'react';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';

function ArchivesNotes({ ArchivesNotes }) {
  return (
    <section className='homepage'>
      <h2>Catatan Arsip</h2>
      <SearchBar />
      <NotesList notes={ArchivesNotes} />
    </section>
  );
}

export default ArchivesNotes;
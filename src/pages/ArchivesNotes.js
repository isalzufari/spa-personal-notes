import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/api-data';

function ArchivesNotes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initializing, setInitializing] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    }).then(() => {
      setInitializing(false);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(
      keyword.toLowerCase()
    );
  });

  return (
    <section className='homepage'>
      <h2>Catatan Arsip</h2>
      <SearchBar defaultKeyword={keyword} keywordChange={onKeywordChangeHandler} />
      {initializing ? null :
        filteredNotes.length === 0 ?
          <NotesListEmpty />
          :
          <NotesList notes={filteredNotes} />
      }
    </section>
  )
}

export default ArchivesNotes;
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePageAction } from '../components/ActionButton';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/api-data';

function ActiveNotes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initializing, setInitializing] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
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
      <h2>Catatan Aktif</h2>
      <SearchBar defaultKeyword={keyword} keywordChange={onKeywordChangeHandler} />
      {initializing ? null :
        filteredNotes.length === 0 ?
          <NotesListEmpty />
          :
          <NotesList notes={filteredNotes} />
      }
      <HomePageAction />
    </section>
  )
}

export default ActiveNotes;
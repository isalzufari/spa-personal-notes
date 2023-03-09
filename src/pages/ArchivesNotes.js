import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';
import { getArchivedNotes } from '../utils/api-data';

// function ArchivesNotesWrapper({ archivesNotes }) {
//   const [searchParams, setSearchParams] = useSearchParams();

//   let keyword = searchParams.get('keyword');

//   if (keyword === null) {
//     keyword = '';
//   }

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return <ArchivesNotes archivesNotes={archivesNotes} defaultKeyword={keyword} keywordChange={changeSearchParams} />
// }

// class ArchivesNotes extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: props.archivesNotes,
//       keyword: props.defaultKeyword || '',
//     }

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword
//       }
//     });

//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const notesFilter = this.state.notes.filter((note) => {
//       return note.title.toLowerCase().includes(
//         this.state.keyword.toLowerCase()
//       );
//     });

//     return (
//       <section className='homepage'>
//         <h2>Catatan Arsip</h2>
//         <SearchBar defaultKeyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
//         {notesFilter.length === 0 ?
//           <NotesListEmpty />
//           :
//           <NotesList notes={notesFilter} />
//         }
//       </section>
//     )
//   }
// }

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

  if (initializing) {
    return null;
  }

  return (
    <section className='homepage'>
      <h2>Catatan Arsip</h2>
      <SearchBar defaultKeyword={keyword} keywordChange={onKeywordChangeHandler} />
      {filteredNotes.length === 0 ?
        <NotesListEmpty />
        :
        <NotesList notes={filteredNotes} />
      }
    </section>
  )
}

// ArchivesNotes.propTypes = {
//   archivesNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   keywordChange: PropTypes.func.isRequired,
//   defaultKeyword: PropTypes.string.isRequired
// }

// ArchivesNotesWrapper.propTypes = {
//   archivesNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
// }

export default ArchivesNotes;
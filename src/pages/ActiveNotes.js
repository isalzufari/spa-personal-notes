import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePageAction } from '../components/ActionButton';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';
import { getActiveNotes } from '../utils/api-data';


// function ActiveNotesWrapper({ activeNotes }) {
//   const [searchParams, setSearchParams] = useSearchParams();

//   let keyword = searchParams.get('keyword');

//   if (keyword === null) {
//     keyword = '';
//   }

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   console.log(activeNotes);

//   return <ActiveNotes activeNotes={activeNotes} defaultKeyword={keyword} keywordChange={changeSearchParams} />
// }

// class ActiveNotes extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: props.activeNotes,
//       keyword: props.defaultKeyword || '',
//     }

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//     console.log(this.state.notes);
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

//     if (this.state.notes === undefined) {
//       return null;
//     }

//     return (
//       <section className='homepage'>
//         <h2>Catatan Aktif</h2>
//         <SearchBar defaultKeyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
//         {notesFilter.length === 0 ?
//           <NotesListEmpty />
//           :
//           <NotesList notes={notesFilter} />
//         }
//         <HomePageAction />
//       </section>
//     );
//   }
// }

function ActiveNotes({ activeNotes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initializing, setInitializing] = React.useState(true);
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  // console.log(activeNotes);
  React.useEffect(() => {
    function loadNotes() {
      setNotes(activeNotes);
      setInitializing(false);
    }

    loadNotes();
    // getActiveNotes().then(({ data }) => {
    //   setNotes(data);
    // }).then(() => {
    //   setInitializing(false);
    // });
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

// ActiveNotes.propTypes = {
//   activeNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   keywordChange: PropTypes.func.isRequired,
//   defaultKeyword: PropTypes.string.isRequired
// }

export default ActiveNotes;
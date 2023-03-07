import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePageAction } from '../components/ActionButton';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';

function ActiveNotesWrapper({ activeNotes }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ActiveNotes activeNotes={activeNotes} defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ActiveNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: props.activeNotes,
      keyword: props.defaultKeyword || '',
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword
      }
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notesFilter = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      );
    });

    return (
      <section className='homepage'>
        <h2>Catatan Aktif</h2>
        <SearchBar defaultKeyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        {notesFilter.length === 0 ?
          <NotesListEmpty />
          :
          <NotesList notes={notesFilter} />
        }
        <HomePageAction />
      </section>
    );
  }
}

ActiveNotes.propTypes = {
  activeNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  keywordChange: PropTypes.func.isRequired
}

ActiveNotesWrapper.propTypes = {
  activeNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ActiveNotesWrapper;
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesListEmpty from '../components/notes/NoteListEmpty';
import NotesList from '../components/notes/NotesList';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';

function ArchivesNotesWrapper({ archivesNotes }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ArchivesNotes archivesNotes={archivesNotes} defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivesNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: props.archivesNotes,
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
        <h2>Catatan Arsip</h2>
        <SearchBar defaultKeyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        {notesFilter.length === 0 ?
          <NotesListEmpty />
          :
          <NotesList notes={notesFilter} />
        }
      </section>
    )
  }
}

ArchivesNotes.propTypes = {
  archivesNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  keywordChange: PropTypes.func.isRequired
}

ArchivesNotesWrapper.propTypes = {
  archivesNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ArchivesNotesWrapper;
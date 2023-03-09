import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailPageAction } from '../components/ActionButton';
import { getNote, archiveNote, unarchiveNote, deleteNote, getArchivedNotes } from '../utils/api-data';
import { showFormattedDate } from '../utils'

function DetailNote({ refreshNotes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initializing, setInitializing] = React.useState(true);

  const [note, setNote] = React.useState(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setInitializing(false);
    });
  });

  async function onHandleArchiveNote(id) {
    await archiveNote(id);
    await refreshNotes();
    navigate('/');
  }

  async function onHandleDeleteNote(id) {
    await deleteNote(id);
    await refreshNotes();
    navigate('/');
  }

  async function onHandleUnarchiveNote(id) {
    await unarchiveNote(id);
    await refreshNotes();
    navigate('/');
  }

  if (initializing) {
    return null;
  }

  return (
    <section className='detail-page'>
      <h3 className='detail-page__title'>{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">
        {note.body}
      </div>
      <DetailPageAction
        id={note.id}
        archived={note.archived}
        archiveNote={onHandleArchiveNote}
        deleteNote={onHandleDeleteNote}
        unArchiveNote={onHandleUnarchiveNote}
      />
    </section>
  )
}

export default DetailNote;

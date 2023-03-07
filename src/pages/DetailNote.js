import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailPageAction } from '../components/ActionButton';
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/local-data';
import { showFormattedDate } from '../utils'

function DetailNote() {
  const { id } = useParams();
  const navigate = useNavigate()

  const note = getNote(id);

  function onHandleArchiveNote(id) {
    archiveNote(id);
    navigate('/');
  }

  function onHandleDeleteNote(id) {
    deleteNote(id);
    navigate('/');
  }

  function onHandleUnarchiveNote(id) {
    unarchiveNote(id);
    navigate('/');
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

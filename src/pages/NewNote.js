import React from 'react';
import PropTypes from 'prop-types';
import { NewPageAction } from '../components/ActionButton';

class NewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'title',
      body: 'body',
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(e) {
    this.setState(() => {
      return {
        title: e.target.value,
      }
    });
  }

  onBodyChangeEventHandler(e) {
    this.setState(() => {
      return {
        body: e.target.value
      }
    });
  }

  onSubmitEventHandler(e) {
    e.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <section className='add-new-page'>
        <div className="add-new-page__input">
          <input className="add-new-page__input__title" placeholder="Catatan rahasia" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
          <textarea className="add-new-page__input__body" placeholder='Sebenarnya saya adalah' value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
        </div>
        <NewPageAction saveNote={this.onSubmitEventHandler} />
      </section>
    )
  }
}

NewNote.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NewNote;
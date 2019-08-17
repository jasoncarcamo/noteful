import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;
  
  handleFolderDelete = (e) => {
    e.preventDefault();
    const className = e.target.className;
    
    return fetch(`https://noteful-db.herokuapp.com/folders/${className}`, {
      method: "DELETE",
      headers: {
        'content-type': "application/json"
      }
    })
    .then(res => {
      const {folders = []} = this.context;
      const newFolders = folders.filter(folder => folder.id !== className);
      this.context.updateFolders(newFolders);

    });
  }

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
              <button id="delete_folder" className={folder.id} type="button" onClick={this.handleFolderDelete}>Delete</button>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Delete, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';

export const ContactList = (props) => {
  const inputEl = useRef('');

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
  };

  const list = props.contacts.map((contact) => (
    <div
      className='d-flex shadow m-2 rounded p-4 bg-light justify-content-between align-items-end'
      key={contact.id} 
    >
      <div className='d-flex'>
        <Avatar className='me-4' style={{ color: 'blue' }} />
        <div>
          <div>
            <b>{contact.name}</b>
          </div>
          <div>{contact.email}</div>
        </div>
      </div>
      <Delete onClick={() => props.getContactId(contact.id)} style={{ color: 'red' }} />
    </div>
  ));

  return (
    <div>
      <div className='d-flex justify-content-between mt-3 pe-2'>
        <h5 className='ms-4 mt-4'>Contacts</h5>
        <Link to='/add'>
          <button className='btn btn-primary'>Add Contact</button>
        </Link>
      </div>
      {list.length > 0 ? list : 'No Contacts Available'}
    </div>
  );
};

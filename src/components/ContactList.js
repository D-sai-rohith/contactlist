import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';

export const ContactList = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(props.contacts); 
  const loweredSearchTerm = searchTerm.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(loweredSearchTerm)
  );
  function edit(id){
    props.editId(id)
    navigate('/edit')
  }
  // function editContact(contactId) {
  //   const updatedContacts = contacts.map(contact => {
  //     if (contact.id === contactId) {
  //       return { ...contact, name: 'Edited' }; 
  //     }
  //     return contact;
  //   });
  //   setContacts(updatedContacts);
  //   navigate("/Edit")
  // }  

  const sorted = filteredContacts.map((contact) => (
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
      <div>
        <Delete
        onClick={() => props.getContactId(contact.id)} 
        style={{ color: 'red' }} 
        />

        <Link to={'/edit/'+contact.id+'/'+contact.name+'/'+contact.email}>
        <Edit
          style={{ color: 'blue' }}
          
          className='ms-3'
        />
        </Link>
      
      </div>
    </div>
  ));

  return (
    <div>
      <div className='d-flex justify-content-between mt-3 pe-2'>
        <h5 className='ms-4 mt-4'>Contacts</h5>
        <div className='w-50'>
          <input
            type='text'
            className='b-0 p-2 me-2 w-75'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='b-4' />
        </div>
        <Link to='/add'>
          <button className='btn btn-primary'>Add Contact</button>
        </Link>
      </div>
      {sorted}
    </div>
  );
};


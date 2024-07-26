import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const AddContact = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function add(e) {
    e.preventDefault();
    const id = uuidv4();
    if (name === '' || email === '') {
      alert('All the fields are mandatory!');
      return;
    }
    if (email.length !== 10) {
      alert('Enter phone number properly');
      return;
    }
    const newContact = { id, name, email };
    props.detailsToParent(newContact);
    navigate('/');
  }

  return (
    <>
      <div className='ps-3'>
        <div className='mt-2 fs-2 fw-bold'>Add Contact</div>
        <form onSubmit={(e) => add(e)}>
          <div>
            <label htmlFor='name' className='m-1 fw-bold'>
              Name
            </label>
            <br />
            <input
              type='text'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='m-1 h-2 b-0 form-control'
            />
          </div>
          <div>
            <label htmlFor='email' className='m-1 fw-bold'>
              Phone No
            </label>
            <br />
            <input
              type='tel'
              placeholder='123-456-789'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='m-1 b-0 form-control'
            />
          </div>

          <input type='submit' className='btn btn-primary p-2 mt-2 px-5' value='Add' />
        </form>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Delete, Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import {  Button, Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { toast, ToastContainer } from 'react-toastify';
export const ContactList = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(props.contacts); 
  const [editingId,setEditingId] = useState(null)
  const loweredSearchTerm = searchTerm.toLowerCase();
  const handleClose = () => setShowModal(false);
  const objKey='contacts';
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(loweredSearchTerm)
  );
  const [name,setName] = useState({
    name:'',
    email:''
  })
 const saveChanges =  (e) =>
 {
  toast.success("Contact updated successfully",{
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
   e.preventDefault();
     if (name.name === '' || name.email === '') 
       {
           alert('All the fields are mandatory!');
           return;
       }
     if (name.email.length !== 10) 
       {
           alert('Enter phone number properly');
           return;
       }  
   const updatedContacts = contacts.map(contact =>
    {
       if (contact.id === editingId) {
         return { ...contact, name: name.name, email: name.email }; 
       }
       return contact;
     });
     setContacts(updatedContacts)
    
    props.editedContacts(updatedContacts)
     localStorage.setItem(objKey,JSON.stringify(updatedContacts));
     setShowModal(false)
     toast.success("Contact updated successfully",{
      position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
// transition: Bounce,
      });
      
 }
 const viewContact =(contact)=>{
    setViewModal(true)
 }
  const handleDelete = (contact) => 
  {
    toast.success("Contact Deleted",{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
   
  }
//  const handleDelete = async (contact) => {
  //   try {
  //     // If getContactId is async, await its completion
  //     await props.getContactId(contact.id);
  
  //     // Then show the toast
  //     toast.success("Contact Deleted", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting contact:", error);
  //     // Optionally handle errors
  //   }
  // };
  
  const handleShow = (contact) => {
    setName({...name,name:contact.name,email:contact.email})
    setEditingId(contact.id)
    setShowModal(true);
  }
  return (
    <div>
          <ToastContainer/>
        <Modal show={showModal} onHide={handleClose}>
           <Modal.Header closeButton>
               <Modal.Title>Edit Contact</Modal.Title>
           </Modal.Header>
           <Modal.Body>
              <label htmlFor='name' className='m-1 fw-bold'>
                   Name
              </label>
              <input type='text' 
                     placeholder='name'
                     value={name.name}
                     onChange={(e)=>{setName({...name,name:e.target.value})}}
                     className='m-1 h-2 b-0 form-control'></input>
              <label htmlFor='email' className='m-1 fw-bold'>
                    Phone No
              </label>
              <br />
              <input
                     type='tel'
                     placeholder='123-456-789'
                     className='m-1 b-0 form-control'
                     onChange={(e)=>{setName({...name,email:e.target.value})}}
                     value={name.email}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={(e)=>{saveChanges(e)}}>
               Save Changes
            </Button>
        </Modal.Footer>
        </Modal>
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
        <div>
          
        <PersonAddAlt1 className='me-3' color='info'/>
        <Link to='/add'>
          <button className='btn btn-info rounded-pill text-white'>Add Contact</button>
        </Link>
        </div>
      </div>
      {filteredContacts.map((contact) => (
    <div
      className='d-flex shadow m-2 rounded p-4 bg-light justify-content-between align-items-end'
      key={contact.id}
    >
      
      <div className='d-flex align-items-center'>
        <Avatar alt={contact.name} className='me-4' sx={{ bgcolor: '#25cff2;' }} >{contact.name[0].toUpperCase()}</Avatar>
        <div>
          <div>
            <b>{contact.name}</b>
          </div>
          <div>{contact.email}</div>
        </div>
      </div>
      <div>
        
        <Delete
        onClick={() => handleDelete(contact)}
       
        color='warning' 
        />
        <Edit
          color='info'
         onClick={()=>handleShow(contact)
          
         }

          className='ms-3'
        /> 
      </div>
    </div>
  ))}
      
    </div>
  );
};

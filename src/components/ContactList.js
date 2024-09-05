import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Delete, Edit, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Alert, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ContactList = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(props.contacts); 
  const [editingId,setEditingId] = useState(null)
  const [viewModal,setViewModal] = useState(false)
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
 
 const saveChanges = (e) =>
 {
   
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
      });
      
 }
 const viewContact =(contact)=>{
    
    setName({...name,name:contact.name,email:contact.email,src:""})
    setViewModal(true)
    console.log(name)

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
    const updatedContacts = contacts.filter(c => c.id !== contact.id);
    setContacts(updatedContacts);
    localStorage.setItem(objKey, JSON.stringify(updatedContacts));
   
  }
  const handleShow = (contact) => {
    setName({...name,name:contact.name,email:contact.email})
    setEditingId(contact.id)
    setShowModal(true);
  }

  return (
    <div>

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
        <Modal show={viewModal} className='p-3' onHide={()=>setViewModal(false)}>
        <Modal.Header closeButton>
               <Modal.Title>View Contact</Modal.Title>
           </Modal.Header>
           <ModalBody>
            <div className='d-flex justify-content-center align-items-center'>
              <Avatar src={name.src} className='w-50 h-100'/>
            </div>
            <div className='d-flex justify-content-center align-items-center mt-3'>
              
            <input type='file'  />
            </div>
            
            <h5 className='mt-3'>Name : </h5><p>{name.name}</p>
            <h5 className='mt-3'>Phone : </h5><p>{name.email}</p>
           </ModalBody>
           <ModalFooter>
           <Button variant="primary" onClick={()=>{setViewModal(false)}}>
               Close
            </Button>
           </ModalFooter>
        </Modal>
      <ToastContainer/>
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
      {filteredContacts.map((contact) => (
    <div
      className='d-flex shadow m-2 rounded p-4 bg-light justify-content-between align-items-end'
      key={contact.id}
    >
      
      <div className='d-flex'>
        <Avatar alt={contact.name} onClick ={()=>{viewContact(contact)}} src='https://th.bing.com/th/id/OIP.9f07OqZ6qwXdI-25OXJUqQAAAA?rs=1&pid=ImgDetMain' className='me-4' style={{ color: 'blue' }} />
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
       
        style={{ color: 'red' }} 
        />
        <Edit
          style={{ color: 'blue' }}
         onClick={()=>handleShow(contact)}

          className='ms-3'
        /> 
      </div>
    </div>
  ))}
      
    </div>
  );
};
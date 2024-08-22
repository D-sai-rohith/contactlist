import Alert from 'react-bootstrap/Alert';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditContact = (props) => {
    const objKey='contacts';
    const navigate=useNavigate()
    const params = useParams()
    const [showAlert,setShowAlert] = useState(props.showAlert)
    const [alertMessage, setAlertMessage] = useState(props.alertMessage);
    const [name,setName] = useState(params.name)
    const [email,setEmail] = useState(params.email)
    const [contacts,setContacts] = useState(props.contacts)

    const editContact = contacts.find((contact) => contact.id === params.id)
    editContact.name = name
    editContact.email = email
    console.log(props)

    function saveChanges(e)
    {
      e.preventDefault();
        if (name === '' || email === '') 
          {
              alert('All the fields are mandatory!');
              return;
          }
        if (email.length !== 10) 
          {
              alert('Enter phone number properly');
              return;
          }
    const updatedContacts = contacts.map(contact =>
       {
          if (contact.id === params.id) {
            return { ...contact, name: name, email: email }; 
          }
          return contact;
        });
        localStorage.setItem(objKey,JSON.stringify(contacts));
        setAlertMessage('Contact updated successfully!');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1200);
        setTimeout(()=>{
          navigate('/');
        },1200)

    }
  return (
   <>
   {/* <p>{params.id}<br></br>{params.name}</p> */}
   <div className='ps-3'>
        <div className='mt-2 fs-2 fw-bold'>Edit Contact</div>
        {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
        
      )}
        <form onSubmit={(e)=>{saveChanges(e)}}>
          <div>
            <label htmlFor='name' className='m-1 fw-bold'>
              Name
            </label>
            <br />
            <input
              type='text'
              placeholder='name'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
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
              onChange={(e)=>(setEmail(e.target.value))}
              className='m-1 b-0 form-control'
            />
          </div>

          <input type='submit' className='btn btn-primary p-2 mt-2 px-5' value='Save Changes'/>
        </form>
      </div>
   </>
    
  )
}

export default EditContact
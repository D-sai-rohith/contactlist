import { useEffect, useState } from 'react';
import { AddContact } from './AddContact';
import { ContactList } from './ContactList';
import { Header } from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const objKey ='contacts'
  const [contacts,setContacts]=useState([]);
  useEffect(()=> {
    console.log("total contacts"+JSON.stringify(contacts))
  },[])
  const detailsToParent = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts); 
    localStorage.setItem(objKey, JSON.stringify(updatedContacts));
  };
  useEffect(() => {
    const localArray = JSON.parse(localStorage.getItem(objKey));
    if (localArray) setContacts(localArray);
  }, []);
  const deleteContactHandler = (id) => {
    const remainingContacts = contacts.filter((contact) => contact.id !== id); 
    setContacts(remainingContacts);
  };
  return ( 
  <div>
    <div id='none'></div>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' exact Component={() => 
        <ContactList 
          contacts={contacts} 
          getContactId={deleteContactHandler}
          />}/>
        <Route path='/add' Component={() => <AddContact detailsToParent={detailsToParent}/>}/>
      </Routes>
     </BrowserRouter>
  </div>)
}
export default App;

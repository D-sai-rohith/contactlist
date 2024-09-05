import { useEffect, useState } from 'react';
import { AddContact } from './AddContact';
import { ContactList } from './ContactList';
import { Header } from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditContact from './EditContact';
function App() {
  const objKey ='contacts'
  const [contacts,setContacts]=useState([]);
  const detailsToParent = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts); 
    localStorage.setItem(objKey, JSON.stringify(updatedContacts));
  };
  useEffect(() => {
    const localArray = JSON.parse(localStorage.getItem(objKey));
    if (localArray) setContacts(localArray);
  }, []);

  return ( 
  <div>
    <div id='none'></div>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' exact Component={() => 
        <ContactList 
          contacts={contacts} 


          />}/>
        <Route path='/add' Component={() => <AddContact detailsToParent={detailsToParent}/>}/>
        <Route path='/edit/:id/:name/:email' 
        Component={() => <EditContact 
                              contacts={contacts} 
                              />}>                    
        </Route>
      </Routes>
     </BrowserRouter>
  </div>)
}
export default App;

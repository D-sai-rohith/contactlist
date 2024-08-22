import React from 'react'
import { useParams } from 'react-router-dom'

const EditContact = () => {
    const params = useParams()


  return (
   <>
   {/* <p>{params.id}<br></br>{params.name}</p> */}
   <div className='ps-3'>
        <div className='mt-2 fs-2 fw-bold'>Edit Contact</div>
        <form>
          <div>
            <label htmlFor='name' className='m-1 fw-bold'>
              Name
            </label>
            <br />
            <input
              type='text'
              placeholder='name'
              value={params.name}
             
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
              value={params.email}
             
              className='m-1 b-0 form-control'
            />
          </div>

          <input type='submit' className='btn btn-primary p-2 mt-2 px-5' value='Edit' />
        </form>
      </div>
   </>
    
  )
}

export default EditContact
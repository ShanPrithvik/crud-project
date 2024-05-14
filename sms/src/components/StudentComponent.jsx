import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../servises/StudentService'
import { useNavigate,useParams } from 'react-router-dom'

const StudentComponent = () => {


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const{id} = useParams();
  const[errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const navigator = useNavigate();

  useEffect(() => {
    if(id){
      getStudent(id).then((response) =>{
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
      }).catch(error =>{
          console.error(error);
      })
    }
  }, [id])

  // const handleFirstName = (e) => setFirstName(e.target.value);

  // const handleLastName = (e) => setLastName(e.target.value);

  // const handleEmail = (e) => setEmail(e.target.value);

  function saveOrUpdateStudent(e){
    e.preventDefault();

    if(validateForm()){

      const student = {firstName, lastName, email}
      console.log (student)

    if(id){
        updateStudent(id, student).then((response) => {
          console.log(response.data);
          navigator('/student');
        }).catch(error => {
            console.error(error);
        })
    }else{
      createStudent(student).then((response) => {
        console.log(response.data);
        navigator('/student')
    }).catch(error => {
        console.error(error);
    })
    }
    



    }

  }
    function validateForm(){
      let valid = true;

      const errorCopy = {... errors}
      if (firstName.trim()){
        errorCopy.firstName = '';
      } else {
          errorCopy.firstName = 'First name is required';
          valid = false;
      }

      if (lastName.trim()){
        errorCopy.lastName = '';
      } else {
          errorCopy.lastName = 'Last name is required';
          valid = false;
      }

      if (email.trim()){
        errorCopy.email = '';
      } else {
          errorCopy.email = 'Email is required';
          valid = false;
      }

      setErrors(errorCopy);

      return valid;

    }

    function pageTitle(){
      if(id){
        return <h2 className='text-center'>Update Student</h2>
      }else{
        return <h2 className='text-center'>Add Student</h2>
      }
    }

  return (
    <div className='container'>
        <br /> <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 ofset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                      <label className ="form-label"><b>First Name</b></label>
                      <input 
                          type="text" 
                          placeholder='Enter Student First Name'
                          name= 'firstName'
                          value={firstName}
                          className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                          onChange={(e) => setFirstName(e.target.value)}
                          >
                          </input>
                        {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}


              </div>

              <div className='form-group mb-2'>
                      <label className ="form-label"><b>Last Name:</b></label>
                      <input 
                          type="text" 
                          placeholder='Enter Student Last Name'
                          name= 'lastName'
                          value={lastName}
                          className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                          onChange={(e) => setLastName(e.target.value)}
                          >
                          </input>
                          {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}


              </div>

              <div className='form-group mb-2'>
                      <label className ="form-label"><b>Email:</b></label>
                      <input 
                          type="text" 
                          placeholder='Enter Student Email'
                          name= 'email'
                          value={email}
                          className={`form-control ${errors.email ? 'is-invalid': ''}`}
                          onChange={(e) => setEmail(e.target.value)}
                          >
                          </input>
                          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                          
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>
         </form>
         </div>
        </div>
      </div>
    </div>


  )
}

export default StudentComponent
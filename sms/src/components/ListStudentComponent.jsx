import React, { useEffect, useState } from 'react';
import { deleteStudent, listStudents, filterStudents } from '../servises/StudentService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// the varibale = useState([]); allows us to define the state varibales in functional compounds. useStae hook returns array with exact two values
//  1st it will pass to the state variable "student", 2nd is the function "setStudnets" that updates the state varibale
// student is state variable caz it is responsible to get and display the Backend Data. this holds the reponse of the REST API
// in this case we should use a annotation @CrossOrgin("*") so * means all the clinets can able to call the students related REST APIs

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    const [searchCriteria, setSearchCriteria] = useState('');
    const navigator = useNavigate();

    useEffect(() => { //useEffect hook is used to handle side effects in functional components, such as fetching data, updating the DOM, and setting up subscriptions or timers.
        getAllStudents();
    }, []);

    function getAllStudents() {
        listStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewStudent() {
        navigator('/add-student');
    }

    function updateStudent(id) {
        navigator(`/edit-student/${id}`);
    }

    function removeStudent(id) {
        deleteStudent(id)
            .then((response) => {
                getAllStudents();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            toast.error('Field is empty. Please fill the field and search again.');
            return;
        }

        if (searchTerm.trim() !== '') {
            filterStudents(searchCriteria, searchTerm)
                .then((response) => {
                    if (response.data.length === 0) {
                        toast.error('Nothing matches the search criteria.');
                    } else {
                        setStudents(response.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            getAllStudents();
        }
    };

    const handleCriteriaChange = (event) => {
        setSearchCriteria(event.target.value);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <ToastContainer />

            <h2 className="text-center">List of Students</h2>
            <button className="btn btn-primary mb-2" onClick={addNewStudent}>
                Add New Student
            </button>

            <div className="row">
                <div className="col-md-6">


                    {/* Text input */}
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Search by ${searchCriteria.replace('-', ' ')}`}
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="col-md-6">


                    {/* Dropdown menu */}
                    <select className="form-select" value={searchCriteria} onChange={handleCriteriaChange}>
                        <option value="first-name">First Name</option>
                        <option value="last-name">Last Name</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </div>

            <ul className="pagination justify-content-end">

                {/* pagination Previous Logic */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)} tabIndex="-1" aria-disabled="true">Previous</button>
                </li>


                {/* pagination pageing Logic */}
                {[...Array(Math.ceil(students.length / studentsPerPage)).keys()].map((number) => (
                    <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</button>
                    </li>
                ))}
            

                {/* pagination Next Logic */}
                <li className={`page-item ${currentPage === Math.ceil(currentStudents.length / studentsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                </li>
            </ul>


            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        {/* <th>Student ID</th> */}
                        <th>Student First Name</th>
                        <th>Student Last Name</th>
                        <th>Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student) => (
                        <tr key={student.id}>
                            {/* <td>{student.id}</td> */}
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateStudent(student.id)}>
                                    Update
                                </button>
                                <button className="btn btn-danger" onClick={() => removeStudent(student.id)} style={{ marginLeft: '10px' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListStudentComponent;

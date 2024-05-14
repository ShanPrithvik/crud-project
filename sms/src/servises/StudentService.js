// import axios from "axios";

// // below is base URL for all the rest apis for employees resource
// const REST_API_BASE_URL = 'http://localhost:8080/api/student';

import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/student';

export const listStudents = () => axios.get(REST_API_BASE_URL);

export const createStudent = (student) => axios.post(REST_API_BASE_URL, student);

export const getStudent = (studentID) => axios.get(REST_API_BASE_URL + '/' + studentID);

export const updateStudent = (studentID, student) => axios.put(REST_API_BASE_URL + '/' + studentID, student);

export const deleteStudent = (studentID) => axios.delete(REST_API_BASE_URL + '/' + studentID);

export const filterStudents = (criteria, keyword) => {
    const url = `${REST_API_BASE_URL}/filter/${criteria}/${keyword}`;
    return axios.get(url);

// REST_API_BASE_URL is 'http://localhost:8080/api/student', 
// and call filterStudents('first-name', 'John'), 
// the generated URL would be 'http://localhost:8080/api/student/filter/first-name/John'. 
// This URL is then used to fetch the filtered students from the backend API.   

};

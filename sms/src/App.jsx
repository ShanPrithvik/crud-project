import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'

function App() {
//  this is responsible for app lvl component, App is a Base lvl component

  return (
    <>
    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element = {<ListStudentComponent/>}></Route>
          {/* //http://localhost:3000/student */}
          <Route path='/student' element = {<ListStudentComponent/>}></Route>
         {/* //http://localhost:3000/add-student */}
          <Route path='/add-student' element = {<StudentComponent />}></Route>
          {/* //http://localhost:3000/edit-stduent/1 */}
          <Route path='/edit-student/:id' element = {<StudentComponent />}></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App

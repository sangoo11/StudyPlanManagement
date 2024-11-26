import { Route, Routes } from 'react-router';
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import ErrorPage from './components/ErrorPage/ErrorPage'
import HomePage from './components/Home/HomePage';
import ServicePage from './components/Home/ServicePage';
import AboutPage from './components/Home/AboutPage';
import OurTeamsPage from './components/Home/OurTeamsPage';
import ContactPage from './components/Home/ContactPage';

// Layouts
import HomePageLayout from './layouts/HomePageLayout'
import SignUpInLayout from './layouts/SignUpInLayout';
import AdminPageLayout from './layouts/AdminPageLayout';
import TeacherPageLayout from './layouts/TeacherPageLayout';
import StudentPageLayout from './layouts/StudentPageLayout';

// Admin
import AdminPage from './components/AdminPage/AdminPage'
import StudentsManagePage from './components/AdminPage/StudentsManagePage/StudentsManagePage';
import StatisticsManagePage from './components/AdminPage/StatisticsManagePage/StatisticsManagePage';
import TeachersManagePage from './components/AdminPage/TeachersManagePage/TeachersManagePage';
import ClassroomsManagePage from './components/AdminPage/ClassroomsManagePage/ClassroomsManagePage';
import OutputCriteriaManagePage from './components/AdminPage/OutputCriteriaManagePage/OutputCriteriaManagePage';

// Student 
import StudentPage from './components/StudentPage/StudentPage'
import LearningResults from './components/StudentPage/LearningResults'
import LearningOutcome from './components/StudentPage/LearningOutcome'

// Teacher
import TeacherPage from './components/TeacherPage/TeacherPage'

function App() {
  return (
    <Routes>
      <Route element={<HomePageLayout />}>
        <Route path='' element={<HomePage />}></Route>
        <Route path='home' element={<HomePage />}></Route>
        <Route path='service' element={<ServicePage />}></Route>
        <Route path='about' element={<AboutPage />}></Route>
        <Route path='ourteams' element={<OurTeamsPage />}></Route>
        <Route path='contact' element={<ContactPage />}></Route>

      </Route>
      <Route element={<SignUpInLayout />}>
        <Route path='signin' element={<SignInPage />}></Route>
        <Route path='signup' element={<SignUpPage />}></Route>
      </Route>
      <Route element={<StudentPageLayout />}>
        <Route path='student' element={<StudentPage />}>
          <Route path='learningresults' element={<LearningResults />}></Route>
          <Route path='learningoutcome' element={<LearningOutcome />}></Route>
        </Route>
      </Route>
      <Route element={<TeacherPageLayout />}>
        <Route path='teacher' element={<TeacherPage />}>

        </Route>
      </Route>
      <Route element={<AdminPageLayout />}>
        <Route path='admin' element={<AdminPage />}>
          <Route path='statistic' element={<StatisticsManagePage />}></Route>
          <Route path='students' element={<StudentsManagePage />}></Route>
          <Route path='teachers' element={<TeachersManagePage />}></Route>
          <Route path='outputcriteria' element={<ClassroomsManagePage />}></Route>
          <Route path='classrooms' element={<OutputCriteriaManagePage />}></Route>
        </Route>
      </Route>

      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
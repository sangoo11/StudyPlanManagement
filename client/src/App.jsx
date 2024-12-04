import { Route, Routes } from 'react-router';
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import ErrorPage from './components/ErrorPage/ErrorPage'
import HomePage from './components/Home/HomePage';
import ServicePage from './components/Home/ServicePage';
import AboutPage from './components/Home/AboutPage';
import OurTeamsPage from './components/Home/OurTeamsPage';
import ContactPage from './components/Home/ContactPage';
import HomePageLayout from './layouts/HomePageLayout'
import SignUpInLayout from './layouts/SignUpInLayout';
import AdminPage from './components/AdminPage/AdminPage'

// Layout
import AdminPageLayout from './layouts/AdminPageLayout';
import TeacherPageLayout from './layouts/TeacherPageLayout';
import StudentPageLayout from './layouts/StudentPageLayout';

// Admin
import StudentsManagePage from './components/AdminPage/StudentsManagePage/StudentsManagePage';
import TeachersManagePage from './components/AdminPage/TeachersManagePage/TeachersManagePage';
import ClassroomsManagePage from './components/AdminPage/ClassroomsManagePage/ClassroomsManagePage';
import OutputCriteriaManagePage from './components/AdminPage/OutputCriteriaManagePage/OutputCriteriaManagePage';

// Student 
import StudentPage from './components/StudentPage/StudentPage'
import LearningResults from './components/StudentPage/LearningResults/LearningResults'
import StudentLearningOutcome from './components/StudentPage/LearningOutcome/LearningOutcome'

// Teacher
import TeacherPage from './components/TeacherPage/TeacherPage'
import TeacherStatistics from './components/TeacherPage/Statistics/Statistics'

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
        <Route path='student' element={<StudentPage />}></Route>
        <Route path='student/results' element={<LearningResults />}></Route>
        <Route path='student/outcome' element={<StudentLearningOutcome />}></Route>
      </Route>
      <Route element={<TeacherPageLayout />}>
        <Route path='teacher' element={<TeacherPage />}> </Route>
        <Route path='teacher/statistics' element={<TeacherStatistics />}></Route>
      </Route>
      <Route element={<AdminPageLayout />}>
        <Route path='admin' element={<AdminPage />}></Route>
        <Route path='admin/students' element={<StudentsManagePage />}></Route>
        <Route path='admin/teachers' element={<TeachersManagePage />}></Route>
        <Route path='admin/outputcriteria' element={<OutputCriteriaManagePage />}></Route>
        <Route path='admin/classrooms' element={<ClassroomsManagePage />}></Route>
      </Route>

      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
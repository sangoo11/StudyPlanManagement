import { Navigate, Route, Routes } from 'react-router';
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
import ProtectedRouteUser from './components/ProtectedRoute/ProtectedRouteUser';
import TeacherStatistics from './components/TeacherPage/Statistics/Statistics'

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const userType = localStorage.getItem('userType');

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<HomePageLayout />}>
        <Route path='' element={<HomePage />} />
        <Route path='home' element={<HomePage />} />
        <Route path='service' element={<ServicePage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='ourteams' element={<OurTeamsPage />} />
        <Route path='contact' element={<ContactPage />} />
      </Route>

      <Route element={<SignUpInLayout />}>
        <Route path='signin' element={<SignInPage />} />
        <Route path='signup' element={<SignUpPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<StudentPageLayout />}>
        <Route path='student' element={<StudentPage />}>
          <Route path='results' element={<LearningResults />} />
          <Route path='outcome' element={<StudentLearningOutcome />} />
        </Route>
      </Route>

      <Route element={<TeacherPageLayout />}>
        <Route path='teacher' element={<TeacherPage />}>

          <Route path='statistics' element={<TeacherStatistics />} />
        </Route>
      </Route>

      <Route element={<AdminPageLayout />}>
        <Route path='admin' element={<AdminPageLayout />}>
          <Route path='students' element={<StudentsManagePage />} />
          <Route path='teachers' element={<TeachersManagePage />} />
          <Route path='classrooms' element={<ClassroomsManagePage />} />
          <Route path='outputcriteria' element={<OutputCriteriaManagePage />} />
        </Route>
      </Route>

      {/* Catch-all route for undefined paths */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
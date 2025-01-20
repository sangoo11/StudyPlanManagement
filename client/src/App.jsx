import { Navigate, Route, Routes } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
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
import AccountPage from './components/AccountPage'

// Layout
import AdminPageLayout from './layouts/AdminPageLayout';
import TeacherPageLayout from './layouts/TeacherPageLayout';
import StudentPageLayout from './layouts/StudentPageLayout';

// Admin
import StudentsManagePage from './components/AdminPage/StudentsManagePage/StudentsManagePage';
import TeachersManagePage from './components/AdminPage/TeachersManagePage/TeachersManagePage';
import SubjectsManagePage from './components/AdminPage/SubjectsManagePage/SubjectsManagePage';
import OutputCriteriaManagePage from './components/AdminPage/OutputCriteriaManagePage/OutputCriteriaManagePage';
import StatisticsPage from './components/AdminPage/StatisticsPage/StatisticsPage';
import DetailClassroom from './components/AdminPage/SubjectsManagePage/components/DetailClassroom';
//Modal
import AddClassroom from './components/AdminPage/SubjectsManagePage/components/AddClassroom';
import DeleteClassroom from './components/AdminPage/SubjectsManagePage/components/DeleteClassroom';
import EditClassroom from './components/AdminPage/SubjectsManagePage/components/EditClassroom';

import AddStudent from './components/AdminPage/SubjectsManagePage/components/AddStudent';
import DeleteStudent from './components/AdminPage/SubjectsManagePage/components/DeleteStudent';
import EditStudent from './components/AdminPage/SubjectsManagePage/components/EditStudent';

import AddStudentInManagePage from './components/AdminPage/StudentsManagePage/AddStudent';

import AddTeacher from './components/AdminPage/TeachersManagePage/AddTeacher';
import DeleteTeacher from './components/AdminPage/TeachersManagePage/DeleteTeacher';
import EditTeacher from './components/AdminPage/TeachersManagePage/EditTeacher';

import AddSubject from './components/AdminPage/SubjectsManagePage/components/AddSubject';
import DeleteSubject from './components/AdminPage/SubjectsManagePage/components/DeleteSubject';
import EditSubject from './components/AdminPage/SubjectsManagePage/components/EditSubject';

import AddCriteria from './components/AdminPage/OutputCriteriaManagePage/AddCriteria';
import DeleteCriteria from './components/AdminPage/OutputCriteriaManagePage/DeleteCriteria';
import EditCriteria from './components/AdminPage/OutputCriteriaManagePage/EditCriteria';
import AddSubjectInCriteria from './components/AdminPage/OutputCriteriaManagePage/AddSubjectInCriteria'
import DeleteSubjectInCriteria from './components/AdminPage/OutputCriteriaManagePage/DeleteSubjectInCriteria'
import EditSubjectInCriteria from './components/AdminPage/OutputCriteriaManagePage/EditSubjectInCriteria'
// Student 
import StudentPage from './components/StudentPage/StudentPage'
import LearningResults from './components/StudentPage/LearningResults/LearningResults'
import StudentLearningOutcome from './components/StudentPage/LearningOutcome/LearningOutcome'
import StudentAccount from './components/StudentPage/StudentAccount';

// Teacher
import TeacherPage from './components/TeacherPage/TeacherPage'
import ProtectedRouteUser from './components/ProtectedRoute/ProtectedRouteUser';
import Statistics from './components/TeacherPage/Statistics/Statistics';
import CourseDetail from './components/TeacherPage/CourseDetail';
import EditPoint from './components/TeacherPage/EditPoint';
import TeacherAccount from './components/TeacherPage/TeacherAccount';

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
        <Route path='student' element={<StudentPage />}></Route>
        <Route path='student/results' element={<LearningResults />} />
        <Route path='student/outcome' element={<StudentLearningOutcome />} />
        <Route path='student/accountstudent/:accountID' element={<StudentAccount />} />
      </Route>

      <Route element={<TeacherPageLayout />}>
        <Route path='teacher' element={<TeacherPage />}> </Route>
        <Route path='/teacher/coursedetail/:courseID' element={<CourseDetail />} />
        <Route path='/teacher/statistics' element={<Statistics />} />
        <Route path='teacher/editpoint/:studentID' element={<EditPoint />} />
        <Route path='teacher/accountteacher/:accountID' element={<TeacherAccount />} />
      </Route>

      <Route path='admin' element={<AdminPageLayout />}>
        <Route path='statistics' element={<Statistics />} />
        <Route path='students' element={<StudentsManagePage />} />
        <Route path='teachers' element={<TeachersManagePage />} />
        <Route path='subjects' element={<SubjectsManagePage />} />
        <Route path='outputcriteria' element={<OutputCriteriaManagePage />} />
        <Route path='detailclassroom/:courseID' element={<DetailClassroom />} />
        <Route path='accountadmin' element={<AccountPage />} />
      </Route>

      {/* Admin modals */}
      <Route path='admin/subjects/addclassroom' element={<AddClassroom />} />
      <Route path='admin/subjects/deleteclassroom' element={<DeleteClassroom />} />
      <Route path='admin/subjects/editclassroom' element={<EditClassroom />} />

      <Route path='admin/students/addstudent' element={<AddStudentInManagePage />} />

      <Route path='admin/teachers/addteacher' element={<AddTeacher />} />
      <Route path='admin/teachers/editteacher' element={<EditTeacher />} />
      <Route path='admin/teachers/deleteteacher' element={<DeleteTeacher />} />

      <Route path='admin/subjects/addstudent' element={<AddStudent />} />
      <Route path='admin/subjects/deletestudent' element={<DeleteStudent />} />
      <Route path='admin/subjects/editstudent' element={<EditStudent />} />

      <Route path='admin/subjects/addsubject' element={<AddSubject />} />
      <Route path='admin/subjects/deletesubject' element={<DeleteSubject />} />
      <Route path='admin/subjects/editsubject' element={<EditSubject />} />

      <Route path='admin/outputcriteria/addcriteria' element={<AddSubject />} />
      <Route path='admin/outputcriteria/deletecriteria' element={<DeleteCriteria />} />
      <Route path='admin/outputcriteria/editcriteria' element={<EditCriteria />} />
      <Route path='admin/outputcriteria/addsubject' element={<AddSubjectInCriteria />} />
      <Route path='admin/outputcriteria/deletesubject' element={<DeleteSubjectInCriteria />} />
      <Route path='admin/outputcriteria/editsubject' element={<EditSubjectInCriteria />} />
      {/* Catch-all route for undefined paths */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
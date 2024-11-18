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

function App() {
  return (
    <Routes>
      <Route element={<HomePageLayout />}>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/service' element={<ServicePage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/ourteams' element={<OurTeamsPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>

      </Route>
      <Route path='/signin' element={<SignInPage />}></Route>
      <Route path='/signup' element={<SignUpPage />}></Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
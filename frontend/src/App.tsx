import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { LoadingPage } from './components/LoadingPage'

import Dashboard from './pages/dashboard'
import SignInAndSignUp from './pages/signInAndSignUp'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import ViewBlog from './pages/ViewBlog'
import ProfileView from './pages/ProfileView'

// const Dashboard = lazy(() => import("./pages/dashboard"))
// const SignInAndSignUp = lazy(() => import("./pages/signInAndSignUp"))
// const CreateBlog = lazy(() => import("./pages/CreateBlog"))
// const UpdateBlog = lazy(() => import("./pages/UpdateBlog"))
// const ViewBlog = lazy(() => import("./pages/ViewBlog"))
// const ProfileView = lazy(() => import("./pages/ProfileView"))

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Suspense fallback={<LoadingPage />}><SignInAndSignUp /></Suspense>} />
          <Route path='/dashboard' element={<Suspense fallback={<LoadingPage />}><Dashboard /></Suspense>} />
          {/* <Route path='/' element={<Suspense fallback={<LoadingPage />}><Dashboard /></Suspense>} />
          <Route path='/signuporsignin' element={<Suspense fallback={<LoadingPage />}><SignInAndSignUp /></Suspense>} /> */}
          <Route path='/create-blog' element={<Suspense fallback={<LoadingPage />}><CreateBlog /></Suspense>} />
          <Route path='/update-blog' element={<Suspense fallback={<LoadingPage />}><UpdateBlog /></Suspense>} />
          <Route path='/view/:blogId' element={<Suspense fallback={<LoadingPage />}><ViewBlog /></Suspense>} />
          <Route path='/profile/me' element={<Suspense fallback={<LoadingPage />}><ProfileView /></Suspense>} />
          <Route path='/profile/:authorId' element={<Suspense fallback={<LoadingPage />}><ProfileView /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

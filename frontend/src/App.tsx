import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import Temp from './components/temp'

const Dashboard = lazy(() => import("./pages/dashboard"))
const SignInAndSignUp = lazy(() => import("./pages/signInAndSignUp"))
const CreateBlog = lazy(() => import("./pages/CreateBlog"))
const UpdateBlog = lazy(() => import("./pages/UpdateBlog"))
const ViewBlog = lazy(() => import("./pages/ViewBlog"))
const ProfileView = lazy(() => import("./pages/ProfileView"))

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/signuporsignin' element={<Suspense fallback={"Loading..."}><SignInAndSignUp /></Suspense>} />
          <Route path='/' element={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
          <Route path='/create-blog' element={<Suspense fallback={"Loading..."}><CreateBlog /></Suspense>} />
          <Route path='/update-blog' element={<Suspense fallback={"Loading..."}><UpdateBlog /></Suspense>} />
          <Route path='/view/:blogId' element={<Suspense fallback={"Loading..."}><ViewBlog /></Suspense>} />
          <Route path='/profile/me' element={<Suspense fallback={"Loading..."}><ProfileView /></Suspense>} />
          <Route path='/profile/:authorId' element={<Suspense fallback={"Loading..."}><ProfileView /></Suspense>} />
          <Route path='/temp' element={<Suspense fallback={"Loading..."}><Temp/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

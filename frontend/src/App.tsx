import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import Temp from './components/temp'

const Dashboard = lazy(() => import("./pages/dashboard"))
const SignInAndSignUp = lazy(() => import("./pages/signInAndSignUp"))
const Blog = lazy(() => import("./pages/blog"))
const ViewBlog = lazy(() => import("./pages/ViewBlog"))


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/signuporsignin' element={<Suspense fallback={"Loading..."}><SignInAndSignUp /></Suspense>} />
          <Route path='/' element={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
          <Route path='/blog' element={<Suspense fallback={"Loading..."}><Blog /></Suspense>} />
          <Route path='/view/:blogId' element={<Suspense fallback={"Loading..."}><ViewBlog /></Suspense>} />
          <Route path='/temp' element={<Suspense fallback={"Loading..."}><Temp/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

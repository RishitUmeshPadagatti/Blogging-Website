import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import Testing from './components/Testing'

const Dashboard = lazy(() => import("./pages/dashboard"))
const SignInAndSignUp = lazy(() => import("./pages/signInAndSignUp"))
const Blog = lazy(() => import("./pages/blog"))


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/signuporsignin' element={<Suspense fallback={"Loading..."}><SignInAndSignUp /></Suspense>} />
          <Route path='/' element={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
          <Route path='/blog' element={<Suspense fallback={"Loading..."}><Blog /></Suspense>} />
          <Route path='/testing' element={<Suspense fallback={"Loading..."}><Testing /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

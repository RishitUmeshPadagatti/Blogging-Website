import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { RecoilRoot } from 'recoil'

const Dashboard = lazy(() => import("./pages/dashboard"))
const SignInAndSignUp = lazy(() => import("./pages/signInAndSignUp"))
const Blog = lazy(() => import("./pages/blog"))


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Suspense fallback={"Loading..."}><Dashboard /></Suspense>} />
          <Route path='/signuporsignin' element={<Suspense fallback={"Loading..."}><SignInAndSignUp /></Suspense>} />
          <Route path='/blog' element={<Suspense fallback={"Loading..."}><Blog /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App

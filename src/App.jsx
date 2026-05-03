import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/AuthSlice.js"
import { Loader, Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const userData = authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">

      {/* Header */}
      <div className="sticky top-0 z-50 shadow-md bg-gray-800">
        <Header />
      </div>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* <Outlet /> */}
        <div className="max-w-7xl mx-auto">
        </div>
      </main>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700">
        <Footer />
      </div>

    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Loader />
    </div>
  );
}

export default App;

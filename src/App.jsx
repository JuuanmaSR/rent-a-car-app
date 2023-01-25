import React from 'react'
import { Link, Route, Switch } from 'wouter'
import { UserContextProvider } from 'context/UserContext'

import Header from 'components/Header/Header'
import Home from 'pages/Home/Home'
import AdminPanel from 'pages/AdminPanel/AdminPanel'

import './App.css'

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <section className="App-content">
          <Route component={Home} path="/" />
          <Route component={AdminPanel} path="/admin" />
        </section>
      </div>
    </UserContextProvider>
  )
}

export default App

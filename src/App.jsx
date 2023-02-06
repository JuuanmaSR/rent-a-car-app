import React from 'react'
import { Link, Route, Switch } from 'wouter'
import { UserContextProvider } from 'context/UserContext'
import { CustomerContextProvider } from 'context/CustomerContext'

import Header from 'components/Header/Header'

import Home from 'pages/Home/Home'
import AdminPanel from 'pages/AdminPanel/AdminPanel'
import CustomerDashboard from 'pages/CustomerDashboard/CustomerDashboard'
import CustomerForm from 'pages/CustomerForm/CustomerForm'

import CarDashboard from 'pages/CarDashboard/CarDashboard'
import RentDashboard from 'pages/RentDashboard/RentDashboard'

import './App.css'

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <section className="App-content">
          <CustomerContextProvider>
            <Switch>
              <Route component={Home} path="/" />
              <Route component={AdminPanel} path="/admin" />
              <Route component={CustomerDashboard} path="/admin/clientes" />
              <Route path="/admin/clientes/agregar" component={CustomerAddForm} />
              <Route path="/admin/clientes/editar/:id" component={CustomerUpdateForm} />
              <Route component={CarDashboard} path="/admin/vehiculos" />
              <Route component={RentDashboard} path="/admin/alquileres" />
            </Switch>
          </CustomerContextProvider>
        </section>
      </div>
    </UserContextProvider>
  )
}

export default App

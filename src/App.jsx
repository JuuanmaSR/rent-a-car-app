import React from 'react'
import { Route, Switch } from 'wouter'
import { UserContextProvider } from 'context/UserContext'
import { CustomerContextProvider } from 'context/CustomerContext'
import { CarContextProvider } from 'context/CarContext'

import Header from 'components/Header/Header'

import Home from 'pages/Home/Home'
import AdminPanel from 'pages/AdminPanel/AdminPanel'

import CustomerDashboard from 'pages/CustomerDashboard/CustomerDashboard'
import CustomerAddForm from 'pages/CustomerAddForm/CustomerAddForm'
import CustomerUpdateForm from 'pages/CustomerUpdateForm/CustomerUpdateForm'
import CustomerDetail from 'pages/CustomerDetail/CustomerDetail'

import CarDashboard from 'pages/CarDashboard/CarDashboard'
import CarDetail from 'pages/CarDetail/CarDetail'

import RentDashboard from 'pages/RentDashboard/RentDashboard'

import './App.css'
import CarAddForm from 'pages/CarAddForm/CarAddForm'

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <section className="App-content">
          <CarContextProvider>
            <CustomerContextProvider>
              <Switch>
                <Route component={Home} path="/" />
                <Route component={AdminPanel} path="/admin" />
                <Route component={CustomerDashboard} path="/admin/clientes" />
                <Route path="/admin/clientes/agregar" component={CustomerAddForm} />
                <Route path="/admin/clientes/editar/:id" component={CustomerUpdateForm} />
                <Route path="/admin/clientes/detalle/:id" component={CustomerDetail} />
                <Route component={CarDashboard} path="/admin/vehiculos" />
                <Route path="/admin/vehiculos/detalle/:id" component={CarDetail} />
                <Route path="/admin/vehiculos/agregar" component={CarAddForm} />
                <Route component={RentDashboard} path="/admin/alquileres" />
              </Switch>
            </CustomerContextProvider>
          </CarContextProvider>
        </section>
      </div>
    </UserContextProvider>
  )
}

export default App

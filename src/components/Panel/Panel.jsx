import PanelItem from 'components/PanelItem/PanelItem'
import React from 'react'
import './styles.css'

const Panel = () => {
  return (
    <>
      <h1 className="panel-title">Panel de administración</h1>
      <div className="panel-container">
        <PanelItem
          title="Alquileres"
          description="Gestion de alquileres"
          key="alquileres"
          urlModule=""
        />
        <PanelItem title="Clientes" description="Gestion de clientes" key="clientes" urlModule="" />
        <PanelItem
          title="Vehiculos"
          description="Gestion de vehiculos"
          key="vehiculos"
          urlModule=""
        />
      </div>
    </>
  )
}

export default Panel

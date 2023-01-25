import React from 'react'
import { Link } from 'wouter'
import './styles.css'

const PanelItem = ({ title, description, urlModule }) => {
  return (
    <>
      <Link to={`/${urlModule}`} className="panel-item-container">
        <h3 className="panel-title-item">{title}</h3>
        <p className="">{description}</p>
      </Link>
    </>
  )
}

export default PanelItem

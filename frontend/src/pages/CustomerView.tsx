import React from 'react'
import '../App.css'

import BusinessButton from '../components/buttons/BusinessButton'
import TopRatedRestaurants from '../components/features/TopRatedRestaurants'

const App: React.FC = () => {  
  return (
    <div className="space-y-8">
      <div className="mb-12 flex space-x-4">
        <BusinessButton></BusinessButton>
      </div>
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>
      <TopRatedRestaurants></TopRatedRestaurants>
    </div>
  )
}

export default App


import React from 'react'

// Importing the components that were extracted to separate files
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Recommendations from './components/Recommendations'
import Environmental from './components/Environmental'
import MilestoneCard from './components/MilestoneCard'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero onPlan={() => alert('Smart Planner (coming soon)')} onExploreEnv={() => {
        const el = document.querySelector('#env-snap')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }} />
      <div id="env-snap" />
      <Environmental />
      <Recommendations />
      <MilestoneCard />
      <Footer />
    </>
  )
}

export default App

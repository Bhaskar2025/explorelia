import React, { useState } from 'react'

const Hero: React.FC<{ onPlan: () => void; onExploreEnv: () => void }> = ({ onPlan, onExploreEnv }) => {
  const [query, setQuery] = useState('')
  return (
    <section className="container hero">
      <div className="hero-card">
        <h1 className="hero-title">Discover Jaipur Smartly</h1>
        <p className="hero-sub">
          AI-powered recommendations with real-time environmental insights for sustainable, delightful trips.
        </p>
        <div className="search">
          <input
            placeholder="Search attractions, hotels, restaurants…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn primary" onClick={() => alert(`Search: ${query}`)}>Search</button>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button className="btn primary" onClick={onPlan}>Plan My Smart Trip</button>
          <button className="btn" onClick={onExploreEnv}>Explore Environmental Insights</button>
        </div>
      </div>

      <div className="grid" style={{ gap: 14 }}>
        <div className="kpis">
          <div className="kpi">
            <div className="badge">Crowd</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>Moderate</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Popular spots manageable</div>
          </div>
          <div className="kpi">
            <div className="badge">AQI</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>Good</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Favorable for outdoor visits</div>
          </div>
          <div className="kpi">
            <div className="badge">Weather</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>Sunny</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>Hydrate & plan mid‑day breaks</div>
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginTop: 0 }}>Why this guide?</h4>
          <p style={{ color: 'var(--muted)' }}>
            Personalized suggestions, eco‑tips, and route planning that balance traffic, AQI, weather, and attraction hours.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero

import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Recommendation = {
  id: string
  title: string
  image: string
  description: string
  rating: number
}

type Environmental = {
  aqi: number
  tempC: number
  weather: string
}

type Milestone = {
  title: string
  description: string
  progressPercent: number
}

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-mark" />
          Jaipur Smart Guide
        </div>
        <div className="nav-links">
          <a>Home</a>
          <a>Explore</a>
          <a>Plan Trip</a>
          <a>Environmental Data</a>
          <a>About</a>
        </div>
        <div>
          <button className="btn">Sign In</button>
        </div>
      </div>
    </nav>
  )
}

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

const Recommendations: React.FC = () => {
  const [items, setItems] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/recommendations?userId=1').then(res => {
      setItems(res.data.items || [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <section className="container" style={{ marginTop: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Smart Recommendations for You</h3>
      <div className="grid cards">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card" style={{ gridColumn: 'span 4' }}>
            <div style={{ height: 120, background: 'var(--surface)', borderRadius: 10 }} />
            <div style={{ height: 12 }} />
            <div style={{ height: 12, width: '60%', background: 'var(--surface)', borderRadius: 6 }} />
            <div style={{ height: 8 }} />
            <div style={{ height: 12, width: '40%', background: 'var(--surface)', borderRadius: 6 }} />
          </div>
        ))}
        {!loading && items.map((x) => (
          <div key={x.id} className="card" style={{ gridColumn: 'span 4' }}>
            <div style={{
              height: 140,
              borderRadius: 10,
              background: `url(${x.image}) center/cover no-repeat`
            }} />
            <h4>{x.title}</h4>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{x.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⭐ {x.rating.toFixed(1)}</span>
              <button className="btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const Environmental: React.FC = () => {
  const [env, setEnv] = useState<Environmental | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/environmental?location=jaipur').then(res => {
      setEnv(res.data)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <section className="container" style={{ marginTop: 28 }}>
      <h3 style={{ marginBottom: 12 }}>Environmental Snapshot</h3>
      <div className="kpis">
        <div className="kpi">
          <div className="badge">AQI</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
            {loading ? '—' : env?.aqi}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Air Quality Index</div>
        </div>
        <div className="kpi">
          <div className="badge">Temp</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
            {loading ? '—' : `${env?.tempC}°C`}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Current temperature</div>
        </div>
        <div className="kpi">
          <div className="badge">Weather</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
            {loading ? '—' : env?.weather}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Conditions</div>
        </div>
      </div>
    </section>
  )
}

const MilestoneCard: React.FC = () => {
  const [milestone, setMilestone] = useState<Milestone | null>(null)

  useEffect(() => {
    axios.get('/api/user/1/milestones').then(res => setMilestone(res.data.current))
  }, [])

  return (
    <section className="container" style={{ marginTop: 28 }}>
      <div className="card">
        <div className="badge">Sustainability</div>
        <h4 style={{ marginTop: 8 }}>{milestone?.title ?? 'Loading…'}</h4>
        <p style={{ color: 'var(--muted)', marginTop: 6 }}>
          {milestone?.description ?? 'Fetching your progress…'}
        </p>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          height: 10,
          marginTop: 8,
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${milestone?.progressPercent ?? 0}%`,
            background: 'var(--primary)',
            height: '100%'
          }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="btn">View Achievements</button>
        </div>
      </div>
    </section>
  )
}

const Footer: React.FC = () => (
  <footer className="footer container">
    © Jaipur Smart Guide
  </footer>
)

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

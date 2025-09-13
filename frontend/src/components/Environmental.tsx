import React, { useEffect, useState } from 'react'
import axios from 'axios'

type EnvironmentalType = {
  aqi: number
  tempC: number
  weather: string
}

const Environmental: React.FC = () => {
  const [env, setEnv] = useState<EnvironmentalType | null>(null)
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

export default Environmental

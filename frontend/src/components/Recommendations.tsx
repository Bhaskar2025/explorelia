import React, { useEffect, useState } from 'react'
import axios from 'axios'

type RecommendationType = {
  id: string
  title: string
  image: string
  description: string
  rating: number
}

const Recommendations: React.FC = () => {
  const [items, setItems] = useState<RecommendationType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/recommendations?userId=1').then(res => {
      console.log(res.data)
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

export default Recommendations

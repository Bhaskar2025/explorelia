import React, { useEffect, useState } from 'react'
import axios from 'axios'

type MilestoneType = {
  title: string
  description: string
  progressPercent: number
}

const MilestoneCard: React.FC = () => {
  const [milestone, setMilestone] = useState<MilestoneType | null>(null)

  useEffect(() => {
    axios.get('/api/user/1/milestones').then(res => {
      console.log(res.data)
      setMilestone(res.data.current)
    })
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

export default MilestoneCard

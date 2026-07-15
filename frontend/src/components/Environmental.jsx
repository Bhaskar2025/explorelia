import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Environmental = () => {
  const [env, setEnv] = useState(null)
  const [loading, setLoading] = useState(true)

  const location = "jaipur"
  useEffect(() => {
    axios.get(`/api/environmental?location=${location}`).then(res => {
      console.log("Test Environmental Component Data" + res.data)
      setEnv(res.data)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <section className="max-w-[1180px] mx-auto px-4 mt-7">
      <h3 className="mb-3">Environmental Snapshot</h3>
      <div className="grid grid-cols-3 gap-3.5">
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3.5">
          <div className="inline-block px-2.5 py-1.5 rounded-full text-xs font-semibold bg-primary/16 text-primary border border-primary/34">
            AQI
          </div>
          <div className="text-[22px] font-bold mt-1.5 mb-0">
            {loading ? '—' : env?.aqi}
          </div>
          <div className="text-muted-light dark:text-muted-dark text-xs">
            Air Quality Index
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3.5">
          <div className="inline-block px-2.5 py-1.5 rounded-full text-xs font-semibold bg-primary/16 text-primary border border-primary/34">
            Temp
          </div>
          <div className="text-[22px] font-bold mt-1.5 mb-0">
            {loading ? '—' : `${env?.tempC}°C`}
          </div>
          <div className="text-muted-light dark:text-muted-dark text-xs">
            Current temperature
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3.5">
          <div className="inline-block px-2.5 py-1.5 rounded-full text-xs font-semibold bg-primary/16 text-primary border border-primary/34">
            Weather
          </div>
          <div className="text-[22px] font-bold mt-1.5 mb-0">
            {loading ? '—' : env?.weather}
          </div>
          <div className="text-muted-light dark:text-muted-dark text-xs">
            Conditions
          </div>
        </div>
      </div>
    </section>
  )
}

export default Environmental

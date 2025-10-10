import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { track } from '../lib/analytics'

export default function RouteAnalytics() {
  const location = useLocation()
  useEffect(() => {
    track.route(location.pathname)
  }, [location.pathname])
  return null
}

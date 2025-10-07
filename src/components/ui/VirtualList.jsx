// src/components/ui/VirtualList.jsx
// Minimal virtualization without external deps (fixed row height)

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function VirtualList({
  items,
  rowHeight = 72,
  overscan = 6,
  renderItem,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(0)

  const onScroll = useCallback(() => {
    if (!containerRef.current) return
    setScrollTop(containerRef.current.scrollTop)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const resizeObs = new ResizeObserver(() => setHeight(el.clientHeight))
    resizeObs.observe(el)
    setHeight(el.clientHeight)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      resizeObs.disconnect()
      el.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  const total = items.length
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const endIndex = Math.min(
    total,
    Math.ceil((scrollTop + height) / rowHeight) + overscan
  )
  const slice = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex])
  const topSpacer = startIndex * rowHeight
  const bottomSpacer = (total - endIndex) * rowHeight

  return (
    <div ref={containerRef} className={`overflow-auto ${className}`} style={style}>
      <div style={{ paddingTop: topSpacer, paddingBottom: bottomSpacer }}>
        {slice.map((item, i) => renderItem(item, startIndex + i))}
      </div>
    </div>
  )
}

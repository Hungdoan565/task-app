import React, { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '@/components/dashboardV2/Layout'
import QuickCapture from '@/components/dashboardV2/QuickCapture'
import FocusList from '@/components/dashboardV2/FocusList'
import NextUp from '@/components/dashboardV2/NextUp'
import AgendaMini from '@/components/dashboardV2/AgendaMini'
import PinnedCards from '@/components/dashboardV2/PinnedCards'
import TinyMetrics from '@/components/dashboardV2/TinyMetrics'
import SectionCard from '@/components/ui/SectionCard'
import GlanceCounters from '@/components/dashboardV2/GlanceCounters'
import { NavLink } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { getHomeLayout, saveHomeLayout, DEFAULT_HOME_LAYOUT } from '@/services/layoutService'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { collection, onSnapshot, query, where, orderBy, limit as fsLimit, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} className={`group relative ${isDragging ? 'z-[5]' : ''}`}>
      <button {...attributes} {...listeners} className="absolute -left-3 top-2 p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-warm-gray-100 opacity-0 group-hover:opacity-100 bg-white/60 dark:bg-warm-gray-900/60 backdrop-blur border border-gray-200 dark:border-warm-gray-700" aria-label="Kéo để sắp xếp">
        <GripVertical className="w-4 h-4" />
      </button>
      {children}
    </div>
  )
}

export default function DashboardV2() {
  const { getUserDisplayName, user } = useUser()
  // demo state (extended with tags/priority)
  const now = new Date()
  const todayAt = (h, m=0) => { const d = new Date(now); d.setHours(h, m, 0, 0); return d }
  const tomorrowAt = (h, m=0) => { const d = new Date(now); d.setDate(d.getDate()+1); d.setHours(h, m, 0, 0); return d }
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Hoàn thành bài tập toán', due: 'Hôm nay 10:00', dueAt: todayAt(10,0), priority: 'high', tags: ['học tập'], done: false },
    { id: 2, title: 'Viết báo cáo tuần', due: 'Hôm nay 14:00', dueAt: todayAt(14,0), priority: 'med', tags: ['công việc'], done: false },
    { id: 3, title: 'Cập nhật ghi chú dự án', due: 'Hôm nay', dueAt: todayAt(18,0), priority: 'low', tags: ['ghi chú'], done: true },
  ])
  const [nextUp, setNextUp] = useState([])
  const agenda = [ { time:'09:00', title:'Họp nhóm' }, { time:'13:00', title:'Thời gian tập trung' } ]
  const pinned = [ { label:'Ghi chú học tập', to:'/p/favorite-1' }, { label:'Kế hoạch tuần', to:'/p/favorite-2' } ]

  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id===id ? { ...t, done: !t.done } : t))
  const addQuick = ({ title }) => setTasks(prev => [{ id: Date.now(), title, due: 'Hôm nay', dueAt: new Date(), done:false, priority:'med', tags:[] }, ...prev])
  const delTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const editTask = (id) => setTasks(prev => prev.map(t => t.id===id ? { ...t, title: prompt('Sửa tiêu đề', t.title) || t.title } : t))
  const snoozeTask = (id) => setTasks(prev => prev.map(t => t.id===id ? { ...t, due: 'Ngày mai', dueAt: tomorrowAt(9,0) } : t))
  const reorderTasks = (orderIds) => setTasks(prev => orderIds.map(id => prev.find(t => t.id === id)).filter(Boolean))

  const [todayTasks, setTodayTasks] = useState([])
  const todayFocus = useMemo(()=> todayTasks, [todayTasks])

  // Personalized greeting
  const name = getUserDisplayName()
  const dateStr = new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })
  const importantCount = tasks.filter(t => t.priority === 'high' && !t.done).length
  // Compute glance counters
  const isSameDay = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()
  const [overdueCount, setOverdueCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [upcomingCount, setUpcomingCount] = useState(0)

  // Widget layout with Firestore persistence
  const [layout, setLayout] = useState(DEFAULT_HOME_LAYOUT)
  const loaded = useRef(false)
  const saveTimer = useRef(null)
  useEffect(() => {
    let active = true
    if (user?.uid) {
      getHomeLayout(user.uid).then(l => { if (active) { setLayout(l); loaded.current = true } })
    } else {
      loaded.current = true
    }
    return () => { active = false }
  }, [user?.uid])

  useEffect(() => {
    if (!loaded.current || !user?.uid) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => { saveHomeLayout(user.uid, layout) }, 600)
  }, [layout, user?.uid])

  // DnD for columns (left/center/right)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const onDragEndCol = (side) => (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const arr = layout[side]
    const oldIndex = arr.indexOf(active.id)
    const newIndex = arr.indexOf(over.id)
    const nextArr = arrayMove(arr, oldIndex, newIndex)
    setLayout(l => ({ ...l, [side]: nextArr }))
  }

  const renderWidget = (id) => {
    switch (id) {
      case 'quickCapture':
        return <SectionCard id="qc" title="Tạo nhanh"><QuickCapture onAdd={addQuick} /></SectionCard>
      case 'shortcuts':
        return <SectionCard id="shortcuts" title="Trang đã ghim" defaultOpen={false}><PinnedCards items={pinned} /></SectionCard>
      case 'today':
        return (
          <SectionCard id="today" title="Việc cần làm hôm nay">
            <FocusList
              title="Hôm nay"
              tasks={todayFocus}
              onToggle={toggleTask}
              onDelete={delTask}
              onEdit={editTask}
              onSnooze={snoozeTask}
              onReorder={reorderTasks}
            />
          </SectionCard>
        )
      case 'nextUp':
        return <SectionCard id="next" title="Sắp đến hạn" defaultOpen={false}><NextUp items={nextUp} /></SectionCard>
      case 'nextEvent':
        return <SectionCard id="next-event" title="Lịch trình"><AgendaMini slots={agenda} /></SectionCard>
      case 'pinned':
        return <SectionCard id="pinned" title="Trang đã ghim" defaultOpen={false}><PinnedCards items={pinned} /></SectionCard>
      case 'progress':
        return <SectionCard id="progress" title="Thống kê" defaultOpen={false}><TinyMetrics streak={3} doneToday={todayFocus.filter(t=>t.done).length} doneWeek={12} /></SectionCard>
      default:
        return null
    }
  }

  // Firestore subscriptions for counters and task lists
  useEffect(() => {
    if (!user?.uid) return
    const uid = user.uid
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)

    const toDate = (v) => {
      if (!v) return null
      if (v instanceof Date) return v
      if (v?.seconds) return new Date(v.seconds * 1000)
      const d = new Date(v)
      return isNaN(d) ? null : d
    }
    const fmtWhen = (d) => {
      if (!d) return ''
      const isToday = isSameDay(d, new Date())
      const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1)
      const isTomorrow = isSameDay(d, tomorrow)
      const time = d.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
      if (isToday) return `Hôm nay ${time}`
      if (isTomorrow) return `Ngày mai ${time}`
      return `${d.toLocaleDateString('vi-VN')} ${time}`
    }
    const adapt = (doc) => {
      const data = doc.data()
      const dueAt = toDate(data.dueAt || data.dueDate)
      let pr = data.priority || 'med'
      if (pr === 'medium') pr = 'med'
      if (typeof pr === 'string' && /^p\d$/i.test(pr)) pr = pr.toLowerCase()==='p1' ? 'high' : pr.toLowerCase()==='p2' ? 'med' : 'low'
      return {
        id: doc.id,
        title: data.title || '',
        done: !!data.done || data.status === 'done',
        dueAt,
        due: dueAt ? fmtWhen(dueAt) : '',
        priority: ['high','med','low'].includes(pr) ? pr : 'med',
        tags: Array.isArray(data.tags) ? data.tags : [],
      }
    }

    // Today tasks
    const col = collection(db, 'tasks')
    const qToday = query(col, where('owner','==',uid), where('dueAt','>=', Timestamp.fromDate(start)), where('dueAt','<=', Timestamp.fromDate(end)), orderBy('dueAt','asc'), fsLimit(20))
    const unsubToday = onSnapshot(qToday, (snap) => {
      const arr = snap.docs.map(adapt).filter(t => !t.done)
      setTodayTasks(arr)
      setTodayCount(arr.length)
    })

    // Upcoming 48h
    const upTo = new Date(now.getTime() + 48*60*60*1000)
    const qUpcoming = query(col, where('owner','==',uid), where('dueAt','>', Timestamp.fromDate(now)), where('dueAt','<=', Timestamp.fromDate(upTo)), orderBy('dueAt','asc'), fsLimit(20))
    const unsubUpcoming = onSnapshot(qUpcoming, (snap) => {
      const arr = snap.docs.map(adapt).filter(t => !t.done)
      setUpcomingCount(arr.length)
      setNextUp(arr.map(t => ({ id: t.id, title: t.title, when: fmtWhen(t.dueAt) })))
    })

    // Overdue
    const qOverdue = query(col, where('owner','==',uid), where('dueAt','<', Timestamp.fromDate(now)))
    const unsubOver = onSnapshot(qOverdue, (snap) => {
      const n = snap.docs.map(adapt).filter(t => !t.done).length
      setOverdueCount(n)
    })

    return () => { unsubToday(); unsubUpcoming(); unsubOver() }
  }, [user?.uid])

  return (
    <Layout>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">
          Chào {name}! <span className="text-gray-500 dark:text-warm-gray-400 font-normal">{dateStr}</span> {importantCount>0 ? <span className="ml-1 text-red-500">• {importantCount} việc quan trọng</span> : null}
        </div>
        <NavLink to="/insights" className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 hover:bg-gray-200 dark:hover:bg-warm-gray-700">Xem thống kê</NavLink>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-5 xl:gap-6">
        {/* Left 3 cols: Quick access */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndCol('left')}>
            <SortableContext items={layout.left} strategy={verticalListSortingStrategy}>
              {layout.left.map((id) => (
                <SortableItem key={id} id={id}>{renderWidget(id)}</SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
        {/* Center 6 cols: Core overview */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          {/* Glance counters row */}
          <GlanceCounters overdue={overdueCount} today={todayCount} upcoming={upcomingCount} />
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndCol('center')}>
            <SortableContext items={layout.center} strategy={verticalListSortingStrategy}>
              {layout.center.map((id) => (
                <SortableItem key={id} id={id}>{renderWidget(id)}</SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
        {/* Right 3 cols: Secondary */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEndCol('right')}>
            <SortableContext items={layout.right} strategy={verticalListSortingStrategy}>
              {layout.right.map((id) => (
                <SortableItem key={id} id={id}>{renderWidget(id)}</SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </Layout>
  )
}

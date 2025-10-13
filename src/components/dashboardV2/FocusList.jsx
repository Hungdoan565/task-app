import React, { useMemo, useState } from 'react'
import { CheckSquare, Square, Flag, Pencil, Trash2, Clock, GripVertical, Tag } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Popover from '@/components/ui/Popover'

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <li ref={setNodeRef} style={style} className={`py-2 flex items-center justify-between ${isDragging ? 'bg-emerald-50/50 dark:bg-emerald-900/20 rounded' : ''}`}>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button {...attributes} {...listeners} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-warm-gray-100" aria-label="Kéo để sắp xếp">
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
      {children}
    </li>
  )
}

export default function FocusList({ title='Hôm nay', tasks=[], onToggle, onPromote, onReorder, onEdit, onDelete, onSnooze, limit=7, loading=false }) {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState('all') // all | high | soon
  const [sortBy, setSortBy] = useState('dueAsc') // dueAsc | priority
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const items = useMemo(() => tasks.map(t => t.id), [tasks])

  const scorePriority = (p) => p==='high'?3 : p==='med'?2 : 1
  const isSoon = (t) => {
    const now = new Date()
    const due = t.dueAt instanceof Date ? t.dueAt : (t.dueAt ? new Date(t.dueAt) : null)
    if (!due) return false
    const diff = due - now
    return diff > 0 && diff <= 48*60*60*1000 // 48h
  }

  const filtered = useMemo(() => {
    let arr = tasks
    if (filter === 'high') arr = arr.filter(t => t.priority === 'high')
    if (filter === 'soon') arr = arr.filter(isSoon)
    if (sortBy === 'dueAsc') arr = [...arr].sort((a,b)=> (a.dueAt||0) - (b.dueAt||0))
    if (sortBy === 'priority') arr = [...arr].sort((a,b)=> scorePriority(b.priority) - scorePriority(a.priority))
    return arr
  }, [tasks, filter, sortBy])

  const visible = expanded ? filtered : filtered.slice(0, limit)

  const onDragEnd = (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.indexOf(active.id)
    const newIndex = items.indexOf(over.id)
    const newOrder = arrayMove(items, oldIndex, newIndex)
    onReorder?.(newOrder)
  }

  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">{title}</h3>
        <div className="flex items-center gap-2">
          {/* Filters */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-warm-gray-900 rounded-full p-0.5">
            {[
              {key:'all', label:'Tất cả'},
              {key:'high', label:'High'},
              {key:'soon', label:'Gần hạn'},
            ].map(ch => (
              <button key={ch.key} onClick={()=>setFilter(ch.key)} className={`text-xs px-2 py-1 rounded-full ${filter===ch.key ? 'bg-white dark:bg-warm-gray-700 shadow-sm' : 'text-gray-600 dark:text-warm-gray-300'}`}>{ch.label}</button>
            ))}
          </div>
          {/* Sort */}
          <Popover align="end" trigger={<button className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-warm-gray-900">Sắp xếp</button>}>
            <div className="p-1">
              <button className={`w-full text-left px-2 py-1.5 rounded ${sortBy==='dueAsc'?'bg-gray-100 dark:bg-warm-gray-800':''}`} onClick={()=>setSortBy('dueAsc')}>Theo hạn (tăng dần)</button>
              <button className={`w-full text-left px-2 py-1.5 rounded ${sortBy==='priority'?'bg-gray-100 dark:bg-warm-gray-800':''}`} onClick={()=>setSortBy('priority')}>Theo độ ưu tiên</button>
            </div>
          </Popover>
          {filtered.length > limit && (
            <button onClick={() => setExpanded((v) => !v)} className="text-xs text-gray-600 dark:text-warm-gray-300 hover:underline">
              {expanded ? 'Thu gọn' : `Xem thêm (${filtered.length - limit})`}
            </button>
          )}
          {onPromote && <button onClick={onPromote} className="text-xs text-gray-600 dark:text-warm-gray-300 hover:underline">Mở trang</button>}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_,i)=> <div key={i} className="h-10 bg-gray-100 dark:bg-warm-gray-900 rounded" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">Không có mục nào.</p>
      ) : (
        expanded ? (
          <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <ul className="divide-y divide-gray-100 dark:divide-warm-gray-700">
                {filtered.map(t => (
                  <SortableItem key={t.id} id={t.id}>
                    <div className="flex items-center justify-between flex-1 group">
                      <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onToggle?.(t.id)} aria-label="Toggle">
                        {t.done ? <CheckSquare className="w-4 h-4 text-emerald-600"/> : <Square className="w-4 h-4"/>}
                      </button>
                      <div className="flex-1 mx-2 min-w-0">
                        <div className={`text-sm break-words truncate ${t.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-warm-gray-100'}`}>{t.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {t.due && <div className="text-xs text-gray-500 dark:text-warm-gray-400">{t.due}</div>}
                          {Array.isArray(t.tags) && t.tags.slice(0,3).map((tag, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-warm-gray-900 text-[11px] text-gray-600 dark:text-warm-gray-300">
                              <Tag className="w-3 h-3 opacity-70" />{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {t.priority && <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${t.priority==='high'?'bg-red-500/15 text-red-600 dark:text-red-400':'text-gray-600 dark:text-warm-gray-300'} ${t.priority==='med'?'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400':''}`}>{t.priority==='high'?'High':t.priority==='med'?'Med':'Low'}</span>}
                      <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onSnooze?.(t.id)} aria-label="Snooze"><Clock className="w-4 h-4"/></button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onEdit?.(t.id)} aria-label="Edit"><Pencil className="w-4 h-4"/></button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onDelete?.(t.id)} aria-label="Delete"><Trash2 className="w-4 h-4 text-red-500"/></button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-warm-gray-700">
            {visible.map(t => (
              <li key={t.id} className="py-2 flex items-center justify-between group">
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onToggle?.(t.id)} aria-label="Toggle">
                  {t.done ? <CheckSquare className="w-4 h-4 text-emerald-600"/> : <Square className="w-4 h-4"/>}
                </button>
                <div className="flex-1 mx-2 min-w-0">
                  <div className={`text-sm break-words truncate ${t.done ? 'line-through text-gray-400' : 'text-gray-900 dark:text-warm-gray-100'}`}>{t.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {t.due && <div className="text-xs text-gray-500 dark:text-warm-gray-400">{t.due}</div>}
                    {Array.isArray(t.tags) && t.tags.slice(0,3).map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-warm-gray-900 text-[11px] text-gray-600 dark:text-warm-gray-300">
                        <Tag className="w-3 h-3 opacity-70" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
                {t.priority && <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${t.priority==='high'?'bg-red-500/15 text-red-600 dark:text-red-400':'text-gray-600 dark:text-warm-gray-300'} ${t.priority==='med'?'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400':''}`}>{t.priority==='high'?'High':t.priority==='med'?'Med':'Low'}</span>}
                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onSnooze?.(t.id)} aria-label="Snooze"><Clock className="w-4 h-4"/></button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onEdit?.(t.id)} aria-label="Edit"><Pencil className="w-4 h-4"/></button>
                  <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={()=>onDelete?.(t.id)} aria-label="Delete"><Trash2 className="w-4 h-4 text-red-500"/></button>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  )
}

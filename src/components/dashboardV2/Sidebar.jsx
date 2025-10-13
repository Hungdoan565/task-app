import React, { useState, useEffect } from 'react'
import { Home, FileText, CheckSquare, KanbanSquare, Folder, CalendarDays, Target, Bookmark, Clock, Trash2, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Inbox, Plus } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Avatar } from '@/components/ui/Avatar'
import { useUser } from '@/contexts/UserContext'
import Tooltip from '@/components/ui/Tooltip'

function NavItem({ to, label, icon: Icon, collapsed }) {
  const link = (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `dv2-link relative flex items-center ${collapsed ? 'justify-center h-11 px-0' : 'gap-3 px-3 py-2'} rounded-lg text-sm font-medium ${
          isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span layoutId="dv2-active" className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded bg-white opacity-70" aria-hidden />
          )}
          <Icon className={`dv2-icon ${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
          {!collapsed && <span className={`dv2-text ${isActive ? 'font-semibold' : ''}`}>{label}</span>}
        </>
      )}
    </NavLink>
  )
  return collapsed ? (
    <Tooltip content={label} side="right" offset={12}>{link}</Tooltip>
  ) : link
}

function Group({ title, children, collapsed, defaultOpen = true, storageKey }) {
  const [open, setOpen] = useState(() => {
    try { if (storageKey) { const v = localStorage.getItem(storageKey); if (v != null) return JSON.parse(v) } } catch {}
    return defaultOpen
  })
  useEffect(() => {
    try { if (storageKey) localStorage.setItem(storageKey, JSON.stringify(open)) } catch {}
  }, [open, storageKey])
  return (
    <div className="w-full">
      {!collapsed && (
        <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/80 px-2 py-1">
          <span>{title}</span>
          <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>
      )}
      <motion.div initial={false} animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} style={{ overflow: 'hidden' }} className={`${collapsed ? '' : 'mt-1'} space-y-1`}>
        {children}
      </motion.div>
    </div>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const { getUserDisplayName, getUserAvatar } = useUser()
  const [collapsed, setCollapsed] = useState(false)
  // Update CSS var for layout shift
  const applyWidthVar = (c) => {
    const w = c ? '72px' : '220px'
    try { document.documentElement.style.setProperty('--dv2-sidebar-width', w) } catch {}
  }

  // Initialize CSS var on mount
  React.useEffect(() => { applyWidthVar(collapsed) }, [])
  return (
    <aside className={`h-full rounded-2xl p-4 text-white bg-gradient-to-b from-emerald-600 via-emerald-600 to-green-700 flex flex-col min-h-0 ${collapsed ? 'items-center' : ''} transition-all duration-300`} style={{ width: collapsed ? '72px' : '220px' }}>
      {/* Profile */}
      <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center'} gap-2 mb-4 w-full`}>
        <Avatar size={collapsed ? 'sm' : 'default'} name={getUserDisplayName()} src={getUserAvatar()} />
        {!collapsed && <div className="leading-tight">
          <div className="font-semibold">{getUserDisplayName()}</div>
          <div className="text-xs text-white/80">Hồ sơ</div>
        </div>}
        <button onClick={() => { setCollapsed(v => { applyWidthVar(!v); return !v }) }} className={`ml-auto ${collapsed ? 'ml-0 mt-2' : ''} p-1 rounded bg-white/10 hover:bg-white/15`} aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* CTA tạo mới ngay dưới hồ sơ */}
      <button onClick={() => window.dispatchEvent(new Event('cmdk:open'))} className={`mb-3 w-full ${collapsed ? 'justify-center h-10' : 'justify-start'} flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/25 text-sm font-semibold`}>
        <Plus className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} /> {collapsed ? '' : 'Tạo mới'}
      </button>

      <nav className="space-y-3 flex-1 w-full overflow-y-auto pr-1 scrollbar-none">
        {/* Favorites trước */}
        <Group title="Đã ghim" collapsed={collapsed} defaultOpen={false} storageKey="taskflow:v2:sidebar:ghim">
          <NavItem to="/p/favorite-1" label="Ghi chú học tập" icon={Bookmark} collapsed={collapsed} />
          <NavItem to="/p/favorite-2" label="Kế hoạch tuần" icon={Bookmark} collapsed={collapsed} />
        </Group>

        {/* Navigation chính (theo Notion) */}
        <Group title="Trang" collapsed={collapsed} defaultOpen storageKey="taskflow:v2:sidebar:trang">
          <NavItem to="/dashboard" label="Trang chủ" icon={Home} collapsed={collapsed} />
          <NavItem to="/inbox" label="Hộp thư đến" icon={Inbox} collapsed={collapsed} />
          <NavItem to="/tasks" label="Việc cần làm" icon={CheckSquare} collapsed={collapsed} />
          {/* Các mục con (Hôm nay, Tuần này, ...) được giữ trong trang Việc cần làm dưới dạng tab, không hiển thị ở sidebar để rút ngắn chiều dài */}
          <NavItem to="/calendar" label="Lịch" icon={CalendarDays} collapsed={collapsed} />
          <NavItem to="/notes" label="Ghi chú" icon={FileText} collapsed={collapsed} />
          <NavItem to="/projects" label="Dự án" icon={Folder} collapsed={collapsed} />
          <NavItem to="/wiki" label="Tài liệu" icon={FileText} collapsed={collapsed} />
          <NavItem to="/templates" label="Mẫu" icon={KanbanSquare} collapsed={collapsed} />
        </Group>

        {/* Shared */}
        <Group title="Được chia sẻ" collapsed={collapsed} defaultOpen={false} storageKey="taskflow:v2:sidebar:shared">
          <NavItem to="/shared" label="Trang được chia sẻ" icon={Home} collapsed={collapsed} />
        </Group>

        {/* System */}
        <Group title="Hệ thống" collapsed={collapsed} defaultOpen={false} storageKey="taskflow:v2:sidebar:system">
          <NavItem to="/recent" label="Gần đây" icon={Clock} collapsed={collapsed} />
          <NavItem to="/trash" label="Thùng rác" icon={Trash2} collapsed={collapsed} />
          <NavItem to="/settings" label="Cài đặt" icon={Settings} collapsed={collapsed} />
          <NavItem to="/help" label="Trợ giúp" icon={HelpCircle} collapsed={collapsed} />
        </Group>
      </nav>

      <button onClick={() => navigate('/auth')} className={`mt-2 flex items-center gap-2 ${collapsed ? 'justify-center h-10' : ''} px-3 py-2 text-sm bg-white/10 hover:bg-white/15 rounded-lg w-full`}>
        <LogOut className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
        {!collapsed && 'Đăng xuất'}
      </button>
    </aside>
  )
}

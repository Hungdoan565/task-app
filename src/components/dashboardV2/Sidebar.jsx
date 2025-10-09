import React, { useState } from 'react'
import { Home, FileText, CheckSquare, KanbanSquare, Folder, CalendarDays, Target, Bookmark, Clock, Trash2, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { useUser } from '@/contexts/UserContext'

function NavItem({ to, label, icon: Icon, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `dv2-link relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
          isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded bg-white opacity-70" aria-hidden />
          )}
          <Icon className="dv2-icon w-4 h-4" />
          {!collapsed && <span className="dv2-text">{label}</span>}
        </>
      )}
    </NavLink>
  )
}

function Group({ title, children, collapsed, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="w-full">
      {!collapsed && (
        <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/80 px-2 py-1">
          <span>{title}</span>
          <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>
      )}
      <div className={`${open ? 'block' : 'hidden'} ${collapsed ? '' : 'mt-1'} space-y-1`}>
        {children}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const { getUserDisplayName, getUserAvatar } = useUser()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`h-full rounded-2xl p-4 text-white bg-gradient-to-b from-emerald-600 via-emerald-600 to-green-700 flex flex-col ${collapsed ? 'items-center' : ''} transition-all duration-300`}>
      {/* Profile */}
      <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center'} gap-2 mb-4 w-full`}>
        <Avatar size={collapsed ? 'sm' : 'default'} name={getUserDisplayName()} src={getUserAvatar()} />
        {!collapsed && <div className="leading-tight">
          <div className="font-semibold">{getUserDisplayName()}</div>
          <div className="text-xs text-white/80">Hồ sơ</div>
        </div>}
        <button onClick={() => setCollapsed(v => !v)} className={`ml-auto ${collapsed ? 'ml-0 mt-2' : ''} p-1 rounded bg-white/10 hover:bg-white/15`} aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="space-y-3 flex-1 w-full">
        {/* Quick */}
        <Group title="Quick" collapsed={collapsed} defaultOpen>
          <button onClick={() => navigate('/new')} className={`w-full ${collapsed ? 'justify-center' : 'justify-start'} flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/25 text-sm font-semibold`}>
            + {collapsed ? '' : 'Tạo mới'}
          </button>
          <NavItem to="/inbox" label="Hộp thư đến" icon={Inbox} collapsed={collapsed} />
        </Group>

        {/* Favorites */}
        <Group title="Đã ghim" collapsed={collapsed} defaultOpen>
          <NavItem to="/p/favorite-1" label="Sổ tay dự án" icon={Bookmark} collapsed={collapsed} />
          <NavItem to="/p/favorite-2" label="Ý tưởng UI" icon={Bookmark} collapsed={collapsed} />
        </Group>

        {/* My Space */}
        <Group title="Không gian của tôi" collapsed={collapsed} defaultOpen>
          <NavItem to="/dashboard-v2" label="Trang chủ" icon={Home} collapsed={collapsed} />
          <NavItem to="/tasks" label="Nhiệm vụ" icon={CheckSquare} collapsed={collapsed} />
          {!collapsed && (
            <div className="ml-6 space-y-1">
              <NavItem to="/tasks/today" label="Hôm nay" icon={CheckSquare} collapsed={collapsed} />
              <NavItem to="/tasks/week" label="Tuần này" icon={CheckSquare} collapsed={collapsed} />
              <NavItem to="/tasks/all" label="Tất cả" icon={CheckSquare} collapsed={collapsed} />
              <NavItem to="/tasks/done" label="Đã hoàn thành" icon={CheckSquare} collapsed={collapsed} />
            </div>
          )}
          <NavItem to="/notes" label="Ghi chú" icon={FileText} collapsed={collapsed} />
          <NavItem to="/projects" label="Dự án" icon={Folder} collapsed={collapsed} />
          <NavItem to="/calendar" label="Lịch" icon={CalendarDays} collapsed={collapsed} />
          <NavItem to="/wiki" label="Tài liệu/Wiki" icon={FileText} collapsed={collapsed} />
          <NavItem to="/templates" label="Mẫu" icon={KanbanSquare} collapsed={collapsed} />
        </Group>

        {/* Shared */}
        <Group title="Được chia sẻ" collapsed={collapsed} defaultOpen>
          <NavItem to="/shared" label="Tất cả trang được chia sẻ" icon={Home} collapsed={collapsed} />
        </Group>

        {/* System */}
        <Group title="Hệ thống" collapsed={collapsed} defaultOpen>
          <NavItem to="/recent" label="Gần đây" icon={Clock} collapsed={collapsed} />
          <NavItem to="/trash" label="Thùng rác" icon={Trash2} collapsed={collapsed} />
          <NavItem to="/settings" label="Cài đặt & Thành viên" icon={Settings} collapsed={collapsed} />
          <NavItem to="/help" label="Trợ giúp" icon={HelpCircle} collapsed={collapsed} />
        </Group>
      </nav>

      <button onClick={() => navigate('/auth')} className={`mt-2 flex items-center gap-2 ${collapsed ? 'justify-center' : ''} px-3 py-2 text-sm bg-white/10 hover:bg-white/15 rounded-lg w-full`}>
        <LogOut className="w-4 h-4" />
        {!collapsed && 'Đăng xuất'}
      </button>
    </aside>
  )
}

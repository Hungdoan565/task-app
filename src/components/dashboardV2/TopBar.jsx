import React from 'react'
import { Search, Plus, Bell, Menu, CheckSquare, FileText, FolderPlus, StickyNote } from 'lucide-react'
import { ThemeToggleButton } from '@/components/ui/ThemeToggle'
import { useToast } from '@/contexts/ToastContext'
import { useV2UIStore } from '@/store/v2UIStore'
import Tooltip from '@/components/ui/Tooltip'
import Popover from '@/components/ui/Popover'
import { Avatar } from '@/components/ui/Avatar'
import { useUser } from '@/contexts/UserContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const { addToast } = useToast()
  const toggleSidebar = useV2UIStore(s => s.toggleSidebar)
  const { getUserDisplayName, getUserAvatar } = useUser()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const onRipple = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const span = document.createElement('span')
    span.className = 'ripple'
    span.style.left = x + 'px'
    span.style.top = y + 'px'
    span.style.width = span.style.height = Math.max(rect.width, rect.height) + 'px'
    btn.appendChild(span)
    setTimeout(() => span.remove(), 650)
  }

  return (
    <div className="flex items-center p-3 bg-white/80 dark:bg-warm-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-warm-gray-800 sticky top-0 z-10 rounded-xl transition-colors duration-150">
      <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 mr-2" aria-label="Mở sidebar" onClick={toggleSidebar}>
        <Menu className="w-5 h-5 text-gray-600 dark:text-warm-gray-300" />
      </button>

      {/* Left: Search aligned with content edge */}
      <div className="flex-1">
        <div className="relative dv2-search w-[320px] max-w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Tìm kiếm"
            aria-label="Tìm kiếm"
          />
        </div>
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-4 pr-1">
        {/* Utility group: 12px spacing */}
        <div className="flex items-center gap-3">
          <Popover
            align="end"
            trigger={
              <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700" aria-label="Thông báo">
                <Bell className="w-4 h-4 text-gray-600 dark:text-warm-gray-300" />
                <span className="absolute -top-[6px] -right-[6px] w-[18px] h-[18px] bg-red-500 text-white text-[11px] font-bold rounded-full grid place-items-center shadow-[0_0_8px_rgba(239,68,68,0.4)] ring-2 ring-black">3</span>
              </button>
            }
          >
            <div className="w-[360px] max-w-[90vw] p-2">
              <div className="flex items-center justify-between px-2 py-1">
                <div className="text-sm font-semibold">Thông báo</div>
                <button className="text-xs text-emerald-600 hover:underline" onClick={()=>addToast({title:'Đã đọc', description:'Đánh dấu tất cả đã đọc', variant:'success'})}>Đánh dấu đã đọc</button>
              </div>
              <ul className="max-h-80 overflow-auto divide-y divide-gray-100 dark:divide-warm-gray-800">
                <li className="p-3 hover:bg-gray-50 dark:hover:bg-warm-gray-800 rounded-lg">
                  <div className="text-sm text-gray-900 dark:text-warm-gray-100">Bạn được nhắc việc: Hoàn thành bài tập toán</div>
                  <div className="text-xs text-red-500 mt-0.5">Quá hạn • 2h trước</div>
                </li>
                <li className="p-3 hover:bg-gray-50 dark:hover:bg-warm-gray-800 rounded-lg">
                  <div className="text-sm text-gray-900 dark:text-warm-gray-100">@Minh nhắc bạn trong "Ghi chú học tập"</div>
                  <div className="text-xs text-gray-500 mt-0.5">Đề cập • 30m trước</div>
                </li>
                <li className="p-3 hover:bg-gray-50 dark:hover:bg-warm-gray-800 rounded-lg">
                  <div className="text-sm text-gray-900 dark:text-warm-gray-100">Việc "Cập nhật ghi chú dự án" đã được hoàn thành</div>
                  <div className="text-xs text-gray-500 mt-0.5">Cập nhật • 10m trước</div>
                </li>
              </ul>
              <div className="px-2 py-1 text-right">
                <button className="text-xs text-gray-600 dark:text-warm-gray-300 hover:underline" onClick={()=>addToast({title:'Sắp có', description:'Trang thông báo riêng', variant:'info'})}>Xem tất cả</button>
              </div>
            </div>
          </Popover>

          {/* Profile menu with Theme toggle moved here */}
          <Popover
            trigger={
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-warm-gray-800 border border-transparent">
                <Avatar size="sm" name={getUserDisplayName()} src={getUserAvatar()} />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-warm-gray-200">{getUserDisplayName()}</span>
              </button>
            }
            align="end"
          >
            <div className="p-1 min-w-[240px] text-gray-700 dark:text-warm-gray-200">
              <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500 dark:text-warm-gray-400">Tài khoản</div>
              <button className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={()=>navigate('/settings')}>Hồ sơ & Cài đặt</button>
              <button className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={()=>addToast({title:'Sắp có', description:'Tính năng đổi ảnh đại diện', variant:'info'})}>Đổi ảnh đại diện</button>
              <div className="px-2 py-1 text-xs uppercase tracking-wide text-gray-500 dark:text-warm-gray-400">Ngôn ngữ</div>
              <div className="px-2 py-1 flex items-center gap-2">
                <button className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-warm-gray-800 hover:bg-gray-200 dark:hover:bg-warm-gray-700" onClick={()=>addToast({title:'Ngôn ngữ', description:'Đã chọn Tiếng Việt', variant:'success'})}>Tiếng Việt</button>
                <button className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-warm-gray-800 hover:bg-gray-200 dark:hover:bg-warm-gray-700" onClick={()=>addToast({title:'Language', description:'English selected', variant:'success'})}>English</button>
              </div>
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-warm-gray-300">{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
                <ThemeToggleButton />
              </div>
              <button className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={()=>navigate('/auth')}>Đăng xuất</button>
            </div>
          </Popover>
        </div>

        {/* Primary CTA as dropdown (Task / Note / Page / Project) */}
        <Popover
          align="end"
          trigger={
            <button
              onClick={onRipple}
              className="ripple-container relative px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold tracking-[0.01em] flex items-center gap-2 shadow-[0_2px_8px_rgba(16,185,129,0.3)] transform transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
              aria-haspopup="menu"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">+ Tạo mới</span>
            </button>
          }
        >
          <div className="py-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={() => { addToast({ title: 'Tạo việc cần làm', description: 'Mở Command Palette để tạo nhanh', variant: 'info' }); window.dispatchEvent(new Event('cmdk:open')) }}>
              <CheckSquare className="w-4 h-4 text-emerald-600" /> Việc cần làm
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={() => { navigate('/notes'); addToast({ title: 'Ghi chú', description: 'Đi tới Ghi chú', variant: 'info' }) }}>
              <StickyNote className="w-4 h-4 text-yellow-500" /> Ghi chú
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={() => { navigate('/wiki') }}>
              <FileText className="w-4 h-4 text-blue-500" /> Trang
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800" onClick={() => { navigate('/projects') }}>
              <FolderPlus className="w-4 h-4 text-purple-500" /> Dự án
            </button>
          </div>
        </Popover>
      </div>
    </div>
  )
}

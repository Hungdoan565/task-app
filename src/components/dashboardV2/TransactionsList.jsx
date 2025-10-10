import React, { useMemo, useState } from 'react'
import { Fuel, ArrowRightLeft, Utensils, ShoppingBag, Trash2, CheckSquare, Square, MoreVertical, Tag, FileDown, Upload } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'
import EmptyState from '@/components/ui/EmptyState'
import Modal from '@/components/ui/Modal'
import Popover from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'

const INITIAL = [
  { id: 1, icon: Fuel, title: 'Trạm xăng', time: '1 giờ trước', amount: -10.0 },
  { id: 2, icon: ArrowRightLeft, title: 'Chuyển khoản đến Lorem', time: '2 giờ trước', amount: 150.0 },
  { id: 3, icon: Utensils, title: 'Ăn uống', time: '3 giờ trước', amount: -8.0 },
  { id: 4, icon: ShoppingBag, title: 'Mua sắm online', time: '4 giờ trước', amount: -46.0 },
]

export default function TransactionsList() {
  const [items, setItems] = useState(INITIAL)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [createOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState('')
  const [createAmount, setCreateAmount] = useState('')
  const { addToast } = useToast()

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter(i => i.title.toLowerCase().includes(q)) : items
  }, [items, query])
  const allSelected = useMemo(() => visible.length > 0 && selected.size === visible.length, [visible, selected])

  const toggle = (id) => {
    setSelected(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }
  const toggleAll = () => {
    setSelected(prev => (prev.size === visible.length ? new Set() : new Set(visible.map(i => i.id))))
  }

  const onDelete = () => {
    const ids = Array.from(selected)
    if (ids.length === 0) return
    const backup = items.filter(i => ids.includes(i.id))
    setItems(prev => prev.filter(i => !ids.includes(i.id)))
    setSelected(new Set())
    addToast({
      title: 'Đã xóa giao dịch',
      description: `${backup.length} mục đã xóa`,
      variant: 'info',
      action: {
        label: 'Hoàn tác',
        onClick: () => setItems(prev => [...backup, ...prev].sort((a,b)=>a.id-b.id))
      }
    })
  }

  const onApplyLabel = () => {
    if (selected.size === 0) {
      addToast({ title: 'Chưa chọn mục nào', description: 'Hãy chọn ít nhất 1 giao dịch', variant: 'info' })
      return
    }
    addToast({ title: 'Đã gắn nhãn', description: `Đã gắn nhãn "Quan trọng" cho ${selected.size} mục`, variant: 'success' })
  }

  const exportCSV = (records) => {
    const rows = [['id','title','time','amount'], ...records.map(r => [r.id, r.title, r.time, r.amount])]
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    addToast({ title: 'Đã xuất CSV', description: `${records.length} dòng`, variant: 'success' })
  }

  const onCreate = () => {
    const title = createTitle.trim()
    const amt = Number(createAmount)
    if (!title || Number.isNaN(amt)) {
      addToast({ title: 'Thiếu thông tin', description: 'Vui lòng nhập tiêu đề và số tiền hợp lệ', variant: 'error' })
      return
    }
    const nextId = (items[items.length-1]?.id || 0) + 1
    const newItem = { id: nextId, icon: ShoppingBag, title, time: 'vừa xong', amount: amt }
    setItems(prev => [newItem, ...prev])
    setCreateOpen(false)
    setCreateTitle('')
    setCreateAmount('')
    addToast({ title: 'Đã tạo giao dịch', description: title, variant: 'success' })
  }

  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Giao dịch gần đây</h3>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            className="px-2 py-1 text-sm rounded border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-900"
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm giao dịch"
          />
          <Popover
            trigger={
              <button className="px-2 py-1 text-sm rounded border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-900 flex items-center gap-1">
                <MoreVertical className="w-4 h-4" /> Hành động
              </button>
            }
            align="end"
          >
            <div className="p-1 text-sm">
              <button onClick={onApplyLabel} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800">
                <Tag className="w-4 h-4" /> Gắn nhãn "Quan trọng"
              </button>
              <button onClick={() => exportCSV(selected.size ? items.filter(i => selected.has(i.id)) : items)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800">
                <FileDown className="w-4 h-4" /> Xuất CSV {selected.size ? '(đã chọn)' : '(tất cả)'}
              </button>
              <button onClick={() => addToast({ title: 'Sắp có', description: 'Nhập CSV đang được phát triển', variant: 'info' })} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-800">
                <Upload className="w-4 h-4" /> Nhập CSV
              </button>
              {selected.size > 0 && (
                <button onClick={onDelete} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 text-red-600">
                  <Trash2 className="w-4 h-4" /> Xóa đã chọn
                </button>
              )}
            </div>
          </Popover>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-900 px-3 py-2">
          <div className="text-sm">Đã chọn {selected.size} mục</div>
          <div className="flex items-center gap-2">
            <button onClick={onApplyLabel} className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700">Gắn nhãn</button>
            <button onClick={() => exportCSV(items.filter(i => selected.has(i.id)))} className="px-2 py-1 text-sm rounded bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700">Xuất CSV</button>
            <button onClick={onDelete} className="px-2 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Xóa
            </button>
          </div>
        </div>
      )}

      <ul>
        <li className="py-2 flex items-center gap-3">
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={toggleAll} aria-label="Chọn tất cả">
            {allSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
          <span className="text-xs text-gray-500">Chọn tất cả</span>
        </li>

        {visible.length === 0 && (
          <li className="py-4">
            <EmptyState
              title="Chưa có giao dịch phù hợp"
              description="Hãy thêm giao dịch mới hoặc thay đổi bộ lọc/từ khóa tìm kiếm."
              primaryAction={{ label: 'Tạo giao dịch', onClick: () => setCreateOpen(true) }}
              secondaryAction={{ label: 'Xóa tìm kiếm', onClick: () => setQuery('') }}
              illustration="tasks"
              compact
            />
          </li>
        )}

        {visible.map((t) => (
          <li key={t.id} className="py-3 flex items-center justify-between border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-warm-gray-900 hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3">
              <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900" onClick={() => toggle(t.id)} aria-label="Chọn giao dịch">
                {selected.has(t.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              </button>
              <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-warm-gray-700 flex items-center justify-center">
                <t.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-warm-gray-100">{t.title}</p>
                <p className="text-xs text-gray-500 dark:text-warm-gray-400">{t.time}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${t.amount < 0 ? 'text-red-600' : 'text-gray-900 dark:text-warm-gray-100'}`}>
              {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(0)}
            </div>
          </li>
        ))}
      </ul>

      {/* Create Transaction Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Tạo giao dịch"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Hủy</Button>
            <Button onClick={onCreate}>Tạo</Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-700 dark:text-warm-gray-300">Tiêu đề</label>
            <input value={createTitle} onChange={(e)=>setCreateTitle(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-900 text-sm" placeholder="Ví dụ: Mua văn phòng phẩm" />
          </div>
          <div>
            <label className="text-sm text-gray-700 dark:text-warm-gray-300">Số tiền (âm cho chi)</label>
            <input type="number" value={createAmount} onChange={(e)=>setCreateAmount(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-900 text-sm" placeholder="Ví dụ: -25" />
          </div>
        </div>
      </Modal>
    </div>
  )
}

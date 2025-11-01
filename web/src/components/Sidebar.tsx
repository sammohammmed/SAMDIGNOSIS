import { Brain, ClipboardList, Home, Settings2, UsersRound } from 'lucide-react'
import clsx from 'classnames'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patients', icon: UsersRound },
  { id: 'exams', label: 'Exams', icon: ClipboardList },
  { id: 'ai-lab', label: 'AI Lab', icon: Brain },
  { id: 'settings', label: 'Settings', icon: Settings2 }
]

interface SidebarProps {
  current: string
  onNavigate: (id: string) => void
}

export function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-72 flex-none border-r border-slate-200 bg-white/70 backdrop-blur lg:block">
      <div className="flex h-[calc(100vh-64px)] flex-col justify-between px-4 py-6">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = current === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary text-white shadow-card'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-primary-dark">
          <p className="font-semibold">Security Reminder</p>
          <p className="mt-1 text-primary-dark/80">
            Always confirm patient consent before sharing any clinical data or reports.
          </p>
        </div>
      </div>
    </aside>
  )
}

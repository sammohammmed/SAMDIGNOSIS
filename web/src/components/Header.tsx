import { Bell, ShieldAlert, UserCircle2 } from 'lucide-react'
import { type UserProfile } from '../types'

interface HeaderProps {
  user: UserProfile
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-card">
              <span className="text-lg font-semibold">SD</span>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">SAMDIAGNOSIS</p>
              <p className="text-xs text-slate-500">Smart AI Medical Diagnostic Platform</p>
            </div>
          </div>
          <span className="hidden h-5 w-px bg-slate-200 lg:block" aria-hidden />
          <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary lg:flex">
            <ShieldAlert className="h-4 w-4" aria-hidden />
            <span>Clinical decision support only. Not a medical verdict.</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-primary hover:text-primary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" aria-hidden />
          </button>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <UserCircle2 className="h-9 w-9 text-slate-400" aria-hidden />
            )}
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">{user.displayName}</p>
              <p className="text-xs text-slate-500">
                {user.role.replace('-', ' ')} - {user.organization}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

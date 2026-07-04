'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Smartphone,
  FolderOpen,
  Inbox,
  PlusCircle,
  Settings,
  User,
  ListMusic,
  Cloud,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Uygulamalar', icon: Smartphone, href: '/apps' },
  { label: 'Playlistler', icon: ListMusic, href: '/playlists' },
  { label: 'Kategoriler', icon: FolderOpen, href: '/categories' },
  { label: 'Talepler', icon: Inbox, href: '/submissions' },
  { label: 'Yeni Talep', icon: PlusCircle, href: '/submit' },
  { label: 'Yüklediklerim', icon: Cloud, href: '/my-uploads' },
  { label: 'Ayarlar', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-white/5 bg-[#0f1117]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15">
          <Shield className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white">Sentinel Store</h1>
          <p className="text-[11px] text-slate-500">Yönetim Paneli</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/5" />

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
              {item.label === 'Talepler' && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500/15 px-1.5 text-[11px] font-semibold text-amber-400">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">Admin</p>
            <p className="truncate text-[11px] text-slate-500">admin@sentinel.store</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

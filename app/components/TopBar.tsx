'use client';

import { usePathname } from 'next/navigation';
import { Bell, User } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/apps': 'Uygulamalar',
  '/categories': 'Kategoriler',
  '/submissions': 'Talepler',
  '/submit': 'Yeni Talep',
  '/settings': 'Ayarlar',
};

export function TopBar() {
  const pathname = usePathname();

  const currentTitle =
    pageTitles[pathname] ||
    Object.entries(pageTitles).find(([key]) => key !== '/' && pathname.startsWith(key))?.[1] ||
    'Sayfa';

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0b14] px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Sentinel Store</span>
        <span className="text-slate-600">/</span>
        <span className="font-medium text-white">{currentTitle}</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}

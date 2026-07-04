'use client';

import { apps, submissions, categories } from '@/app/data/seed';
import { LayoutDashboard, Smartphone, Inbox, FolderOpen, TrendingUp, Clock } from 'lucide-react';
import React from 'react';

export default function Dashboard() {
  const approvedApps = apps.filter(app => app.status === 'approved').length;
  const pendingSubmissions = submissions.filter(sub => sub.status === 'pending').length;
  const categoryCount = categories.length;

  const latestApps = [...apps].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const platformCounts = {
    Mobil: apps.filter(a => a.platform === 'Mobil').length,
    TV: apps.filter(a => a.platform === 'TV').length,
    Playlist: apps.filter(a => a.platform === 'Playlist').length,
  };

  const platformColors: Record<string, string> = {
    Mobil: 'bg-green-500',
    TV: 'bg-orange-500',
    Playlist: 'bg-purple-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Sentinel Store genel bakış</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-32">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Smartphone className="text-blue-500" size={20} />
            </div>
            <span className="text-sm font-medium text-slate-400">Toplam Uygulama</span>
          </div>
          <div className="text-3xl font-bold text-white">{apps.length}</div>
        </div>

        <div className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-32">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="text-amber-500" size={20} />
            </div>
            <span className="text-sm font-medium text-slate-400">Bekleyen Talepler</span>
          </div>
          <div className="text-3xl font-bold text-white">{pendingSubmissions}</div>
        </div>

        <div className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-32">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <FolderOpen className="text-emerald-500" size={20} />
            </div>
            <span className="text-sm font-medium text-slate-400">Kategoriler</span>
          </div>
          <div className="text-3xl font-bold text-white">{categoryCount}</div>
        </div>

        <div className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-32">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <span className="text-sm font-medium text-slate-400">Onaylanan</span>
          </div>
          <div className="text-3xl font-bold text-white">{approvedApps}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1b2e] rounded-2xl p-5 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-4">Son Eklenen Uygulamalar</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-sm text-slate-400">
                  <th className="pb-3 font-medium">Uygulama</th>
                  <th className="pb-3 font-medium">Kategori</th>
                  <th className="pb-3 font-medium">Platform</th>
                  <th className="pb-3 font-medium text-right">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {latestApps.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img src={app.icon} alt={app.name} className="w-8 h-8 rounded-lg object-cover bg-[#2d3147]" />
                        <span className="font-medium text-white">{app.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#2d3147] text-slate-300">
                        {app.category}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#2d3147] text-slate-300">
                        {app.platform}
                      </span>
                    </td>
                    <td className="py-3 text-right text-sm text-slate-400">
                      {new Date(app.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#1a1b2e] rounded-2xl p-5 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-4">Platform Dağılımı</h2>
          <div className="space-y-4">
            {Object.entries(platformCounts).map(([platform, count]) => {
              const total = apps.length || 1;
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={platform}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">{platform}</span>
                    <span className="text-slate-400">{count} uyg ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#2d3147] rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${platformColors[platform] || 'bg-blue-500'}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

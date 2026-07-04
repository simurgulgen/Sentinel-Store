'use client';

import { apps, categories } from '@/app/data/seed';
import { Search, Plus, Filter, MoreVertical, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';

export default function AppsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('Tümü');
  const [categoryFilter, setCategoryFilter] = useState('Tümü');
  const [statusFilter, setStatusFilter] = useState('Tümü');

  const platforms = ['Tümü', 'Mobil', 'TV'];
  const statusOptions = ['Tümü', 'Onaylı', 'Bekleyen', 'Reddedilen'];

  const filteredApps = apps.filter(app => {
    if (app.platform === 'Playlist') return false;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'Tümü' || app.platform === platformFilter;
    const matchesCategory = categoryFilter === 'Tümü' || app.category === categoryFilter;
    
    let appStatusLabel = 'Onaylı';
    if (app.status === 'pending') appStatusLabel = 'Bekleyen';
    if (app.status === 'rejected') appStatusLabel = 'Reddedilen';
    
    const matchesStatus = statusFilter === 'Tümü' || appStatusLabel === statusFilter;

    return matchesSearch && matchesPlatform && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Uygulamalar</h1>
          <p className="text-slate-400 mt-1">Mağazadaki tüm uygulamaları yönetin</p>
        </div>
        <Link href="/submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus size={18} />
          Yeni Uygulama Ekle
        </Link>
      </div>

      <div className="bg-[#1a1b2e] rounded-2xl p-4 border border-white/5 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-slate-500" size={18} />
          </div>
          <input
            type="text"
            className="w-full bg-[#2d3147] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
            placeholder="Uygulama ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</span>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    platformFilter === p 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-[#2d3147] text-slate-400 hover:bg-[#383d59] border border-transparent'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Durum</span>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === s 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-[#2d3147] text-slate-400 hover:bg-[#383d59] border border-transparent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredApps.map(app => (
          <div key={app.id} className="bg-[#1a1b2e] rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="w-4 h-4 rounded bg-[#2d3147] border-white/10 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0" />
              <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl object-cover bg-[#2d3147]" />
              <div>
                <h3 className="font-semibold text-white">{app.name}</h3>
                <p className="text-sm text-slate-400 truncate max-w-[200px] sm:max-w-xs">{app.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm flex-wrap ml-12 sm:ml-0">
              <span className="px-2.5 py-1 rounded-md font-medium bg-[#2d3147] text-slate-300">
                {app.category}
              </span>
              <span className="px-2.5 py-1 rounded-md font-medium bg-[#2d3147] text-slate-300">
                {app.platform}
              </span>
              <span className="px-2.5 py-1 rounded-md font-medium bg-[#2d3147] text-slate-300">
                v{app.version}
              </span>
              <span className={`px-2.5 py-1 rounded-md font-medium ${
                app.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                app.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                'bg-red-500/10 text-red-400'
              }`}>
                {app.status === 'approved' ? 'Onaylı' : app.status === 'pending' ? 'Bekleyen' : 'Reddedilen'}
              </span>
              
              <div className="flex items-center gap-2 ml-auto sm:ml-4">
                {app.variants && app.variants.length > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20 mr-2">
                    {app.variants.length} Varyant
                  </span>
                )}
                <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Pencil size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredApps.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-[#1a1b2e] rounded-2xl border border-white/5">
            Bu filtrelere uygun uygulama bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { submissions } from '@/app/data/seed';
import { Check, X, Shield, Clock, AlertTriangle, ExternalLink, Cloud, GitBranch, Box, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function SubmissionsPage() {
  const [filter, setFilter] = useState('Tümü');

  const tabs = [
    { id: 'Tümü', label: 'Tümü', count: submissions.length },
    { id: 'Bekleyen', label: 'Bekleyen', count: submissions.filter(s => s.status === 'pending').length },
    { id: 'Onaylanan', label: 'Onaylanan', count: submissions.filter(s => s.status === 'approved').length },
    { id: 'Reddedilen', label: 'Reddedilen', count: submissions.filter(s => s.status === 'rejected').length },
  ];

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'Tümü') return true;
    if (filter === 'Bekleyen') return sub.status === 'pending';
    if (filter === 'Onaylanan') return sub.status === 'approved';
    if (filter === 'Reddedilen') return sub.status === 'rejected';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Gelen Talepler</h1>
        <p className="text-slate-400 mt-1">Kullanıcılardan gelen uygulama ve playlist talepleri</p>
      </div>

      <div className="flex border-b border-white/5 space-x-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              filter === tab.id 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === tab.id ? 'bg-blue-500/20 text-blue-400' : 'bg-[#2d3147] text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredSubmissions.map(sub => (
          <div key={sub.id} className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5">
            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <img src={sub.userAvatar} alt={sub.userName} className="w-10 h-10 rounded-full bg-[#2d3147]" />
                <div>
                  <h4 className="font-medium text-white">{sub.userName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{sub.userEmail}</span>
                    <span>•</span>
                    <span>{new Date(sub.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {sub.hostingProvider === 'dropbox' && <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"><Cloud size={12}/> Dropbox</span>}
                  {sub.hostingProvider === 'github' && <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20"><GitBranch size={12}/> GitHub</span>}
                  {sub.hostingProvider === 'catbox' && <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20"><Box size={12}/> Catbox</span>}
                  {sub.hostingProvider === 'litterbox' && <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={12}/> Litterbox ({sub.litterboxExpiry})</span>}
                </div>
                {sub.virusScore !== undefined && (
                  sub.virusScore === 0 ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"><Shield size={12}/> Güvenli (VirusTotal)</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded text-red-400 bg-red-500/10 border border-red-500/20"><AlertTriangle size={12}/> Şüpheli: {sub.virusScore} uyarısı</span>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {sub.iconUrl && (
                <img src={sub.iconUrl} alt={sub.appName} className="w-16 h-16 rounded-xl object-cover border border-white/5 bg-[#2d3147]" />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {sub.appName}
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        sub.type === 'app' ? 'bg-blue-500/20 text-blue-400' :
                        sub.type === 'playlist' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {sub.type}
                      </span>
                      {sub.deleteRequested && (
                        <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                          <Trash2 size={10} /> Silme Talep Edildi
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 mb-2">{sub.description}</p>
                    <a href={sub.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                      Dosyayı İncele <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-end gap-3">
              {sub.status === 'pending' && (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-colors">
                    <Shield size={16} />
                    VirusTotal Tarat
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
                    <X size={16} />
                    Reddet
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                    <Check size={16} />
                    Onayla ve Yayınla
                  </button>
                </>
              )}
              
              {sub.status === 'approved' && (
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                  <Check size={18} /> Onaylandı
                </span>
              )}

              {sub.status === 'rejected' && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                  <X size={18} /> Reddedildi
                </span>
              )}
            </div>
          </div>
        ))}
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-[#1a1b2e] rounded-2xl border border-white/5">
            Bu kategoride talep bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { submissions } from '@/app/data/seed';
import { Lock, Unlock, Key, Check, Shield, AlertTriangle, Clock, Box, GitBranch, Cloud, X, Trash2 } from 'lucide-react';

export default function MyUploadsPage() {
  // Geçici olarak tüm gönderimlerin arasından rastgele birkaç tanesini "Benim" gibi gösterelim.
  // Gerçek sistemde bu, Supabase'den aktif kullanıcının (Auth) kendi kayıtları olarak çekilecektir.
  const [mySubmissions, setMySubmissions] = useState(
    submissions.slice(0, 4).map(s => ({ ...s, password: s.password || '' }))
  );
  
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const openPasswordModal = (sub: any) => {
    setSelectedSubmission(sub);
    setNewPassword(sub.password || '');
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSave = () => {
    if (!selectedSubmission) return;
    
    setMySubmissions(prev => prev.map(s => {
      if (s.id === selectedSubmission.id) {
        return { ...s, password: newPassword };
      }
      return s;
    }));
    
    setIsPasswordModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm('Bu dosyayı silmek istediğinize emin misiniz? Sistem yöneticisine silme talebi iletilecektir.')) {
      setMySubmissions(prev => prev.map(s => {
        if (s.id === id) {
          return { ...s, deleteRequested: true };
        }
        return s;
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Yüklediğim Dosyalar</h1>
        <p className="text-slate-400 mt-1">Sisteme gönderdiğiniz uygulama ve playlist talepleri</p>
      </div>

      <div className="space-y-4 mt-6">
        {mySubmissions.map(sub => (
          <div key={sub.id} className="bg-[#1a1b2e] rounded-2xl p-5 border border-white/5 flex flex-col md:flex-row gap-5 items-start">
            {sub.iconUrl ? (
              <img src={sub.iconUrl} alt={sub.appName} className="w-16 h-16 rounded-xl object-cover border border-white/5 bg-[#2d3147]" />
            ) : (
              <div className="w-16 h-16 rounded-xl border border-white/5 bg-[#2d3147] flex items-center justify-center">
                <Box className="text-slate-500 w-8 h-8" />
              </div>
            )}
            
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {sub.appName}
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      sub.type === 'app' ? 'bg-blue-500/20 text-blue-400' :
                      sub.type === 'playlist' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {sub.type}
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-1">{sub.description}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${
                      sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      sub.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {sub.status === 'approved' && <Check size={14} />}
                      {sub.status === 'rejected' && <AlertTriangle size={14} />}
                      {sub.status === 'pending' && <Clock size={14} />}
                      {sub.status === 'approved' ? 'Onaylandı' : sub.status === 'rejected' ? 'Reddedildi' : 'İnceleniyor'}
                    </span>

                    <div className="w-px h-4 bg-white/10" />

                    {sub.password ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                        <Lock size={14} />
                        Şifre Korumalı
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Unlock size={14} />
                        Şifresiz
                      </span>
                    )}
                  </div>
                  
                  {sub.status === 'rejected' && sub.rejectionReason && (
                    <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-200">
                      <p><strong className="text-red-400">Reddedilme Nedeni:</strong> {sub.rejectionReason}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button 
                    onClick={() => openPasswordModal(sub)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2d3147] hover:bg-[#3b405e] border border-white/5 rounded-xl text-sm font-medium text-white transition-colors"
                  >
                    <Key size={16} />
                    Şifre İşlemleri
                  </button>
                  <button 
                    onClick={() => handleDeleteRequest(sub.id)}
                    disabled={sub.deleteRequested}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${
                      sub.deleteRequested 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400 opacity-75 cursor-not-allowed' 
                        : 'bg-[#2d3147] hover:bg-red-500/10 border-white/5 hover:border-red-500/30 text-slate-300 hover:text-red-400'
                    }`}
                  >
                    <Trash2 size={16} />
                    {sub.deleteRequested ? 'Silme Talebi İletildi' : 'Silme Talebi Gönder'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {mySubmissions.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-[#1a1b2e] rounded-2xl border border-white/5">
            Henüz yüklediğiniz bir dosya/talep bulunmuyor.
          </div>
        )}
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1b2e] rounded-2xl border border-white/10 w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="text-blue-400" size={20} />
                Dosya Şifresini Yönet
              </h3>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-3 text-sm text-blue-200">
                <Shield className="shrink-0 text-blue-400" size={18} />
                <p>Belirlediğiniz şifre, <b>{selectedSubmission?.appName}</b> dosyası indirilirken sorulacaktır. Şifreyi kaldırmak için kutuyu boş bırakıp kaydedin.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Dosya Şifresi</label>
                <input 
                  type="text" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" 
                  placeholder="İsteğe bağlı şifre belirleyin..." 
                />
              </div>
            </div>

            <div className="p-5 border-t border-white/5 flex justify-end gap-3 bg-[#0a0b14]/30">
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={handlePasswordSave}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

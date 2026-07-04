'use client';

import React, { useState } from 'react';
import { Bot, HardDrive, Bell, Save, Key, Shield, User, MessageSquare, Send, CheckCircle, X, ExternalLink, Lock } from 'lucide-react';
import { seedTickets, Ticket, mockUser } from '@/app/data/seed';

export default function SettingsPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for testing roles
  const [activeTab, setActiveTab] = useState<'bot' | 'storage' | 'notifications' | 'profile' | 'tickets'>(isAdmin ? 'bot' : 'profile');

  // Support Tickets State
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Switch tabs when mode changes to prevent being stuck on admin tabs
  const toggleAdmin = () => {
    const newMode = !isAdmin;
    setIsAdmin(newMode);
    if (!newMode && activeTab !== 'profile' && activeTab !== 'tickets') {
      setActiveTab('profile');
    }
  };

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;
    
    const msg = {
      id: `msg-${Date.now()}`,
      sender: isAdmin ? 'admin' : 'user',
      text: newMessage,
      createdAt: new Date().toISOString()
    } as const;

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, messages: [...t.messages, msg] };
      }
      return t;
    }));
    
    // Update selected ticket view
    setSelectedTicket(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
    setNewMessage('');
  };

  const handleCloseTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'closed' };
      }
      return t;
    }));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'closed' } : null);
    }
  };

  // Filter tickets for normal users
  const displayTickets = isAdmin ? tickets : tickets.filter(t => t.userId === mockUser.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Ayarlar</h1>
          <p className="text-slate-400 mt-1">Sistem tercihlerini, entegrasyonları ve profilinizi yönetin</p>
        </div>
        
        {/* Test Toggle for Roles */}
        <div className="bg-[#2d3147] p-1 rounded-xl flex items-center border border-white/5">
          <button 
            onClick={() => setIsAdmin(true)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isAdmin ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Yönetici Görünümü
          </button>
          <button 
            onClick={() => toggleAdmin()}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${!isAdmin ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Kullanıcı Görünümü
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('bot')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'bot' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bot size={18} />
                Auto-Approve Bot
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'storage' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <HardDrive size={18} />
                Barındırma (Storage)
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bell size={18} />
                Bildirimler
              </button>
            </>
          )}
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={18} />
            {isAdmin ? 'Yönetici Profili' : 'Profilim'}
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare size={18} />
            {isAdmin ? 'Müşteri Talepleri' : 'Destek Taleplerim'}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#1a1b2e] rounded-2xl border border-white/5 p-6 min-h-[400px]">
          {activeTab === 'bot' && isAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot size={20} className="text-blue-400" /> Auto-Approve Bot Ayarları
                </h2>
                <p className="text-sm text-slate-400 mt-1">Gelen uygulamaların VirusTotal puanlarına göre otomatik olarak yönlendirilmesini sağlar.</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-4 bg-[#2d3147] rounded-xl border border-white/5">
                  <div>
                    <h3 className="font-semibold text-white text-sm">Bot Durumu</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Otomatik işlemleri tamamen etkinleştir</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="font-semibold text-white text-sm">VirusTotal Güvenlik Eşikleri</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <label className="text-xs font-bold uppercase tracking-wide text-emerald-400">Otomatik Onay (Max)</label>
                      <input type="number" defaultValue={0} className="w-full bg-[#1a1b2e] rounded-xl px-4 py-2 text-sm border border-emerald-500/20 focus:border-emerald-500 focus:outline-none text-white" />
                      <p className="text-[10px] text-slate-400 mt-1">Bu uyarının altındakiler otomatik ONAYLANIR.</p>
                    </div>

                    <div className="space-y-1.5 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                      <label className="text-xs font-bold uppercase tracking-wide text-amber-400">Manuel İnceleme</label>
                      <input type="text" value="Ara Değerler" disabled className="w-full bg-[#1a1b2e] rounded-xl px-4 py-2 text-sm border border-amber-500/20 opacity-50 text-slate-300" />
                      <p className="text-[10px] text-slate-400 mt-1">Bu iki değer arasındaki dosyalar ONAY BEKLER.</p>
                    </div>
                    
                    <div className="space-y-1.5 p-4 bg-red-500/5 border border-red-500/10 rounded-xl sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wide text-red-400">Otomatik Red (Min)</label>
                      <input type="number" defaultValue={3} className="w-full bg-[#1a1b2e] rounded-xl px-4 py-2 text-sm border border-red-500/20 focus:border-red-500 focus:outline-none text-white" />
                      <p className="text-[10px] text-slate-400 mt-1">Bu uyarının üstündekiler otomatik olarak REDDEDİLİR ve kullanıcıya bildirilir.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && isAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <HardDrive size={20} className="text-green-400" /> Barındırma (Storage)
                </h2>
                <p className="text-sm text-slate-400 mt-1">Harici dosya barındırma servislerinin API ayarları.</p>
              </div>

              <div className="space-y-5 max-w-xl">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">Catbox.moe API Anahtarı</h3>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input type="password" defaultValue="************************" className="w-full bg-[#2d3147] rounded-xl pl-10 pr-4 py-3 text-sm border border-white/5 focus:border-green-500/50 focus:outline-none text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Catbox hesabınızdan alınan API anahtarı. Kalıcı depolama için gereklidir.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && isAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bell size={20} className="text-amber-400" /> Bildirimler
                </h2>
                <p className="text-sm text-slate-400 mt-1">Sistem içi ve e-posta bildirim tercihleri.</p>
              </div>

              <div className="space-y-4 max-w-xl">
                {[
                  { title: 'Yeni Talep Bildirimi', desc: 'Yeni bir uygulama veya playlist gönderildiğinde.' },
                  { title: 'Bot Onay Raporu', desc: 'Bot tarafından otomatik onaylananlar için günlük rapor.' },
                  { title: 'Şüpheli Dosya Uyarısı', desc: 'Virüs puanı eşiği aşan bir dosya yüklendiğinde.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#2d3147] rounded-xl border border-white/5">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <User size={20} className="text-purple-400" /> {isAdmin ? 'Yönetici Profili' : 'Profilim'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">Kendi hesap bilgileriniz ve oturum güvenliği.</p>
              </div>

              <div className="space-y-5 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Ad Soyad</label>
                  <input 
                    type="text" 
                    defaultValue={mockUser.name} 
                    disabled={!isAdmin}
                    className={`w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:outline-none text-white ${!isAdmin ? 'opacity-60 cursor-not-allowed' : 'focus:border-purple-500/50'}`} 
                  />
                  {!isAdmin && <p className="text-[10px] text-slate-500">Kullanıcı adınızı değiştiremezsiniz.</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">E-Posta Adresi</label>
                  <input type="email" defaultValue={mockUser.email} disabled className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 opacity-60 cursor-not-allowed text-white" />
                </div>

                <div className="space-y-1.5 pt-4">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Oturum Şifresi</label>
                  <input type="password" placeholder="Yeni şifre belirlemek için girin..." className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-purple-500/50 focus:outline-none text-white" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="flex flex-col md:flex-row gap-6 h-[600px]">
              {/* Ticket List */}
              <div className="w-full md:w-1/3 flex flex-col border border-white/5 bg-[#0a0b14]/30 rounded-xl overflow-hidden shrink-0">
                <div className="p-4 border-b border-white/5">
                  <h3 className="font-bold text-white">Talepler</h3>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                  {displayTickets.map(ticket => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTicket?.id === ticket.id 
                          ? 'bg-blue-600/10 border-blue-500/30' 
                          : 'bg-[#1a1b2e] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${ticket.status === 'open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                          {ticket.status === 'open' ? 'Açık' : 'Kapalı'}
                        </span>
                        <span className="text-[10px] text-slate-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="font-medium text-white text-sm line-clamp-1">{ticket.subject}</p>
                      {isAdmin && <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1"><User size={10}/> {ticket.userName}</p>}
                    </button>
                  ))}
                  {displayTickets.length === 0 && (
                    <div className="text-center py-10 text-slate-500 text-sm">Talep bulunmuyor.</div>
                  )}
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 border border-white/5 bg-[#0a0b14]/30 rounded-xl flex flex-col overflow-hidden">
                {selectedTicket ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#1a1b2e]">
                      <div>
                        <h3 className="font-bold text-white">{selectedTicket.subject}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          Talep Eden: {selectedTicket.userName}
                        </p>
                      </div>
                      {isAdmin && selectedTicket.status === 'open' && (
                        <button 
                          onClick={() => handleCloseTicket(selectedTicket.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                        >
                          Talebi Kapat
                        </button>
                      )}
                    </div>
                    
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedTicket.messages.map(msg => {
                        const isMine = (isAdmin && msg.sender === 'admin') || (!isAdmin && msg.sender === 'user');
                        return (
                          <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                              isMine 
                                ? 'bg-blue-600 text-white rounded-br-sm' 
                                : 'bg-[#2d3147] text-slate-200 border border-white/5 rounded-bl-sm'
                            }`}>
                              <p>{msg.text}</p>
                              <div className={`text-[10px] mt-1 text-right ${isMine ? 'text-blue-200' : 'text-slate-400'}`}>
                                {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-white/5 bg-[#1a1b2e]">
                      {selectedTicket.status === 'open' ? (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Mesajınızı yazın..." 
                            className="flex-1 bg-[#2d3147] rounded-xl px-4 py-2.5 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500"
                          />
                          <button 
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center"
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center p-2 text-sm text-slate-500 flex items-center justify-center gap-2">
                          <Lock size={14} /> Bu talep kapatılmıştır. Yeni mesaj gönderilemez.
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6">
                    <MessageSquare size={48} className="mb-4 opacity-20" />
                    <p>İçeriği görmek için listeden bir talep seçin</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab !== 'tickets' && (
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <Save size={16} />
                Değişiklikleri Kaydet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

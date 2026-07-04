'use client';

import { categories, apps, Category, App } from '@/app/data/seed';
import { Plus, Pencil, Trash2, Wrench, Play, Users, Shield, Code, GraduationCap, FolderOpen, Smartphone, Tv, ListMusic, X, Gamepad2, Film, MonitorPlay, Trophy, Globe, Newspaper, Monitor, Radio, Video, Music, GripVertical, CheckSquare, Square, Search, Filter } from 'lucide-react';
import React, { useState } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  'Wrench': <Wrench size={24} />,
  'Play': <Play size={24} />,
  'Users': <Users size={24} />,
  'Shield': <Shield size={24} />,
  'Code': <Code size={24} />,
  'GraduationCap': <GraduationCap size={24} />,
  'FolderOpen': <FolderOpen size={24} />,
  'Tv': <Tv size={24} />,
  'Gamepad2': <Gamepad2 size={24} />,
  'Film': <Film size={24} />,
  'MonitorPlay': <MonitorPlay size={24} />,
  'Trophy': <Trophy size={24} />,
  'Globe': <Globe size={24} />,
  'Newspaper': <Newspaper size={24} />,
  'Monitor': <Monitor size={24} />,
  'Radio': <Radio size={24} />,
  'Video': <Video size={24} />,
  'Music': <Music size={24} />,
  'ListMusic': <ListMusic size={24} />
};

const iconOptions = ['Wrench', 'Play', 'Users', 'Shield', 'Code', 'GraduationCap', 'FolderOpen', 'Tv', 'Gamepad2', 'Film', 'MonitorPlay', 'Trophy', 'Globe', 'Newspaper', 'Monitor', 'Radio', 'Video', 'Music', 'ListMusic'];

const colorMap: Record<string, string> = {
  'blue': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  'purple': 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20',
  'pink': 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  'emerald': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  'amber': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  'cyan': 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  'rose': 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  'orange': 'text-orange-500 bg-orange-500/10 border-orange-500/20',
};

const colorOptions = ['blue', 'purple', 'pink', 'emerald', 'amber', 'cyan', 'rose', 'orange'];

export default function CategoriesPage() {
  const [localCats, setLocalCats] = useState<Category[]>([...categories].sort((a,b) => (a.order || 0) - (b.order || 0)));
  const [localApps, setLocalApps] = useState<App[]>([...apps]);
  
  // Drag and Drop States
  const [dragCatId, setDragCatId] = useState<string | null>(null);
  const [dragOverCatId, setDragOverCatId] = useState<string | null>(null);

  // Add Category Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('FolderOpen');
  const [newCatColor, setNewCatColor] = useState('blue');
  const [newCatType, setNewCatType] = useState('app');
  const [newCatIsSpecial, setNewCatIsSpecial] = useState(false);

  // App Selection Modal (for Special Categories)
  const [specialSelectCatId, setSpecialSelectCatId] = useState<string | null>(null);
  const [appSearch, setAppSearch] = useState('');
  const [appFilter, setAppFilter] = useState('all');

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDragCatId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== dragOverCatId) {
      setDragOverCatId(id);
    }
  };

  const handleDragEnd = () => {
    if (dragCatId && dragOverCatId && dragCatId !== dragOverCatId) {
      setLocalCats(prev => {
        const result = [...prev];
        const draggedIndex = result.findIndex(c => c.id === dragCatId);
        const overIndex = result.findIndex(c => c.id === dragOverCatId);
        
        // Prevent dragging across different types (app vs playlist)
        if (result[draggedIndex].type !== result[overIndex].type) return prev;

        const [draggedItem] = result.splice(draggedIndex, 1);
        result.splice(overIndex, 0, draggedItem);
        
        // Update orders
        return result.map((item, index) => ({ ...item, order: index }));
      });
    }
    setDragCatId(null);
    setDragOverCatId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const toggleAppInSpecialCategory = (appId: string, categoryId: string) => {
    setLocalApps(prev => prev.map(a => {
      if (a.id === appId) {
        const currentSpecials = a.specialCategories || [];
        const isSelected = currentSpecials.includes(categoryId);
        return {
          ...a,
          specialCategories: isSelected 
            ? currentSpecials.filter(id => id !== categoryId) 
            : [...currentSpecials, categoryId]
        };
      }
      return a;
    }));
  };

  const getCategoryStats = (categoryId: string, isSpecial?: boolean) => {
    const catApps = localApps.filter(a => {
      if (isSpecial) return a.specialCategories?.includes(categoryId);
      return a.category === categoryId;
    });
    const mobilCount = catApps.filter(a => a.platform === 'Mobil').length;
    const tvCount = catApps.filter(a => a.platform === 'TV').length;
    const playlistCount = catApps.filter(a => a.platform === 'Playlist').length;
    const totalCount = catApps.length;
    return { totalCount, mobilCount, tvCount, playlistCount };
  };

  const renderCategoryCard = (category: Category) => {
    const stats = getCategoryStats(category.id, category.isSpecial);
    const colorClasses = colorMap[category.color] || colorMap['blue'];
    const isDragging = dragCatId === category.id;
    const isDragOver = dragOverCatId === category.id;
    
    return (
      <div 
        key={category.id} 
        draggable
        onDragStart={(e) => handleDragStart(e, category.id)}
        onDragEnter={(e) => handleDragEnter(e, category.id)}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        className={`bg-[#1a1b2e] rounded-2xl p-6 border transition-all duration-200 group relative overflow-hidden flex flex-col cursor-grab active:cursor-grabbing ${
          isDragging ? 'opacity-40 scale-95 border-dashed border-white/40' : 
          isDragOver ? 'border-blue-500 scale-[1.02] bg-[#1a1b2e]/80' : 'border-white/5 hover:border-white/10'
        }`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
        
        {/* Grip Handle */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
          <GripVertical size={20} className="text-white" />
        </div>

        <div className="flex items-start justify-between mb-6 pl-2">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colorClasses}`}>
              {iconMap[category.icon] || <FolderOpen size={28} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                {category.isSpecial && (
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Özel Kategori
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-400 mt-0.5">{stats.totalCount} İçerik</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Pencil size={18} />
            </button>
            {!category.isSpecial && (
              <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {category.isSpecial ? (
          <div className="mt-auto border-t border-white/5 pt-4">
            <button 
              onClick={() => setSpecialSelectCatId(category.id)}
              className="w-full py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-bold transition-colors"
            >
              İçerik Yönet (Uygulama Seç)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-auto">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#2d3147]/50 border border-white/5 text-center">
              <Smartphone size={16} className="text-slate-400 mb-1" />
              <span className="text-[10px] font-bold uppercase text-slate-500">Mobil</span>
              <span className="text-sm font-semibold text-white">{stats.mobilCount}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#2d3147]/50 border border-white/5 text-center">
              <Tv size={16} className="text-slate-400 mb-1" />
              <span className="text-[10px] font-bold uppercase text-slate-500">TV</span>
              <span className="text-sm font-semibold text-white">{stats.tvCount}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#2d3147]/50 border border-white/5 text-center">
              <ListMusic size={16} className="text-slate-400 mb-1" />
              <span className="text-[10px] font-bold uppercase text-slate-500">Playlist</span>
              <span className="text-sm font-semibold text-white">{stats.playlistCount}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const appCategories = localCats.filter(c => c.type === 'app' || !c.type);
  const playlistCategories = localCats.filter(c => c.type === 'playlist');

  const filteredApps = localApps.filter(app => {
    if (appFilter !== 'all' && app.category !== appFilter) return false;
    if (appSearch && !app.name.toLowerCase().includes(appSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Kategoriler</h1>
          <p className="text-slate-400 mt-1">Uygulama ve playlist kategorilerini sıralamak için sürükleyip bırakın</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          Yeni Kategori Ekle
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Smartphone className="text-blue-500" size={24} />
          Uygulama Kategorileri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appCategories.map(category => renderCategoryCard(category))}
        </div>
      </div>

      {playlistCategories.length > 0 && (
        <div className="pt-4 space-y-4">
          <div className="border-t border-white/5 pb-4"></div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ListMusic className="text-purple-500" size={24} />
            Playlist Kategorileri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlistCategories.map(category => renderCategoryCard(category))}
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0b14] w-full max-w-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#1a1b2e]">
              <h2 className="text-lg font-bold text-white">Yeni Kategori Ekle</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setNewCatType('app')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                    newCatType === 'app' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#1a1b2e] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Smartphone size={24} />
                  <span className="font-bold text-sm">Uygulama Kategorisi</span>
                </button>
                <button
                  onClick={() => setNewCatType('playlist')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-colors ${
                    newCatType === 'playlist' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-[#1a1b2e] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <ListMusic size={24} />
                  <span className="font-bold text-sm">Playlist Kategorisi</span>
                </button>
              </div>

              {/* isSpecial Checkbox */}
              <label className="flex items-start gap-3 p-4 bg-[#2d3147] rounded-xl border border-white/5 cursor-pointer">
                <div className="mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={newCatIsSpecial}
                    onChange={(e) => setNewCatIsSpecial(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-black/50 border-white/10 focus:ring-blue-600 focus:ring-offset-0" 
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Bu Bir Özel Kategori Mi?</p>
                  <p className="text-xs text-slate-400 mt-1">Özel kategorilere (örn: Önerilenler, Popüler) uygulamalar kullanıcılar tarafından seçilemez, sadece yöneticiler atayabilir.</p>
                </div>
              </label>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 block mb-1">Kategori Adı *</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-[#1a1b2e] rounded-xl px-4 py-3 text-sm border border-white/10 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" 
                  placeholder={newCatType === 'playlist' ? 'Örn: Ulusal Kanallar' : 'Örn: Finans'} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 block mb-1">İkon Seçimi *</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {iconOptions.map(icon => (
                    <button 
                      key={icon}
                      onClick={() => setNewCatIcon(icon)}
                      className={`h-12 flex items-center justify-center rounded-xl border transition-colors ${
                        newCatIcon === icon ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-[#1a1b2e] border-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {iconMap[icon]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 block mb-1">Tema Rengi *</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {colorOptions.map(color => (
                    <button 
                      key={color}
                      onClick={() => setNewCatColor(color)}
                      className={`h-12 flex items-center justify-center rounded-xl border transition-colors ${
                        newCatColor === color ? colorMap[color] : 'bg-[#1a1b2e] border-white/5'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-current ${newCatColor !== color ? colorMap[color].split(' ')[0] : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 bg-[#1a1b2e] flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors">
                İptal
              </button>
              <button 
                onClick={() => {
                  const newCategory: Category = {
                    id: `cat-${Date.now()}`,
                    name: newCatName,
                    icon: newCatIcon,
                    color: newCatColor,
                    type: newCatType as 'app'|'playlist',
                    appCount: 0,
                    isSpecial: newCatIsSpecial,
                    order: 999
                  };
                  setLocalCats(prev => [...prev, newCategory]);
                  setIsAddModalOpen(false);
                  setNewCatName('');
                  setNewCatIsSpecial(false);
                }} 
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/20"
                disabled={!newCatName.trim()}
              >
                Kategoriyi Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Selection Modal (for Special Categories) */}
      {specialSelectCatId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0b14] w-full max-w-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
            <div className="p-5 border-b border-white/10 bg-[#1a1b2e] shrink-0">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    İçerik Yönet: <span className="text-blue-400">{localCats.find(c => c.id === specialSelectCatId)?.name}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Bu özel kategoriye dahil edilecek uygulamaları veya oynatma listelerini seçin.</p>
                </div>
                <button onClick={() => setSpecialSelectCatId(null)} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Search & Filters */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={appSearch}
                    onChange={e => setAppSearch(e.target.value)}
                    placeholder="Uygulama ara..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-[#0a0b14] border border-white/10 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none placeholder:text-slate-500"
                  />
                </div>
                <div className="relative">
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select 
                    value={appFilter}
                    onChange={e => setAppFilter(e.target.value)}
                    className="pl-9 pr-8 py-2.5 bg-[#0a0b14] border border-white/10 rounded-xl text-sm text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {localCats.filter(c => !c.isSpecial).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredApps.map(app => {
                  const isSelected = app.specialCategories?.includes(specialSelectCatId) || false;
                  return (
                    <button
                      key={app.id}
                      onClick={() => toggleAppInSpecialCategory(app.id, specialSelectCatId)}
                      className={`flex items-center gap-4 p-3 rounded-xl border text-left transition-colors ${
                        isSelected 
                          ? 'bg-blue-600/10 border-blue-500/50' 
                          : 'bg-[#1a1b2e] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`text-${isSelected ? 'blue-500' : 'slate-500'}`}>
                        {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                      </div>
                      <img src={app.icon} alt="" className="w-10 h-10 rounded-lg bg-black/20 shrink-0" />
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{app.name}</h4>
                        <p className="text-xs text-slate-400">{localCats.find(c => c.id === app.category)?.name || 'Kategori Yok'}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {filteredApps.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">
                  Kriterlere uygun içerik bulunamadı.
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#1a1b2e] flex justify-end shrink-0">
              <button 
                onClick={() => setSpecialSelectCatId(null)} 
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

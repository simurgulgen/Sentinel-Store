'use client';

import { Upload, Cloud, GitBranch, Box, Clock, Send, Image, FileText, Smartphone, Monitor, Tv, ListMusic, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { categories } from '@/app/data/seed';

export default function SubmitPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [hostingProvider, setHostingProvider] = useState('dropbox');
  const [litterboxDuration, setLitterboxDuration] = useState('12h');
  
  // States
  const [appName, setAppName] = useState('');
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [releaseKeyword, setReleaseKeyword] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [screenshots, setScreenshots] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [generalRequest, setGeneralRequest] = useState('');
  const [password, setPassword] = useState('');
  
  const [playlistBundleName, setPlaylistBundleName] = useState('');
  const [playlistInputs, setPlaylistInputs] = useState([{ name: '', url: '' }]);
  const [variantInputs, setVariantInputs] = useState([{ name: 'Universal', url: '' }]);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, onUploadSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFiles(prev => ({ ...prev, [id]: true }));
    
    try {
      const formData = new FormData();
      formData.append('fileToUpload', file);
      
      const provider = id === 'icon' ? 'catbox' : hostingProvider;
      formData.append('provider', provider);
      
      if (provider === 'litterbox') {
        formData.append('time', litterboxDuration);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Upload failed with status ${response.status}: ${errText}`);
      }

      const data = await response.json();
      if (data.url && data.url.startsWith('http')) {
        onUploadSuccess(data.url.trim());
      } else {
        throw new Error('Invalid response: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('Dosya yüklenirken bir hata oluştu: ' + (error as Error).message);
    } finally {
      setUploadingFiles(prev => ({ ...prev, [id]: false }));
    }
  };

  const addPlaylistInput = () => {
    setPlaylistInputs([...playlistInputs, { name: '', url: '' }]);
  };
  
  const removePlaylistInput = (index: number) => {
    if (playlistInputs.length > 1) {
      setPlaylistInputs(playlistInputs.filter((_, i) => i !== index));
    }
  };

  const addVariantInput = () => {
    setVariantInputs([...variantInputs, { name: '', url: '' }]);
  };
  
  const removeVariantInput = (index: number) => {
    if (variantInputs.length > 1) {
      setVariantInputs(variantInputs.filter((_, i) => i !== index));
    }
  };

  const handleHostingChange = (provider: string) => {
    setHostingProvider(provider);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Yeni Talep Gönder</h1>
        <p className="text-slate-400 mt-1">Uygulama veya playlistinizi Sentinel Store'a eklenmesi için bize gönderin.</p>
      </div>

      <div className="flex gap-2 border-b border-white/5 pb-4 overflow-x-auto">
        <button onClick={() => setActiveTab(1)} className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 1 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}>
          <Smartphone size={16} /> 📱 Uygulama (Dosya)
        </button>
        <button onClick={() => setActiveTab(2)} className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 2 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}>
          <GitBranch size={16} /> 🔗 GitHub Repo
        </button>
        <button onClick={() => setActiveTab(3)} className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 3 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}>
          <ListMusic size={16} /> 🎵 Playlist (M3U)
        </button>
        <button onClick={() => setActiveTab(4)} className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 4 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white border border-transparent'}`}>
          <FileText size={16} /> 💬 Genel Talep
        </button>
      </div>

      <div className="bg-[#1a1b2e] rounded-2xl p-6 border border-white/5">
        {(activeTab === 1 || activeTab === 2 || activeTab === 3) && (
          <div className="space-y-6">
            
            {/* Hosting Provider Selector for Tabs 1 & 3 */}
            {(activeTab === 1 || activeTab === 3) && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Dosya Barındırma</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button onClick={() => handleHostingChange('dropbox')} className={`p-4 rounded-xl text-left border transition-colors flex flex-col gap-2 ${hostingProvider === 'dropbox' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-[#2d3147] hover:border-white/10'}`}>
                    <Cloud className={hostingProvider === 'dropbox' ? 'text-blue-400' : 'text-slate-400'} size={24} />
                    <span className="font-semibold text-white text-sm">Dropbox</span>
                    <span className="text-xs text-slate-400">Link yapıştırın (Kalıcı)</span>
                  </button>
                  <button onClick={() => handleHostingChange('catbox')} className={`p-4 rounded-xl text-left border transition-colors flex flex-col gap-2 ${hostingProvider === 'catbox' ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-[#2d3147] hover:border-white/10'}`}>
                    <Box className={hostingProvider === 'catbox' ? 'text-green-400' : 'text-slate-400'} size={24} />
                    <span className="font-semibold text-white text-sm">Catbox</span>
                    <span className="text-xs text-slate-400">Max 200 MB (Kalıcı)</span>
                  </button>
                  <button onClick={() => handleHostingChange('litterbox')} className={`p-4 rounded-xl text-left border transition-colors flex flex-col gap-2 ${hostingProvider === 'litterbox' ? 'border-amber-500 bg-amber-500/10' : 'border-white/5 bg-[#2d3147] hover:border-white/10'}`}>
                    <Clock className={hostingProvider === 'litterbox' ? 'text-amber-400' : 'text-slate-400'} size={24} />
                    <span className="font-semibold text-white text-sm">Litterbox</span>
                    <span className="text-xs text-slate-400">Max 1 GB (Geçici)</span>
                  </button>
                </div>
                
                {hostingProvider === 'litterbox' && (
                  <div className="mt-4 flex gap-2">
                    {['1h', '12h', '24h', '72h'].map(dur => (
                      <button key={dur} onClick={() => setLitterboxDuration(dur)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${litterboxDuration === dur ? 'border-amber-500/50 bg-amber-500/20 text-amber-400' : 'border-white/5 bg-[#2d3147] text-slate-400'}`}>
                        {dur === '1h' ? '1 Saat' : dur === '12h' ? '12 Saat' : dur === '24h' ? '1 Gün' : '3 Gün'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 3 ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Bundle Adı *</label>
                  <input type="text" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Örn: Tüm Spor Kanalları (Bundle)" value={playlistBundleName} onChange={(e) => setPlaylistBundleName(e.target.value)} />
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 block">Playlist Dosyaları</label>
                  {playlistInputs.map((pl, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-[#2d3147] rounded-xl border border-white/5 relative">
                      {playlistInputs.length > 1 && (
                        <button onClick={() => removePlaylistInput(idx)} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg shadow-red-500/20 z-10">
                          <X size={14} />
                        </button>
                      )}
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-500">Playlist Adı *</label>
                        <input type="text" className="w-full bg-[#1a1b2e] rounded-lg px-3 py-2 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Örn: Ulusal Kanallar" value={pl.name || ''} onChange={(e) => {
                          const newInputs = [...playlistInputs];
                          newInputs[idx] = { ...newInputs[idx], name: e.target.value };
                          setPlaylistInputs(newInputs);
                        }} />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-500">
                          Dosya/Paylaşım Linki *
                        </label>
                        <div className="flex gap-2">
                          <input type="text" className="w-full bg-[#1a1b2e] rounded-lg px-3 py-2 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="https://" value={pl.url || ''} onChange={(e) => {
                            const newInputs = [...playlistInputs];
                            newInputs[idx] = { ...newInputs[idx], url: e.target.value };
                            setPlaylistInputs(newInputs);
                          }} />
                          
                          {(hostingProvider === 'catbox' || hostingProvider === 'litterbox') && (
                            <div className="relative px-3 flex items-center justify-center bg-blue-600 hover:bg-blue-700 border border-blue-500/50 rounded-lg text-white transition-colors cursor-pointer" title="Dosya Seç ve Yükle">
                              <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                onChange={(e) => handleFileUpload(e, `pl-${idx}`, (url) => {
                                  const newInputs = [...playlistInputs];
                                  newInputs[idx] = { ...newInputs[idx], url };
                                  setPlaylistInputs(newInputs);
                                })}
                              />
                              {uploadingFiles[`pl-${idx}`] ? (
                                <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                              ) : (
                                <Upload size={16} />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addPlaylistInput} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-600 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                    <Plus size={16} /> Yeni Dosya Ekle
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Uygulama Adı *</label>
                  <input type="text" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Örn: YouTube ReVanced" value={appName} onChange={(e) => setAppName(e.target.value)} />
                </div>

                {activeTab === 1 && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400 block">Dosya / Mimari Varyantları</label>
                    {variantInputs.map((v, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-[#2d3147] rounded-xl border border-white/5 relative">
                        {variantInputs.length > 1 && (
                          <button onClick={() => removeVariantInput(idx)} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg shadow-red-500/20 z-10">
                            <X size={14} />
                          </button>
                        )}
                        <div className="flex-1 space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-500">İşlemci / Varyant Adı *</label>
                          <input type="text" className="w-full bg-[#1a1b2e] rounded-lg px-3 py-2 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Örn: arm64-v8a, Universal, vs." value={v.name || ''} onChange={(e) => {
                            const newInputs = [...variantInputs];
                            newInputs[idx] = { ...newInputs[idx], name: e.target.value };
                            setVariantInputs(newInputs);
                          }} />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-500">
                            Dosya Linki *
                          </label>
                          <div className="flex gap-2">
                            <input type="text" className="w-full bg-[#1a1b2e] rounded-lg px-3 py-2 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="https://" value={v.url || ''} onChange={(e) => {
                              const newInputs = [...variantInputs];
                              newInputs[idx] = { ...newInputs[idx], url: e.target.value };
                              setVariantInputs(newInputs);
                            }} />
                            
                            {(hostingProvider === 'catbox' || hostingProvider === 'litterbox') && (
                              <div className="relative px-3 flex items-center justify-center bg-blue-600 hover:bg-blue-700 border border-blue-500/50 rounded-lg text-white transition-colors cursor-pointer" title="Dosya Seç ve Yükle">
                                <input 
                                  type="file" 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                  onChange={(e) => handleFileUpload(e, `var-${idx}`, (url) => {
                                    const newInputs = [...variantInputs];
                                    newInputs[idx] = { ...newInputs[idx], url };
                                    setVariantInputs(newInputs);
                                  })}
                                />
                                {uploadingFiles[`var-${idx}`] ? (
                                  <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                                ) : (
                                  <Upload size={16} />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addVariantInput} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-600 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                      <Plus size={16} /> Yeni Varyant Ekle
                    </button>
                  </div>
                )}
                
                {activeTab === 2 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">
                      GitHub Repo URL *
                    </label>
                    <input type="text" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="https://github.com/..." value={githubRepoUrl} onChange={(e) => setGithubRepoUrl(e.target.value)} />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Kategori *</label>
                <select className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Seçiniz...</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Platform *</label>
                <select className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                  <option value="">Seçiniz...</option>
                  {activeTab === 3 ? (
                    <option value="Playlist">Playlist</option>
                  ) : (
                    <>
                      <option value="Mobil">Mobil</option>
                      <option value="TV">TV</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Açıklama *</label>
              <textarea rows={3} className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500 resize-y" placeholder="Uygulamanın ne işe yaradığını kısaca açıklayın..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {(activeTab === 1 || activeTab === 2) && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Sürüm (Release Keyword) *</label>
                <input type="text" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Örn: 1.0.0 veya release keyword" value={releaseKeyword} onChange={(e) => setReleaseKeyword(e.target.value)} />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">İkon URL (Opsiyonel)</label>
              <div className="flex gap-2">
                <input id="iconUrlInput" type="text" className="flex-1 bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="https://...png" value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} />
                <div className="relative px-4 flex items-center justify-center bg-[#2d3147] border border-white/5 hover:border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer" title="Catbox'a Hızlı Yükle">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    onChange={(e) => handleFileUpload(e, 'icon', (url) => {
                       setIconUrl(url);
                    })}
                  />
                  {uploadingFiles['icon'] ? (
                    <span className="animate-spin w-4 h-4 border-2 border-slate-400 border-t-white rounded-full" />
                  ) : (
                    <Upload size={18} />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Ekran Görüntüleri (Opsiyonel)</label>
              <textarea rows={2} className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500 resize-y" placeholder="Virgülle ayırarak linkleri girin..." value={screenshots} onChange={(e) => setScreenshots(e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block flex items-center gap-2">
                Dosya Şifresi (Opsiyonel) 
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">Yeni</span>
              </label>
              <input type="password" placeholder="İsteğe bağlı şifre belirleyin..." className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className="text-[11px] text-slate-500 mt-1">Bu şifre uygulamanız indirilirken kullanıcılardan istenecek. Dilediğiniz zaman Yüklediklerim menüsünden değiştirebilirsiniz.</p>
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Kullanıcı Adı *</label>
                <input type="text" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="Adınız Soyadınız" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">E-Posta *</label>
                <input type="email" className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500" placeholder="ornek@email.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5 block">Talep Detayı *</label>
              <textarea rows={6} className="w-full bg-[#2d3147] rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-blue-500/50 focus:outline-none text-white placeholder:text-slate-500 resize-y" placeholder="Yeni bir kategori eklensin, şu uygulamayı da istiyoruz..." value={generalRequest} onChange={(e) => setGeneralRequest(e.target.value)} />
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-[0.99]">
            <Send size={18} />
            Talebi Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

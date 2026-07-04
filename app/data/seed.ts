// ============================================================
// Sentinel Store Admin — Seed Data
// ============================================================

// ---- Types --------------------------------------------------

export type Platform = 'Mobil' | 'TV' | 'Playlist';
export type AppStatus = 'approved' | 'pending' | 'rejected';
export type HostingProvider = 'dropbox' | 'github' | 'catbox' | 'litterbox' | 'gdrive' | 'other';
export type SubmissionType = 'app' | 'playlist' | 'request';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  icon: string; // lucide icon name hint
  color: string; // tailwind color class
  type: 'app' | 'playlist';
  appCount: number;
  order?: number; // Sorting order
  isSpecial?: boolean; // If true, only admins can manage this category
}

export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  author?: string;
  category: string; // category id
  platform: Platform;
  status: AppStatus;
  version: string;
  size: string;
  downloadUrl: string;
  hostingProvider: HostingProvider;
  releaseKeyword?: string;
  screenshots: string[];
  playlists?: { name: string; url: string }[];
  variants?: { name: string; url: string }[]; // architecture or variant name
  createdAt: string;
  specialCategories?: string[]; // Array of special category IDs this app belongs to
}

export interface Submission {
  id: string;
  type: SubmissionType;
  appName: string;
  description: string;
  url: string;
  iconUrl: string;
  category: string;
  platform: Platform;
  hostingProvider: HostingProvider;
  userName: string;
  userEmail: string;
  userAvatar: string;
  status: SubmissionStatus;
  virusScore: number | null;
  createdAt: string;
  litterboxExpiry?: string;
  variants?: { name: string; url: string }[];
  password?: string; // Optional password for the submission files
  rejectionReason?: string; // Reason for rejection if status is rejected
  deleteRequested?: boolean; // True if user requested deletion
}

// ---- Support Tickets ---------------------------------------------
export interface TicketMessage {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: 'open' | 'closed';
  createdAt: string;
  messages: TicketMessage[];
}

// ---- Categories ---------------------------------------------

export const categories: Category[] = [
  // App Categories
  { id: 'utility',      name: 'Araçlar',       icon: 'Wrench',         color: 'blue',    type: 'app', appCount: 4, order: 1 },
  { id: 'media',        name: 'Medya',         icon: 'Play',           color: 'purple',  type: 'app', appCount: 4, order: 2 },
  { id: 'social',       name: 'Sosyal',        icon: 'Users',          color: 'pink',    type: 'app', appCount: 2, order: 3 },
  { id: 'privacy',      name: 'Gizlilik',      icon: 'Shield',         color: 'emerald', type: 'app', appCount: 2, order: 4 },
  { id: 'development',  name: 'Geliştirme',    icon: 'Code',           color: 'amber',   type: 'app', appCount: 1, order: 5 },
  { id: 'educational',  name: 'Eğitim',        icon: 'GraduationCap',  color: 'cyan',    type: 'app', appCount: 1, order: 6 },
  { id: 'movies-tv',    name: 'Film & Dizi',   icon: 'Film',           color: 'rose',    type: 'app', appCount: 0, order: 7 },
  { id: 'iptv-player',  name: 'IPTV Oynatıcı', icon: 'MonitorPlay',    color: 'orange',  type: 'app', appCount: 0, order: 8 },
  { id: 'featured-apps',name: 'Önerilenler',   icon: 'Star',           color: 'amber',   type: 'app', appCount: 2, order: 0, isSpecial: true },
  
  // Playlist Categories
  { id: 'national-tv',  name: 'Ulusal Kanallar', icon: 'Tv',           color: 'blue',    type: 'playlist', appCount: 0, order: 1 },
  { id: 'sports-tv',    name: 'Spor',          icon: 'Trophy',         color: 'emerald', type: 'playlist', appCount: 0, order: 2 },
  { id: 'cinema-tv',    name: 'Sinema',        icon: 'Film',           color: 'purple',  type: 'playlist', appCount: 0, order: 3 },
  { id: 'documentary',  name: 'Belgesel',      icon: 'Globe',          color: 'amber',   type: 'playlist', appCount: 0, order: 4 },
  { id: 'news-tv',      name: 'Haber',         icon: 'Newspaper',      color: 'rose',    type: 'playlist', appCount: 0, order: 5 },
  { id: 'kids-tv',      name: 'Çocuk',         icon: 'Gamepad2',       color: 'cyan',    type: 'playlist', appCount: 0, order: 6 },
];

// ---- Apps ---------------------------------------------------

export const apps: App[] = [
  {
    id: 'app-001',
    name: 'Sentinel VPN',
    description: 'Güvenli ve hızlı VPN bağlantısı sağlayan uygulama. Tüm trafiğinizi şifreler.',
    icon: 'https://placehold.co/80x80/1a1b2e/60a5fa?text=VPN',
    category: 'privacy',
    platform: 'Mobil',
    status: 'approved',
    version: '2.4.1',
    size: '18 MB',
    downloadUrl: 'https://dropbox.com/s/sentinel-vpn',
    hostingProvider: 'dropbox',
    releaseKeyword: 'sentinel-vpn',
    screenshots: [],
    createdAt: '2026-06-28T14:30:00Z',
    specialCategories: ['featured-apps'],
  },
  {
    id: 'app-002',
    name: 'StreamBox',
    description: 'Canlı TV ve film izleme uygulaması. Binlerce kanal ve içerik.',
    icon: 'https://placehold.co/80x80/1a1b2e/a78bfa?text=SB',
    category: 'media',
    platform: 'Mobil',
    status: 'approved',
    version: '5.1.0',
    size: '32 MB',
    downloadUrl: 'https://github.com/user/streambox/releases',
    hostingProvider: 'github',
    releaseKeyword: 'streambox-apk',
    screenshots: [],
    createdAt: '2026-06-25T10:15:00Z',
    specialCategories: ['featured-apps'],
  },
  {
    id: 'app-003',
    name: 'AdBlock Ultra',
    description: 'Sistem genelinde reklam engelleyici. DNS bazlı filtreleme.',
    icon: 'https://placehold.co/80x80/1a1b2e/f87171?text=AB',
    category: 'utility',
    platform: 'Mobil',
    status: 'approved',
    version: '3.0.2',
    size: '8 MB',
    downloadUrl: 'https://dropbox.com/s/adblock-ultra',
    hostingProvider: 'dropbox',
    releaseKeyword: 'adblock-ultra',
    screenshots: [],
    createdAt: '2026-06-20T08:00:00Z',
  },
  {
    id: 'app-004',
    name: 'CodePad Pro',
    description: 'Mobil cihazlarda kod yazmak için gelişmiş editör.',
    icon: 'https://placehold.co/80x80/1a1b2e/fbbf24?text=CP',
    category: 'development',
    platform: 'Mobil',
    status: 'approved',
    version: '1.8.5',
    size: '22 MB',
    downloadUrl: 'https://github.com/user/codepad-pro/releases',
    hostingProvider: 'github',
    releaseKeyword: 'codepad-pro',
    screenshots: [],
    createdAt: '2026-06-18T16:45:00Z',
  },
  {
    id: 'app-005',
    name: 'TurkChat',
    description: 'Şifreli mesajlaşma uygulaması. Uçtan uca güvenli.',
    icon: 'https://placehold.co/80x80/1a1b2e/ec4899?text=TC',
    category: 'social',
    platform: 'Mobil',
    status: 'pending',
    version: '1.0.0',
    size: '15 MB',
    downloadUrl: 'https://dropbox.com/s/turkchat',
    hostingProvider: 'dropbox',
    releaseKeyword: 'turkchat',
    screenshots: [],
    createdAt: '2026-07-01T12:00:00Z',
  },
  {
    id: 'app-006',
    name: 'MathSolver',
    description: 'Matematik problemlerini kamera ile çözen yapay zeka uygulaması.',
    icon: 'https://placehold.co/80x80/1a1b2e/22d3ee?text=MS',
    category: 'educational',
    platform: 'Mobil',
    status: 'approved',
    version: '4.2.0',
    size: '45 MB',
    downloadUrl: 'https://dropbox.com/s/mathsolver',
    hostingProvider: 'dropbox',
    releaseKeyword: 'mathsolver',
    screenshots: [],
    createdAt: '2026-06-15T09:30:00Z',
  },
  {
    id: 'app-007',
    name: 'PCOptimizer',
    description: 'Windows için sistem optimizasyon ve temizleme aracı.',
    icon: 'https://placehold.co/80x80/1a1b2e/60a5fa?text=PC',
    category: 'utility',
    platform: 'Mobil',
    status: 'approved',
    version: '2.1.0',
    size: '54 MB',
    downloadUrl: 'https://github.com/user/pcoptimizer/releases',
    hostingProvider: 'github',
    releaseKeyword: 'pcoptimizer',
    screenshots: [],
    createdAt: '2026-06-10T11:20:00Z',
  },
  {
    id: 'app-008',
    name: 'SmartTV Player',
    description: 'Akıllı TV\'ler için medya oynatıcı. IPTV desteği.',
    icon: 'https://placehold.co/80x80/1a1b2e/a78bfa?text=TV',
    category: 'media',
    platform: 'TV',
    status: 'approved',
    version: '3.5.2',
    size: '28 MB',
    downloadUrl: 'https://dropbox.com/s/smarttv-player',
    hostingProvider: 'dropbox',
    releaseKeyword: 'smarttv-player',
    screenshots: [],
    createdAt: '2026-06-08T14:00:00Z',
  },
  {
    id: 'app-009',
    name: 'Türk IPTV Paketi',
    description: 'Türk kanallarını içeren güncel IPTV playlist dosyası.',
    icon: 'https://placehold.co/80x80/1a1b2e/34d399?text=IP',
    category: 'media',
    platform: 'Playlist',
    status: 'approved',
    version: '2026.07',
    size: '1.2 MB',
    downloadUrl: 'https://dropbox.com/s/turk-iptv',
    hostingProvider: 'dropbox',
    releaseKeyword: 'turk-iptv',
    screenshots: [],
    createdAt: '2026-07-02T20:00:00Z',
  },
  {
    id: 'app-010',
    name: 'FileGuard',
    description: 'Dosya şifreleme ve gizleme uygulaması.',
    icon: 'https://placehold.co/80x80/1a1b2e/10b981?text=FG',
    category: 'privacy',
    platform: 'Mobil',
    status: 'pending',
    version: '1.2.0',
    size: '12 MB',
    downloadUrl: 'https://catbox.moe/fileguard',
    hostingProvider: 'catbox',
    releaseKeyword: 'fileguard',
    screenshots: [],
    createdAt: '2026-07-03T09:00:00Z',
  },
  {
    id: 'iptv-turk-bundle',
    name: 'Furkan Akten (3 Playlist)',
    description: 'Spor ve Sinema kanalları karma liste bundle.',
    icon: 'https://placehold.co/80x80/1a1b2e/8b5cf6?text=IP',
    category: 'media',
    platform: 'Playlist',
    status: 'approved',
    version: '1.0.0',
    size: '150 KB',
    author: 'Furkan Akten',
    screenshots: [],
    downloadUrl: '',
    hostingProvider: 'dropbox',
    releaseKeyword: 'iptv-turk-bundle',
    playlists: [
      { name: 'Ulusal Kanallar', url: 'https://example.com/ulusal.m3u' },
      { name: 'Spor Paketi', url: 'https://example.com/spor.m3u' },
      { name: 'Sinema Arşivi', url: 'https://example.com/sinema.m3u' }
    ],
    createdAt: '2023-11-20T14:30:00Z',
  },
  {
    id: 'app-012',
    name: 'TV Remote Pro',
    description: 'Android TV uzaktan kumanda uygulaması.',
    icon: 'https://placehold.co/80x80/1a1b2e/818cf8?text=TR',
    category: 'utility',
    platform: 'TV',
    status: 'rejected',
    version: '0.9.0',
    size: '6 MB',
    downloadUrl: 'https://litter.catbox.moe/tvremote',
    hostingProvider: 'litterbox',
    releaseKeyword: 'tv-remote',
    screenshots: [],
    createdAt: '2026-06-22T13:00:00Z',
  },
];

// ---- Submissions --------------------------------------------

export const submissions: Submission[] = [
  {
    id: 'sub-001',
    type: 'app',
    appName: 'NetMonitor',
    description: 'Ağ trafiğini izleyen ve analiz eden uygulama. Tüm bağlantıları görselleştirir.',
    url: 'https://www.dropbox.com/s/netmonitor-v1/netmonitor.apk',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/60a5fa?text=NM',
    category: 'utility',
    platform: 'Mobil',
    hostingProvider: 'dropbox',
    userName: 'Ahmet Yılmaz',
    userEmail: 'ahmet@example.com',
    userAvatar: 'https://placehold.co/40x40/3b82f6/ffffff?text=AY',
    status: 'pending',
    virusScore: 0,
    createdAt: '2026-07-03T15:30:00Z',
    password: 'secretpassword123',
  },
  {
    id: 'sub-002',
    type: 'app',
    appName: 'DarkTunnel',
    description: 'Gelişmiş proxy ve tünel bağlantısı aracı. HTTP/SOCKS5 desteği.',
    url: 'https://github.com/darkuser/darktunnel/releases/tag/v2.0',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/a78bfa?text=DT',
    category: 'privacy',
    platform: 'Mobil',
    hostingProvider: 'github',
    userName: 'Mehmet Kara',
    userEmail: 'mehmet@example.com',
    userAvatar: 'https://placehold.co/40x40/8b5cf6/ffffff?text=MK',
    status: 'pending',
    virusScore: null,
    createdAt: '2026-07-03T12:00:00Z',
  },
  {
    id: 'sub-003',
    type: 'playlist',
    appName: 'Sinema Kanalları M3U',
    description: 'Film ve sinema kanallarını içeren güncel playlist. 150+ kanal.',
    url: 'https://files.catbox.moe/sinema-playlist.m3u',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/34d399?text=SK',
    category: 'media',
    platform: 'Playlist',
    hostingProvider: 'catbox',
    userName: 'Zeynep Demir',
    userEmail: 'zeynep@example.com',
    userAvatar: 'https://placehold.co/40x40/10b981/ffffff?text=ZD',
    status: 'approved',
    virusScore: 0,
    createdAt: '2026-07-02T09:00:00Z',
  },
  {
    id: 'sub-004',
    type: 'app',
    appName: 'CrackGuard',
    description: 'Şüpheli içerik tespit edilen uygulama. Kötü amaçlı yazılım barındırıyor olabilir.',
    url: 'https://litter.catbox.moe/crackguard.apk',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/ef4444?text=CG',
    category: 'utility',
    platform: 'Mobil',
    hostingProvider: 'litterbox',
    userName: 'Ali Suspect',
    userEmail: 'ali@example.com',
    userAvatar: 'https://placehold.co/40x40/ef4444/ffffff?text=AS',
    status: 'rejected',
    rejectionReason: 'VirusTotal taramasında 12 farklı motorda zararlı yazılım tespit edildi. Güvenlik politikalarımız gereği bu dosyayı kabul edemeyiz.',
    virusScore: 12,
    createdAt: '2026-07-01T18:00:00Z',
    litterboxExpiry: '72 saat',
  },
  {
    id: 'sub-005',
    type: 'request',
    appName: 'Spotify Premium APK',
    description: 'Spotify Premium özellikli modlu APK istiyorum. Reklamsız müzik dinlemek için.',
    url: '',
    iconUrl: '',
    category: 'media',
    platform: 'Mobil',
    hostingProvider: 'dropbox',
    userName: 'Elif Şahin',
    userEmail: 'elif@example.com',
    userAvatar: 'https://placehold.co/40x40/f59e0b/ffffff?text=EŞ',
    status: 'pending',
    virusScore: null,
    createdAt: '2026-07-03T08:00:00Z',
  },
  {
    id: 'sub-006',
    type: 'app',
    appName: 'WifiAnalyzer',
    description: 'WiFi ağlarını tarayan ve sinyal gücünü analiz eden araç.',
    url: 'https://www.dropbox.com/s/wifianalyzer/wifi.apk',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/22d3ee?text=WA',
    category: 'utility',
    platform: 'Mobil',
    hostingProvider: 'dropbox',
    userName: 'Can Özkan',
    userEmail: 'can@example.com',
    userAvatar: 'https://placehold.co/40x40/06b6d4/ffffff?text=CÖ',
    status: 'pending',
    virusScore: 0,
    createdAt: '2026-07-03T19:00:00Z',
  },
  {
    id: 'sub-007',
    type: 'playlist',
    appName: 'Belgesel Kanalları',
    description: 'Belgesel ve doğa kanallarını içeren M3U playlist dosyası.',
    url: 'https://litter.catbox.moe/belgesel.m3u',
    iconUrl: 'https://placehold.co/80x80/1a1b2e/fbbf24?text=BK',
    category: 'media',
    platform: 'Playlist',
    hostingProvider: 'litterbox',
    userName: 'Deniz Yıldız',
    userEmail: 'deniz@example.com',
    userAvatar: 'https://placehold.co/40x40/eab308/ffffff?text=DY',
    status: 'pending',
    virusScore: null,
    createdAt: '2026-07-03T21:00:00Z',
    litterboxExpiry: '72 saat',
  },
];

export const mockUser = {
  id: 'usr-123',
  name: 'Simurg',
  email: 'enesfurkanakten@gmail.com',
  role: 'admin', // 'admin' | 'user'
};

// ---- Mock Support Tickets -----------------------------------
export const seedTickets: Ticket[] = [
  {
    id: 'tck-001',
    userId: 'usr-999',
    userName: 'Ahmet Yılmaz',
    subject: 'Uygulamam neden reddedildi?',
    status: 'open',
    createdAt: '2026-07-03T10:00:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Merhaba, yüklediğim "Retro Racing" oyunu reddedilmiş ancak virüs taraması temiz görünüyor. Nedenini öğrenebilir miyim?',
        createdAt: '2026-07-03T10:00:00Z'
      },
      {
        id: 'msg-2',
        sender: 'admin',
        text: 'Merhaba Ahmet Bey, uygulamanız telif hakları ihlali sebebiyle reddedilmiştir. Başka bir yayıncıya ait varlıklar barındırdığını tespit ettik.',
        createdAt: '2026-07-03T11:30:00Z'
      }
    ]
  },
  {
    id: 'tck-002',
    userId: 'usr-123',
    userName: 'Simurg',
    subject: 'Şifre değiştirme sorunu',
    status: 'closed',
    createdAt: '2026-07-01T14:20:00Z',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Dosya şifremi değiştiremiyorum, hata veriyor.',
        createdAt: '2026-07-01T14:20:00Z'
      },
      {
        id: 'msg-4',
        sender: 'admin',
        text: 'Sistemdeki geçici bir arıza giderildi, lütfen tekrar deneyiniz.',
        createdAt: '2026-07-01T15:00:00Z'
      },
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Teşekkürler, şimdi çalışıyor.',
        createdAt: '2026-07-01T15:10:00Z'
      }
    ]
  }
];

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Server, Lock, ChevronRight, BookOpen, Search, 
  ShieldCheck, Key, Tag, Database, Activity, FileText, 
  Moon, Sun, Home, BarChart3
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

// Datos en español (Asegúrate de que tu archivo esté guardado en UTF-8 en VS Code)
const wikiData = [
  {
    id: 'intro',
    title: 'Introducción a Azure',
    icon: <Server className="w-5 h-5" />,
    tags: ['Cloud', 'Responsabilidad Compartida', 'IaaS / PaaS'],
    content: 'Microsoft Azure es una plataforma integral de computación en la nube. La seguridad opera bajo un Modelo de Responsabilidad Compartida: Microsoft asegura la infraestructura física, pero el cliente debe proteger sus datos, identidades y dispositivos. Entender esto es el primer paso para una arquitectura segura.'
  },
  {
    id: 'network',
    title: 'Seguridad de Red',
    icon: <Shield className="w-5 h-5" />,
    tags: ['VNet', 'Azure Firewall', 'Anti-DDoS'],
    content: 'La base de la protección cloud. Azure protege las redes mediante el aislamiento de Redes Virtuales (VNet), Azure Firewall y Grupos de Seguridad de Red (NSG). Además, incluye protección DDoS básica por defecto para mitigar ataques volumétricos.'
  },
  {
    id: 'identity',
    title: 'Identidad y Acceso (IAM)',
    icon: <Lock className="w-5 h-5" />,
    tags: ['Entra ID', 'MFA', 'Zero Trust'],
    content: 'La identidad es el nuevo perímetro. Microsoft Entra ID permite implementar Control de Acceso Basado en Roles (RBAC) y Autenticación Multifactor (MFA). Se basa en la arquitectura "Zero Trust": nunca confiar, siempre verificar cada solicitud.'
  },
  {
    id: 'defender',
    title: 'Defender for Cloud',
    icon: <ShieldCheck className="w-5 h-5" />,
    tags: ['CSPM', 'CWP', 'Amenazas'],
    content: 'Un sistema de gestión de seguridad unificado. Proporciona Gestión de la Postura de Seguridad (CSPM) evaluando continuamente tu entorno y Protección de Cargas de Trabajo (CWP) para detectar amenazas en tiempo real.'
  },
  {
    id: 'keyvault',
    title: 'Azure Key Vault',
    icon: <Key className="w-5 h-5" />,
    tags: ['Criptografía', 'Secretos', 'Certificados'],
    content: 'Escribir contraseñas en el código fuente es un riesgo crítico. Azure Key Vault almacena y controla el acceso a tokens, contraseñas, certificados y claves criptográficas de forma segura utilizando Módulos de Seguridad de Hardware (HSM).'
  }
];

// Datos para los gráficos
const chartData = [
  { name: 'Lun', ataques: 120, prevenidos: 118 },
  { name: 'Mar', ataques: 180, prevenidos: 180 },
  { name: 'Mié', ataques: 250, prevenidos: 248 },
  { name: 'Jue', ataques: 90, prevenidos: 90 },
  { name: 'Vie', ataques: 310, prevenidos: 305 },
  { name: 'Sáb', ataques: 150, prevenidos: 150 },
  { name: 'Dom', ataques: 100, prevenidos: 99 },
];

const complianceData = [
  { name: 'Q1', score: 75 },
  { name: 'Q2', score: 82 },
  { name: 'Q3', score: 88 },
  { name: 'Q4', score: 95 },
];

// apple-motion: Resorte críticamente amortiguado para transiciones físicas fluidas
const springConfig = { type: "spring", bounce: 0, duration: 0.4 };

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' o id del módulo
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredData = wikiData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeModule = wikiData.find(item => item.id === activeTab);

  return (
    // Contenedor principal con clase 'dark' condicional
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      {/* apple-look: Fondos adaptativos claro/oscuro */}
      <div className="flex h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans antialiased overflow-hidden transition-colors duration-300">
        
        {/* apple-look: Liquid Glass sidebar con soporte Dark Mode */}
        <aside className="w-80 h-full border-r border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-2xl flex flex-col z-20 shrink-0">
          <div className="pt-8 pb-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-xl shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-semibold text-xl tracking-tight">Wiki Azure</h1>
            </div>
            
            {/* Botón Dark Mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>

          <div className="px-4 mb-4">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Buscar módulos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/10 border-transparent rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {/* Botón de Inicio */}
            <button
              onClick={() => setActiveTab('home')}
              className="relative w-full text-left outline-none group mb-4"
            >
              {activeTab === 'home' && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-blue-500 rounded-lg shadow-sm"
                  transition={springConfig}
                />
              )}
              <motion.div 
                whileTap={{ scale: 0.98 }}
                className={`relative z-10 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'home' ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5" />
                Panel Principal
              </motion.div>
            </button>

            <div className="px-3 mb-2 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Módulos de Seguridad
            </div>
            
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="relative w-full text-left outline-none group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-0 bg-blue-500 rounded-lg shadow-sm"
                        transition={springConfig}
                      />
                    )}
                    
                    <motion.div 
                      whileTap={{ scale: 0.98 }}
                      className={`relative z-10 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </motion.div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No se encontraron resultados
              </div>
            )}
          </nav>
        </aside>

        {/* Área de Contenido Principal */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center relative pb-12">
          
          <AnimatePresence mode="wait">
            {activeTab === 'home' ? (
              // VISTA HOME / DASHBOARD
              <motion.div
                key="home-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={springConfig}
                className="max-w-5xl w-full px-8 pt-12"
              >
                <h2 className="text-4xl font-bold tracking-tight mb-2">Centro de Seguridad Azure</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Resumen de postura de seguridad y módulos de aprendizaje.</p>

                {/* Gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-3xl shadow-sm border border-gray-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold">Amenazas Mitigadas (Últimos 7 días)</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? '#2C2C2E' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
                          />
                          <Bar dataKey="ataques" name="Ataques Recibidos" fill={isDarkMode ? '#4B5563' : '#E5E7EB'} radius={[4, 4, 0, 0]} />
                          <Bar dataKey="prevenidos" name="Bloqueados" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-3xl shadow-sm border border-gray-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">Evolución Secure Score (2023)</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={complianceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666'}} />
                          <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{fill: isDarkMode ? '#888' : '#666'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? '#2C2C2E' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
                          />
                          <Line type="monotone" dataKey="score" name="Puntuación" stroke="#10B981" strokeWidth={3} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: isDarkMode ? '#1C1C1E' : '#fff' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Módulos de Estudio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wikiData.map(module => (
                    <motion.button
                      key={module.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(module.id)}
                      className="text-left bg-white dark:bg-[#1C1C1E] p-6 rounded-3xl shadow-sm border border-gray-200/60 dark:border-white/10 hover:shadow-md transition-shadow"
                    >
                      <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl inline-block text-blue-500 mb-4">
                        {module.icon}
                      </div>
                      <h4 className="font-semibold mb-2">{module.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{module.content}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // VISTA DE MÓDULO INDIVIDUAL
              <motion.article
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={springConfig}
                className="max-w-3xl w-full bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/60 dark:border-white/10 p-10 mt-12"
              >
                <div className="flex items-center gap-3 text-blue-500 mb-6">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                    {activeModule?.icon}
                  </div>
                  <span className="font-semibold tracking-wide uppercase text-sm">
                    Marco de Seguridad
                  </span>
                </div>
                
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
                  {activeModule?.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-8">
                  {activeModule?.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-[17px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {activeModule?.content}
                </p>
                
                <div className="mt-14 pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between group cursor-pointer" onClick={() => setActiveTab('home')}>
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors">
                    ← Volver al panel principal
                  </span>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
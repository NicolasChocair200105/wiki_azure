import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Lock, ChevronRight, BookOpen, Search, ShieldCheck, Key, Tag } from 'lucide-react';

// Datos ampliados de la Wiki para más contenido
const wikiData = [
  {
    id: 'intro',
    title: 'Introducción a Azure',
    icon: <Server className="w-5 h-5" />,
    tags: ['Nube', 'Responsabilidad Compartida', 'IaaS / PaaS'],
    content: 'Microsoft Azure es una plataforma de computación en la nube que ofrece soluciones IaaS, PaaS y SaaS. En términos de seguridad, opera bajo un modelo de responsabilidad compartida entre Microsoft y el cliente. Mientras Microsoft protege la infraestructura física, el cliente debe asegurar sus datos, identidades y configuraciones de red.'
  },
  {
    id: 'network',
    title: 'Seguridad de Red',
    icon: <Shield className="w-5 h-5" />,
    tags: ['VNet', 'Firewall', 'Anti-DDoS'],
    content: 'Azure protege las redes mediante Azure Firewall, Grupos de Seguridad de Red (NSG) y protección DDoS. La segmentación de redes virtuales (VNet) es vital para aislar cargas de trabajo críticas y prevenir movimientos laterales de posibles amenazas dentro de la infraestructura.'
  },
  {
    id: 'identity',
    title: 'Gestión de Identidad',
    icon: <Lock className="w-5 h-5" />,
    tags: ['Entra ID', 'MFA', 'Zero Trust'],
    content: 'Microsoft Entra ID (anteriormente Azure AD) es el núcleo de la seguridad. Permite implementar acceso condicional, autenticación multifactor (MFA) y el principio de privilegios mínimos basado en la filosofía "Zero Trust" (Nunca confíes, siempre verifica).'
  },
  {
    id: 'defender',
    title: 'Defender for Cloud',
    icon: <ShieldCheck className="w-5 h-5" />,
    tags: ['CSPM', 'CWP', 'Monitoreo'],
    content: 'Microsoft Defender for Cloud es una herramienta centralizada que gestiona la postura de seguridad (CSPM) y protege las cargas de trabajo en la nube (CWP). Escanea continuamente los recursos, identifica vulnerabilidades y ofrece recomendaciones accionables.'
  },
  {
    id: 'keyvault',
    title: 'Azure Key Vault',
    icon: <Key className="w-5 h-5" />,
    tags: ['Criptografía', 'Secretos', 'Certificados'],
    content: 'Un servicio seguro diseñado para almacenar y acceder a secretos de forma estricta. Key Vault permite proteger claves criptográficas, certificados y contraseñas utilizadas por aplicaciones, evitando que se expongan en el código fuente.'
  }
];

// apple-motion: Configuración de resorte global (critically damped)
const springConfig = { type: "spring", bounce: 0, duration: 0.4 };

export default function App() {
  const [activeTab, setActiveTab] = useState(wikiData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica del buscador
  const filteredData = wikiData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // apple-look: Fondo gris neutro claro, típico de las ventanas de macOS
    <div className="flex h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased overflow-hidden">
      
      {/* apple-look: Sidebar con material "Liquid Glass" (blur fuerte y opacidad baja) */}
      <aside className="w-72 h-full border-r border-black/5 bg-white/60 backdrop-blur-2xl flex flex-col z-10 shrink-0">
        <div className="pt-8 pb-4 px-5 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-xl shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-semibold text-xl tracking-tight">Wiki Azure</h1>
        </div>

        {/* Buscador estilo Finder */}
        <div className="px-4 mb-4">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 border-transparent rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Módulos de Seguridad
          </div>
          
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              const isActive = activeTab.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item)}
                  className="relative w-full text-left outline-none group"
                >
                  {/* apple-motion: Píldora activa que se desliza mágicamente usando layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-pill"
                      className="absolute inset-0 bg-blue-500 rounded-lg shadow-sm"
                      transition={springConfig}
                    />
                  )}
                  
                  {/* apple-motion: Reacción inmediata al tap */}
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className={`relative z-10 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-700 hover:bg-black/5'
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

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center relative">
        {/* Barra superior invisible para simular el área de arrastre de una ventana */}
        <div className="w-full h-12 flex-shrink-0" />

        <div className="max-w-3xl w-full px-8 pb-12">
          {/* apple-motion: Animación de entrada/salida fluida y sin interrupciones abruptas */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeTab.id}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={springConfig}
              className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/60 p-10 mt-4"
            >
              <div className="flex items-center gap-3 text-blue-500 mb-6">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  {activeTab.icon}
                </div>
                <span className="font-semibold tracking-wide uppercase text-sm">
                  Azure Security Framework
                </span>
              </div>
              
              {/* apple-look: Tipografía ajustada (Tracking negativo en títulos grandes) */}
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
                {activeTab.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeTab.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* apple-look: Contraste y leading (interlineado) cómodo para lectura */}
              <p className="text-[17px] text-gray-600 leading-relaxed font-normal">
                {activeTab.content}
              </p>
              
              <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between group cursor-pointer">
                <span className="text-sm font-medium text-gray-400 group-hover:text-blue-500 transition-colors">
                  Ramo: Gestión de Seguridad
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

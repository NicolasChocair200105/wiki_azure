import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Lock, ChevronRight, BookOpen } from 'lucide-react';

// Datos de la Wiki
const wikiData = [
  {
    id: 'intro',
    title: 'Introducción a Azure',
    icon: <Server className="w-5 h-5" />,
    content: 'Microsoft Azure es una plataforma de computación en la nube que ofrece soluciones IaaS, PaaS y SaaS. En términos de seguridad, opera bajo un modelo de responsabilidad compartida entre Microsoft y el cliente.'
  },
  {
    id: 'network',
    title: 'Seguridad de Red',
    icon: <Shield className="w-5 h-5" />,
    content: 'Azure protege las redes mediante Azure Firewall, Grupos de Seguridad de Red (NSG) y protección DDoS. La segmentación de redes virtuales (VNet) es vital para aislar cargas de trabajo críticas y prevenir movimientos laterales.'
  },
  {
    id: 'identity',
    title: 'Gestión de Identidad',
    icon: <Lock className="w-5 h-5" />,
    content: 'Microsoft Entra ID (anteriormente Azure AD) es el núcleo de la seguridad. Permite implementar acceso condicional, autenticación multifactor (MFA) y el principio de privilegios mínimos (Zero Trust).'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(wikiData[0]);

  return (
    // apple-look: Fondo gris claro y tipografía limpia (Foundation)
    <div className="flex h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased">
      
      {/* apple-look: Sidebar con material translúcido (Liquid Glass) */}
      <aside className="w-64 h-full border-r border-gray-200/50 bg-white/70 backdrop-blur-xl flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">Wiki Azure</h1>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          <div className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Módulos de Seguridad
          </div>
          {wikiData.map((item) => (
            // apple-motion: Interacción fluida y respuesta inmediata al presionar
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab.id === item.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              {item.icon}
              {item.title}
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-12 flex justify-center">
        <div className="max-w-2xl w-full">
          {/* apple-motion: Animación de resorte sin rebote para transiciones limpias */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mt-8"
            >
              <div className="flex items-center gap-3 text-blue-600 mb-5">
                {activeTab.icon}
                <span className="font-medium tracking-wide">{activeTab.title}</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-gray-900">
                {activeTab.title}
              </h2>
              
              {/* apple-look: Legibilidad y contraste en el texto */}
              <p className="text-lg text-gray-600 leading-relaxed">
                {activeTab.content}
              </p>
              
              <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">Ramo: Gestión de Seguridad</span>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
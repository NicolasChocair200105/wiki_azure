import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Server, Lock, BookOpen, Search, 
  ShieldCheck, Key, Tag, Eye, Terminal, FileCheck, Database,
  Moon, Sun, Home, BarChart3, Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

// Datos extendidos y detallados en español
const wikiData = [
  {
    id: 'intro',
    title: 'Introducción a Azure',
    icon: <Server className="w-5 h-5" />,
    tags: ['Cloud', 'Responsabilidad Compartida', 'IaaS / PaaS'],
    content: 'Microsoft Azure es una plataforma integral de computación en la nube. La seguridad en la nube es un esfuerzo conjunto que opera bajo un Modelo de Responsabilidad Compartida: Microsoft asegura la infraestructura física, los hosts y la red base, pero el cliente es responsable de proteger sus datos, endpoints, gestión de identidades y accesos. Comprender esta división es el primer paso crítico para diseñar una arquitectura segura y evitar vulnerabilidades por configuraciones por defecto.'
  },
  {
    id: 'network',
    title: 'Seguridad de Red',
    icon: <Shield className="w-5 h-5" />,
    tags: ['VNet', 'Azure Firewall', 'Anti-DDoS'],
    content: 'La base de la protección cloud comienza en la red. Azure protege las redes mediante la segmentación y aislamiento con Redes Virtuales (VNet). Se complementa con Azure Firewall para filtrado de tráfico con inteligencia de amenazas, y Grupos de Seguridad de Red (NSG) que actúan como cortafuegos básicos a nivel de subred o interfaz de red. Además, incluye protección DDoS Basic por defecto para mitigar ataques volumétricos masivos que buscan denegar el servicio.'
  },
  {
    id: 'identity',
    title: 'Identidad y Acceso (IAM)',
    icon: <Lock className="w-5 h-5" />,
    tags: ['Entra ID', 'MFA', 'Zero Trust'],
    content: 'En la era del teletrabajo y la nube, la identidad es el nuevo perímetro de seguridad. Microsoft Entra ID (anteriormente Azure AD) permite implementar Control de Acceso Basado en Roles (RBAC), otorgando el privilegio mínimo necesario. Se apoya en la arquitectura "Zero Trust" (Confianza Cero): nunca confiar, siempre verificar. La Autenticación Multifactor (MFA) y las políticas de Acceso Condicional son obligatorias para bloquear el 99.9% de los ataques automatizados a cuentas.'
  },
  {
    id: 'defender',
    title: 'Defender for Cloud',
    icon: <ShieldCheck className="w-5 h-5" />,
    tags: ['CSPM', 'CWP', 'Vulnerabilidades'],
    content: 'Un sistema de gestión de postura de seguridad (CSPM) y protección de cargas de trabajo (CWP) nativo de la nube. Defender for Cloud evalúa continuamente tus recursos de Azure, AWS y Google Cloud, entregando un "Secure Score" (Puntuación de Seguridad). Detecta configuraciones erróneas, puertos expuestos y software desactualizado, ofreciendo recomendaciones con un solo clic para remediar los hallazgos y cumplir con normativas internacionales (ISO, SOC, PCI).'
  },
  {
    id: 'keyvault',
    title: 'Azure Key Vault',
    icon: <Key className="w-5 h-5" />,
    tags: ['Criptografía', 'Secretos', 'Certificados'],
    content: 'Escribir contraseñas o cadenas de conexión directamente en el código fuente es un riesgo crítico. Azure Key Vault es un servicio de gestión de secretos que almacena y controla estrictamente el acceso a tokens, contraseñas, certificados y claves criptográficas. Utiliza Módulos de Seguridad de Hardware (HSM) certificados por FIPS, garantizando que ni siquiera Microsoft pueda ver o extraer tus claves maestras.'
  },
  {
    id: 'sentinel',
    title: 'Azure Sentinel (SIEM)',
    icon: <Eye className="w-5 h-5" />,
    tags: ['SIEM', 'SOAR', 'IA'],
    content: 'Azure Sentinel es una solución de Gestión de Eventos e Información de Seguridad (SIEM) y Respuesta Automatizada (SOAR) nativa de la nube. Utiliza inteligencia artificial para analizar petabytes de datos en toda la empresa, correlacionando alertas de diferentes fuentes (firewalls, antivirus, Entra ID) para identificar ciberataques complejos antes de que causen daño, y ejecutar playbooks automáticos para contener la amenaza.'
  },
  {
    id: 'bastion',
    title: 'Azure Bastion',
    icon: <Terminal className="w-5 h-5" />,
    tags: ['PaaS', 'RDP/SSH', 'Acceso Seguro'],
    content: 'Exponer el puerto 3389 (RDP) o el 22 (SSH) a Internet es una de las vulnerabilidades más explotadas. Azure Bastion es un servicio PaaS totalmente administrado que proporciona acceso seguro y sin problemas a tus máquinas virtuales directamente desde el portal de Azure a través de TLS, sin necesidad de asignar direcciones IP públicas a tus servidores.'
  },
  {
    id: 'policy',
    title: 'Azure Policy',
    icon: <FileCheck className="w-5 h-5" />,
    tags: ['Gobernanza', 'Cumplimiento', 'Auditoría'],
    content: 'La seguridad a escala requiere automatización. Azure Policy ayuda a aplicar estándares organizativos y a evaluar el cumplimiento a gran escala. A través de su panel, puedes auditar recursos y forzar reglas, por ejemplo: denegar la creación de recursos que no tengan etiquetas de seguridad, obligar a que las bases de datos estén encriptadas, o restringir en qué regiones geográficas se pueden desplegar los datos.'
  },
  {
    id: 'purview',
    title: 'Microsoft Purview',
    icon: <Database className="w-5 h-5" />,
    tags: ['Gobierno de Datos', 'DLP', 'Clasificación'],
    content: 'Conocer dónde están tus datos sensibles es vital. Microsoft Purview es una solución unificada de gobernanza de datos que te ayuda a gestionar y gobernar tus datos locales, multinube y de software como servicio (SaaS). Crea un mapa holístico del panorama de datos con descubrimiento de datos automatizado, clasificación de información sensible (como tarjetas de crédito o RUTs) y linaje de datos de extremo a extremo.'
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
  { name: 'Ene', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 78 },
  { name: 'Abr', score: 85 },
  { name: 'May', score: 89 },
  { name: 'Jun', score: 94 },
];

// apple-motion: Resorte críticamente amortiguado para transiciones fluidas
const springConfig = { type: "spring", bounce: 0, duration: 0.4 };

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredData = wikiData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeModule = wikiData.find(item => item.id === activeTab);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans antialiased overflow-hidden transition-colors duration-300">
        
        {/* apple-look: Liquid Glass sidebar */}
        <aside className="w-80 h-full border-r border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-2xl flex flex-col z-20 shrink-0">
          <div className="pt-8 pb-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-semibold text-xl tracking-tight">Wiki Azure</h1>
            </div>
            
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
              <Search className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Buscar temas de seguridad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/10 border-transparent rounded-xl py-2 pl-10 pr-3 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('home')}
              className="relative w-full text-left outline-none group mb-6 mt-2"
            >
              {activeTab === 'home' && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-sm"
                  transition={springConfig}
                />
              )}
              <motion.div 
                whileTap={{ scale: 0.97 }}
                className={`relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'home' ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5" />
                Panel Principal de Seguridad
              </motion.div>
            </button>

            <div className="px-3 mb-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Arquitectura de Defensa
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
                        className="absolute inset-0 bg-blue-600 rounded-xl shadow-sm"
                        transition={springConfig}
                      />
                    )}
                    <motion.div 
                      whileTap={{ scale: 0.97 }}
                      className={`relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
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
                No se encontraron módulos
              </div>
            )}
          </nav>
        </aside>

        {/* Área Principal */}
        <main className="flex-1 overflow-y-auto flex flex-col relative pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'home' ? (
              <motion.div
                key="home-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={springConfig}
                className="max-w-6xl w-full mx-auto px-10 pt-12"
              >
                <header className="mb-10">
                  <h2 className="text-4xl font-bold tracking-tight mb-3">Centro de Operaciones de Seguridad (SOC)</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl">
                    Monitoreo en tiempo real de la infraestructura Azure y centro de conocimiento para la implementación de políticas de seguridad Zero Trust.
                  </p>
                </header>

                {/* Métricas y Gráficos Explicados */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  
                  {/* Gráfico 1: Análisis de Tráfico */}
                  <div className="bg-white dark:bg-[#1C1C1E] p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Bloqueo de Amenazas (WAF / DDoS)</h3>
                          <p className="text-xs text-gray-500">Últimos 7 días de tráfico</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-56 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? '#2C2C2E' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
                          />
                          <Bar dataKey="ataques" name="Ataques Registrados" fill={isDarkMode ? '#4B5563' : '#E5E7EB'} radius={[4, 4, 0, 0]} />
                          <Bar dataKey="prevenidos" name="Tráfico Bloqueado" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex gap-3">
                      <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Análisis del Gráfico:</strong> Muestra la efectividad del Web Application Firewall (WAF). Observa que el día Miércoles hubo un pico de 250 ataques volumétricos (barras grises), de los cuales Azure bloqueó exitosamente 248 (barras azules), mitigando el riesgo antes de llegar a los servidores.
                      </p>
                    </div>
                  </div>

                  {/* Gráfico 2: Secure Score */}
                  <div className="bg-white dark:bg-[#1C1C1E] p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-200/60 dark:border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                          <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Evolución del Secure Score</h3>
                          <p className="text-xs text-gray-500">Métrica de Defender for Cloud</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-green-500">94%</div>
                    </div>

                    <div className="h-56 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={complianceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#888' : '#666', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} domain={[50, 100]} tick={{fill: isDarkMode ? '#888' : '#666', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? '#2C2C2E' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
                          />
                          <Line type="monotone" dataKey="score" name="Cumplimiento %" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: isDarkMode ? '#1C1C1E' : '#fff' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex gap-3">
                      <Info className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Análisis del Gráfico:</strong> Representa el porcentaje de cumplimiento de las mejores prácticas de Azure. El crecimiento sostenido desde Enero (65%) hasta Junio (94%) demuestra el cierre exitoso de puertos abiertos y la habilitación de MFA obligatoria en los administradores.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold tracking-tight">Biblioteca de Módulos de Seguridad</h3>
                  <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                    {wikiData.length} Módulos Disponibles
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wikiData.map(module => (
                    <motion.button
                      key={module.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(module.id)}
                      className="text-left bg-white dark:bg-[#1C1C1E] p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-200/60 dark:border-white/10 hover:shadow-lg transition-all"
                    >
                      <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl inline-block text-blue-600 dark:text-blue-400 mb-4">
                        {module.icon}
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{module.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{module.content}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {module.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              // VISTA DE MÓDULO INDIVIDUAL
              <div key="module-view" className="w-full flex justify-center px-10">
                <motion.article
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  transition={springConfig}
                  className="max-w-3xl w-full bg-white dark:bg-[#1C1C1E] rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-200/60 dark:border-white/10 p-12 mt-12"
                >
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
                      {activeModule?.icon}
                    </div>
                    <span className="font-bold tracking-widest uppercase text-xs text-gray-400">
                      Módulo de Estudio • Azure Security
                    </span>
                  </div>
                  
                  <h2 className="text-4xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
                    {activeModule?.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeModule?.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold tracking-wide">
                        <Tag className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-[17px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {activeModule?.content}
                    </p>
                  </div>
                  
                  <div className="mt-14 pt-8 border-t border-gray-100 dark:border-white/10">
                    <motion.button 
                      whileHover={{ x: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('home')}
                      className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors"
                    >
                      ← Volver al Panel de Seguridad
                    </motion.button>
                  </div>
                </motion.article>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Lock, ChevronRight, BookOpen, Search, ShieldCheck, Key, Tag, Database, Activity, FileText } from 'lucide-react';

// Extended data without any Spanish characters to prevent Vercel deployment issues
const wikiData = [
  {
    id: 'intro',
    title: 'Introduction to Azure Security',
    icon: <Server className="w-5 h-5" />,
    tags: ['Cloud', 'Shared Responsibility', 'IaaS / PaaS'],
    content: 'Microsoft Azure is a comprehensive cloud computing platform offering Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Security in Azure operates under a Shared Responsibility Model. While Microsoft is responsible for the physical security of data centers and the underlying infrastructure, the customer must secure their data, endpoints, account identities, and access management. Understanding this model is the first step in designing a secure cloud architecture.'
  },
  {
    id: 'network',
    title: 'Network Security',
    icon: <Shield className="w-5 h-5" />,
    tags: ['VNet', 'Azure Firewall', 'Anti-DDoS'],
    content: 'Network security is the foundation of cloud protection. Azure protects networks through Virtual Networks (VNet) isolation, Azure Firewall, and Network Security Groups (NSGs). NSGs act as virtual firewalls to filter inbound and outbound traffic at the subnet or network interface level. Additionally, Azure provides built-in DDoS Protection Basic for all resources, mitigating volumetric attacks, with an optional Standard tier for advanced machine-learning based mitigation and reporting.'
  },
  {
    id: 'identity',
    title: 'Identity and Access (IAM)',
    icon: <Lock className="w-5 h-5" />,
    tags: ['Entra ID', 'MFA', 'Zero Trust'],
    content: 'Identity is the new security perimeter. Microsoft Entra ID (formerly Azure Active Directory) is the core identity provider. It allows organizations to implement Role-Based Access Control (RBAC), Conditional Access policies, and Multi-Factor Authentication (MFA). Azure strongly advocates for the "Zero Trust" architecture: never trust, always verify. This means explicitly validating every access request based on user identity, location, device health, and risk signals before granting access.'
  },
  {
    id: 'defender',
    title: 'Defender for Cloud',
    icon: <ShieldCheck className="w-5 h-5" />,
    tags: ['CSPM', 'CWP', 'Threat Detection'],
    content: 'Microsoft Defender for Cloud is a unified security management system. It provides Cloud Security Posture Management (CSPM) by continuously assessing your environment and generating a Secure Score with actionable recommendations. It also provides Cloud Workload Protection (CWP) to detect threats across servers, containers, databases, and IoT workloads in real-time, leveraging advanced threat intelligence and machine learning.'
  },
  {
    id: 'keyvault',
    title: 'Azure Key Vault',
    icon: <Key className="w-5 h-5" />,
    tags: ['Cryptography', 'Secrets', 'Certificates'],
    content: 'Hardcoding passwords and API keys in source code is a major security risk. Azure Key Vault solves this by securely storing and tightly controlling access to tokens, passwords, certificates, and cryptographic keys. It uses Hardware Security Modules (HSMs) for highly sensitive keys and integrates seamlessly with Azure applications via Managed Identities, ensuring that credentials never leak into public repositories.'
  },
  {
    id: 'encryption',
    title: 'Data Encryption',
    icon: <Database className="w-5 h-5" />,
    tags: ['Encryption at Rest', 'TLS', 'TDE'],
    content: 'Data protection requires encryption both at rest and in transit. Azure provides Storage Service Encryption (SSE) using 256-bit AES encryption by default for all data written to Azure Storage. For databases, Transparent Data Encryption (TDE) protects Azure SQL against the threat of malicious offline activity. For data in transit, Azure uses industry-standard TLS (Transport Layer Security) protocols to secure data moving between user devices and Microsoft data centers.'
  },
  {
    id: 'sentinel',
    title: 'Azure Sentinel (SIEM)',
    icon: <Activity className="w-5 h-5" />,
    tags: ['SIEM', 'SOAR', 'Log Analytics'],
    content: 'Microsoft Sentinel is a scalable, cloud-native SIEM (Security Information and Event Management) and SOAR (Security Orchestration, Automation, and Response) solution. It delivers intelligent security analytics and threat intelligence across the enterprise. By collecting data from all users, devices, applications, and infrastructure across multiple clouds, Sentinel detects previously uncovered threats and automates rapid incident response.'
  },
  {
    id: 'compliance',
    title: 'Compliance & Governance',
    icon: <FileText className="w-5 h-5" />,
    tags: ['Azure Policy', 'GDPR', 'Blueprints'],
    content: 'Maintaining corporate standards and regulatory compliance in a dynamic cloud environment is challenging. Azure Policy helps enforce organizational standards and assess compliance at scale. You can restrict which regions resources can be deployed to, enforce encryption requirements, and ensure adherence to frameworks like ISO 27001, HIPAA, and GDPR. Azure Blueprints further speeds up the creation of compliant environments by packaging policies, role assignments, and templates.'
  }
];

// apple-motion: Critically damped spring for fluid, zero-bounce transitions
const springConfig = { type: "spring", bounce: 0, duration: 0.4 };

export default function App() {
  const [activeTab, setActiveTab] = useState(wikiData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Search logic
  const filteredData = wikiData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // apple-look: Light neutral background, macOS window style
    <div className="flex h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased overflow-hidden">
      
      {/* apple-look: Liquid Glass sidebar */}
      <aside className="w-80 h-full border-r border-black/5 bg-white/60 backdrop-blur-2xl flex flex-col z-10 shrink-0">
        <div className="pt-8 pb-4 px-5 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-xl shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-semibold text-xl tracking-tight">Azure Security Wiki</h1>
        </div>

        {/* Finder-style Search */}
        <div className="px-4 mb-4">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 border-transparent rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Security Modules
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
                  {/* apple-motion: Active pill layout animation */}
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-pill"
                      className="absolute inset-0 bg-blue-500 rounded-lg shadow-sm"
                      transition={springConfig}
                    />
                  )}
                  
                  {/* apple-motion: Instant tap feedback */}
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
              No results found
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center relative">
        <div className="w-full h-12 flex-shrink-0" />

        <div className="max-w-3xl w-full px-8 pb-12">
          {/* apple-motion: Fluid entry/exit transitions */}
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
              
              {/* apple-look: Typography with tight tracking for large headings */}
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
              
              {/* apple-look: Comfortable leading and contrast for reading */}
              <p className="text-[17px] text-gray-600 leading-relaxed font-normal">
                {activeTab.content}
              </p>
              
              <div className="mt-14 pt-6 border-t border-gray-100 flex items-center justify-between group cursor-pointer">
                <span className="text-sm font-medium text-gray-400 group-hover:text-blue-500 transition-colors">
                  Course: Security Management
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

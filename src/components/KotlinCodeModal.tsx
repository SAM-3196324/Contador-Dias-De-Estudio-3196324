import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Smartphone } from 'lucide-react';
import { KOTLIN_FILES } from '../data/jetpackComposeSource';

interface KotlinCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'mainActivity' | 'theme' | 'buildGradle';

export const KotlinCodeModal: React.FC<KotlinCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('mainActivity');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode = KOTLIN_FILES[activeTab];
  const fileNames: Record<TabType, string> = {
    mainActivity: 'MainActivity.kt',
    theme: 'Theme.kt',
    buildGradle: 'build.gradle.kts',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileNames[activeTab];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl h-[85vh] bg-[#0A0D14] border border-[#00FF88]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden glow-green-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E131E]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base">
                  Código Android en Kotlin & Jetpack Compose
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40">
                  Android 15 Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Listo para compilar en Android Studio con Jetpack Compose y Material 3
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Tabs & Actions Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#0B0E17] border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center gap-2">
            {(['mainActivity', 'theme', 'buildGradle'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {fileNames[tab]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF88]/20 border border-[#00FF88]/40 hover:bg-[#00FF88]/30 text-xs font-semibold text-[#00FF88] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar</span>
            </button>
          </div>
        </div>

        {/* Code Content Viewport */}
        <div className="flex-1 overflow-auto p-4 bg-[#06080D] font-mono text-xs text-slate-300 leading-relaxed no-scrollbar select-text">
          <pre className="whitespace-pre">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-3 bg-[#0A0D15] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#00F0FF]" />
            <span>Guarda en SharedPreferences localmente sin conexión a internet ni publicidad.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

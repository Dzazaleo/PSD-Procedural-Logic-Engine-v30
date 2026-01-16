import React, { ReactNode } from 'react';
import { Handle, Position } from 'reactflow';
import { LucideIcon, Trash2 } from 'lucide-react';
import { useProceduralStore } from '../store/ProceduralContext';

export interface BaseNodeShellProps {
  id?: string; // Optional, only needed if using delete functionality
  title: string;
  subTitle?: string;
  icon: LucideIcon;
  activeColor?: string; // e.g. "emerald", "indigo", "rose"
  headerRight?: ReactNode;
  children: ReactNode;
  isSelected?: boolean;
  minWidth?: number;
  // NEW: Slot injections for handles
  inputs?: ReactNode;
  outputs?: ReactNode;
}

const getColorClasses = (color: string = 'slate') => {
  const map: Record<string, any> = {
    slate: { border: 'border-slate-600', header: 'bg-slate-900', iconBg: 'bg-slate-800', iconText: 'text-slate-400' },
    emerald: { border: 'border-emerald-500', header: 'bg-emerald-900/80', iconBg: 'bg-emerald-500/20', iconText: 'text-emerald-400' },
    indigo: { border: 'border-indigo-500', header: 'bg-indigo-900/80', iconBg: 'bg-indigo-500/20', iconText: 'text-indigo-400' },
    purple: { border: 'border-purple-500', header: 'bg-purple-900/80', iconBg: 'bg-purple-500/20', iconText: 'text-purple-400' },
    rose: { border: 'border-rose-500', header: 'bg-rose-900/80', iconBg: 'bg-rose-500/20', iconText: 'text-rose-400' },
    orange: { border: 'border-orange-500', header: 'bg-orange-900/80', iconBg: 'bg-orange-500/20', iconText: 'text-orange-400' },
  };
  return map[color] || map.slate;
};

export const BaseNodeShell: React.FC<BaseNodeShellProps> = ({
  id,
  title,
  subTitle,
  icon: Icon,
  activeColor = 'slate',
  headerRight,
  children,
  isSelected,
  inputs,
  outputs
}) => {
  const styles = getColorClasses(activeColor);
  const { setNodes } = useProceduralStore(); // Assuming store access or useReactFlow

  // Fallback delete handler if store isn't available in this context
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && window.confirm('Delete this node?')) {
        // We typically use reactFlowInstance.setNodes, but here we emit a custom event or rely on parent
        // For now, visual shell only. Implementation of delete is usually handled by ReactFlow controls.
    }
  };

  return (
    <div 
      className={`
        relative rounded-lg shadow-2xl font-sans flex flex-col transition-all duration-300
        border ${styles.border} ${activeColor === 'slate' ? 'bg-slate-800' : 'bg-slate-900'}
        ${isSelected ? 'ring-2 ring-white/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]' : ''}
      `}
      style={{ minWidth: '300px' }}
    >
      {/* 1. Global Handle Layer (Absolute overlay to prevent layout shift) */}
      {(inputs || outputs) && (
        <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between">
           {/* Inputs Container - Top aligned relative to header */}
           <div className="relative w-full h-0">
              {inputs && <div className="pointer-events-auto">{inputs}</div>}
           </div>
           
           {/* Outputs Container - Bottom aligned */}
           <div className="relative w-full h-full">
              {outputs && <div className="pointer-events-auto">{outputs}</div>}
           </div>
        </div>
      )}

      {/* 2. Standard Header */}
      <div className={`p-2 border-b border-white/5 flex items-center justify-between shrink-0 rounded-t-lg backdrop-blur-sm ${styles.header}`}>
         <div className="flex items-center space-x-3 overflow-hidden">
           <div className={`p-1.5 rounded-md border border-white/10 shadow-inner ${styles.iconBg}`}>
             <Icon className={`w-4 h-4 ${styles.iconText}`} />
           </div>
           <div className="flex flex-col leading-none overflow-hidden">
             <span className={`text-sm font-bold tracking-tight truncate ${activeColor === 'slate' ? 'text-slate-200' : 'text-white'}`}>
                {title}
             </span>
             {subTitle && (
                <span className={`text-[9px] font-mono font-medium tracking-wider uppercase mt-0.5 truncate ${styles.iconText} opacity-80`}>
                    {subTitle}
                </span>
             )}
           </div>
         </div>
         
         <div className="flex items-center space-x-2 pl-2">
            {headerRight}
         </div>
      </div>

      {/* 3. Node Content */}
      <div className="flex flex-col relative">
          {children}
      </div>
    </div>
  );
};

export default BaseNodeShell;
import React, { ReactNode } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface BaseNodeShellProps {
  title: string;
  subTitle?: string;
  headerColor?: string;
  icon?: ReactNode;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
  className?: string;
  inputs?: ReactNode;
  outputs?: ReactNode;
}

const BaseNodeShell: React.FC<BaseNodeShellProps> = ({
  title,
  subTitle,
  headerColor = "bg-slate-900 border-slate-700",
  icon,
  isMinimized = false,
  onToggleMinimize,
  onDelete,
  children,
  className = "",
  inputs,
  outputs
}) => {
  return (
    <div className={`rounded-lg shadow-xl border border-slate-600 bg-slate-800 flex flex-col relative transition-all duration-300 group ${className}`}>
      
      {/* Handles Layer - Rendered absolutely to overlay content without disrupting flow */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {inputs}
        {outputs}
      </div>

      {/* Header */}
      <div className={`p-2 border-b flex items-center justify-between rounded-t-lg transition-all ${headerColor} ${isMinimized ? 'rounded-b-lg border-b-0' : ''}`}>
        <div className="flex items-center space-x-2 overflow-hidden mr-2">
           {icon && <div className="shrink-0">{icon}</div>}
           <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-slate-200 truncate">{title}</span>
              {subTitle && <span className="text-[10px] text-slate-500 font-mono truncate">{subTitle}</span>}
           </div>
        </div>
        
        <div className="flex items-center space-x-1 shrink-0">
           {onToggleMinimize && (
             <button 
               onClick={(e) => { e.stopPropagation(); onToggleMinimize(); }}
               className="nodrag nopan p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200 transition-colors"
               title={isMinimized ? "Expand" : "Minimize"}
             >
               {isMinimized ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
             </button>
           )}
           {onDelete && (
             <button 
               onClick={(e) => { e.stopPropagation(); onDelete(); }}
               className="nodrag nopan p-1 hover:bg-red-900/30 rounded text-slate-500 hover:text-red-400 transition-colors"
               title="Delete Node"
             >
               <X size={14} /> 
             </button>
           )}
        </div>
      </div>

      {/* Body Wrapper */}
      {/* We render children unconditionally to ensure component state is preserved, 
          but hide it via CSS when minimized. 'relative' is needed for absolute positioning contexts inside. */}
      <div className={`flex flex-col relative ${isMinimized ? 'hidden' : 'flex'}`}>
        {children}
      </div>

    </div>
  );
};

export default BaseNodeShell;
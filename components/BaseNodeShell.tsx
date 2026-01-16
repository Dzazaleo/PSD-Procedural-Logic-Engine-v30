
import React, { ReactNode } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export interface BaseNodeShellProps {
  title: string;
  subTitle?: string | ReactNode;
  headerColor?: string;
  icon?: ReactNode;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onDelete?: () => void;
  inputs?: ReactNode;
  outputs?: ReactNode;
  headerActions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const BaseNodeShell: React.FC<BaseNodeShellProps> = ({
  title,
  subTitle,
  headerColor = "bg-slate-900 border-slate-700",
  icon,
  isMinimized = false,
  onToggleMinimize,
  onDelete,
  inputs,
  outputs,
  headerActions,
  children,
  className = ""
}) => {
  return (
    <div className={`rounded-lg shadow-xl border border-slate-600 bg-slate-800 flex flex-row overflow-visible transition-all duration-300 group ${className}`}>
      
      {/* Left Column: Inputs (Always Visible to preserve Edges) */}
      <div className="flex flex-col relative min-w-[10px] z-50">
        {inputs}
      </div>

      {/* Center Column: Header + Body */}
      <div className="flex-1 flex flex-col min-w-[200px] overflow-hidden">
        
        {/* Header */}
        <div className={`p-2 border-b flex items-center justify-between transition-all ${headerColor} ${isMinimized ? 'rounded-lg border-b-0' : 'rounded-t-lg'}`}>
          <div className="flex items-center space-x-2 overflow-hidden mr-2">
             {icon && <div className="shrink-0">{icon}</div>}
             <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-slate-200 truncate">{title}</span>
                {subTitle && (
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    {subTitle}
                  </span>
                )}
             </div>
          </div>
          
          <div className="flex items-center space-x-1 shrink-0">
             {headerActions}
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

        {/* Body (Collapsible) */}
        <div className={`flex flex-col bg-slate-800 transition-all ${isMinimized ? 'hidden' : 'flex'}`}>
            {children}
        </div>
      </div>

      {/* Right Column: Outputs (Always Visible to preserve Edges) */}
      <div className="flex flex-col relative min-w-[10px] z-50">
        {outputs}
      </div>

    </div>
  );
};

export default BaseNodeShell;

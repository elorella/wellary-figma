import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Calendar, MessageCircle, CreditCard, ListChecks } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activePage?: string;
  onPageChange?: (page: string) => void;
}

export function Sidebar({ isCollapsed, onToggle, activePage, onPageChange }: SidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-border transition-all duration-300 flex flex-col z-50 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Logo icon - abstract wellness symbol */}
              <circle cx="12" cy="16" r="10" fill="url(#wellary-gradient)" />
              <path d="M12 9 C12 9, 16 13, 16 16 C16 19, 12 23, 12 23 C12 23, 8 19, 8 16 C8 13, 12 9, 12 9" fill="white" fillOpacity="0.9" />
              
              {/* Text: Wellary */}
              <text x="28" y="21" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="700" fill="#1f2937" letterSpacing="-0.5">
                Wellary
              </text>
              
              <defs>
                <linearGradient id="wellary-gradient" x1="2" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {isCollapsed && (
          <div className="mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="url(#wellary-gradient-small)" />
              <path d="M12 7 C12 7, 15 10, 15 12 C15 14, 12 17, 12 17 C12 17, 9 14, 9 12 C9 10, 12 7, 12 7" fill="white" fillOpacity="0.9" />
              <defs>
                <linearGradient id="wellary-gradient-small" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="p-2 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={`w-full rounded-xl hover:bg-gray-100 ${isCollapsed ? 'justify-center' : 'justify-start'}`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" strokeWidth={2} />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          <Button
            variant="ghost"
            onClick={() => onPageChange && onPageChange('home')}
            className={`w-full rounded-xl hover:bg-gray-100 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            } ${activePage === 'home' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}`}
          >
            <Home className="w-5 h-5" strokeWidth={2} />
            {!isCollapsed && <span className="ml-3">Home</span>}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onPageChange && onPageChange('fruid-exchange')}
            className={`w-full rounded-xl hover:bg-gray-100 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            } ${activePage === 'fruid-exchange' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}`}
          >
            <ListChecks className="w-5 h-5" strokeWidth={2} />
            {!isCollapsed && <span className="ml-3">Fruid Exchange list</span>}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onPageChange && onPageChange('appointments')}
            className={`w-full rounded-xl hover:bg-gray-100 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            } ${activePage === 'appointments' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}`}
          >
            <Calendar className="w-5 h-5" strokeWidth={2} />
            {!isCollapsed && <span className="ml-3">Appointments</span>}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onPageChange && onPageChange('reach_out')}
            className={`w-full rounded-xl hover:bg-gray-100 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            } ${activePage === 'reach_out' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}`}
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2} />
            {!isCollapsed && <span className="ml-3">Reach out to Nazli</span>}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => onPageChange && onPageChange('payment_history')}
            className={`w-full rounded-xl hover:bg-gray-100 ${
              isCollapsed ? 'justify-center px-2' : 'justify-start'
            } ${activePage === 'payment_history' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}`}
          >
            <CreditCard className="w-5 h-5" strokeWidth={2} />
            {!isCollapsed && <span className="ml-3">Payment History</span>}
          </Button>
        </div>
      </nav>
    </div>
  );
}
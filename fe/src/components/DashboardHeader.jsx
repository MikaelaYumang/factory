import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Factory, LogOut } from 'lucide-react';

export default function DashboardHeader({ onLogout }) {
  return (
    <div className="bg-white border-b-4 border-blue-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl">
              <Factory className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">FACTORY CONTROL CENTER</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <Badge className="bg-green-100 text-green-700 border-green-300 text-xs font-bold">● LIVE</Badge>
                <span className="text-xs text-slate-500 font-medium">SDG 9 • Resource Efficiency</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={onLogout} 
            variant="outline" 
            className="gap-2 border-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

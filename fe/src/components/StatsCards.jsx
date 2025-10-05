import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, TrendingUp, Award, Trophy } from 'lucide-react';
import { calculateEfficiency } from '../utils/calculations';

export default function StatsCards({ machines, sortedMachines }) {
  const avgEfficiency = machines.length > 0
    ? (machines.reduce((sum, m) => sum + parseFloat(calculateEfficiency(m)), 0) / machines.length).toFixed(2)
    : '0.00';

  const totalOutput = machines.reduce((sum, m) => sum + m.outputUnits, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-blue-600 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Machines</p>
              <p className="text-4xl font-black text-slate-800 mt-1">{machines.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-600 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg Efficiency</p>
              <p className="text-4xl font-black text-slate-800 mt-1">{avgEfficiency}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-orange-600 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Output</p>
              <p className="text-4xl font-black text-slate-800 mt-1">{totalOutput.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-purple-600 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Top Performer</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{sortedMachines[0]?.worker || 'N/A'}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <Trophy className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
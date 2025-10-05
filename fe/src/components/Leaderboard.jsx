import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Droplet, Package, Edit2, Trash2 } from 'lucide-react';
import { calculateEfficiency } from '../utils/calculations';

export default function Leaderboard({ sortedMachines, onEdit, onDelete }) {
  return (
    <Card className="mb-6 border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
              <Trophy className="w-7 h-7 text-yellow-500" />
              EFFICIENCY LEADERBOARD
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1 font-medium">
              Machines ranked by efficiency score (Output ÷ Resources Used)
            </CardDescription>
          </div>
          <Badge className="bg-blue-600 text-white px-3 py-1 text-sm font-bold">
            LIVE RANKING
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {sortedMachines.map((machine, index) => {
            const efficiency = calculateEfficiency(machine);
            const isTopPerformer = index < 3;
            
            return (
              <div
                key={machine.id}
                className={`p-5 rounded-xl border-2 transition-all ${
                  isTopPerformer 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-black text-lg border-2 ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900 border-yellow-500' :
                      index === 1 ? 'bg-slate-300 text-slate-800 border-slate-400' :
                      index === 2 ? 'bg-orange-500 text-white border-orange-600' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-black text-xl text-slate-800">{machine.name}</h3>
                        {isTopPerformer && (
                          <Badge className="bg-green-600 text-white font-bold">★ TOP</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Operator: <span className="font-semibold text-blue-600">{machine.worker}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <span className="text-base font-bold text-slate-800">{machine.energyUsage.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">kWh</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5">
                        <Droplet className="w-5 h-5 text-blue-500" />
                        <span className="text-base font-bold text-slate-800">{machine.waterUsage.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">Liters</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-5 h-5 text-purple-500" />
                        <span className="text-base font-bold text-slate-800">{machine.outputUnits}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">Units</span>
                    </div>
                    <div className="text-center min-w-[110px] p-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                      <p className="text-3xl font-black text-green-600">{efficiency}</p>
                      <p className="text-xs text-slate-600 font-bold uppercase tracking-wide mt-1">Score</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onEdit(machine)}
                        className="gap-1 border-2"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDelete(machine.id)}
                        className="gap-1 border-2 text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
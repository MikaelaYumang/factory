import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Droplet, Package, Edit2, Trash2, ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { calculateEfficiency } from '../utils/calculations';

export default function Leaderboard({ sortedMachines, onEdit, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Card className="mb-6 border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-3 text-xl md:text-2xl text-slate-800">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
              EFFICIENCY LEADERBOARD
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1 font-medium text-xs md:text-sm">
              Machines ranked by efficiency score (Output ÷ Resources Used)
            </CardDescription>
          </div>
          <Badge className="bg-blue-600 text-white px-3 py-1 text-xs md:text-sm font-bold w-fit">
            LIVE RANKING
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
        <div className="space-y-3">
          {sortedMachines.map((machine, index) => {
            const efficiency = calculateEfficiency(machine);
            const isTopPerformer = index < 3;
            const totalResources = machine.energyUsage + machine.waterUsage;
            const isExpanded = expandedId === machine.id;
            
            return (
              <div
                key={machine.id}
                className={`p-3 md:p-5 rounded-xl border-2 transition-all ${
                  isTopPerformer 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-black text-base border-2 flex-shrink-0 ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900 border-yellow-500' :
                        index === 1 ? 'bg-slate-300 text-slate-800 border-slate-400' :
                        index === 2 ? 'bg-orange-500 text-white border-orange-600' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-base text-slate-800 truncate">{machine.name}</h3>
                          {isTopPerformer && (
                            <Badge className="bg-green-600 text-white font-bold text-xs">★ TOP</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 truncate">
                          Operator: <span className="font-semibold text-blue-600">{machine.worker}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center ml-2">
                      <p className="text-2xl font-black text-green-600">{efficiency}</p>
                      <p className="text-xs text-slate-600 font-bold uppercase">Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-slate-50 rounded-lg">
                      <Zap className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <span className="text-sm font-bold text-slate-800 block">{machine.energyUsage.toFixed(1)}</span>
                      <span className="text-xs text-slate-500">kWh</span>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-lg">
                      <Droplet className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                      <span className="text-sm font-bold text-slate-800 block">{machine.waterUsage.toFixed(1)}</span>
                      <span className="text-xs text-slate-500">Liters</span>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-lg">
                      <Package className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                      <span className="text-sm font-bold text-slate-800 block">{machine.outputUnits}</span>
                      <span className="text-xs text-slate-500">Units</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleExpand(machine.id)}
                      className="gap-1 border-2 hover:bg-blue-50 hover:border-blue-300 flex-1"
                      title="View calculation"
                    >
                      <Calculator className="w-3 h-3 text-blue-600" />
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
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

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
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
                  
                  <div className="flex items-center gap-6">
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
                        onClick={() => toggleExpand(machine.id)}
                        className="gap-1.5 border-2 hover:bg-blue-50 hover:border-blue-300 px-3"
                        title="View calculation breakdown"
                      >
                        <Calculator className="w-4 h-4 text-blue-600" />
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onEdit(machine)}
                        className="gap-1 border-2 px-3"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDelete(machine.id)}
                        className="gap-1 border-2 text-red-600 hover:bg-red-50 border-red-200 px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* CALCULATION BREAKDOWN SECTION - Responsive */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t-2 border-slate-300 bg-white/50 rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <Calculator className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      <h4 className="font-black text-xs md:text-sm text-slate-800 uppercase">Efficiency Score Calculation</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      {/* Step 1: Total Resources */}
                      <div className="bg-white p-3 md:p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                        <p className="text-xs font-bold text-blue-600 uppercase mb-2 md:mb-3">Step 1: Total Resources</p>
                        <div className="space-y-2 text-xs md:text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Energy Usage:</span>
                            <span className="font-bold text-slate-800">{machine.energyUsage.toFixed(2)} kWh</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Water Usage:</span>
                            <span className="font-bold text-slate-800">{machine.waterUsage.toFixed(2)} L</span>
                          </div>
                          <div className="pt-2 border-t-2 border-blue-100 flex justify-between items-center">
                            <span className="font-bold text-slate-700">Total:</span>
                            <span className="font-black text-blue-600 text-base md:text-lg">{totalResources.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Formula */}
                      <div className="bg-white p-3 md:p-4 rounded-lg border-2 border-purple-200 shadow-sm">
                        <p className="text-xs font-bold text-purple-600 uppercase mb-2 md:mb-3">Step 2: Formula</p>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-xs md:text-sm text-slate-600 mb-2">Efficiency Score =</p>
                          <div className="border-2 border-purple-300 rounded-lg p-2 md:p-3 bg-purple-50 w-full">
                            <p className="text-center text-base md:text-lg font-black text-purple-700">Output Units</p>
                            <div className="border-t-2 border-purple-300 my-1 md:my-2"></div>
                            <p className="text-center text-base md:text-lg font-black text-purple-700">Total Resources</p>
                          </div>
                          <p className="text-xs md:text-sm text-slate-500 mt-2 md:mt-3 font-mono bg-slate-100 px-2 md:px-3 py-1 rounded">
                            {machine.outputUnits} ÷ {totalResources.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Step 3: Final Score */}
                      <div className="bg-white p-3 md:p-4 rounded-lg border-2 border-green-200 shadow-sm">
                        <p className="text-xs font-bold text-green-600 uppercase mb-2 md:mb-3">Step 3: Your Score</p>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-4xl md:text-5xl font-black text-green-600 mb-2">{efficiency}</p>
                          <p className="text-xs md:text-sm text-slate-600 font-semibold">Units per Resource</p>
                          <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t-2 border-green-100 w-full text-center">
                            <p className="text-xs md:text-sm font-bold">
                              {efficiency > 15 ? '🏆 Excellent!' : 
                               efficiency > 10 ? '⭐ Good Job!' : 
                               '💪 Keep Improving!'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-3 md:mt-4 p-2 md:p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-xs md:text-sm text-slate-700">
                        <strong>💡 Tip:</strong> Increase output units while maintaining or reducing energy and water usage for a higher efficiency score.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
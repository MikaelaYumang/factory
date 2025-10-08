import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { calculateEfficiency } from '../utils/calculations';

export default function WorkerRecognition({ sortedMachines }) {
  const colors = [
    { border: 'border-l-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-600', icon: 'text-yellow-600' },
    { border: 'border-l-blue-600', bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
    { border: 'border-l-green-600', bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' },
    { border: 'border-l-orange-600', bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-600' },
    { border: 'border-l-purple-600', bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' }
  ];

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <Award className="w-7 h-7 text-blue-600" />
          WORKER RECOGNITION BOARD
        </h2>
        <p className="text-sm text-slate-600 font-medium mt-1">
          Top 5 operators maintaining peak machine efficiency
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sortedMachines.slice(0, 5).map((machine, index) => {
          const color = colors[index];
          return (
            <Card key={machine.id} className={`border-l-4 ${color.border} shadow-md`}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 ${color.bg} rounded-xl mb-3`}>
                    <div className={`w-8 h-8 flex items-center justify-center font-black text-2xl ${color.text}`}>
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    {index === 0 ? '🏆 TOP PERFORMER' : `RANK ${index + 1}`}
                  </p>
                  <p className="text-lg font-black text-slate-800 mb-1">{machine.worker}</p>
                  <p className="text-xs text-slate-500 mb-3">{machine.name}</p>
                  <div className="pt-3 border-t-2 border-slate-100 w-full">
                    <p className={`text-3xl font-black ${color.text}`}>{calculateEfficiency(machine)}</p>
                    <p className="text-xs text-slate-600 font-bold uppercase tracking-wide mt-1">Efficiency Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
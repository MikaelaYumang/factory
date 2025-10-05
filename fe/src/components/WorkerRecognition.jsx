import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { calculateEfficiency } from '../utils/calculations';

export default function WorkerRecognition({ sortedMachines }) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
      <CardHeader className="border-b-2 border-purple-200">
        <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
          <Award className="w-7 h-7 text-purple-600" />
          WORKER RECOGNITION BOARD
        </CardTitle>
        <CardDescription className="text-slate-700 font-medium mt-1">
          Top 5 operators maintaining peak machine efficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {sortedMachines.slice(0, 5).map((machine, index) => (
            <div key={machine.id} className="text-center p-5 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
              <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center font-black text-xl border-2 ${
                index === 0 ? 'bg-yellow-400 text-yellow-900 border-yellow-500' : 
                'bg-purple-100 text-purple-700 border-purple-300'
              }`}>
                {index + 1}
              </div>
              <p className="font-bold text-slate-800 mb-1">{machine.worker}</p>
              <p className="text-xs text-slate-500 mb-3">{machine.name}</p>
              <div className="pt-3 border-t-2 border-purple-100">
                <p className="text-2xl font-black text-purple-600">{calculateEfficiency(machine)}</p>
                <p className="text-xs text-slate-600 font-bold uppercase tracking-wide mt-1">Efficiency</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Droplet, Package, Info } from 'lucide-react';

export default function AboutSection() {
  return (
    <Card className="mb-6 border-2 shadow-lg">

      <CardContent className="pt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-black text-lg text-slate-800 mb-3">What We Monitor</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time tracking of factory machines to monitor resource consumption and production output. The system calculates efficiency scores to identify top performers and areas needing improvement.
            </p>
          </div>

          <div>
            <h3 className="font-black text-lg text-slate-800 mb-3">How It Helps</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Optimize operations, reduce waste, and recognize efficient workers through data-driven insights. Make informed decisions to improve overall factory performance and resource management.
            </p>
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-xl border-2 border-slate-200">
          <h3 className="font-black text-base text-slate-800 mb-4">Key Metrics:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-500" />
              <div>
                <p className="font-bold text-sm text-slate-800">Energy Usage</p>
                <p className="text-xs text-slate-600">Measured in kWh</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplet className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-bold text-sm text-slate-800">Water Consumption</p>
                <p className="text-xs text-slate-600">Measured in Liters</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-bold text-sm text-slate-800">Output Units</p>
                <p className="text-xs text-slate-600">Production quantity</p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
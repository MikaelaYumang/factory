import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddMachineForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    worker: ''
  });

  return (
    <Card className="mb-6 border-2 border-blue-200 shadow-md">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-slate-800">Add New Machine</CardTitle>
        <CardDescription className="text-slate-600 mt-2">
          Enter machine name and assign a worker. Sensor data will be automatically initialized.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-slate-700">Machine Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., CNC Machine A1"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-slate-700">Worker Name</Label>
            <Input
              value={formData.worker}
              onChange={(e) => setFormData({...formData, worker: e.target.value})}
              placeholder="e.g., Juan Dela Cruz"
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <strong>Note:</strong> Energy usage, water usage, and output data will be automatically read from IoT sensors once the machine is connected.
          </p>
        </div>
        <div className="flex gap-2 mt-6">
          <Button 
            onClick={() => onSubmit(formData)} 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={!formData.name || !formData.worker}
          >
            Add Machine
          </Button>
          <Button onClick={onCancel} variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

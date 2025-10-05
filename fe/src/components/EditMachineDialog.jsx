import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EditMachineDialog({ machine, open, onClose, onUpdate }) {
  const [formData, setFormData] = useState(machine || { name: '', worker: '' });

  useEffect(() => {
    if (machine) {
      setFormData(machine);
    }
  }, [machine]);

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Machine</AlertDialogTitle>
          <AlertDialogDescription>
            Update machine name and worker assignment. Sensor data is read-only.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Machine Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., CNC Machine A1"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Worker Name</Label>
            <Input
              value={formData.worker}
              onChange={(e) => setFormData({...formData, worker: e.target.value})}
              placeholder="e.g., Juan Dela Cruz"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-500">Energy Usage (kWh)</Label>
            <Input
              type="number"
              value={formData.energyUsage?.toFixed(1)}
              disabled
              className="bg-slate-50"
            />
            <p className="text-xs text-slate-500">Read from sensor</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-500">Water Usage (L)</Label>
            <Input
              type="number"
              value={formData.waterUsage?.toFixed(1)}
              disabled
              className="bg-slate-50"
            />
            <p className="text-xs text-slate-500">Read from sensor</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-500">Output Units</Label>
            <Input
              type="number"
              value={formData.outputUnits}
              disabled
              className="bg-slate-50"
            />
            <p className="text-xs text-slate-500">Read from sensor</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            Update Machine
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
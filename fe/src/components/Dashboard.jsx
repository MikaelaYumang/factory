import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import AddMachineForm from './AddMachineForm';
import Leaderboard from './Leaderboard';
import WorkerRecognition from './WorkerRecognition';
import EditMachineDialog from './EditMachineDialog';
import { calculateEfficiency } from '../utils/calculations';

export default function Dashboard({ machines, onLogout, onAddMachine, onUpdateMachine, onDeleteMachine }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);

  const sortedMachines = [...machines].sort((a, b) => 
    calculateEfficiency(b) - calculateEfficiency(a)
  );

  const handleEdit = (machine) => {
    setEditingMachine(machine);
    setIsEditing(true);
  };

  const handleUpdate = (updatedMachine) => {
    onUpdateMachine(updatedMachine);
    setIsEditing(false);
    setEditingMachine(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMachine(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader onLogout={onLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md flex items-center gap-2"
          >
            <span>+</span>
            ADD NEW MACHINE
          </button>
          <div className="text-sm text-slate-600">
            Last Update: <span className="font-mono font-semibold text-blue-600">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {showAddForm && (
          <AddMachineForm
            onSubmit={(machine) => {
              onAddMachine(machine);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <EditMachineDialog
          machine={editingMachine}
          open={isEditing}
          onClose={handleCancelEdit}
          onUpdate={handleUpdate}
        />

        <StatsCards machines={machines} sortedMachines={sortedMachines} />

        <Leaderboard 
          sortedMachines={sortedMachines}
          onEdit={handleEdit}
          onDelete={onDeleteMachine}
        />

        <WorkerRecognition sortedMachines={sortedMachines} />
      </div>
    </div>
  );
}
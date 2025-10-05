import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { Toaster } from './components/ui/toaster';
import { initialMachines } from './data/mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [machines, setMachines] = useState(initialMachines);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      setMachines(prev => prev.map(machine => ({
        ...machine,
        energyUsage: machine.energyUsage + (Math.random() - 0.5) * 2,
        waterUsage: machine.waterUsage + (Math.random() - 0.5) * 0.5,
        outputUnits: machine.outputUnits + Math.floor(Math.random() * 10)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddMachine = (newMachine) => {
    const machine = {
      ...newMachine,
      id: Math.max(...machines.map(m => m.id)) + 1,
      status: 'active',
      energyUsage: Math.random() * 50 + 30,
      waterUsage: Math.random() * 20 + 5,
      outputUnits: Math.floor(Math.random() * 800 + 400)
    };
    setMachines([...machines, machine]);
  };

  const handleUpdateMachine = (updatedMachine) => {
    setMachines(machines.map(m => m.id === updatedMachine.id ? updatedMachine : m));
  };

  const handleDeleteMachine = (id) => {
    setMachines(machines.filter(m => m.id !== id));
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard
          machines={machines}
          onLogout={handleLogout}
          onAddMachine={handleAddMachine}
          onUpdateMachine={handleUpdateMachine}
          onDeleteMachine={handleDeleteMachine}
        />
      )}
      <Toaster />
    </>
  );
}
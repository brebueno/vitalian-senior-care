
import React from 'react';
import Navbar from '@/components/Navbar';
import MedicationSchedule from '@/components/MedicationSchedule';
import MedicationList from '@/components/MedicationList';
import EmergencyButton from '@/components/EmergencyButton';
import AnimatedTransition from '@/components/AnimatedTransition';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-4">
        <AnimatedTransition>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">VitaCheck</h1>
            <ThemeToggle />
          </div>
          <MedicationSchedule />
          <MedicationList />
          <div className="fixed bottom-6 right-6">
            <EmergencyButton />
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Index;

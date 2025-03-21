
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pill, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

const PERIODS = ['Manhã', 'Meio-dia', 'Noite', 'Suplente'];
const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

const COLORS = {
  'Manhã': 'bg-cyan-200 border-cyan-300',
  'Meio-dia': 'bg-blue-200 border-blue-300',
  'Noite': 'bg-purple-200 border-purple-300',
  'Suplente': 'bg-pink-200 border-pink-300'
};

const HEADER_COLORS = {
  'Manhã': 'bg-yellow-300 border-yellow-400',
  'Meio-dia': 'bg-cyan-300 border-cyan-400',
  'Noite': 'bg-purple-300 border-purple-400',
  'Suplente': 'bg-pink-300 border-pink-400'
};

interface ScheduleItem {
  id: string;
  day: number;
  period: string;
  medication?: string;
}

const MedicationSchedule = () => {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState(0);
  
  const handlePrevWeek = () => {
    setCurrentWeek(prev => prev - 1);
  };
  
  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
  };
  
  const toggleView = () => {
    setView(prev => prev === 'week' ? 'month' : 'week');
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">Organização Semanal</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleView}>
            {view === 'week' ? 'Ver Mensal' : 'Ver Semanal'}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrevWeek}>
            <ArrowLeft size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <AnimatedTransition>
        <div className="overflow-x-auto rounded-xl shadow-md bg-white/70 backdrop-blur-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]"></TableHead>
                {DAYS.map((day, index) => (
                  <TableHead key={day} className={cn("text-center py-2 px-2 font-bold text-foreground", HEADER_COLORS['Manhã'])}>
                    <div className="text-xs">{day}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERIODS.map((period, periodIdx) => (
                <TableRow key={period}>
                  <TableCell className={cn("font-medium", COLORS[period])}>
                    {period}
                  </TableCell>
                  {DAYS.map((day, dayIdx) => (
                    <TableCell key={`${period}-${day}`} className={cn("p-0 h-16 relative", COLORS[period])}>
                      <button 
                        className="w-full h-full flex items-center justify-center hover:bg-black/5 transition-colors"
                        onClick={() => {/* Open add medication dialog */}}
                      >
                        <Plus size={16} className="text-gray-500" />
                      </button>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MedicationSchedule;

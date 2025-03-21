
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pill, Plus, ArrowLeft, ArrowRight, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

const PERIODS = ['Manhã', 'Meio-dia', 'Noite', 'Suplente'];
const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

const COLORS = {
  'Manhã': 'bg-cyan-200 border-cyan-300 dark:bg-cyan-900 dark:border-cyan-800',
  'Meio-dia': 'bg-blue-200 border-blue-300 dark:bg-blue-900 dark:border-blue-800',
  'Noite': 'bg-purple-200 border-purple-300 dark:bg-purple-900 dark:border-purple-800',
  'Suplente': 'bg-pink-200 border-pink-300 dark:bg-pink-900 dark:border-pink-800'
};

const HEADER_COLORS = {
  'Manhã': 'bg-yellow-300 border-yellow-400 dark:bg-yellow-800 dark:border-yellow-700',
  'Meio-dia': 'bg-cyan-300 border-cyan-400 dark:bg-cyan-800 dark:border-cyan-700',
  'Noite': 'bg-purple-300 border-purple-400 dark:bg-purple-800 dark:border-purple-700',
  'Suplente': 'bg-pink-300 border-pink-400 dark:bg-pink-800 dark:border-pink-700'
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
  const [is3D, setIs3D] = useState(false);
  
  const handlePrevWeek = () => {
    setCurrentWeek(prev => prev - 1);
  };
  
  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
  };
  
  const toggleView = () => {
    setView(prev => prev === 'week' ? 'month' : 'week');
  };

  const toggle3D = () => {
    setIs3D(prev => !prev);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">Organização Semanal</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggle3D}>
            {is3D ? <Square size={16} /> : <Pill size={16} />}
          </Button>
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
        <div className={cn(
          "overflow-x-auto rounded-xl shadow-md bg-white/70 backdrop-blur-md dark:bg-black/40 dark:backdrop-blur-md dark:border dark:border-gray-800",
          is3D && "transform-style-3d perspective-1000"
        )}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]"></TableHead>
                {DAYS.map((day, index) => (
                  <TableHead 
                    key={day} 
                    className={cn(
                      "text-center py-2 px-2 font-bold text-foreground", 
                      HEADER_COLORS['Manhã'],
                      is3D && "transform rotate-x-10 translate-z-4 shadow-lg"
                    )}
                  >
                    <div className="text-xs">{day}</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERIODS.map((period, periodIdx) => (
                <TableRow key={period}>
                  <TableCell 
                    className={cn(
                      "font-medium", 
                      COLORS[period],
                      is3D && "transform translate-z-2"
                    )}
                  >
                    {period}
                  </TableCell>
                  {DAYS.map((day, dayIdx) => (
                    <TableCell 
                      key={`${period}-${day}`} 
                      className={cn(
                        "p-0 h-16 relative", 
                        COLORS[period],
                        is3D && "transform translate-z-4 hover:translate-z-8 transition-transform duration-300"
                      )}
                    >
                      <button 
                        className={cn(
                          "w-full h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                          is3D && "hover:shadow-xl"
                        )}
                        onClick={() => {/* Open add medication dialog */}}
                      >
                        <Plus size={16} className="text-gray-500 dark:text-gray-400" />
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


import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

// Mock data for medications
const MOCK_MEDICATIONS = [
  { id: 1, name: 'Losartana', time: '08:00', color: 'bg-blue-500' },
  { id: 2, name: 'Atorvastatina', time: '10:00', color: 'bg-green-500' },
  { id: 3, name: 'Metformina', time: '13:00', color: 'bg-yellow-500' },
  { id: 4, name: 'Omeprazol', time: '19:00', color: 'bg-purple-500' },
  { id: 5, name: 'AAS', time: '22:00', color: 'bg-red-500' },
];

interface MedicationEvent {
  id: number;
  name: string;
  time: string;
  color: string;
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate days of the week
  const generateWeekDays = (date: Date) => {
    const startDate = startOfWeek(date, { locale: pt });
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDate, i));
    }
    
    return days;
  };
  
  const weekDays = generateWeekDays(currentDate);
  
  // Navigate to previous or next week
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };
  
  // Get medications for selected date (mock data)
  const getMedicationsForDate = (date: Date): MedicationEvent[] => {
    // In a real app, this would filter based on actual date
    return MOCK_MEDICATIONS;
  };
  
  const selectedDayMedications = getMedicationsForDate(selectedDate);

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <AnimatedTransition>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">Calendário de Medicamentos</h2>
            
            {/* Calendar navigation */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigateWeek('prev')}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-lg font-medium">
                {format(weekDays[0], "MMMM yyyy", { locale: pt })}
              </h3>
              <button 
                onClick={() => navigateWeek('next')}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Days of the week */}
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, index) => {
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg transition-all",
                      isSelected ? "bg-primary text-primary-foreground" : 
                      isToday ? "bg-primary/10 text-primary" : 
                      "hover:bg-secondary"
                    )}
                  >
                    <span className="text-xs uppercase">{format(day, 'EEE', { locale: pt })}</span>
                    <span className="text-xl font-semibold mt-1">{format(day, 'd')}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Selected day medications */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Medicamentos para {format(selectedDate, 'dd/MM/yyyy', { locale: pt })}
              </h3>
              
              <div className="glass-panel rounded-xl p-4 divide-y divide-border">
                {selectedDayMedications.length > 0 ? (
                  selectedDayMedications.map((med) => (
                    <div key={med.id} className="py-3 flex items-center">
                      <div className={cn("w-4 h-4 rounded-full mr-3", med.color)} />
                      <div className="flex-1">
                        <p className="font-medium">{med.name}</p>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock size={16} className="mr-1" />
                        <span>{med.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    Não há medicamentos agendados para esta data.
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </section>
  );
};

export default CalendarView;

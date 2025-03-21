
import React, { useState } from 'react';
import { Search, Plus, AlertTriangle, Check, Clock, X } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  stock: number;
  lowStock: boolean;
  nextDose: string;
  taken: boolean;
}

// Mock data for medications
const MOCK_MEDICATIONS: Medication[] = [
  { 
    id: 1, 
    name: 'Losartana', 
    dosage: '50mg', 
    frequency: '1x ao dia', 
    stock: 20, 
    lowStock: false,
    nextDose: '08:00', 
    taken: true 
  },
  { 
    id: 2, 
    name: 'Atorvastatina', 
    dosage: '20mg', 
    frequency: '1x ao dia', 
    stock: 5, 
    lowStock: true,
    nextDose: '10:00', 
    taken: false 
  },
  { 
    id: 3, 
    name: 'Metformina', 
    dosage: '500mg', 
    frequency: '2x ao dia', 
    stock: 30, 
    lowStock: false,
    nextDose: '13:00', 
    taken: false 
  },
  { 
    id: 4, 
    name: 'Omeprazol', 
    dosage: '20mg', 
    frequency: '1x ao dia', 
    stock: 15, 
    lowStock: false,
    nextDose: '19:00', 
    taken: false 
  },
  { 
    id: 5, 
    name: 'AAS', 
    dosage: '100mg', 
    frequency: '1x ao dia', 
    stock: 3, 
    lowStock: true,
    nextDose: '22:00', 
    taken: false 
  },
];

const MedicationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  
  // Filter medications based on search term
  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Mark medication as taken
  const markAsTaken = (id: number) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    );
  };

  return (
    <section className="pb-24">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Medicamentos de Hoje</h2>
        <Button size="sm" variant="outline">
          <Plus size={16} className="mr-1" />
          Adicionar
        </Button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Buscar medicamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      {/* Medication list */}
      <div className="grid grid-cols-1 gap-3">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((med) => (
            <div 
              key={med.id} 
              className={cn(
                "glass-card p-3 flex items-center justify-between transition-all",
                med.taken && "opacity-70"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  med.taken ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                )}>
                  {med.taken ? <Check size={18} /> : <Clock size={18} />}
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{med.name}</h3>
                    {med.lowStock && (
                      <div className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full flex items-center text-xs">
                        <AlertTriangle size={12} className="mr-1" />
                        Estoque baixo
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {med.dosage} · {med.frequency} · {med.nextDose}
                  </p>
                </div>
              </div>
              
              {!med.taken ? (
                <Button 
                  onClick={() => markAsTaken(med.id)}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8"
                >
                  <Check size={14} className="mr-1" />
                  Tomado
                </Button>
              ) : (
                <span className="text-xs text-green-600 font-medium">Tomado hoje</span>
              )}
            </div>
          ))
        ) : (
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground">Nenhum medicamento encontrado.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicationList;

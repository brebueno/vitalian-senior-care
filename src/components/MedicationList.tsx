
import React, { useState } from 'react';
import { Search, Plus, AlertTriangle, Check } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

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
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <AnimatedTransition>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">Medicamentos para Hoje</h2>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar medicamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <button className="inline-flex items-center justify-center rounded-lg font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
                  <Plus size={18} className="mr-2" />
                  Adicionar
                </button>
              </div>
            </div>
            
            {/* Medication list */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              {filteredMedications.length > 0 ? (
                filteredMedications.map((med) => (
                  <div 
                    key={med.id} 
                    className={cn(
                      "glass-card p-4 flex items-center justify-between transition-all",
                      med.taken && "opacity-70"
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          med.taken ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                        )}>
                          {med.taken ? <Check size={20} /> : med.nextDose}
                        </div>
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
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} · {med.frequency} · Estoque: {med.stock}
                        </p>
                      </div>
                    </div>
                    
                    {!med.taken && (
                      <button 
                        onClick={() => markAsTaken(med.id)}
                        className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Marcar como tomado
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground">Nenhum medicamento encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </section>
  );
};

export default MedicationList;

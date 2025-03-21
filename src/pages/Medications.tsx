
import React from 'react';
import Navbar from '@/components/Navbar';
import MedicationList from '@/components/MedicationList';
import EmergencyButton from '@/components/EmergencyButton';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Pill, Info, AlertTriangle, BarChart } from 'lucide-react';

const Medications = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <AnimatedTransition>
            <div className="flex flex-col space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Medicamentos</h1>
                <p className="text-muted-foreground mt-2">
                  Gerencie seus medicamentos, doses e horários
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card p-6 flex flex-col items-center text-center hover:shadow-card transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Pill className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Medicamentos</h3>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Ativos</p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center text-center hover:shadow-card transition-all">
                  <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-1">Doses</h3>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Por dia</p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center text-center hover:shadow-card transition-all">
                  <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-1">Estoque Baixo</h3>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Medicamentos</p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center text-center hover:shadow-card transition-all">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Aderência</h3>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">Este mês</p>
                </div>
              </div>

              {/* Medication List Component */}
              <MedicationList />
            </div>
          </AnimatedTransition>
        </div>
      </main>
      <EmergencyButton />
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-20 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © 2023 VitaCheck. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Medications;


import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

const EmergencyButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleEmergencyCall = (number: string) => {
    // In a real app, this would trigger the call functionality
    console.log(`Calling emergency number: ${number}`);
    window.location.href = `tel:${number}`;
    setIsModalOpen(false);
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-16 h-16 rounded-full bg-destructive text-destructive-foreground shadow-lg flex items-center justify-center hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 transition-all hover:scale-105 active:scale-95"
          aria-label="Emergência"
        >
          <Phone size={28} />
        </button>
      </div>
      
      {/* Emergency Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-background rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-up">
            <div className="bg-destructive p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-destructive-foreground">Emergência</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 bg-destructive-foreground/10 text-destructive-foreground hover:bg-destructive-foreground/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-center mb-6">Selecione um número para ligar:</p>
              
              <div className="grid gap-3">
                <button
                  onClick={() => handleEmergencyCall("192")}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div>
                    <h3 className="font-medium">SAMU</h3>
                    <p className="text-sm text-muted-foreground">Serviço de Atendimento Móvel de Urgência</p>
                  </div>
                  <div className="text-xl font-bold">192</div>
                </button>
                
                <button
                  onClick={() => handleEmergencyCall("193")}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div>
                    <h3 className="font-medium">Bombeiros</h3>
                    <p className="text-sm text-muted-foreground">Corpo de Bombeiros</p>
                  </div>
                  <div className="text-xl font-bold">193</div>
                </button>
                
                <button
                  onClick={() => handleEmergencyCall("190")}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div>
                    <h3 className="font-medium">Polícia</h3>
                    <p className="text-sm text-muted-foreground">Polícia Militar</p>
                  </div>
                  <div className="text-xl font-bold">190</div>
                </button>
                
                <button
                  onClick={() => handleEmergencyCall("11988776655")} // This would be a custom emergency contact
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div>
                    <h3 className="font-medium">Contato de Emergência</h3>
                    <p className="text-sm text-muted-foreground">Contato principal</p>
                  </div>
                  <div className="text-xl font-bold">(11) 9 8877-6655</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;

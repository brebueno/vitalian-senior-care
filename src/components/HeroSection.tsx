
import React from 'react';
import { Calendar, Bell, AlertTriangle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from './AnimatedTransition';

const FeatureItem = ({ 
  icon: Icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay?: number;
}) => {
  return (
    <AnimatedTransition delay={delay} className="group">
      <div className="glass-card p-6 h-full hover:shadow-card hover:translate-y-[-5px] duration-300 flex flex-col">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </AnimatedTransition>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const handleEmergency = () => {
    // In a real app, this would trigger the emergency call
    navigate('/emergencia');
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <AnimatedTransition>
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Sua saúde em primeiro lugar
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
              Cuidado com saúde simplificado
            </h1>
            <p className="text-xl text-muted-foreground max-w-[800px]">
              VitaCheck ajuda você a gerenciar medicamentos, encontrar farmácias, e manter sua saúde em dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate('/medicamentos')}
                className="inline-flex items-center justify-center rounded-full text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Gerenciar Medicamentos
              </button>
              <button
                onClick={handleEmergency}
                className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none border border-input bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 px-8"
              >
                <Phone className="mr-2 h-4 w-4" />
                Emergência
              </button>
            </div>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureItem 
            icon={Calendar} 
            title="Calendário de Medicamentos" 
            description="Visualize e gerencie seus medicamentos diários, semanais ou mensais em um calendário intuitivo."
            delay={100}
          />
          <FeatureItem 
            icon={Bell} 
            title="Lembretes de Doses" 
            description="Receba notificações para não esquecer de tomar seus medicamentos nos horários corretos."
            delay={200}
          />
          <FeatureItem 
            icon={AlertTriangle} 
            title="Alertas de Medicamentos" 
            description="Seja avisado quando o estoque de seus medicamentos estiver baixo ou quando houver interações."
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

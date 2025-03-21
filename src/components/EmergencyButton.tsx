
import React from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyButton = () => {
  const navigate = useNavigate();

  const handleEmergency = () => {
    navigate('/emergencia');
  };

  return (
    <button
      onClick={handleEmergency}
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      aria-label="Emergência"
    >
      <Phone className="h-6 w-6" />
    </button>
  );
};

export default EmergencyButton;

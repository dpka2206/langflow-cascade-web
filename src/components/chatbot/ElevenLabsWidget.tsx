
import React from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ agentId }) => {
  return (
    <div className="flex-1 relative">
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsWidget;

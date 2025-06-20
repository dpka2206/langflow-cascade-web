
declare global {
  interface Window {
    ElevenLabsConvAI?: {
      init: (config: { agentId: string }) => void;
    };
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': {
      'agent-id': string;
    };
  }
}

export {};

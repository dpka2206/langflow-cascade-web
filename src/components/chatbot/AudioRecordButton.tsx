
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

interface AudioRecordButtonProps {
  onTranscription: (text: string) => void;
}

const AudioRecordButton: React.FC<AudioRecordButtonProps> = ({ onTranscription }) => {
  const { isRecording, isProcessing, startRecording, stopRecording } = useAudioRecorder();

  const handleRecordToggle = async () => {
    try {
      if (isRecording) {
        const transcription = await stopRecording();
        if (transcription.trim()) {
          onTranscription(transcription);
        }
      } else {
        await startRecording();
      }
    } catch (error) {
      console.error('Recording error:', error);
      // You could add a toast notification here
    }
  };

  if (isProcessing) {
    return (
      <Button disabled variant="outline" size="sm" className="border-purple-200">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleRecordToggle}
      variant={isRecording ? "destructive" : "outline"}
      size="sm"
      className={isRecording ? "" : "border-purple-200 hover:border-purple-300 hover:bg-purple-50"}
    >
      {isRecording ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4 text-purple-600" />
      )}
    </Button>
  );
};

export default AudioRecordButton;

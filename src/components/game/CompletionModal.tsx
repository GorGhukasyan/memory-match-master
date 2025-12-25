import { Trophy, Clock, MousePointerClick, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionModalProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const CompletionModal = ({ moves, time, onRestart }: CompletionModalProps) => {
  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl p-8 max-w-sm w-full text-center shadow-lg animate-slide-up">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center animate-pulse-glow">
          <Trophy className="w-10 h-10 text-success" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h2>
        <p className="text-muted-foreground mb-6">You matched all the pairs!</p>
        
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <MousePointerClick className="w-4 h-4" />
              <span className="text-sm">Moves</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{moves}</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{formatTime(time)}</p>
          </div>
        </div>
        
        <Button
          onClick={onRestart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default CompletionModal;

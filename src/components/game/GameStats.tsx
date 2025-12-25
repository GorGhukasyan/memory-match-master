import { Timer, MousePointerClick } from "lucide-react";

interface GameStatsProps {
  moves: number;
  time: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const GameStats = ({ moves, time }: GameStatsProps) => {
  return (
    <div className="flex gap-6 justify-center">
      <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
        <MousePointerClick className="w-5 h-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground font-medium">Moves</p>
          <p className="text-xl font-bold text-foreground">{moves}</p>
        </div>
      </div>
      <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
        <Timer className="w-5 h-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground font-medium">Time</p>
          <p className="text-xl font-bold text-foreground">{formatTime(time)}</p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;

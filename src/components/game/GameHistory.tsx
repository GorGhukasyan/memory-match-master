import { GameRecord } from "./types";
import { Trophy, Clock, MousePointerClick, Calendar } from "lucide-react";

interface GameHistoryProps {
  history: GameRecord[];
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const GameHistory = ({ history }: GameHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center shadow-sm">
        <Trophy className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground">No games played yet</p>
        <p className="text-sm text-muted-foreground/70">Complete a game to see your history</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Game History
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {history.map((record, index) => (
          <div
            key={record.id}
            className="bg-secondary/50 rounded-xl p-3 flex items-center justify-between animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                #{history.length - index}
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(record.date)}
                </div>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MousePointerClick className="w-4 h-4" />
                <span className="font-medium text-foreground">{record.moves}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-foreground">{formatTime(record.time)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;

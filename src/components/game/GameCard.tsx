import { Card } from "./types";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card;
  onClick: () => void;
  disabled: boolean;
}

const GameCard = ({ card, onClick, disabled }: GameCardProps) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick();
    }
  };

  return (
    <div
      className="perspective w-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 preserve-3d",
          (card.isFlipped || card.isMatched) && "rotate-y-180"
        )}
      >
        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-xl flex items-center justify-center",
            "bg-game-card-back shadow-card",
            "hover:scale-105 transition-transform duration-200",
            disabled && "pointer-events-none"
          )}
        >
          <div className="text-primary-foreground text-3xl font-bold opacity-30">?</div>
        </div>

        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center",
            "bg-game-card shadow-md border border-border",
            card.isMatched && "bg-game-matched animate-celebrate"
          )}
        >
          <span className="text-4xl md:text-5xl">{card.symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

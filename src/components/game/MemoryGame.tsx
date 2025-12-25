import { useState, useEffect, useCallback } from "react";
import { Card, GameRecord } from "./types";
import GameCard from "./GameCard";
import GameStats from "./GameStats";
import GameHistory from "./GameHistory";
import CompletionModal from "./CompletionModal";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";

const SYMBOLS = ["🎯", "🎨", "🎭", "🎪", "🎫", "🎬", "🎤", "🎧"];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createCards = (): Card[] => {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
};

const STORAGE_KEY = "memory-game-history";

const loadHistory = (): GameRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveHistory = (history: GameRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [history, setHistory] = useState<GameRecord[]>(loadHistory);

  // Timer
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && !isComplete) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsComplete(true);
      const record: GameRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        moves,
        time,
      };
      const newHistory = [record, ...history].slice(0, 10); // Keep last 10 games
      setHistory(newHistory);
      saveHistory(newHistory);
    }
  }, [cards, moves, time, history]);

  // Handle card matching
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsLocked(true);
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 300);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (!isPlaying) setIsPlaying(true);
      if (isLocked || flippedCards.length >= 2) return;

      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card
        )
      );
      setFlippedCards((prev) => [...prev, id]);
      if (flippedCards.length === 1) {
        setMoves((prev) => prev + 1);
      }
    },
    [isLocked, flippedCards, isPlaying]
  );

  const handleRestart = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
    setIsLocked(false);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Memory Match</h1>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Find all the matching pairs!</p>
        </div>

        {/* Stats and Restart */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <GameStats moves={moves} time={time} />
          <Button
            onClick={handleRestart}
            variant="outline"
            className="rounded-xl px-5 py-3 h-auto border-border hover:bg-secondary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto mb-8">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card.id)}
              disabled={isLocked || card.isFlipped || card.isMatched}
            />
          ))}
        </div>

        {/* History */}
        <div className="max-w-md mx-auto">
          <GameHistory history={history} />
        </div>

        {/* Completion Modal */}
        {isComplete && (
          <CompletionModal moves={moves} time={time} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default MemoryGame;

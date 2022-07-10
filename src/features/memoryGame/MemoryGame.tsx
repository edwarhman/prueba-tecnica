import {
  incrementFailsCount,
  incrementScore,
  decrementPairs,
  decrementTriesToSelect,
  selectFailsCount,
  selectPairs,
  selectScore,
  selectTries,
  selectCards,
} from "./memoryGameSlice";
import { Card } from "../card/Card";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function MemoryGame() {
  const cards = useAppSelector(selectCards);
  const cardsElements = cards.map((card) => <Card type={card} />);
  const score = useAppSelector(selectScore);
  const fails = useAppSelector(selectFailsCount);

  return (
    <div>
      <h2> Score: {score}</h2>
      <h2>Fails: {fails}</h2>
      <div className="cardsContainer">{cardsElements}</div>
    </div>
  );
}

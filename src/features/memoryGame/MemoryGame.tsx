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
  selectSecondCard,
  selectFirstCard,
  addDisabledCards,
  selectDisabledCards,
  resetTurn,
  setFirstCard,
  setSecondCard,
} from "./memoryGameSlice";
import { Card } from "../card/Card";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useWindowSize } from "@react-hook/window-size";
import "./MemoryGame.css";
import { useEffect, useState } from "react";

export function MemoryGame() {
  const dispatch = useAppDispatch();
  const score: number = useAppSelector(selectScore);
  const fails: number = useAppSelector(selectFailsCount);
  const firstCard = useAppSelector(selectFirstCard);
  const secondCard = useAppSelector(selectSecondCard);
  const [disabledCards, setDisabledCards] = useState([-1]);
  const [unflippedCards, setUnflippedCards] = useState([-1]);

  const cards: string[] = useAppSelector(selectCards);
  const cardsElements = cards.map((card, idx) => (
    <Card
      type={card}
      decrementTries={decrementTriesToSelect}
      index={idx}
      key={idx}
      disabled={disabledCards}
      unflipped={unflippedCards}
    />
  ));
  const [width, height] = useWindowSize();
  useEffect(() => {
    checkForMatch();
  }, [secondCard.index]);

  function checkForMatch() {
    const match = firstCard.type === secondCard.type;
    match ? disableCards() : unflipCards();
    dispatch(resetTurn());
    dispatch(setFirstCard({ type: "", index: -1 }));
    dispatch(setSecondCard({ type: "", index: -1 }));
  }

  function disableCards() {
    setDisabledCards([firstCard.index, secondCard.index]);
  }

  function unflipCards() {
    setUnflippedCards([firstCard.index, secondCard.index]);
  }

  return (
    <div className="game">
      <div className="statusContainer d-flex m-3 mt-0">
        <h2 className="gameScore"> Score: {score}</h2>
        <h2 className="gameFailsCount">Fails: {fails}</h2>
      </div>
      <div
        className="cardsContainer border rounded d-grid"
        style={{
          gridTemplateColumns: `repeat(${width > height ? 6 : 4}, 1fr)`,
        }}
      >
        {/* <Row className="mx-3" xs={width > height ? 6 : 4}> */}
        {cardsElements}
        {/* </Row> */}
      </div>
    </div>
  );
}

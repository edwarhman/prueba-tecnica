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
  resetGame,
  resetFails,
  resetScore,
  shuffleCards,
} from "./memoryGameSlice";
import { Card } from "../card/Card";
import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useWindowSize } from "@react-hook/window-size";
import "./MemoryGame.css";
import { useEffect, useState } from "react";

export function MemoryGame() {
  const dispatch = useAppDispatch();
  const score: number = useAppSelector(selectScore);
  const fails: number = useAppSelector(selectFailsCount);
  const tries: number = useAppSelector(selectTries);
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
    if (tries === 0) {
      checkForMatch();
    }
  }, [tries]);

  useEffect(() => {
    dispatch(shuffleCards());
  }, []);

  function checkForMatch() {
    if (firstCard.type === secondCard.type) {
      if (tries <= 2) {
        dispatch(incrementScore());
      }
      disableCards();
    } else {
      if (tries <= 2) {
        dispatch(incrementFailsCount());
      }
      unflipCards();
    }

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

  function handleTryAgain() {
    dispatch(resetGame());
    dispatch(setFirstCard({ type: "", index: -1 }));
    dispatch(setSecondCard({ type: "", index: -1 }));
    dispatch(resetTurn());
    dispatch(resetFails());
    dispatch(resetScore());
    dispatch(shuffleCards());
    console.log("reset Game");
  }

  return score < 12 && fails < 10 ? (
    <div className="game">
      <div className="statusContainer d-flex m-3 mt-0">
        <h2> Score: {score}</h2>
        <h2 className="gameFailsCount">Failures: {fails}</h2>
      </div>
      <div
        className="cardsContainer d-grid"
        style={{
          gridTemplateColumns: `repeat(${width > height ? 6 : 4}, 1fr)`,
        }}
      >
        {/* <Row className="mx-3" xs={width > height ? 6 : 4}> */}
        {cardsElements}
        {/* </Row> */}
      </div>
    </div>
  ) : (
    <div className="game gameOver py-3">
      <h1 className={`hugeFont mb-5 text-${score < 12 ? "danger" : "success"}`}>
        Game Over
      </h1>
      <h2 className="bigFont">You {score < 12 ? "lose!" : "win!"}</h2>
      <p className="midleFont">Score: </p>
      <div>
        <p className="gameScore border border-4 rounded d-inline-block">
          {score}
        </p>
      </div>
      <Button
        onClick={handleTryAgain}
        variant="success"
        className="fs-1 mt-3 p-4"
      >
        Try Again
      </Button>
    </div>
  );
}

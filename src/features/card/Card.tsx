import Col from "react-bootstrap/Col";
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
  selectFirstCard,
  selectSecondCard,
  setFirstCard,
  setSecondCard,
} from "../memoryGame/memoryGameSlice";
import "./Card.css";
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { type } from "os";
import { NULL } from "sass";

const loadImage = require.context("../../images", true);
let image = require(`../../images/question-square.svg`).default;
export function Card(params: {
  type: string;
  decrementTries: any;
  index: number;
  disabled: number[];
  unflipped: number[];
}) {
  const [isFlipped, setFlipped] = useState(true);
  const [hasEvent, setHasEvent] = useState(true);
  const dispatch = useAppDispatch();
  const tries = useAppSelector(selectTries);
  const firstCard = useAppSelector(selectFirstCard);
  const secondCard = useAppSelector(selectSecondCard);

  useEffect(() => {
    if (params.unflipped.includes(params.index)) {
      setTimeout(() => setFlipped(true), 500);
    }
  }, [params.unflipped]);

  useEffect(() => {
    if (params.disabled.includes(params.index)) {
      setHasEvent(false);
    }
  }, [params.disabled]);

  function handleClick() {
    if (isFlipped && tries > 0) {
      setFlipped(!isFlipped);
      dispatch(decrementTriesToSelect());
      if (firstCard.type === "") {
        dispatch(setFirstCard({ type: params.type, index: params.index }));
      } else if (secondCard.type === "") {
        dispatch(setSecondCard({ type: params.type, index: params.index }));
      }
    }
  }

  return (
    <Col className="my-1 cardWrapper">
      <ReactCardFlip isFlipped={isFlipped}>
        <img
          className="image frontFace border border-4 border-success rounded"
          src={loadImage(`./${params.type}.svg`)}
          alt="quest"
          onClick={hasEvent ? handleClick : undefined}
        />
        <img
          className="image backFace border border-success border-4 rounded"
          src={loadImage(`./question-lg.svg`)}
          alt="quest"
          onClick={hasEvent ? handleClick : undefined}
        />
      </ReactCardFlip>
    </Col>
  );
}

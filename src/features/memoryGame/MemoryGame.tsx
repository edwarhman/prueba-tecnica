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
import { useWindowSize } from "@react-hook/window-size";
import "./MemoryGame.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function MemoryGame() {
  const cards: string[] = useAppSelector(selectCards);
  const cardsElements = cards.map((card, idx) => (
    <Card type={card} key={idx} />
  ));
  const score: number = useAppSelector(selectScore);
  const fails: number = useAppSelector(selectFailsCount);
  const [width, height] = useWindowSize();

  return (
    <div className="game">
      <Row className="statusContainer">
        <Col>
          <h2 className="gameScore"> Score: {score}</h2>
        </Col>
        <Col>
          <h2 className="gameFailsCount">Fails: {fails}</h2>
        </Col>
      </Row>
      <Button variant="danger">Click</Button>
      <div className="cardsContainer border rounded">
        <Row className="mx-3" xs={width > height ? 6 : 4}>
          {cardsElements}
        </Row>
      </div>
    </div>
  );
}

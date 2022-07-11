import Col from "react-bootstrap/Col";
import "./Card.css";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { type } from "os";

const loadImage = require.context("../../images", true);
let image = require(`../../images/question-square.svg`).default;
export function Card(params: { type: string }) {
  const [isFlipped, setFlipped] = useState(true);

  function handleClick() {
    setFlipped(!isFlipped);
  }

  return (
    <Col className="my-1 cardWrapper">
      <ReactCardFlip isFlipped={isFlipped}>
        <img
          className="image backFace border border-4 border-success rounded"
          src={loadImage(`./question-lg.svg`)}
          alt="quest"
          onClick={handleClick}
        />
        <img
          className="image frontFace border border-4 border-success rounded"
          src={loadImage(`./${params.type}.svg`)}
          alt="quest"
          onClick={handleClick}
        />
      </ReactCardFlip>
    </Col>
  );
}

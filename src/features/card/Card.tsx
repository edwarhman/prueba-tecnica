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
    <Col className="my-1">
      <ReactCardFlip isFlipped={isFlipped}>
        {false ? (
          <img
            className="image"
            src={loadImage(`./${params.type}.svg`)}
            alt="quest"
            onClick={handleClick}
          />
        ) : (
          <div></div>
        )}
        <img
          className="image"
          src={loadImage(`./question-square.svg`)}
          alt="quest"
          onClick={handleClick}
        />
      </ReactCardFlip>
    </Col>
  );
}

import Col from "react-bootstrap/Col";
import "./Card.css";
import image from "../../images/question-icon.jpg";
export function Card(params: { type: string }) {
  return (
    <Col className="card">
      {params.type}
      <img src={image} alt="quest" />
    </Col>
  );
}

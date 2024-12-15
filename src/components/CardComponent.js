import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "antd";

const CardComponent = ({ show }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${show.id}`); // Navigate to the detail page with the show ID
  };

  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xl={4}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 240,
          cursor: "pointer",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s",
        }}
        onClick={handleCardClick} // Navigate on click
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img
          alt={show.name}
          src={show.imageMediumUrl || "https://via.placeholder.com/240x360"}
          style={{
            width: "100%",
            height: 360,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
            color: "#fff",
            padding: "10px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {show.name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "#aaa",
            }}
          >
            {show.genres || "No genre available"}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default CardComponent;

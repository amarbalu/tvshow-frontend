import React from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleHeaderClick = () => {
    navigate("/"); // Navigate to the home route
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#000", // Unified black background
        color: "#fff",
      }}
    >
      {/* Unified Black Header */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#000", // Black header
          color: "#fff",
          padding: "0 24px",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.5)", // Slight shadow for definition
          cursor: "pointer", // Indicate clickable area
        }}
        onClick={handleHeaderClick} // Handle click event
      >
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          TV Maze
        </div>
      </Header>

      {/* Content Section */}
      <Content
        style={{
          padding: "24px",
          backgroundColor: "#000",
          flex: 1,
          overflowY: "auto", // Allows scroll for content
        }}
      >
        {children}
      </Content>

      {/* Unified Black Footer */}
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#000", // Black footer
          color: "#fff",
          padding: "16px 24px",
        }}
      >
        TV Maze ©{new Date().getFullYear()} All rights reserved
      </Footer>
    </Layout>
  );
};

export default MainLayout;

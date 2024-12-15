import React, { useEffect, useState } from "react";
import { Row, Pagination, Spin } from "antd";
import CardComponent from "../components/CardComponent";
import { fetchTvShows } from "../services/api";

const Home = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shows = await fetchTvShows();
        setTvShows(shows);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = tvShows.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden", // Hides scrollbars
        color: "#fff",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin
            size="large"
            style={{
              color: "#e50914", // Netflix red color
            }}
            indicator={
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "5px solid #e50914",
                  borderTop: "5px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            }
          />
        </div>
      ) : (
        <>
          <Row gutter={[20, 20]} justify="start">
            {currentItems.map((show) => (
              <CardComponent key={show.id} show={show} />
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={tvShows.length}
            onChange={handlePageChange}
            style={{
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              color: "#fff",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;

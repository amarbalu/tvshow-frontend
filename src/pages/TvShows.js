import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { fetchTvShowById } from "../services/api";

const Detail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const summaryRef = useRef(null); // Reference for the summary section
  const [imageLoaded, setImageLoaded] = useState(false); // State for lazy load

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTvShowById(id); // Fetch show details by ID
        setShowDetails(data);
      } catch (error) {
        console.error("Failed to fetch show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Scroll to Summary
  useEffect(() => {
    if (!loading && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading]);

  const handleImageLoad = () => setImageLoaded(true);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <Spin
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
            />
          }
        />
      </div>
    );
  }

  if (!showDetails) {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: "20px",
          backgroundColor: "#000",
          height: "100vh",
        }}
      >
        Show details not found.
      </div>
    );
  }

  const {
    name,
    summary,
    imageOriginalUrl,
    genres,
    language,
    status,
    runtime,
    averageRuntime,
    schedule = "{}",
    rating,
    network,
    webChannel,
    officialSite,
    premiered,
    ended,
    externalImdb,
    externalTheTvDb,
    externalTvRage,
  } = showDetails;

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto 20px",
          overflow: "hidden",
          borderRadius: "8px",
          aspectRatio: "16/9", // Maintain cinematic aspect ratio
          backgroundColor: "#333", // Placeholder background color
        }}
      >
        {/* Lazy Loaded Image */}
        <img
          src={imageOriginalUrl || "https://via.placeholder.com/1200x675"}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x675";
          }}
        />
        {!imageLoaded && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#333",
            }}
          >
            <Spin
              style={{
                color: "#e50914",
              }}
            />
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "20px",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
          }}
        >
          <h1
            style={{ margin: 0, fontSize: "3rem", fontWeight: "bold" }}
            ref={summaryRef}
          >
            {name}
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#aaa" }}>{genres}</p>
        </div>
      </div>

      {/* Details Section */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        // Reference for scrolling
      >
        {/* Summary */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Summary</h2>
          <div
            dangerouslySetInnerHTML={{ __html: summary }}
            style={{
              lineHeight: "1.6",
              color: "#ddd",
            }}
          ></div>
        </div>

        {/* Additional Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3>Status:</h3>
            <p>{status}</p>
          </div>
          <div>
            <h3>Language:</h3>
            <p>{language}</p>
          </div>
          <div>
            <h3>Runtime:</h3>
            <p>{runtime} minutes</p>
          </div>
          <div>
            <h3>Average Runtime:</h3>
            <p>{averageRuntime} minutes</p>
          </div>
          <div>
            <h3>Schedule:</h3>
            <p>
              {JSON.parse(schedule)?.days?.join(", ") || "N/A"} at{" "}
              {JSON.parse(schedule)?.time || "N/A"}
            </p>
          </div>
          <div>
            <h3>Rating:</h3>
            <p>{rating || "N/A"}</p>
          </div>
          <div>
            <h3>Network:</h3>
            <p>{network}</p>
          </div>
          <div>
            <h3>Web Channel:</h3>
            <p>{webChannel}</p>
          </div>
          <div>
            <h3>Premiered:</h3>
            <p>{premiered}</p>
          </div>
          <div>
            <h3>Ended:</h3>
            <p>{ended}</p>
          </div>
          <div>
            <h3>IMDb:</h3>
            <p>{externalImdb}</p>
          </div>
          <div>
            <h3>TheTVDb:</h3>
            <p>{externalTheTvDb}</p>
          </div>
          <div>
            <h3>TVRage:</h3>
            <p>{externalTvRage}</p>
          </div>
        </div>

        {/* Official Site */}
        {officialSite && (
          <div>
            <a
              href={officialSite}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#e50914",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Visit Official Site
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;

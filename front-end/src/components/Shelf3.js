import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import '../styles/App.css'; // Importing the CSS for the styles

const Shelf3 = () => {
    const [shelfProduct, setShelfProduct] = useState(null); // Initialize as null since we're expecting an object

    // Function to fetch the latest data from the API
    const fetchLatestData = async () => {
        try {
            const response = await fetch('http://192.168.118.137:8000/api/latest-data');
            const data = await response.json();
            console.log(data); // Log the API response to inspect its structure
            if (response.ok) {
                setShelfProduct(data); // Set the shelfProduct state to the response object
            } else {
                console.error("Error fetching data:", data.message);
            }
        } catch (error) {
            console.error("API request error:", error);
        }
    };

    // Poll the API every 5 seconds to get updates
    useEffect(() => {
        fetchLatestData(); // Fetch initially
        const interval = setInterval(fetchLatestData, 1000); // Poll every 5 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Check if shelfProduct is null or not before rendering
    if (!shelfProduct) {
        return <div>Loading...</div>; // Render a loading state while fetching data
    }

    // Destructure values from the shelfProduct object
    const { distance, weight } = shelfProduct;

    // Define the total weight and shelf length (assumed values, you may want to fetch these or set them based on context)
    const totalWeight = 1000; // Total weight in grams
    const shelfLength = 30; // Length of shelf in cm

    // Calculate the contribution of distance and weight to the progress
    const distanceContribution = (distance / shelfLength) * 100; // Percentage contribution of distance
    const weightContribution = (weight / totalWeight) * 100; // Percentage contribution of weight

    // Overall percentage calculation (combine both contributions)
    const overallPercentage = Math.round((distanceContribution + weightContribution) / 2); // Average of both contributions

    return (
        <div className="shelf-container">
            <h1>Shelf 3 Product</h1>
            <div className="product-card">
                <img
                    src={`/images/oreo.png`} // Hardcoded image path for Oreo
                    alt="Oreo" // Set alt text for accessibility
                    style={{ width: "100px", height: "100px" }} // Adjust size as necessary
                />
                <div className="product-details">
                    <h2 className="product-name">{`Distance: ${distance} cm`}</h2>
                    <div className="progress-container">
                        <CircularProgressbar
                            value={overallPercentage}
                            text={`${overallPercentage}%`}
                            styles={buildStyles({
                                textColor: "black",
                                pathColor: "green",
                                trailColor: "lightgrey",
                            })}
                        />
                    </div>
                </div>
                <p className="product-info">{`Weight: ${weight} g`}</p> {/* Display weight in grams */}
            </div>
        </div>
    );
};

export default Shelf3;

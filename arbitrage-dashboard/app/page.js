"use client";

import React, { useState, useEffect } from "react";
import getData from "../lib/data";

const Home = () => {
    const [trades, setTrades] = useState([]); // Full list of trades
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const itemsPerPage = 10; // Items per page

    // Fetch data on component mount
    useEffect(() => {
        const fetchTrades = async () => {
            const data = await getData(); // Assuming getData fetches the data
            setTrades(data);
        };
        fetchTrades();
    }, []);

    // Calculate paginated data
    const startIndex = currentPage * itemsPerPage;
    const paginatedTrades = trades.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Calculate total pages
    const totalPages = Math.ceil(trades.length / itemsPerPage);

    return (
        <div>
            <h1>Trades</h1>
            <ul>
                {paginatedTrades.map((trade, index) => (
                    <li key={index}>{trade.name}</li> // Replace `trade.name` with appropriate data property
                ))}
            </ul>
            <div>
                {/* Pagination controls */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            background: currentPage === index ? "blue" : "gray",
                            color: "white",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;

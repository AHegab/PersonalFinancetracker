"use client";

import React, { useState } from "react";
import { analyzeBudget } from "../../src/services/analysisService";
import Cookies from "js-cookie";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);

const Analysis = () => {
    const [result, setResult] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setImages([]);
    
        const token = Cookies.get("auth_token");
    
        try {
            const response = await analyzeBudget(token);
            console.log("API Response:", response); // Debugging
    
            // Map the correct keys
            const { analysis, images } = response;
    
            setResult(analysis);
    
            // Extract base64 image URLs
            const imageOutputs = Object.values(images);
            setImages(imageOutputs);
    
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-black">Budget Analysis</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                onClick={handleSubmit}
                className="mb-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
                {loading ? "Loading..." : "Analyze Budget"}
            </button>

            {/* Empty State */}
            {!loading && result === null && (
                <p className="text-gray-500">No analysis available. Click "Analyze Budget" to start.</p>
            )}

            {/* Display Result Table */}
            {result && Array.isArray(result) && (
                <div className="overflow-x-auto w-full max-w-4xl mb-8">
                    <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border text-center">Current Amount</th>
                                <th className="p-2 border text-center">Predicted Future</th>
                                <th className="p-2 border text-center">Budget</th>
                                <th className="p-2 border text-center">Recommended Budget</th>
                                <th className="p-2 border text-center">Difference</th>
                                <th className="p-2 border text-center">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-2 border">{item["Original Category"]}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item["Current Amount"])}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item["Predicted Future Amount"])}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item["Budget"])}</td>
                                    <td className="p-2 border text-center">{formatCurrency(item["Recommended Budget"])}</td>
                                    <td
                                        className={`p-2 border text-center ${
                                            item["Budget Difference"] > 0 ? "text-red-500" : "text-green-500"
                                        }`}
                                    >
                                        {formatCurrency(item["Budget Difference"])}
                                    </td>
                                    <td className="p-2 border text-center font-semibold">
                                        {item["Recommendation"]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display Images */}
            {/* Display Images */}
                {images.length > 0 && (
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.map((src, index) => (
                            <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={`data:image/png;base64,${src}`}
                                    alt={`Visualization ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                )}

        </div>
    );
};

export default Analysis;

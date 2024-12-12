"use client";

import React, { useState } from "react";
import { analyzeBudget } from "../../services/analysisService";

const AnalyzeBudgetComponent = () => {
    const [userId, setUserId] = useState("");
    const [budgets, setBudgets] = useState({});
    const [budgetInput, setBudgetInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBudgetAdd = () => {
        if (!budgetInput.includes(":")) {
            setError("Budget input must be in 'category:amount' format.");
            return;
        }

        const [category, value] = budgetInput.split(":");
        if (!category || isNaN(Number(value))) {
            setError("Invalid budget input. Ensure it's 'category:amount'.");
            return;
        }

        setBudgets((prev) => ({
            ...prev,
            [category.trim()]: parseFloat(value.trim()),
        }));

        setBudgetInput("");
        setError(null);
    };

    const handleAnalyze = async () => {
        if (!userId) {
            setError("User ID is required.");
            return;
        }
        if (Object.keys(budgets).length === 0) {
            setError("Please add at least one budget category.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const analysisResult = await analyzeBudget(userId, budgets);
            setResult(analysisResult);
        } catch (err) {
            setError("Failed to analyze budget. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Analyze Budget</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium">
                        User ID:
                    </label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="budgetInput" className="block text-sm font-medium">
                        Budget Input (category:amount):
                    </label>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="text"
                            id="budgetInput"
                            value={budgetInput}
                            onChange={(e) => setBudgetInput(e.target.value)}
                            placeholder="e.g., food:1000"
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <button
                            type="button"
                            onClick={handleBudgetAdd}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-medium">Current Budgets:</h3>
                    <ul className="list-disc pl-5">
                        {Object.entries(budgets).map(([category, value]) => (
                            <li key={category}>
                                {category}: {value}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleAnalyze}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    Analyze Budget
                </button>
            </div>

            {result && (
                <div className="bg-green-100 p-4 rounded-md mt-6 w-full max-w-3xl">
                    <h2 className="text-xl font-semibold">Analysis Result:</h2>
                    <pre className="mt-2 p-2 bg-gray-100 rounded">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default AnalyzeBudgetComponent;

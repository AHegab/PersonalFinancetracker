"use client";

import React, { useState } from "react";
import { analyzeBudget } from "../../../src/services/analysisService";

const Analysis = () => {
    const [userId, setUserId] = useState("");
    const [budgets, setBudgets] = useState({});
    const [budgetInput, setBudgetInput] = useState(""); // Input for budget category:value
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

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
        setError(null); // Clear any previous error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const analysisResult = await analyzeBudget(userId, budgets);
            setResult(analysisResult);
            setError(null); // Clear any previous errors
        } catch (err) {
            setResult(null);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-black">Budget Analyzer</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {result && (
                <div className="bg-green-100 p-4 rounded-md mb-6 w-full max-w-3xl">
                    <h2 className="text-xl font-semibold">Analysis Result:</h2>
                    <pre className="mt-2 p-2 bg-gray-100 rounded-md">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
            >
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                        User ID:
                    </label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="budgetInput" className="block text-sm font-medium text-gray-700">
                        Budget Input (category:amount):
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="text"
                            id="budgetInput"
                            value={budgetInput}
                            onChange={(e) => setBudgetInput(e.target.value)}
                            placeholder="e.g., food:1000"
                            className="p-2 border border-gray-300 rounded w-full text-black"
                        />
                        <button
                            type="button"
                            onClick={handleBudgetAdd}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-medium text-black">Current Budgets:</h3>
                    <ul className="list-disc pl-5">
                        {Object.entries(budgets).map(([category, value]) => (
                            <li key={category} className="text-gray-700">
                                {category}: {value}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                    Analyze Budget
                </button>
            </form>
        </div>
    );
};

export default Analysis;

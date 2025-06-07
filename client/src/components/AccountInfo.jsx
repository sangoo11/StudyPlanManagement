import React from "react";

const filterKeys = ["majorid", "image"];

export default function AccountInfo({ accountInfo, title = "Thông tin cá nhân" }) {
    return (
        <div className="flex flex-col h-fit w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-[10vh]">
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">{title}</h1>
            <div className="space-y-4">
                {Object.entries(accountInfo)
                    .filter(([key]) => !filterKeys.includes(key.toLowerCase()))
                    .map(([key, value]) => {
                        let displayValue = value;

                        // Capitalize status
                        if (key.toLowerCase() === "status" && typeof value === "string") {
                            displayValue = value.charAt(0).toUpperCase() + value.slice(1);
                        }

                        // Format date for createdAt
                        if (key.toLowerCase() === "createdat" && value) {
                            const date = new Date(value);
                            displayValue = date.toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            });
                        }

                        return (
                            <div key={key} className="flex justify-between">
                                <span className="font-semibold text-gray-600">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </span>
                                <span className="text-gray-700">{displayValue}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
} 
import React from "react";

export default function DuplicateCheckModal({
    isOpen,
    message,
    onConfirm,
    onCancel
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: message }}></p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Yes, Update My List
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

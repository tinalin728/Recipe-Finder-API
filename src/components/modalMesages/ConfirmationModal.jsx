import React, { useEffect } from "react";

export default function ConfirmationModal({ isOpen, message, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose(); // Close the modal after 2000ms
            }, 2000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
                <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
        </div>
    );
}

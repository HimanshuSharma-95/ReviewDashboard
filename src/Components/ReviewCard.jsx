import React from 'react';
import { FaTrash, FaStar } from "react-icons/fa"; // Font Awesome icons for delete and stars

function ReviewCard({ reviews, handleDelete }) {

  // Helper function to render stars based on the review rating
  const renderStars = (stars) => {
    const totalStars = 5; // Total number of stars
    const filledStars = Math.min(Math.max(stars, 0), totalStars); // To ensure stars is between 0 and totalStars

    return (
      <div className="flex">
        {/* Filled stars */}
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}

        {/* Empty stars */}
        {[...Array(totalStars - filledStars)].map((_, index) => (
          <FaStar key={index} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto px-4">
      <div className="min-w-[300px] max-w-full mx-auto">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-2">
              <div className="relative p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-200 dark:border-gray-00 w-full">
                <h5 className="text-lg font-semibold text-gray-900 break-words">
                  {review.reviewtext}
                </h5>
                <div className="flex justify-between items-center mt-1">
                  {/* Render stars */}
                  <div className="flex items-center">
                    {renderStars(review.stars)}
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(review.$id)}
                    className="bg-blue-500 text-white font-bold py-1 px-3 rounded flex items-center"
                    style={{ marginLeft: 'auto' }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 font-bold text-xl text-center mt-40">
            No reviews yet!
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;

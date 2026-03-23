import { useState } from "react";

const StarRating = ({ rating, onChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${readonly ? "cursor-default" : "cursor-pointer"} focus:outline-none`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
        >
          <span
            className={`${
              star <= (hoverRating || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;

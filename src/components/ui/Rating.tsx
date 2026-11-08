import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import React from 'react';

interface RatingProps {

  value: number;
  count?: number;
  className?: string;
}


export const Rating = ({ value, count, className = '' }: RatingProps) => {

const starClass = "text-amber-500 w-3.5 h-3.5";

const stars = Array.from({ length: 5 }, (_, index) => {

  const starValue = index + 1;

    if (value >= starValue) {
      return <FaStar key={index} className={starClass} />;
    }

    if (value >= starValue - 0.5) {
      return <FaStarHalfAlt key={index} className={starClass} />;
    }

    return <FaRegStar key={index} className="text-gray-300 w-3.5 h-3.5" />;
  });


return (

    <div className={`flex items-center gap-2 ${className}`}>

      <div className="flex items-center gap-1">{stars}</div>

      {count !== undefined && (
        <span className="text-xs font-semibold text-gray-500">({count})</span>
      )}

    </div>
);

};



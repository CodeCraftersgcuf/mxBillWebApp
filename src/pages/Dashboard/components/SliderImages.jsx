import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSlide } from '../../../util/queries/appQueries';

const SliderImages = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fetch slide data using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['slideData'],
    queryFn: getSlide,
  });

  console.log('The data:', data);

  const slideData = data?.data || []; // Fallback to empty array if no data

  // Handle slide change based on index
  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  // Simulate automatic slide transition effect
  useEffect(() => {
    if (slideData.length === 0) return;

    const transitionInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === slideData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(transitionInterval);
  }, [slideData.length]);

  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 font-semibold">Error: {isError.message}</p>;
  }

  return (
    <div className="max-w-full  md:h-[480px] flex flex-col items-center justify-center sm:h-[300px] xs:h-[200px]">
      <div className="min-w-[80%] mx-4 h-full flex items-center justify-center sm:items-start sm:justify-start overflow-hidden">
        {slideData.length > 0 ? (
          <img
            src={slideData[currentSlideIndex]?.image}
            alt="slide"
            className="min-w-full h-full object-contain "
          />
        ) : (
          <p className="text-lg font-medium">No slides available</p>
        )}
      </div>

      <div className="flex justify-center mt-3 space-x-2">
        {slideData.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlideIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => handleSlideChange(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderImages;

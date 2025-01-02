import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({
  title = 'N/A',
  icon = '',
  iconType = 'bx',
  textSize = 'sm',
  iconSize = '2xl',
  circleSize = '14',
  link = '#',
}) => {
  return (
    <Link to={link}>
      <div className="mt-9 flex flex-col items-center justify-center gap-4">
        <div
          className={` w-${circleSize} h-${circleSize}  p-4 flex items-center justify-center rounded-full`}
        >
          {iconType === 'image' ? (
            <img
              src={icon}
              alt={title}
              className={`lg:w-[100px] w-[60px]  md:max-w-32 md:max-h-max-w-32 object-contain  `}
            />
          ) : (
            <i className={`${icon} text-white text-xl md:text-${iconSize}`}></i>
          )}
        </div>
        <p className={`capitalize text-${textSize} text-center font-bold mt-2`}>
          {title}
        </p>
      </div>
    </Link>
  );
};

export default Item;

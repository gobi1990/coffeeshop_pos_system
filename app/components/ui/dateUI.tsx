/* eslint-disable @typescript-eslint/no-unused-vars */
import { Calendar } from 'lucide-react';
import { useState } from 'react';


const DateUI: React.FC = () => {
  const currentTime  = new Date();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className='ml-4' >
        <div className="flex flex-row items-center md:items-start">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-gray-600" />
            <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
          </div>
          
        </div>
    </div>
  );
};

export default DateUI;
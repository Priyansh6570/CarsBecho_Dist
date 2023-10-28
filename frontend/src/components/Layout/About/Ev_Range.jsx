import React from 'react';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const Ev_Range = () => {
  return (
    <main className="flex sm:flex-col md:flex-col bg-[url('/Images/user-action-bg.jpg')] bg-cover flex-row-reverse w-full overflow-hidden sm:items-center sm:justify-center">
      <ScrollToTopOnMount />
      <div className="bg-gradient-to-t from-[#333333d1] mr-8 sm:m-0 mt-8 to-transparent w-full h-fit flex items-end justify-end">
        <img src="/Cars/ev7.jpg" alt="Electric Car" className="sm:w-full sm:scale-110 h-auto" />
      </div>
      <div className="bg-[#ffffffa4] py-10 px-8 sm:max-w-[600px] max-w-[750px] m-8 sm:m-1 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Range and Battery Technology</h2>
        <ul className="list-disc list-inside flex gap-4 flex-col text-lg text-gray-700">
          <li>
            <strong>Improved Battery Performance:</strong>
            <div className="pl-8">
              Electric car technology has rapidly evolved, resulting in improved battery performance and driving range. Modern electric cars in India can travel over 200 miles (320 kilometers) on a single charge, making them suitable for various commuting needs.
            </div>
          </li>
          <li>
            <strong>Reduced Charging Times:</strong>
            <div className="pl-8">
              Advancements in battery technology have led to reduced charging times, allowing electric car owners to recharge their vehicles more quickly and conveniently.
            </div>
          </li>
          <li>
            <strong>Enhanced Battery Life:</strong>
            <div className="pl-8">
              Battery technology advancements have also contributed to improved battery life, providing electric car owners with longer-lasting and more reliable power sources.
            </div>
          </li>
          <li>
            <strong>Addressing Urban Commuting Needs:</strong>
            <div className="pl-8">
              In congested urban areas, where shorter commutes are common, the range provided by electric cars meets the needs of Indian consumers while offering the convenience of electric charging.
            </div>
          </li>
          <li>
            <strong>Climatic Adaptability:</strong>
            <div className="pl-8">
              Manufacturers are actively working on enhancing battery durability and developing innovative solutions to address India's diverse climatic conditions, ensuring that electric cars perform optimally in different weather environments.
            </div>
          </li>
          <li>
            <strong>Consumer Confidence:</strong>
            <div className="pl-8">
              These advancements in range and battery technology instill confidence in Indian consumers, enabling them to consider electric cars as viable alternatives to traditional vehicles for their transportation needs.
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Ev_Range;

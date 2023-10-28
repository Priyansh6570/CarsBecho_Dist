import React from 'react';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const Ev_Government = () => {
  return (
    <main className="flex sm:flex-col md:flex-col bg-[url('/Images/user-action-bg.jpg')] bg-cover flex-row-reverse w-full overflow-hidden sm:items-center sm:justify-center">
      <ScrollToTopOnMount />
      <div className="bg-gradient-to-t from-[#333333d1] mr-8 sm:m-0 mt-8 to-transparent w-full h-fit flex items-end justify-end">
        <img src="/Cars/ev8.jpg" alt="Electric Car" className="sm:w-full sm:scale-110 h-auto" />
      </div>
      <div className="bg-[#ffffffa4] py-10 px-8 sm:max-w-[600px] max-w-[750px] m-8 sm:m-1 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Government Incentives and Support</h2>
        <ul className="list-disc list-inside flex gap-4 flex-col text-lg text-gray-700">
          <li>
            <strong>Financial Incentives:</strong>
            <div className="pl-8">
              The Indian government has implemented the Faster Adoption and Manufacturing of Electric Vehicles (FAME) scheme, which provides financial incentives, including direct subsidies, for purchasing electric vehicles in India.
            </div>
          </li>
          <li>
            <strong>Additional Benefits:</strong>
            <div className="pl-8">
              State governments, such as Maharashtra, Delhi, and Karnataka, have introduced additional benefits for electric car owners, such as registration fee waivers, road tax exemptions, and priority parking.
            </div>
          </li>
          <li>
            <strong>Public Transportation Electrification:</strong>
            <div className="pl-8">
              The government has set ambitious targets to electrify public transportation, with a particular focus on electric buses and two-wheelers, to reduce emissions and promote sustainable mobility.
            </div>
          </li>
          <li>
            <strong>Creating a Favorable Environment:</strong>
            <div className="pl-8">
              These supportive policies and incentives create a favorable environment for Indian consumers to transition to electric cars, making them more affordable and attractive options.
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Ev_Government;

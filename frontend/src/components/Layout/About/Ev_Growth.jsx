import React from 'react';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const Ev_Growth = () => {
  return (
    <main className="flex sm:flex-col md:flex-col bg-[url('/Images/user-action-bg.jpg')] bg-cover flex-row-reverse w-full overflow-hidden sm:items-center sm:justify-center">
      <ScrollToTopOnMount />
      <div className="bg-gradient-to-t from-[#333333d1] mr-8 sm:m-0 mt-8 to-transparent w-full h-fit flex items-end justify-end">
        <img src="/Cars/ev9.jpeg" alt="Electric Car" className="sm:w-full sm:scale-110 h-auto" />
      </div>
      <div className="bg-[#ffffffa4] py-10 px-8 sm:max-w-[600px] max-w-[750px] m-8 sm:m-1 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">EV Models and Market Growth</h2>
        <ul className="list-disc list-inside flex gap-4 flex-col text-lg text-gray-700">
          <li>
            <strong>Diverse Range of Electric Car Models:</strong>
            <div className="pl-8">
              The electric vehicle market in India offers a diverse range of electric car models tailored to various needs and preferences, ranging from compact city cars to spacious SUVs.
            </div>
          </li>
          <li>
            <strong>Participation of Major Automakers:</strong>
            <div className="pl-8">
              Major domestic and international automakers are introducing electric vehicles specifically designed for the Indian market, contributing to the availability and choice of electric car options.
            </div>
          </li>
          <li>
            <strong>Entry of Indian Automotive Startups:</strong>
            <div className="pl-8">
              Indian automotive startups are entering the electric vehicle space, bringing forth innovative and affordable electric car models that cater to the preferences and budget of Indian consumers.
            </div>
          </li>
          <li>
            <strong>Competition and Technological Advancements:</strong>
            <div className="pl-8">
              The increasing popularity of electric cars in India is driving competition among automakers, leading to technological advancements and improvements in electric vehicle technology.
            </div>
          </li>
          <li>
            <strong>Government and Industry Support:</strong>
            <div className="pl-8">
              The Indian government's promotion of electric mobility and industry initiatives are expected to further stimulate market growth, providing Indian consumers with an expanding range of electric car options.
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Ev_Growth;

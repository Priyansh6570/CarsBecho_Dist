import React from 'react';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const Ev_Charge = () => {
  return (
    <main className="flex sm:flex-col md:flex-col bg-[url('/Images/user-action-bg.jpg')] bg-cover flex-row-reverse w-full overflow-hidden sm:items-center sm:justify-center">
      <ScrollToTopOnMount />
      <div className="bg-gradient-to-t from-[#333333d1] mr-8 sm:m-0 mt-8 to-transparent w-full h-fit flex items-end justify-end">
        <img src="/Cars/ev2.jpg" alt="Charging Infrastructure" className="sm:w-full sm:scale-110 h-auto" />
      </div>
      <div className="bg-[#ffffffa4] py-10 px-8 sm:max-w-[600px] max-w-[750px] m-8 sm:m-1 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Charging Infrastructure</h2>
        <ul className="list-disc list-inside flex gap-4 flex-col text-lg text-gray-700">
          <li>
            <strong>India's charging infrastructure </strong> <div className="pl-8 w-full">
              
               India's charging infrastructure for electric cars has witnessed significant growth in recent years. Major cities, including Delhi, Mumbai, Bengaluru, and Chennai, are witnessing the installation of an increasing number of public charging stations.
              </div> 
          </li>
          <li>
            <strong>Government initiatives </strong> <div className="pl-8 w-full">
              
               Government initiatives and private companies are promoting home charging solutions, enabling EV owners to conveniently recharge their vehicles overnight.
              </div> 
          </li>
          <li>
            <strong>organization Role </strong> <div className="pl-8 w-full">
              
               organizations such as Energy Efficiency Services Limited (EESL) are implementing initiatives to establish a robust public charging infrastructure network,making long-distance travel in electric cars more feasible.
              </div> 
          </li>
          <li>
            <strong>Moto</strong> <div className="pl-8 w-full">
              
              These efforts are aligned with the government's vision to achieve substantial electric vehicle adoption in the country and provide Indian consumers with a reliable and accessible charging infrastructure.
              </div> 
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Ev_Charge;

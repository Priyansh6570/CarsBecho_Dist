import React from 'react';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

const Ev_Benefits = () => {
  return (
    <main className="flex sm:flex-col md:flex-col bg-[url('/Images/user-action-bg.jpg')] bg-cover flex-row-reverse w-full overflow-hidden sm:items-center sm:justify-center">
      <ScrollToTopOnMount />
      <div className="bg-gradient-to-t from-[#333333d1] mr-8 sm:m-0 mt-8 to-transparent w-full h-fit flex items-end justify-end">
        <img src="/Cars/ev6.jpg" alt="Electric Car" className="sm:w-full sm:scale-110 h-auto" />
      </div>
      <div className="bg-[#ffffffa4] py-10 px-8 sm:max-w-[600px] max-w-[750px] m-8 sm:m-1 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Benefits of Electric Cars</h2> <br />
        <ul className="list-disc list-inside flex gap-4 flex-col text-lg text-gray-700">
          <li>
            <strong>Environmental Friendliness:</strong> <br /> <div className='pl-8 w-full'>
               Electric cars produce zero tailpipe emissions during operation, addressing air pollution challenges in Indian cities and combating climate change. <br />
              </div>
          </li>
          <li>
            <strong>Energy Efficiency:</strong> <br /> <div className='pl-8 w-full'>
               Electric cars are more energy-efficient than gasoline counterparts, requiring less energy to travel the same distance. They play a crucial role in India's focus on energy conservation and reducing dependence on fossil fuels. <br />
              </div>
          </li>
          <li>
            <strong>Cost Savings:</strong> <br /> <div className='pl-8 w-full'>
               Electric cars have lower operating costs in India due to cheaper electricity compared to gasoline, resulting in savings on fuel expenses. <br />
              </div>
          </li>
          <li>
            <strong>Convenience and Accessibility:</strong> <br /> <div className='pl-8 w-full'>
               With the expanding charging infrastructure across the country, owning an electric car becomes even more convenient and cost-effective. <br />
              </div>
          </li>
          <li>
            <strong>Sustainable Mobility:</strong> <br /> <div className='pl-8 w-full'>
               Electric cars contribute to achieving sustainable mobility, aligning with India's efforts to promote a greener and cleaner transportation system. <br />
              </div>
          </li>
          <li>
            <strong>Future Readiness:</strong> <br /> <div className='pl-8 w-full'>
               Embracing electric cars positions individuals and the nation at the forefront of the electric mobility revolution and technological advancements. <br />
              </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Ev_Benefits;

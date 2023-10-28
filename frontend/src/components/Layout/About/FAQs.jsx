import React from 'react';
import { FiArrowDown } from 'react-icons/fi';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const FAQs = () => {
  const data = {
    rows: [
      {
        title: "What makes CarsBecho the best place to buy and sell cars?",
        content: "CarsBecho is a leading online marketplace in which users, dealers, and CarsBecho authentic brokers can register and purchase subscriptions to showcase their cars for sale. We provide a professional platform for buyers and sellers to connect, and we offer additional benefits such as warranty coverage and reliable customer support."
      },
      {
        title: "How can I sell my car on CarsBecho?",
        content: "Selling your car on CarsBecho is simple and convenient. Follow these steps:<br /><br />- Register on our website as a seller.<br />- Purchase a subscription to upload your car for sale &nbsp (subscription available for dealers and brokers, user have 1 free ad).<br />- Provide all the necessary details and high-quality photos of your car.<br />- Interested customers can contact you directly through our website."
      },
      {
        title: "Does CarsBecho charge any additional fees on car sales?",
        content: "No, CarsBecho does not charge any extra fees or commissions on car sales. Once you have purchased a subscription to showcase your car, you can connect with potential buyers directly without any intermediaries."
      },
      {
        title: "Does CarsBecho provide warranty coverage for buyers?",
        content: "Yes, CarsBecho offers warranty coverage for buyers. When purchasing a car through our platform, buyers can benefit from the warranty provided by CarsBecho, ensuring peace of mind and protection for their investment."
      },
      {
        title: "How does CarsBecho ensure a professional and reliable marketplace experience?",
        content: "CarsBecho maintains a professional and reliable marketplace by verifying the authenticity of sellers and providing a secure platform for transactions. We also offer dedicated customer support to assist both buyers and sellers throughout the buying process."
      },
      {
        title: "What documents do I need to provide to sell my car on CarsBecho?",
        content: "To sell your car on CarsBecho, you will need to provide the following documents:<br /><br />- Original Registration Certificate (RC) of the car.<br />- Insurance Certificate/Policy.<br />- Duplicate Keys.<br />- Service Manual and Last Service Receipt (if available).<br />- Any additional documents related to the car's warranty or extended coverage.<br /><br /><strong>Note: These documents are not needed while uploading your car ad.</strong>"
      },
      {
        title: "How does CarsBecho determine the price of a car?",
        content: "The price of a car on CarsBecho is determined by various factors, including the car's brand, model, mileage, condition, and market demand. It is recommended to set a competitive price based on similar listings and market trends to attract potential buyers."
      },
      {
        title: "Can I modify the price of my car listing later on?",
        content: "Yes, you can modify the price of your car listing on CarsBecho at any time to align with market conditions or to attract more buyers. However, please note that updating the price does not guarantee an immediate sale, and it's essential to consider market dynamics and competitive pricing."
      },
      {
        title: "How can I check the status of my car listing on CarsBecho?",
        content: "You can easily track the status of your car listing on CarsBecho by logging into your account on our website. You will have access to the number of views, inquiries, and any offers received for your car."
      },
      {
        title: "How can I contact customer support at CarsBecho?",
        content: "For any assistance or inquiries, you can reach our dedicated customer support team through our website's contact page. We are committed to providing prompt and reliable support to ensure a smooth experience for all our users."
      }
    ]
};

const handleScroll = (event) => {
  event.preventDefault();
  const faqSection = document.getElementById('faq');
  window.scrollTo({
    top: faqSection.offsetTop,
    behavior: 'smooth',
  });
};

return (
  <div className="container mx-auto flex flex-col gap-[20px] px-[50px] sm:p-0">
    <ScrollToTopOnMount />
    <div className="heading w-full flex justify-center object-cover bg-[#ffffff] rounded h-[550px] sm:h-full">
        <img src="/Images/faq.jpeg" alt="" className='object-cover h-full self-center' />
        <a href='#faq' onClick={handleScroll} className='absolute px-4 sm:hidden w-fit py-1 rounded-lg btn-secondary flex justify-center bottom-[50px] scale-125 align-middle gap-4 text-center'>View All <FiArrowDown className='self-center' /> </a>
    </div>
    <div id='faq' className="down bg-white flex flex-row-reverse sm:flex-col gap-[50px] justify-between sm:p-0 px-[50px]">
        <div className="div bg-white sm:hidden mt-[100px]">
          <img src="/Images/faq2.jpeg" className='h-[500px]' alt="" />
        </div>
        <div className="space-y-4 py-4 px-2 w-[60%] sm:w-full">
          {
            data.rows.map((item, index) => {
              return (
                <Accordion key={index} className='bg-[#f5f5f5] p-4 pr-0 rounded-lg shadow-sm'>
                  <AccordionSummary
                    expandIcon={<FiArrowDown className='' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className='text-2xl pr-8 font-bold'>{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className='text-lg text-[#555]' dangerouslySetInnerHTML={{ __html: item.content }} />
                  </AccordionDetails>
                </Accordion>
              )
            }
            )
          }
        </div>
    </div>
  </div>
);
};

export default FAQs;

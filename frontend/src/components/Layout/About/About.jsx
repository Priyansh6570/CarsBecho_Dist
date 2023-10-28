import React, {useEffect} from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="flex flex-col justify-center gap-4 p-4 bg-white">
      <section className="top flex h-[60vh] md:h-[20vh] w-full gap-8 p-8 rounded-xl shadow-md bg-slate-100">
        <div className="left about-text flex text-center justify-center items-center md:text-right p-4 w-[50%] h-full">
          <h1 className="text-5xl md:text-3xl font-bold whitespace-nowrap text-center z-10 text-slate-900">
            About Us
          </h1>
          <h1 className="text-[70px] md:text-3xl sm:hidden font-bold text-center relative left-[-70px] md:top-[-50px] text-slate-200 rotate-90">
            About
          </h1>
        </div>
        <div className="right flex md:justify-end justify-center items-center p-4 w-[50%] h-full">
          <img
            src="/Images/cbLogo.png"
            alt="CarsBecho Logo"
            className="w-[400px] md:w-[80px]"
          />
        </div>
      </section>

      <section className="middle flex flex-col gap-8 p-8 sm:p-0 rounded-xl">
        <div className="aboutus1 flex flex-col justify-center items-center shadow-md p-4 w-full h-fit">
          <div className="w-full h-fit">
            <h2 className="text-3xl md:text-xl font-bold text-center text-slate-900">
              Ramdhan Automotives Pvt. Ltd. also known as CarsBecho
            </h2>
          </div>
          <div className="conntainer flex md:flex-col md:justify-center md:items-center p-4 w-[80%] mx-auto">
            <div className="flex justify-center w-[50%] md:w-full h-full items-center p-4">
              <img
                src="/Images/about_poly_car.png"
                alt="About Us 1"
                className=""
              />
            </div>
            <div className="flex flex-col gap-4 text-lg text-justify px-10 md:px-0 p-4 items-center w-[50%] md:w-[126%] justify-center">
              <p>
                Ramdhan Automotives Pvt. Ltd. also known as CarsBecho is a
                groundbreaking startup that is revolutionizing the way repairs
                and aftersales services are organized for used cars. Our
                innovative marketplace connects car owners with a network of
                trusted service providers, streamlining the entire aftersales
                process and ensuring a hassle-free ownership experience.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutus1 flex flex-col justify-center items-center shadow-md p-4 w-full h-fit">
          <div className="w-full h-fit">
            <h2 className="text-3xl md:text-xl font-bold text-center text-slate-900">
              CarsBecho Aftersales Services
            </h2>
          </div>
          <div className="conntainer flex flex-row-reverse md:flex-col md:justify-center md:items-center p-4 w-[80%] mx-auto">
            <div className="flex justify-center w-[50%] md:w-full h-full items-center p-4">
              <img
                src="/Images/aftersales_service.jpg"
                alt="About Us 1"
                className=" w-[500px] md:w-[300px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4 text-lg text-center px-10 md:px-0 p-4 items-center w-[50%] md:w-[126%] justify-center">
              <p>
                Gone are the days of struggling to find reliable service
                providers, comparing prices, and worrying about the quality of
                repairs and maintenance. With CarsBecho, car owners gain access
                to a user-friendly platform where they can effortlessly schedule
                repairs, maintenance, and other aftersales services at their
                convenience.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutus1 flex flex-col justify-center items-center shadow-md p-4 w-full h-fit">
          <div className="w-full h-fit">
            <h2 className="text-3xl md:text-xl font-bold text-center text-slate-900">
              Transparency
            </h2>
          </div>
          <div className="conntainer flex md:flex-col md:justify-center md:items-center p-4 w-[80%] mx-auto">
            <div className="flex justify-center w-[50%] md:w-full h-full items-center p-4">
              <img
                src="/Images/transparency.jpg"
                alt="About Us 1"
                className="w-[500px] md:w-[300px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4 text-lg text-center px-10 md:px-0 p-4 items-center w-[50%] md:w-[126%] justify-center">
              <p>
                Transparency is at the heart of our platform. We provide
                detailed service descriptions, accurate pricing information, and
                customer reviews, empowering car owners to make informed
                decisions. By showcasing verified service providers who meet our
                stringent quality standards, we offer peace of mind and
                confidence in every transaction.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutus1 flex flex-col justify-center items-center shadow-md p-4 w-full h-fit">
          <div className="w-full h-fit">
            <h2 className="text-3xl md:text-xl font-bold text-center text-slate-900">
              For service providers
            </h2>
          </div>
          <div className="conntainer flex flex-row-reverse md:flex-col md:justify-center md:items-center p-4 w-[80%] mx-auto">
            <div className="flex justify-center w-[50%] md:w-full h-full items-center p-4">
              <img
                src="/Images/large_audience.jpg"
                alt="About Us 1"
                className="w-[500px] md:w-[300px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4 text-lg text-center px-10 md:px-0 p-4 items-center w-[50%] md:w-[126%] justify-center">
              <p>
                CarsBecho opens up new avenues for growth and visibility. Our
                platform offers increased exposure to a larger customer base,
                allowing providers to showcase their expertise and build their
                reputation. By joining our marketplace, service providers can
                tap into the vast potential of the used car aftersales market.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutus1 flex flex-col justify-center items-center shadow-md p-4 w-full h-fit">
          <div className="w-full h-fit">
            <h2 className="text-3xl md:text-xl font-bold text-center text-slate-900">
              Our Mission
            </h2>
          </div>
          <div className="conntainer flex md:flex-col md:justify-center md:items-center p-4 w-[80%] mx-auto">
            <div className="flex justify-center w-[50%] md:w-full h-full items-center p-4">
              <img
                src="/Images/mission.jpg"
                alt="About Us 1"
                className="w-[500px] md:w-[300px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4 text-lg text-center px-10 md:px-0 p-4 items-center w-[50%] md:w-[126%] justify-center">
              <p>
                At CarsBecho, we are committed to transforming the aftersales
                management landscape. Join us on this exciting journey as we
                shape the future of used car ownership, making repairs and
                maintenance a seamless and satisfying experience for all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

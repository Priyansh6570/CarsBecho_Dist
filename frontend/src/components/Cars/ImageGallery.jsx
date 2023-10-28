import React, { useState, useEffect, useRef } from "react";
import "../../styles/imageGallery.scss";
import { GrNext, GrPrevious, GrPowerReset } from "react-icons/gr";

const ImageGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const handleNextImage = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleImageWheel = (e) => {
    e.preventDefault();
    const zoomIncrement = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((prevZoomLevel) => {
      const newZoomLevel = prevZoomLevel + zoomIncrement;
      if (newZoomLevel >= 0.1 && newZoomLevel <= 3) {
        const imageContainer = imageContainerRef.current;
        const boundingRect = imageContainer.getBoundingClientRect();
        const zoomOriginX = (e.clientX - boundingRect.left) / boundingRect.width;
        const zoomOriginY = (e.clientY - boundingRect.top) / boundingRect.height;
        setZoomOrigin({ x: zoomOriginX, y: zoomOriginY });
        return newZoomLevel;
      }
      return prevZoomLevel;
    });
  };

  const getImageStyle = () => {
    return {
      transformOrigin: `${zoomOrigin.x * 100}% ${zoomOrigin.y * 100}%`,
      transform: `scale(${zoomLevel})`,
    };
  };

  useEffect(() => {
    // Disable scrolling on body when the component is visible
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling on body when the component is no longer visible
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="image-gallery w-[100vw] flex flex-col gap-12 overflow-hidden h-full">
      <div
        ref={imageContainerRef}
        className="main-image-container sm:mt-[120px] mt-[100px] sm:w-[90vw] mx-auto"
        onWheel={handleImageWheel}
      >
        <img
          src={images[activeIndex]}
          alt={`Main Image ${activeIndex}`}
          className="main-image object-contain sm:h-[220px] h-[400px] bg-[#ffffffef] rounded-lg mx-auto"
          style={getImageStyle()}
        />
        <div className="zoom-buttons absolute top-8 w-full flex justify-center gap-[5%] scale-[2] text-white">
          {/* <button onClick={handleZoomIn}>
            <AiOutlineZoomIn />
          </button>
          <button onClick={handleZoomOut}>
            <AiOutlineZoomOut />
          </button> */}
          <button onClick={handleZoomReset}>
            <GrPowerReset className="text-white invert" />
          </button>
        </div>
        <div className="nav-buttons relative gap-[40%] translate-y-[-130px] scale-[2] flex justify-center text-white">
          <button onClick={handlePreviousImage}>
            <GrPrevious className=" rounded-full bg-white p-[2px]" />
          </button>
          <button onClick={handleNextImage}>
            <GrNext className="] rounded-full bg-white p-[2px]" />
          </button>
        </div>
      </div>

      <div className="thumbnail-container flex overflow-x-auto snap-mandatory sm:mt-[80px] w-[90%]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${
              activeIndex === index ? "active" : ""
            } sm:w-[250px] sm:h-[150px] bg-black w-[200px] h-[150px] py-2 px-1 rounded-lg border-[1px] border-[#fff]`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

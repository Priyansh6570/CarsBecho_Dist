import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist} from '../../actions/userAction';
import Car from './Car';
import Loader from '../Layout/Loader/Loader'
import '../../styles/shortlist.scss'
import Sidebar from '../Admin/Sidebar';
import MetaData from '../Layout/MetaData';

const GetWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="dashboard flex md:flex-col sm:p-0 px-8 pt-8 gap-4 bg-[url('/Images/user-action-bg.jpg')] bg-cover ">
    <MetaData title="Shortlist" />
    <Sidebar />
    <div className='flex flex-1 flex-col'>
      <div className="shortlist-banner w-[70vw] bg-cover sm:w-full bg-[url('/Images/bg-car-front.jpg')] mx-auto m-8 h-[200px] sm:m-0 sm:mb-8 sm:h-[150px] rounded-2xl ">
      <h2 className='text-[30px] sm:text-white xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-8 left-[-400px] p-8 justify-center flex'>Shortlist</h2>
      </div>
      {wishlist && wishlist.length === 0 ? (
        <p className='text-[30px] sm:m-10 xs:top-[0.9rem] xs:text-black  font-sans font-bold mx-auto p-8 justify-center flex'>No Cars in Shortlist</p>
      ) : (
        <ul className='flex rounded-2xl mb-14 p-6 sm:flex-col m-4 sm:m-1 sm:mr-2 sm:p-0 gap-6 sm:gap-2 flex-wrap justify-center w-[70vw] mx-auto'>
          {wishlist && wishlist.map((car) => (
            <li key={car._id} className='self-center'>
             {car && car.image && <Car car={car} />}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  ); 
};

export default GetWishlist;

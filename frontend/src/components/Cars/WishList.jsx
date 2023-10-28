import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getWishlist } from '../../actions/userAction';
import { FaHeart } from 'react-icons/fa';
import { useAlert } from 'react-alert';

const WishList = ({ carId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the user object is available and the car is in the user's wishlist
    if (isAuthenticated && user && user.wishList.includes(carId)) {
      setIsAdded(true);
    }
  }, [isAuthenticated, user, carId]);

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Added to wishlist');
      setIsAdded(true);
    } else {
      // Handle case when user is not logged in
      // You can show a message or redirect to login page
      alert.error('Please login to add to wishlist');
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Removed from wishlist');
      setIsAdded(false);
    } else {
      alert.error('Please login to add to wishlist');
    }
  };

  // Fetch the wishlist on component mount to update the wishlist data
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div className='bg-white flex md:hidden p-2 rounded-md pr-1'>
      {isAdded ? (
        <span
          onClick={handleRemoveFromWishlist}
          className='shortList flex gap-1 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-red-500 font-lg sm:scale-[0.7]' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      ) : (
        <span
          onClick={handleAddToWishlist}
          className='shortList flex gap-1 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-[#ffcfcf] font-lg sm:scale-[0.6]' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      )}
    </div>
  );
};
const WishListMob = ({ carId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the user object is available and the car is in the user's wishlist
    if (isAuthenticated && user && user.wishList.includes(carId)) {
      setIsAdded(true);
    }
  }, [isAuthenticated, user, carId]);

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Added to wishlist');
      setIsAdded(true);
    } else {
      // Handle case when user is not logged in
      // You can show a message or redirect to login page
      alert.error('Please login to add to wishlist');
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Removed from wishlist');
      setIsAdded(false);
    } else {
      alert.error('Please login to add to wishlist');
    }
  };

  // Fetch the wishlist on component mount to update the wishlist data
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div className='bg-white hidden md:flex p-2 rounded-md pr-1'>
      {isAdded ? (
        <span
          onClick={handleRemoveFromWishlist}
          className='shortList flex gap-1 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-red-500 font-lg sm:scale-[0.7]' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      ) : (
        <span
          onClick={handleAddToWishlist}
          className='shortList flex gap-1 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-[#ffcfcf] font-lg sm:scale-[0.6]' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      )}
    </div>
  );
};

export { WishList, WishListMob };

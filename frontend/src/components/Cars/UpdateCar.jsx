import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCar } from '../../actions/carAction';
import { useAlert } from 'react-alert';

const UpdateCar = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const carId = match.params.id;
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    variant: '',
    year: 0,
    Km_Driven: 0,
    fuel: '',
    transmission: '',
    color: '',
    no_of_owners: 0,
    RTO: '',
    city: '',
    price: 0,
    description: '',
    category: '',
  });

  const { isUpdated, error } = useSelector((state) => state.car);

  const { user } = useSelector((state) => state.user);

  const { car } = useSelector((state) => state.car);

  useEffect(() => {
    if (car) {
      setCarData(car);
    }
  }, [car]);

  useEffect(() => {
    if (isUpdated) {
      alert.success('Car Updated Successfully');
      history.push(`/cars/${carId}`);
    }
  }, [isUpdated, alert, history, carId]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const userId = user._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCar(userId, carId, carData));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        {/* Car details preview */}
        <h2 className="text-xl font-semibold mb-2">Car Details Preview</h2>
        <p>Make: {carData.make}</p>
        <p>Model: {carData.model}</p>
        <p>Variant: {carData.variant}</p>
        <p>Year: {carData.year}</p>
        {/* Render other car details */}
      </div>
      <div>
        {/* Update car details form */}
        <h2 className="text-xl font-semibold mb-2">Update Car Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Make:</label>
            <input
              type="text"
              name="make"
              value={carData.make}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Model:</label>
            <input
              type="text"
              name="model"
              value={carData.model}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Variant:</label>
            <input
              type="text"
              name="variant"
              value={carData.variant}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Year:</label>
            <input
              type="number"
              name="year"
              value={carData.year}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Km Driven:</label>
            <input
              type="number"
              name="Km_Driven"
              value={carData.Km_Driven}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fuel:</label>
            <input
              type="text"
              name="fuel"
              value={carData.fuel}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Transmission:</label>
            <input
              type="text"
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Render other input fields for updating car details */}

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction"; // Replace with your action file and function
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { updateUser } from "../../actions/userAction";
import { useAlert } from "react-alert";

const AllUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users } = useSelector((state) => state.allUsers);
  const { user: logedInUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState({});

  const usersPerPage = 15;
  const maxDisplayedPages = 4;

  const handleRoleUpdate = (userId, role) => {
    try {
      dispatch(updateUser(userId, { role }));
      alert.success("User role updated successfully");
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  function capitalize(str) {
    if (typeof str !== "string") {
      return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, selectedRoles]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Determine the range of page numbers to display
  const getPageRange = () => {
    let startPage;
    let endPage;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="container mx-auto p-8 px-[50px] overflow-x-scroll">
      <h1 className="text-3xl font-bold mb-14 ">All Users</h1>
      <table className="min-w-full border-collapse">
        <colgroup>
          <col style={{ width: "8%" }} /> {/* Serial Number */}
          <col style={{ width: "23%" }} /> {/* Name */}
          <col style={{ width: "30%" }} /> {/* Email */}
          <col style={{ width: "12%" }} /> {/* Number */}
          <col style={{ width: "12%" }} /> {/* Role */}
          <col style={{ width: "15%" }} /> {/* Date of Joining */}
        </colgroup>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">
              Serial Number
            </th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">
              Name
            </th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">
              Email
            </th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">
              Number
            </th>
            <th className="py-2 px-4 border-b border-l border-r border-gray-300">
              Role
            </th>
            <th className="py-2 px-4 border-b border-l border-gray-300">
              Date of Joining
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-300">
                {indexOfFirstUser + index + 1}
              </td>
              <td className="py-2 px-4 border-b border-l border-r border-gray-300 font-medium">
                {user.name}
              </td>
              <td
                className="py-2 px-4 border-b border-l border-r border-gray-300"
                style={{ width: "30%" }}
              >
                {user.email}
              </td>
              <td
                className="py-2 px-4 border-b border-l border-r border-gray-300"
                style={{ width: "10%" }}
              >
                {user.mobile}
              </td>
              <td
                className="py-2 px-4 border-b border-l border-r border-gray-300"
                style={{ width: "10%" }}
              >
                <select
                  value={selectedRoles[user._id] || user.role}
                  onChange={(e) => {
                    const updatedRoles = { ...selectedRoles };
                    updatedRoles[user._id] = e.target.value;
                    setSelectedRoles(updatedRoles);
                  }}
                >
                  {user.role === "superUser" ? (
                    <option value="superUser">Super User</option>
                  ) : null}
                  {(user.role !== "superUser" && logedInUser.role === "superUser") ? (
                    <>
                      <option value="superUser">Super User</option>
                      <option value="admin">Admin</option>
                      <option value="dealer">Dealer</option>
                      <option value="user">User</option>
                      <option value="broker">Broker</option>
                    </>
                  ) : null}
                  {(user.role !== "superUser" && logedInUser.role === "admin") ? (
                    <>

                      <option value="admin">Admin</option>  
                      <option value="dealer">Dealer</option>
                      <option value="user">User</option>
                      <option value="broker">Broker</option>
                    </>
                  ) : null}
                </select>
              </td>

              <td className="py-2 px-4 border-b border-l border-gray-300">
                {new Date(user.createdAt)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/(\d+)(?:st|nd|rd|th)/, "$1$2")}
              </td>
              <td
                className="py-2 px-4 border-b border-l border-gray-300"
                style={{ width: "10%" }}
              >
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
                  onClick={() =>
                    handleRoleUpdate(
                      user._id,
                      selectedRoles[user._id] || user.role
                    )
                  }
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>
        {getPageRange().map((page, index) =>
          page === "..." ? (
            <span key={index} className="mx-2">
              {page}
            </span>
          ) : (
            <button
              key={index}
              className={`mx-2 ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } rounded-md p-2`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AllUser;

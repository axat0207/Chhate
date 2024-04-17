import React, { useState } from "react";
import { sampleChats } from "../../constants/sampleData";
import { FaCheck, FaPlus } from "react-icons/fa";
import useGroupDialogStore from "../../store/GroupDialogStore";
import { MdCancel } from "react-icons/md";

const Group = () => {
  const { isGroup, toggleGroup } = useGroupDialogStore();
  const [searchData, setSearchData] = useState("");
  const [members, setMembers] = useState([]);
  const [addedMembers, setAddedMembers] = useState({}); 

  const toggleMember = (member) => {
    const newAddedMembers = {
      ...addedMembers,
      [member]: !addedMembers[member],
    };
    setAddedMembers(newAddedMembers);

    if (newAddedMembers[member]) {
      setMembers([...members, member]);
    } else {
      setMembers(members.filter((m) => m !== member));
    }
  };

  const clearSearch = () => {
    setSearchData("");
  };
  // console.log(members)
  return (
    <div>
      {isGroup && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  New Group
                </h3>
                <button
                  onClick={toggleGroup}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4 mb-4" action="#">
                  <div className="relative">
                    <input
                      onChange={(e) => {
                        setSearchData(e.target.value);
                      }}
                      value={searchData}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Alxy Star"
                    />
                    {/* <div onClick={handleSearch} className="">Search</div> */}
                    <div
                      onClick={clearSearch}
                      className="absolute right-4 top-3"
                    >
                      <MdCancel size={20} />
                    </div>
                  </div>
                </form>
                <div className="flex flex-col gap-4 ">
                  <div className="text-xl font-semibold text-gray-700 ">
                    Members
                  </div>
                  {sampleChats.map((user, index) => (
                    <div key={index + Math.floor(Math.random() * 1000000)}>
                      <>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                              <img
                                className="rounded-full h-7 w-7"
                                src={user.avatar[0]}
                                alt="icon"
                              />
                              <div className="font-semibold">{user.name}</div>
                            </div>
                            <div
                              onClick={() => toggleMember(user.name)}
                              className="bg-blue-400 text-white text-2xl pb-2 flex justify-center w-8 h-8 items-center pt-2 rounded-full"
                            >
                              {addedMembers[user.name] ? (
                                <FaCheck size={16} /> // Changed to check icon when added
                              ) : (
                                <FaPlus size={16} />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                  ))}
                </div>

                <hr className="mt-5" />
                <div className="flex gap-4  mt-4">
                  <div onClick={toggleGroup} className="border rounded-md px-2 py-1 text-red-500 hover:bg-gray-100 cursor-pointer">
                    Cancel
                  </div>
                  <div className="border rounded-md bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 cursor-pointer">
                    Create
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;

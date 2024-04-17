import React, { useState } from "react";
import useSearchDialogStore from "../../store/SearchDialogStore";
import UserList from "./UserList";
import { sampleChats } from "../../constants/sampleData";
import { MdCancel } from "react-icons/md";

const SearchDialog = ({title}) => {
  const { isSearch, toggleSearch } = useSearchDialogStore();
  const [searchItem, setSearchItem] = useState();
  const [filterItems, setFilterItems] = useState(sampleChats);

  const handleSearch = () => {
    let filteredUsers = [];
  
    if (searchItem) { // If searchItem is not empty, filter the users
      filteredUsers = filterItems.filter((user) => 
        user?.name?.toLowerCase()?.includes(searchItem.toLowerCase())
      );
    } else {
      // If searchItem is empty, reset the list to the original data
      filteredUsers = sampleChats; 
    }
  
    setFilterItems(filteredUsers); // Update the state with the filtered or original list
  };
  
  const clearSearch = ()=>{
    setFilterItems(sampleChats);
    setSearchItem("");
  }
  return (
    <>
      {isSearch && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {title}
                </h3>
                <button
                  onClick={toggleSearch}
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
                <form className="space-y-4" action="#">
                  <div className="relative">
                    <input
                    onChange={(e) =>{setSearchItem(e.target.value); handleSearch() } }
                    value={searchItem}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Alxy Star"
                    />
                    <div onClick={handleSearch} className="">Search</div>
                    <div onClick={clearSearch} className="absolute right-4 top-3"><MdCancel size={20}/></div>

                  </div>

                </form>
                <div className="mt-2 flex flex-col gap-3 ">
                  {filterItems?.map((user, index) => {
                    return <UserList user={user} key={index} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;

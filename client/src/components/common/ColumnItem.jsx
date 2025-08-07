import React, { useEffect, useRef } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import CoumnAllSettings from './CoumnAllSettings';

const ColumnItem = ({ val, isOpen, setColumnSetting }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setColumnSetting(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <section>
            <div className='w-fit px-1 py-2 bg-gray-800 text-white my-2 rounded flex gap-x-1 items-center relative'>
                <h1 className='font-bold'>{val?.name}</h1>

                {
                    console.log("val...", val)
                }

                <HiOutlineDotsVertical
                    className='cursor-pointer text-gray-300 hover:text-white'
                    onClick={() =>
                        setColumnSetting(prev =>
                            prev === val._id ? null : val._id
                        )
                    }
                />

                {isOpen && (
                    <div ref={dropdownRef} className='absolute -right-12  -top-[115px] z-10'>
                        <CoumnAllSettings columnId={val?._id} columnName={val?.name} />
                    </div>
                )}
            </div>


            <div className='ml-10 bg-gray-700 border border-gray-600 min-h-[200px] min-w-10 max-w-[500px] max-h-[200px] rounded-md'>
                {

                }
            </div>

        </section>
    )
}

export default ColumnItem

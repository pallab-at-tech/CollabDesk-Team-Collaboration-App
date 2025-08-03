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
        <div className='w-fit px-1 py-2 bg-yellow-600 my-2 rounded flex gap-x-1 items-center relative'>
            <h1 className='font-bold'>{val?.name}</h1>

            <HiOutlineDotsVertical
                className='cursor-pointer'
                onClick={() =>
                    setColumnSetting(prev =>
                        prev === val._id ? null : val._id
                    )
                }
            />

            {isOpen && (
                <div ref={dropdownRef} className='absolute -right-12  -top-[115px] z-10'>
                    <CoumnAllSettings columnId={val?._id} columnName={val?.name}/>
                </div>
            )}
        </div>
    )
}

export default ColumnItem

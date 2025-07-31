import React, { useState } from 'react';
import { HiPencil, HiTrash, HiOutlinePlusSm } from 'react-icons/hi';
import CreateNewTask from './CreateNewTask';

const CoumnAllSettings = ({columnId , columnName}) => {

    const [openNewTaskForm, setOpenNewTaskForm] = useState(false)

    return (
        <div className="w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden text-sm text-gray-800">

            <button onClick={()=>setOpenNewTaskForm(true)} className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <HiOutlinePlusSm /> Add Task
            </button>

            <button className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <HiPencil /> Rename Column
            </button>

            <button className="w-full px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2">
                <HiTrash /> Delete Column
            </button>

            {
                openNewTaskForm && (
                    <CreateNewTask close={()=>setOpenNewTaskForm(false)} columnId={columnId} columnName={columnName}/>
                )
            }

        </div>
    );
};

export default CoumnAllSettings;
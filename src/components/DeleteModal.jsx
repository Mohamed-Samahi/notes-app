import React from 'react'

const DeleteModal = ({ noteId, handleDelete, setOpenDeleteModal }) => {
    return (
        <div>
            <div>
                <div
                    onClick={() => setOpenDeleteModal(prev => false)}
                    className="fixed top-0 left-0 w-screen h-screen bg-black cursor-pointer bg-opacity-40"
                />
                <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-43%] p-4 rounded-lg bg-white border border-yellow-3000 z-[1000] w-[60%] m-auto">
                    <p>Are You Sure You Want to Delete this Note?</p>
                    <button
                        onClick={() => setOpenDeleteModal(prev => false)}
                        className='p-2 text-lg text-black bg-white border border-yellow-300 rounded-lg md:text-xl sm:px-4 sm:py-2'
                    >
                        cancel
                    </button>
                    <button
                        onClick={() => handleDelete(noteId)}
                        className='p-2 text-lg text-white bg-red-600 rounded-lg md:text-xl sm:px-4 sm:py-2'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
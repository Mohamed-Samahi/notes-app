import React from 'react'

const DeleteModal = ({ noteId, handleDelete, setOpenDeleteModal, modalData }) => {
    return (
        <div>
            <div>
                <div
                    onClick={() => setOpenDeleteModal(prev => false)}
                    className="fixed top-0 left-0 w-screen h-screen bg-black cursor-pointer bg-opacity-80"
                />
                <div className="fixed left-[50%] top-[50%] font-semibold translate-x-[-50%] translate-y-[-43%] p-4 rounded-lg bg-white border border-yellow-3000 z-[1000] w-full sm:w-[50%] md:w-[40%] xl:w-[35%] 2xl:w-[25%] m-auto">
                    <p>Are You Sure You Want to Delete the Note "{modalData.noteTitle}"?</p>
                    <div className="flex items-center justify-end gap-2 mt-10">
                        <button
                            onClick={() => setOpenDeleteModal(prev => false)}
                            className='px-2 py-1 text-base font-semibold text-yellow-300 transition-all bg-white border border-yellow-300 rounded-lg hover:text-white hover:bg-yellow-300 sm:text-lg md:text-xl md:px-4'
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => handleDelete(noteId)}
                            className='px-2 py-1 text-base font-semibold text-white transition-all bg-red-600 border border-red-600 rounded-lg hover:text-red-600 hover:bg-transparent sm:text-lg md:text-xl md:px-4'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
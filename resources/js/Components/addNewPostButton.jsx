import AddModal from "../Components/addModal"
import { createPortal } from "react-dom"
import useModalVisible from "./Hooks/useModalVisible";
import { useEffect } from "react";
export default function AddNewPostButton({ topics, defaultID }) {
    const [ref, isComponentVisible, setIsComponentVisible] = useModalVisible(false);
    useEffect(() => {
        if (isComponentVisible) {
            document.getElementById('layout').style.filter = "opacity(50%)"
        }
        else {
            document.getElementById('layout').style.filter = ""
        }
    }, [isComponentVisible])
    return (
        <div>
            <div className='flex md:justify-end max-sm:justify-center max-sm:m-1'>
                <button onClick={() => setIsComponentVisible(true)} className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center md:max-w-fit max-sm:w-full  font-semibold max-h-fit text-slate-200'><i className='fa fa-plus-circle mr-2' />New Post</button>
            </div>
            {
                createPortal(
                    <AddModal isVisible={isComponentVisible} componentRef={ref} close={() => setIsComponentVisible(false)} topics={topics} defaultID={defaultID} />,
                    document.body

                )
            }
        </div>
    )
}


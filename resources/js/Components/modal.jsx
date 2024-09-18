
export default function Modal({ children }) {

    return (



        <div className="z-10 absolute mt-5 xl:w-1/3 lg:w-2/5 md:w-7/12 sm:w-11/12 m-auto left-0 right-0" id="modal">

            {children}


        </div>



    )
}
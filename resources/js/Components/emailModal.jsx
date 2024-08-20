import Modal from "../Components/modal"
import Card from "../Components/card"
import CloseButton from "../Components/closeButton"
import { useForm } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
export default function EmailModal({isVisible,handleCloseClick}){
    const {  post, processing} = useForm()
    const { flash } = usePage().props
    return (
        <div style={{visibility: isVisible? "visible":"hidden"}}>
        <Modal> <Card name="Please verify your email" shadow='' ButtonComponent={<CloseButton handleOnClick={handleCloseClick}/>}>
            <div className='grid gap-2 bg-slate-100 rounded-b-lg h-full shadow-inherit p-5'>
               <h1 className="text-slate-600 font-semibold text-md">
                Please check your email for verification link <i className="fa-regular fa-envelope"/>
               </h1>
               <h1 className="text-slate-600 font-semibold text-md">
                Did not recieve link? <button className="text-blue-300" disabled={processing}  onClick={()=>post('/email/verification-notification')}>Resend</button>
               </h1>
               {flash.message && (
                    <h1 className="text-slate-600 font-semibold text-md">
                        {flash.message}
                    </h1>
                
                )}
           
        </div>
            
            
            
        </Card> </Modal>
        
        </div>
    )
}
import Modal from "./modal"
import Card from "./card"
import CloseButton from "./closeButton"
import { useForm } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { useEffect } from "react"
import useModalVisible from "./Hooks/useModalVisible"
export default function VerificationModal() {
    const { post, processing } = useForm()
    const { flash, verified } = usePage().props
    const [ref, show, setShow] = useModalVisible(false);
    useEffect(() => {
        if (verified == false) {
            setShow(true)

        }
        else {
            setShow(false)
        }
    }, [verified])
    return (
        <>
            {show &&
                <div ref={ref}>
                    <Modal> <Card name="Please verify your email" shadow='' ButtonComponent={<CloseButton handleOnClick={() => setShow(false)} />}>
                        <div className='grid gap-2 bg-slate-100 rounded-b-lg h-full shadow-inherit p-5'>
                            <h1 className="text-slate-600 font-semibold text-md">
                                Please check your email for verification link <i className="fa-regular fa-envelope" />
                            </h1>
                            <h1 className="text-slate-600 font-semibold text-md">
                                Did not recieve link? <button className="text-blue-300" disabled={processing} onClick={() => post('/email/verification-notification')}>Resend</button>
                            </h1>
                            {flash.message && (
                                <h1 className="text-slate-600 font-semibold text-md">
                                    {flash.message}
                                </h1>

                            )}

                        </div>



                    </Card> </Modal>

                </div>
            }
        </>
    )
}
import { useForm, usePage } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
export default function ResetPasswordEmailModal({ isVisible, componentRef, close }) {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        email: ""
    })
    const { flash } = usePage().props

    useEffect(() => {
        clearErrors()
        reset()
    }, [isVisible])
    function submit(e) {
        e.preventDefault()
        post('/forgot-password', {
            preserveScroll: true,
            onSuccess: () => { clearErrors(), reset() }

        })
    }
    return (
        <>
            {isVisible &&
                <div ref={componentRef}>
                    <Modal> <Card name="Enter your Email" shadow='' ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className='bg-slate-100 rounded-b-lg h-full shadow-inherit'>



                            <form onSubmit={submit} >
                                <div className='grid col-1 gap-2 p-6'>
                                    <FormInput errors={errors.email} value={data.email} setData={setData} name={"email"} type={"email"} title={"Email"} />

                                    <Button disabled={processing} width={"w-full"}>Send Link</Button>
                                    {flash.message && (
                                        <h1 className="text-slate-600 font-semibold text-md">
                                            {flash.message}
                                        </h1>

                                    )}
                                </div>
                            </form>
                        </div>



                    </Card> </Modal>

                </div>
            }
        </>
    )
}
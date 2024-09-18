import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from './modal';
import Card from './card';
import CloseButton from './closeButton';
import FormInput from './forminput';
import Button from './button';
export default function ResetPasswordModal({ isVisible, componentRef, close, token }) {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        email: "",
        password: "",
        password_confirmation: '',
        token: token,
    })

    useEffect(() => {
        clearErrors()
        reset()
    }, [isVisible])
    function submit(e) {
        e.preventDefault()
        post('/reset-password', {
            preserveScroll: true,
            onSuccess: () => { clearErrors(), reset(), close() }

        })
    }
    return (
        <>
            {isVisible &&
                <div ref={componentRef}>
                    <Modal> <Card name="Enter your new password" shadow='' ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className='bg-slate-100 rounded-b-lg h-full shadow-inherit'>



                            <form onSubmit={submit} >
                                <div className='grid col-1 gap-2 p-6'>
                                    <FormInput errors={errors.email} value={data.email} setData={setData} name={"email"} type={"email"} title={"Email"} />
                                    <FormInput errors={errors.password} value={data.password} setData={setData} name={"password"} type={"password"} title={"Password"} />
                                    <FormInput errors={errors.password_confirmation} value={data.password_confirmation} setData={setData} name={"password_confirmation"} type={"password"} title={"Confirm Password"} />
                                    <Button disabled={processing} width={"w-full"}>Submit</Button>

                                </div>

                            </form>
                        </div>



                    </Card> </Modal>

                </div>
            }
        </>
    )
}
import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import LinkedinButton from './linkedinLink';
import FacebookButton from './facebookLink';
import GoogleButton from './googleLink';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
import CheckBox from '../Components/checkbox';
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react'
export default function RegistrationModal({ isVisible, componentRef, close }) {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        rules: false,
    })
    function clearForm() {
        clearErrors()
        reset()

    }
    useEffect(() => {
        clearForm()
    }, [isVisible])
    function submit(e) {
        e.preventDefault()

        if (data.rules == true) {
            post('/user', {
                preserveScroll: true,
                onSuccess: () => { clearForm(), close(), window.scrollTo(0, 0), localStorage.setItem("logged_out", false) }

            })
        }
        else {
            errors.rules = "You have to agree with rules"
            setData("rules", false)
        }



    }
    return (

        <div ref={componentRef}>
            <Modal isVisible={isVisible}> <Card name="Registration" shadow='' ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                <div className='bg-slate-100 rounded-b-lg h-full shadow-inherit'>
                    <div className='p-6 border border-b-slate-300'>
                        <div className='w-1/2 grid grid-cols-1 gap-1 my-1 '>
                            <h1 className='text-xl text-slate-600 font-semibold mb-2'>
                                Create your account faster
                            </h1>
                            <FacebookButton />
                            <LinkedinButton />
                            <GoogleButton />
                        </div>
                    </div>


                    <form onSubmit={submit}>
                        <div className='p-6 border border-b-slate-300'>
                            <FormInput errors={errors.username} title={"Username"} name="username" value={data.username} setData={setData} required={true} type={"text"} />
                            <FormInput errors={errors.email} title={"Email"} name="email" value={data.email} setData={setData} required={true} type={"email"} />
                            <FormInput errors={errors.password} title={"Password"} name="password" value={data.password} setData={setData} required={true} type={"password"} />
                            <FormInput errors={errors.password_confirmation} title={"Confirm Password"} name="password_confirmation" value={data.password_confirmation} setData={setData} required={true} type={"password"} />
                        </div>
                        <div className='p-6 border border-b-slate-300'>
                            <CheckBox errors={errors.rules} value={data.rules} setData={setData} title={"I have met and agree with sites rules."} name={"rules"} required={true} />
                        </div>
                        <div className='px-6 mt-10 pb-6'>
                            <Button disabled={processing} width={"w-full"}>Register</Button>
                        </div>
                    </form>


                </div>



            </Card> </Modal>
        </div>

    )
}


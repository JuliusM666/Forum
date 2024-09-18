import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import LinkedinButton from './linkedinLink';
import FacebookButton from './facebookLink';
import GoogleButton from './googleLink';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
import CheckBox from '../Components/checkbox';
import { useForm } from '@inertiajs/react'
import { useEffect } from 'react';
import Link from './linkComponent';
export default function LoginModal({ isVisible, componentRef, close }) {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
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
        post('/login', {
            preserveScroll: true,
            onSuccess: () => { clearForm(), close() }

        })
    }
    return (
        <>
            {isVisible &&
                <div ref={componentRef}>
                    <Modal> <Card name="Login" shadow='' ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className='bg-slate-100 rounded-b-lg h-full shadow-inherit'>
                            <div className='p-6 border border-b-slate-300'>
                                <div className='w-1/2 grid grid-cols-1 gap-1 my-1 '>

                                    <FacebookButton />
                                    <LinkedinButton />
                                    <GoogleButton />
                                </div>
                            </div>


                            <form onSubmit={submit} >
                                <div className='grid col-1 gap-2 p-6'>
                                    <FormInput errors={errors.username} value={data.username} setData={setData} name={"username"} type={"text"} title={"User Name"} />
                                    <FormInput errors={errors.password} value={data.password} setData={setData} name={"password"} type={"password"} title={"Password"} />
                                    <CheckBox setData={setData} value={data.remember} name={"remember"} title={"Remember me"} />
                                    <Button disabled={processing} width={"w-full"}>Login</Button>
                                    <Link href={route('password.request')}>Forgot your password?</Link>
                                </div>
                            </form>
                        </div>



                    </Card> </Modal>

                </div>
            }
        </>
    )
}


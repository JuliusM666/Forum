import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import LinkedinButton from '../Components/linkedinButton';
import FacebookButton from '../Components/facebookButton';
import GoogleButton from '../Components/googleButton';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
import CheckBox from '../Components/checkbox';
import { useForm } from '@inertiajs/react'
import { useEffect } from 'react';
import Link from '../Components/link';
export default function LoginModal({isVisible,isShowLogin,setIsShowLogin}){
    const { data, setData, post, processing, errors,clearErrors,reset } = useForm({
        username:'',
        password: '',
        remember:false,
    })
    function clearForm(){
        clearErrors()
        reset()
       
      }
      useEffect(()=>{
        clearForm()
      },[isShowLogin])
      function submit(e) {
        e.preventDefault()
        post('/login', {
            preserveScroll: true,
            onSuccess: () =>{ clearForm(),setIsShowLogin(false)}
            
        })
       }
    return(
        <div style={{visibility: isVisible? "visible":"hidden"}}>
        <Modal> <Card name="Login" shadow='' ButtonComponent={<CloseButton handleOnClick={()=>setIsShowLogin(false)}/>}>
            <div className='bg-slate-100 rounded-b-lg h-full shadow-inherit'>
                <div className='p-6 border border-b-slate-300'>
                    <div className='w-1/2 grid grid-cols-1 gap-1 my-1 '>
                        
                        <FacebookButton/>
                        <LinkedinButton/>
                        <GoogleButton/>
                    </div>
                </div>
                
            
                    <form onSubmit={submit} >
                        <div className='grid col-1 gap-2 p-6'>
                            <FormInput errors={errors.username} value={data.username} setData={setData} name={"username"}  type={"text"} title={"User Name"}/>
                            <FormInput errors={errors.password} value={data.password} setData={setData} name={"password"}  type={"password"} title={"Password"}/>
                            <CheckBox setData={setData} value={data.remember} name={"remember"} title={"Remember me"}/>
                            <Button disabled={processing} width={"w-full"}>Login</Button>
                            <Link href={route('password.request')}>Forgot your password?</Link>
                        </div>
                        </form>
                    </div>
            
            
            
        </Card> </Modal>
        
        </div>
    )
}
 

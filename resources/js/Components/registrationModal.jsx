import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import LinkedinButton from '../Components/linkedinButton';
import FacebookButton from '../Components/facebookButton';
import GoogleButton from '../Components/googleButton';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
import CheckBox from '../Components/checkbox';
export default function RegistrationModal({isVisible,handleCloseClick}){
    return(
        <div style={{visibility: isVisible? "visible":"hidden"}}>
        <Modal> <Card name="Registration" shadow='' ButtonComponent={<CloseButton handleOnClick={handleCloseClick}/>}>
            <div className='bg-slate-100 rounded-b-3xl h-full shadow-inherit'>
                <div className='p-6 border border-b-slate-300'>
                    <div className='w-1/2 grid grid-cols-1 gap-1 my-1 '>
                        <h1 className='text-xl text-slate-600 font-semibold mb-2'>
                            Create your account faster
                        </h1>
                        <FacebookButton/>
                        <LinkedinButton/>
                        <GoogleButton/>
                    </div>
                </div>
                
            
                    <form action="" >
                        <div className='p-6 border border-b-slate-300'>
                            <FormInput title={"User Name"} name={"username"} required={true} type={"text"}/>
                            <FormInput title={"Email"} name={"email"} required={true} type={"email"}/>
                            <FormInput title={"Password"} name={"password"} required={true} type={"password"}/>
                            <FormInput title={"Comfirm Password"} name={"com_password"} required={true} type={"password"}/>
                        </div>
                        <div className='p-6 border border-b-slate-300'>
                            <CheckBox title={"I confirm thet Forum will access and handle data I provided."} name={"data_access"} required={false}/>
                            <CheckBox title={"I have met and agree with sites rules."} name={"rules"} required={true}/>
                        </div>
                        <div className='px-6 mt-10 pb-6'>
                        <Button width={"w-full"}>Register</Button>
                        </div>
                        </form>
                        
                    
                </div>
            
            
            
        </Card> </Modal>
        
        </div>
    )
}
 

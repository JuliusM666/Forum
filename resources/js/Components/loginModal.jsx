import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import LinkedinButton from '../Components/linkedinButton';
import FacebookButton from '../Components/facebookButton';
import GoogleButton from '../Components/googleButton';
import FormInput from '../Components/forminput';
import Button from '../Components/button';
import CheckBox from '../Components/checkbox';
export default function LoginModal({isVisible,handleCloseClick}){
    return(
        <div style={{visibility: isVisible? "visible":"hidden"}}>
        <Modal> <Card name="Login" shadow='' ButtonComponent={<CloseButton handleOnClick={handleCloseClick}/>}>
            <div className='bg-slate-100 rounded-b-3xl h-full shadow-inherit'>
                <div className='p-6 border border-b-slate-300'>
                    <div className='w-1/2 grid grid-cols-1 gap-1 my-1 '>
                        
                        <FacebookButton/>
                        <LinkedinButton/>
                        <GoogleButton/>
                    </div>
                </div>
                
            
                    <form action="" >
                        <div className='grid col-1 gap-2 p-6'>
                            <FormInput  name={"username"}  type={"text"}/>
                            <FormInput  name={"password"}  type={"password"}/>
                            <CheckBox name={"remember_me"} title={"Remember me"}/>
                            <Button width={"w-full"}>Login</Button>
                        </div>
                        </form>
                    </div>
            
            
            
        </Card> </Modal>
        
        </div>
    )
}
 

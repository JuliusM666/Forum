import Card from '../Components/card'
import Button from '../Components/button'
import FacebookButton from '../Components/facebookButton'
import LinkedinButton from '../Components/linkedinButton'
import GoogleButton from '../Components/googleButton'
export default function Sidebar(){
    return(
        <Card name={"Join the community now!"}>
        <div className="bg-slate-100 p-5">
            <h1 className='text-slate-600 font-semibold text-sm mt-1'>Join now and you will be able to:</h1>
            <ol className='text-slate-600 text-sm'>
                <ListItem> Participate in discussions</ListItem>
                <ListItem> Create new posts</ListItem>
                <ListItem> Write answers</ListItem>
                <ListItem> Vote on other user messages</ListItem>
                <ListItem> Contact any user personaly</ListItem>
                <ListItem> Use dark theme</ListItem>
            </ol>
            <h1 className='text-slate-600 text-sm mt-2'> and much more.</h1>
            <h1 className='text-slate-600 font-semibold text-sm mt-1'>Registration takes only ~30 sec. And is completely free. </h1>
            <div className='grid grid-cols-3  justify-items-center items-center mt-2'>
                <div className='justify-self-start'>
                    <Button>Login</Button>
                </div>
                <div className='mx-1'>
                    or
                </div>
                <div className='justify-self-end'>
                    <Button>Register</Button>
                </div>
                
            </div>
            <div className='grid grid-cols-1 gap-3 mt-6 justify-items-center '>
                <FacebookButton/>
                <LinkedinButton/>
                <GoogleButton/>
            </div>
        </div>
    </Card>
    )
}

function ListItem({children}){
    return(
        <li className='mt-3'>
            <span>
            ✔️ {children}
            </span>
        </li>
    )
}
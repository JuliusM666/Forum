import Card from '../Components/card'
import Button from '../Components/button'
import FacebookButton from './facebookLink'
import LinkedinButton from './linkedinLink'
import GoogleButton from './googleLink'
export default function JoinTheCommunity({ handleLoginClick, handleRegisterClick }) {
    return (
        <Card name={"Join the community now!"}>
            <div className="bg-slate-100 p-5">
                <h1 className='text-slate-600 font-semibold text-sm mt-1'>Join now and you will be able to:</h1>
                <ol className='text-slate-600 text-sm'>
                    <ListItem> Participate in discussions</ListItem>
                    <ListItem> Create new posts</ListItem>
                    <ListItem> Write answers</ListItem>
                    <ListItem> Vote on other users</ListItem>
                    <ListItem> Use dark theme</ListItem>
                </ol>
                <h1 className='text-slate-600 text-sm mt-2'> and much more...</h1>
                <h1 className='text-slate-600 font-semibold text-sm mt-1'>Registration takes only ~30 sec. And is completely free. </h1>
                <div className='flex items-center mt-2 lg:max-xl:justify-between'>
                    <div className='justify-self-start'>
                        <Button handleClick={handleLoginClick}>Login</Button>
                    </div>
                    <div className='mx-auto lg:max-xl:hidden'>
                        or
                    </div>
                    <div className='justify-self-end'>
                        <Button handleClick={handleRegisterClick}>Register</Button>
                    </div>

                </div>
                <div className='grid grid-cols-1 gap-3 mt-6 justify-items-center '>
                    <FacebookButton />
                    <LinkedinButton />
                    <GoogleButton />
                </div>
            </div>
        </Card>
    )
}

function ListItem({ children }) {
    return (
        <li className='mt-3'>
            <span>
                ✔️ {children}
            </span>
        </li>
    )
}
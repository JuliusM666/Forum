import Header from '../Components/header';
import Breadcrumb from '../Components/breadcrumb';
import Footer from '../Components/footer';
import RegistrationModal from '../Components/registrationModal';
import LoginModal from '../Components/loginModal';
import SearchModal from '../Components/searchModal';
import UserSettingsModal from '../Components/userSettingsModal';
import MenuModal from '../Components/menuModal';
import EmailModal from '../Components/emailModal';
import ResetPasswordEmailModal from '../Components/resetPasswordEmailModal';
import UserMenu from '../Components/userMenu';
import ResetPasswordModal from '@/Components/resetPasswordModal';
import { useState} from 'react';
import {SettingsContext} from '../Components/Context/settingsContext'
import { usePage } from "@inertiajs/react"
export default function Layout({children,breadcrumbs,token="",activeLink,isResetPassword=false,isEmailVerify=false,isResetPasswordEmail=false}){
    const [isShowRegistration,setIsShowRegistration]=useState(false)
    const [isShowLogin,setIsShowLogin]=useState(false)
    const [isShowSmallSearch,setIsShowSmallSearch]=useState(false)
    const [isShowMenu,setIsShowMenu]=useState(false)
    const [isShowSettings,setIsShowSettings]=useState(false)
    const [isShowEmail,setIsShowEmail]=useState(isEmailVerify)
    const [isShowResetEmail,setIsShowResetEmail]=useState(isResetPasswordEmail)
    const [isShowReset,setIsShowReset]=useState(isResetPassword)
    const { auth,flash } = usePage().props
    function outsideClickHandler(){
        if(isShowRegistration){
            setIsShowRegistration(false)
        }
        if(isShowLogin){
            setIsShowLogin(false)
        }
        if(isShowSmallSearch){
            setIsShowSmallSearch(false)
        }
        if(isShowMenu){
            setIsShowMenu(false)
        }
        if(isShowEmail){
            setIsShowEmail(false)
        }
        if(isShowSettings){
           setIsShowSettings(false)
        }
        if(isShowResetEmail){
            setIsShowResetEmail(false)
         }
         if(isShowReset){
            setIsShowReset(false)
         }
      
    }
  
    return(
        
        
        <div  className='min-w-screen min-h-screen bg-gradient-to-r from-slate-100 to-blue-100'>
            <RegistrationModal setIsShowEmail={setIsShowEmail} isVisible={isShowRegistration} isShowRegistration={isShowRegistration} setIsShowRegistration={setIsShowRegistration}/>
            <LoginModal isVisible={isShowLogin} setIsShowLogin={setIsShowLogin} isShowLogin={isShowLogin}/>
            <EmailModal isVisible={isShowEmail} handleCloseClick={()=>setIsShowEmail(false)}/>
            <SearchModal isVisible={isShowSmallSearch} handleCloseClick={()=>setIsShowSmallSearch(false)}/>
            <UserSettingsModal user={auth.user} isVisible={isShowSettings} setIsShowSettings={setIsShowSettings} isShowSettings={isShowSettings}/>
            <MenuModal isVisible={isShowMenu} handleCloseClick={()=>setIsShowMenu(false)}/>
            <ResetPasswordEmailModal isVisible={isShowResetEmail} setIsShowEmail={setIsShowResetEmail} />
            <ResetPasswordModal isVisible={isShowReset} setIsShowReset={setIsShowReset} token={token}/>
                <div onClick={()=>outsideClickHandler()} style={{opacity:isShowRegistration||isShowLogin||isShowSmallSearch||isShowMenu||isShowEmail||isShowSettings||isShowResetEmail||isResetPassword?0.2:1}}>
            <Header 
                handleRegistrationClick={()=>setIsShowRegistration(true)}
                handleLoginClick={()=>setIsShowLogin(true)}
                handleSmallSearchClick={()=>setIsShowSmallSearch(true)}
                handleMenuClick={()=>setIsShowMenu(true)}
                activeLink={activeLink}
             />
            
            <div className='md:mx-16 sm:mx-0'>
            <Breadcrumb breadcrumbs={breadcrumbs}/>
            {flash.message &&
                <div className='w-full mt-1 p-2 rounded-lg bg-green-300 text-slate-700 text-lg'>{flash.message}</div>
            }
            {auth.user && (
                <UserMenu user={auth.user}/>

            )}
            
            <SettingsContext.Provider value={{"setIsShowSettings":setIsShowSettings}}>
                {children}
            </SettingsContext.Provider>
            
            
            
            <Footer/>
            </div>
            </div>
        </div>
        
    )
}
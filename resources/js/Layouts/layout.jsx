import Header from '../Components/header';
import Breadcrumb from '../Components/breadcrumb';
import Footer from '../Components/footer';
import RegistrationModal from '../Components/registrationModal';
import LoginModal from '../Components/loginModal';
import SearchModal from '../Components/searchModal';
import UserSettingsModal from '../Components/userSettingsModal';
import MenuModal from '../Components/menuModal';
import EmailModal from '../Components/emailModal';
import UserMenu from '../Components/userMenu';
import { useEffect, useState} from 'react';
import {SettingsContext} from '../Components/Context/settingsContext'
export default function Layout({children,breadcrumbs,isEmailVerify=false,user}){
    const [isShowRegistration,setIsShowRegistration]=useState(false)
    const [isShowLogin,setIsShowLogin]=useState(false)
    const [isShowSmallSearch,setIsShowSmallSearch]=useState(false)
    const [isShowMenu,setIsShowMenu]=useState(false)
    const [isShowSettings,setIsShowSettings]=useState(false)
    const [isShowEmail,setIsShowEmail]=useState(isEmailVerify)
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
      
    }
  
    return(
        
        
        <div  className='min-w-screen min-h-screen bg-gradient-to-r from-slate-100 to-blue-100'>
            <RegistrationModal setIsShowEmail={setIsShowEmail} isVisible={isShowRegistration} isShowRegistration={isShowRegistration} setIsShowRegistration={setIsShowRegistration}/>
            <LoginModal isVisible={isShowLogin} setIsShowLogin={setIsShowLogin} isShowLogin={isShowLogin}/>
            <EmailModal isVisible={isShowEmail} handleCloseClick={()=>setIsShowEmail(false)}/>
            <SearchModal isVisible={isShowSmallSearch} handleCloseClick={()=>setIsShowSmallSearch(false)}/>
            <UserSettingsModal user={user} isVisible={isShowSettings} setIsShowSettings={setIsShowSettings} isShowSettings={isShowSettings}/>
            <MenuModal isVisible={isShowMenu} handleCloseClick={()=>setIsShowMenu(false)}/>
                <div onClick={()=>outsideClickHandler()} style={{opacity:isShowRegistration||isShowLogin||isShowSmallSearch||isShowMenu||isShowEmail||isShowSettings?0.2:1}}>
            <Header 
                handleRegistrationClick={()=>setIsShowRegistration(true)}
                handleLoginClick={()=>setIsShowLogin(true)}
                handleSmallSearchClick={()=>setIsShowSmallSearch(true)}
                handleMenuClick={()=>setIsShowMenu(true)}
             />
            
            <div className='md:mx-16 sm:mx-0'>
            <Breadcrumb breadcrumbs={breadcrumbs}/>
            {user && (
                <UserMenu user={user}/>

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
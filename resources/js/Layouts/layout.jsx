import Header from '../Components/header';
import Breadcrumb from '../Components/breadcrumb';
import Footer from '../Components/footer';
import RegistrationModal from '../Components/registrationModal';
import LoginModal from '../Components/loginModal';
import { useState } from 'react';
export default function Layout({children}){
    const [isShowRegistration,setIsShowRegistration]=useState(false)
    const [isShowLogin,setIsShowLogin]=useState(false)
    function outsideClickHandler(){
        if(isShowRegistration){
            setIsShowRegistration(false)
        }
        if(isShowLogin){
            setIsShowLogin(false)
        }
    }
    return(
        <>
        <RegistrationModal isVisible={isShowRegistration} handleCloseClick={()=>setIsShowRegistration(false)}/>
        <LoginModal isVisible={isShowLogin} handleCloseClick={()=>setIsShowLogin(false)}/>
        <div onClick={()=>outsideClickHandler()} className='min-w-screen min-h-screen bg-gradient-to-r from-slate-100 to-blue-100' style={{opacity:isShowRegistration||isShowLogin?0.2:1}}>
            <Header handleRegistrationClick={()=>setIsShowRegistration(true)} handleLoginClick={()=>setIsShowLogin(true)}/>
            
            <div className='md:mx-16 sm:mx-0'>
            <Breadcrumb/>
            
            
            
            
            {children}
            <Breadcrumb/>
            <Footer/>
            </div>
        </div>
        </>
    )
}
import Header from '../Components/header';
import Breadcrumb from '../Components/breadcrumb';
import Footer from '../Components/footer';
import RegistrationModal from '../Components/registrationModal';
import LoginModal from '../Components/loginModal';
import SearchModal from '../Components/searchModal';
import UserSettingsModal from '../Components/userSettingsModal';
import MenuModal from '../Components/menuModal';
import VerificationModal from '../Components/verificationModal';
import ResetPasswordEmailModal from '../Components/resetPasswordEmailModal';
import UserMenu from '../Components/userMenu';
import SideBar from '../Components/sidebar';
import ResetPasswordModal from '../Components/resetPasswordModal';
import Message from '../Components/message';
import { SettingsContext } from '../Components/Context/settingsContext'
import useModalVisible from '../Components/Hooks/useModalVisible';
import { useEffect } from 'react';
export default function Layout({ children, breadcrumbs, token = "", isPasswordResetEmail = false }) {
    const [registrationRef, showRegistration, setShowRegistration] = useModalVisible(false);
    const [loginRef, showLogin, setShowLogin] = useModalVisible(false);
    const [menuRef, showMenu, setShowMenu] = useModalVisible(false);
    const [searchRef, showSearch, setShowSearch] = useModalVisible(false);
    const [settingsRef, showSettings, setShowSettings] = useModalVisible(false);
    const [resetPasswordEmailRef, showResetPasswordEmail, setShowResetPasswordEmail] = useModalVisible(false);
    const [resetPasswordRef, showResetPassword, setShowResetPassword] = useModalVisible(false);
    useEffect(() => {
        setShowResetPasswordEmail(isPasswordResetEmail)
        if (token != "") {
            setShowResetPassword(true)
        }

    }, [])
    return (


        <div className='min-w-screen flex min-h-screen bg-gradient-to-r from-slate-100 to-blue-100'>
            <RegistrationModal isVisible={showRegistration} componentRef={registrationRef} close={() => setShowRegistration(false)} />
            <LoginModal isVisible={showLogin} componentRef={loginRef} close={() => setShowLogin(false)} />
            <MenuModal handleRegistrationClick={() => setShowRegistration(true)} handleLoginClick={() => setShowLogin(true)} isVisible={showMenu} componentRef={menuRef} close={() => setShowMenu(false)} />
            <SearchModal isVisible={showSearch} componentRef={searchRef} close={() => setShowSearch(false)} />
            <UserSettingsModal isVisible={showSettings} componentRef={settingsRef} close={() => setShowSettings(false)} />
            <VerificationModal />
            <ResetPasswordEmailModal isVisible={showResetPasswordEmail} componentRef={resetPasswordEmailRef} close={() => setShowResetPasswordEmail(false)} />
            <ResetPasswordModal isVisible={showResetPassword} componentRef={resetPasswordRef} close={() => setShowResetPassword(false)} token={token} />
            <div id="layout">
                <Header
                    handleRegistrationClick={() => setShowRegistration(true)}
                    handleLoginClick={() => setShowLogin(true)}
                    handleSmallSearchClick={() => setShowSearch(true)}
                    handleMenuClick={() => setShowMenu(true)}
                />

                <div className='md:mx-16 sm:mx-0'>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <Message />
                    <UserMenu />


                    <SettingsContext.Provider value={{ "setIsShowSettings": setShowSettings }}>
                        <div className='grid lg:grid-cols-4 md:grid-cols-1' name="content_block">
                            {children}
                            <SideBar handleLoginClick={() => setShowLogin(true)} handleRegisterClick={() => setShowRegistration(true)} />
                        </div>
                    </SettingsContext.Provider>



                    <Footer />
                </div>
            </div>
        </div>

    )
}
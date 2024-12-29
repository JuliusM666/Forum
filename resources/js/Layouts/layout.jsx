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
import ConfirmModal from '@/Components/confirmModal';
import UserMenu from '../Components/userMenu';
import SideBar from '../Components/sidebar';
import CookieConsent from '../Components/cookieConsent';
import ResetPasswordModal from '../Components/resetPasswordModal';
import Message from '../Components/message';
import { ModalContext } from '../Components/Context/modalContext'
import useModalVisible from '../Components/Hooks/useModalVisible';
import { UsersOnlineContext } from '@/Components/Context/usersOnlineContext';
import { usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
export default function Layout({ children, breadcrumbs, token = "", isPasswordResetEmail = false }) {
    const [registrationRef, showRegistration, setShowRegistration] = useModalVisible(false);
    const [loginRef, showLogin, setShowLogin] = useModalVisible(false);
    const [menuRef, showMenu, setShowMenu] = useModalVisible(false);
    const [searchRef, showSearch, setShowSearch] = useModalVisible(false);
    const [settingsRef, showSettings, setShowSettings] = useModalVisible(false);
    const [resetPasswordEmailRef, showResetPasswordEmail, setShowResetPasswordEmail] = useModalVisible(isPasswordResetEmail);
    const [resetPasswordRef, showResetPassword, setShowResetPassword] = useModalVisible(token != '' ? true : false);
    const [confirmRef, showConfirm, setShowConfrim] = useModalVisible(false);

    const [showChats, setShowChats] = useState(false)
    const [activeChat, setActiveChat] = useState(null)

    const confirmAction = useRef(null);
    const confirmMessage = useRef("")
    const modals = [showRegistration, showLogin, showMenu, showSearch, showSettings, showResetPasswordEmail, showResetPassword, showConfirm]
    useEffect(() => {
        document.getElementById('layout').style.filter = ""
        for (let element of modals) {
            if (element) {
                document.getElementById('layout').style.filter = "opacity(50%)"
                break
            }
        }
    }, [modals])
    const { auth } = usePage().props
    const [usersOnline, setUsersOnline] = useState([])
    const usersOnlineRef = useRef([])
    useEffect(() => { usersOnlineRef.current = usersOnline }, [usersOnline])
    useEffect(() => {
        console.log("mount")
        window.Echo.join("users.online")
            .here((users) => {
                console.log(users)
                setUsersOnline(usersOnline => users)
            })
            .joining((user) => {
                console.log("joining", user)
                setUsersOnline(usersOnline => [...usersOnline, user])
            })
            .leaving((user) => {
                console.log("leaving", user)
                setUsersOnline(usersOnlineRef.current.filter((u =>
                    u.id !== user.id)))
            })
            .error((error) => {
                console.error(error);
            })
        return () => {
            console.log("unmount")
            window.Echo.leave("users.online")
        }
    }, [auth.user])
    return (


        <div className='min-w-screen flex min-h-screen bg-gradient-to-r from-slate-100 to-blue-100'>
            <CookieConsent />
            <RegistrationModal isVisible={showRegistration} componentRef={registrationRef} close={() => setShowRegistration(false)} />
            <LoginModal isVisible={showLogin} componentRef={loginRef} close={() => setShowLogin(false)} />
            <MenuModal handleRegistrationClick={() => setShowRegistration(true)} handleLoginClick={() => setShowLogin(true)} isVisible={showMenu} componentRef={menuRef} close={() => setShowMenu(false)} />
            <SearchModal isVisible={showSearch} componentRef={searchRef} close={() => setShowSearch(false)} />
            <UserSettingsModal isVisible={showSettings} componentRef={settingsRef} close={() => setShowSettings(false)} />
            <VerificationModal />
            <ResetPasswordEmailModal isVisible={showResetPasswordEmail} componentRef={resetPasswordEmailRef} close={() => setShowResetPasswordEmail(false)} />
            <ResetPasswordModal isVisible={showResetPassword} componentRef={resetPasswordRef} close={() => setShowResetPassword(false)} token={token} />
            <ConfirmModal isVisible={showConfirm} componentRef={confirmRef} close={() => setShowConfrim(false)} confirmAction={confirmAction} message={confirmMessage} />
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


                    <UsersOnlineContext.Provider value={{ "usersOnline": usersOnline }} >
                        <ModalContext.Provider value={{
                            "showChats": showChats, "setShowChats": setShowChats, "setIsShowSettings": setShowSettings, "setActiveChat": setActiveChat,
                            "activeChat": activeChat, "setShowConfirm": setShowConfrim, "confirmAction": confirmAction, "confirmMessage": confirmMessage
                        }}>
                            <UserMenu />
                            <div className='grid grid-cols-4 max-lg:grid-cols-1' name="content_block">
                                <div name="main_block" className='col-span-3 mt-5'>
                                    {children}
                                </div>
                                <SideBar handleLoginClick={() => setShowLogin(true)} handleRegisterClick={() => setShowRegistration(true)} />
                            </div>
                        </ModalContext.Provider>
                    </UsersOnlineContext.Provider>


                    <Footer />
                </div>
            </div>
        </div>

    )
}
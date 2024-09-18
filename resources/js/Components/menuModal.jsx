import Modal from '../Components/modal';
import Card from '../Components/card';
import CloseButton from '../Components/closeButton';
import Button from '../Components/button';
import { useState } from 'react';
import { Link } from '@inertiajs/react'
export default function MenuModal({ isVisible, componentRef, close, handleRegistrationClick, handleLoginClick }) {
    const [menu, setMenu] = useState("")
    return (
        <>
            {isVisible &&
                <div ref={componentRef}>
                    <Modal> <Card name="Menu" shadow='' ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className='bg-slate-100 rounded-b-lg pb-10 shadow-inherit'>
                            <div className='grid grid-cols-1 items-center p-2 gap-3'>
                                <button className="bg-slate-200 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center  font-semibold max-h-fit text-slate-700" onClick={() => { close(); handleLoginClick() }}>Login</button>
                                <Button handleClick={() => { close(); handleRegistrationClick() }} width='w-full'>Register</Button>
                            </div>

                            <div className='grid grid-cols-1 items-center p-2 gap-3'>
                                {menu == "" &&
                                    <>

                                        <Link className='text-slate-600 text-left mb-2 pl-6' href={route('home')} preserveScroll>Forum</Link>

                                        <button className='flex justify-between items-center text-slate-600 text-left mb-2 pl-6' onClick={() => setMenu("Activity flow")}>

                                            <h1> Activity flow </h1>
                                            <i className="fa fa-angle-right" />

                                        </button>
                                        <Link className='text-slate-600 text-left mb-2 pl-6' href={route('rules')} preserveScroll>Rules</Link>
                                        <Link className='text-slate-600 text-left mb-2 pl-6' href={route('membership')} preserveScroll>Membership</Link>
                                    </>}
                                {menu == "Activity flow" &&
                                    <>

                                        <button className='flex items-center gap-1  border-slate-400 pb-2 border-b text-slate-600 text-left mb-2 pl-6' onClick={() => setMenu("")}>

                                            <i className="fa fa-angle-left" />
                                            <h1>Activity flow</h1>
                                        </button>
                                        <Link className='text-slate-600 text-left mb-2 pl-6' href={route('activity')} preserveScroll>All Activity</Link>
                                        <Link className='text-slate-600 text-left mb-2 pl-6' href={route('search')} preserveScroll>Search</Link>

                                    </>}
                            </div>

                        </div>



                    </Card> </Modal>

                </div >
            }
        </>
    )
}


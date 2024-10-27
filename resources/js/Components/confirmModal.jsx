
import Card from "./card";
import FadeWrapper from "./fadeWrapper";
import { router } from '@inertiajs/react'
export default function ConfirmModal({ isVisible, componentRef, close, destroyRoute, message }) {
    function confirm() {
        router.delete(destroyRoute.current, {}, { preserveScroll: true })
        close()
    }


    return (
        <div ref={componentRef}>
            <FadeWrapper isVisible={isVisible}>
                <div className="fixed z-10 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2" id="modal">
                    <Card name="Confirm">
                        <div className='bg-slate-100 rounded-b-lg p-4 h-full shadow-inherit'>
                            <h1 className="text-slate-700">{message.current}</h1>
                            <div className="flex justify-between gap-2 mt-5">
                                <button onClick={() => confirm()} className="w-full bg-blue-300 rounded-lg p-2 hover:opacity-70 text-slate-100 shadow-sm">Yes</button>
                                <button onClick={() => close()} className="w-full border-slate-700 border rounded-lg p-2 hover:opacity-70 text-slate-700 shadow-sm">No</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </FadeWrapper>
        </div>

    )
}
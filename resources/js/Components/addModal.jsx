import Card from "./card"
import Modal from './modal'
import CloseButton from './closeButton';

export default function AddModal({handleCloseClick,children,name}){
    return(
        <Modal>
            <div className="shadow-2xl">
            <Card name={name}  ButtonComponent={<CloseButton handleOnClick={handleCloseClick}/>}>
                <div className="bg-slate-100 rounded-b-lg text-slate-600">
                   {children}
                </div>
            </Card>
            </div>
        </Modal>
    )
}
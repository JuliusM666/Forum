import Modal from '../Components/modal'
import SearchBar from './searchBar'
export default function SearchModal({ isVisible, componentRef, close }) {
    return (

        <div ref={componentRef}>
            <Modal isVisible={isVisible}>

                <SearchBar />

            </Modal>
        </div>

    )
}
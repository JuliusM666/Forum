import Modal from '../Components/modal'
import SearchBar from './searchBar'
export default function SearchModal({ isVisible, componentRef, close }) {
    return (
        <>
            {isVisible &&
                <div ref={componentRef}>
                    <Modal>

                        <SearchBar />

                    </Modal>
                </div>
            }
        </>
    )
}
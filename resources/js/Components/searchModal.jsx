import Modal from '../Components/modal'
import SearchBar from './searchBar'
export default function SearchModal({isVisible,handleCloseClick}){
    return(
        <div style={{visibility: isVisible? "visible":"hidden"}}>
            <Modal>
               
                <SearchBar/>
                
            </Modal>
        </div>
    )
}
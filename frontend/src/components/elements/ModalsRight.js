import {ModalFolder} from '../elements/ModalFolder';
import {ModalSharedFolder} from '../elements/ModalSharedFolder'
import {ModalUploadFile} from '../elements/ModalUploadFile'
import {ModalFile} from '../elements/ModalFile';
import {ModalUploadFolder} from '../elements/ModalUploadFolder'
import {Stack} from 'react-bootstrap';

export const ModalsRight = ({parent, reload}) => {

    
  
    return (

        <Stack gap={1} className="d-none d-sm-block">
            <div className="menuRight d-flex justify-content-end"><ModalFile parent={parent} reload={reload}/></div>
            <div className="menuRight d-flex justify-content-end"><ModalUploadFile/></div>
            <div className="menuRight d-flex justify-content-end"><ModalUploadFolder/></div>
            <div className="menuRight d-flex justify-content-end"><ModalSharedFolder /></div>
            <div className="menuRight d-flex justify-content-end"><ModalFolder /></div>


          </Stack>

);
}
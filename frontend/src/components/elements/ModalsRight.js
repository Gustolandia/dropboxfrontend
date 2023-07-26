import {ModalFolder} from '../elements/ModalFolder';
import {ModalSharedFolder} from '../elements/ModalSharedFolder'
import {ModalUploadFile} from '../elements/ModalUploadFile'
import {ModalFile} from '../elements/ModalFile';
import {ModalUploadFolder} from '../elements/ModalUploadFolder'
import {Stack} from 'react-bootstrap';

export const ModalsRight = () => {


  
    return (

        <Stack gap={1} className="d-none d-sm-block">
            <div className="menuRight"><ModalFile/></div>
            <div className="menuRight"><ModalUploadFile/></div>
            <div className="menuRight"><ModalUploadFolder/></div>
            <div className="menuRight"><ModalSharedFolder /></div>
            <div className="menuRight"><ModalFolder /></div>


          </Stack>

);
}
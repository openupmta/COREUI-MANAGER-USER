import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'

const ModalCreateUser = (props) => {

    const [success, setSuccess] = useState(props.showModal)
    useEffect(() => {

    }, [props.showModal])
    return (
        <CRow>
            <CCol>
                {console.log(success)}
                {props.showModal && 
                <CCard>
                    <CCardHeader>
                        Bootstrap ModalCreateUser
                    </CCardHeader>
                    <CCardBody>
                        <CModal
                            show={success}
                            onClose={() => setSuccess(!success)}
                            color="success"
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>Modal title</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
                            <CModalFooter>
                                <CButton color="success" onClick={() => setSuccess(!success)}>Do Something</CButton>{' '}
                                <CButton color="secondary" onClick={() => setSuccess(!success)}>Cancel</CButton>
                            </CModalFooter>
                        </CModal>

                    </CCardBody>
                </CCard>
                }
            </CCol>
        </CRow>
    )
}

export default ModalCreateUser

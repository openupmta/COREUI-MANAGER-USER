import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CLink,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CCardFooter,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ManagerUserService from "../../services/manager_user/ManagerUserService";
const FormEditUser = (props) => {
    const [ currentUser, setCurrentUser ] = React.useState(props.userCurrent)

    useEffect(
        () => {
            setCurrentUser(props.userCurrent)
        },
        [ props ]
    )
    const getValueFormEdit = () =>{
      updateUser(currentUser.id, currentUser)
    }
    const updateUser = (id,data) => {
      ManagerUserService.update(id,data)
        .then(response => {
          props.setNotification({"time_out": 3000, "type": 'Success',"is_hidden": false})
          props.updateUser(id,data)
        })
        .catch(e => {
          console.log(e);
        });
    };
    const handleInputChange = event => {
      const { name, value } = event.target
      setCurrentUser({ ...currentUser, [name]: value })
    }
    const handleSelectOptionChange = event => {
      const { name, value } = event.target
      if (name === "role" && value>0) {
        currentUser.role = props.itemsRole[value - 1].label
        setCurrentUser(currentUser)
      }
      if (name === "status" && value > 0) {
        currentUser.status = props.itemsStatus[value - 1].label
        setCurrentUser(currentUser)
      }
    }
    return (
        <>
        <CCol xs="4" className={!props.showCard ? "manager-user-show-none-card" : ""}>
          <CFade>
            <CCard>
              <CCardHeader>
                Card users
                <div className="card-header-actions">
                  <CLink className="card-header-action" onClick={() => props.setCollapsed(!props.collapsed)}>
                    <CIcon name={props.collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => props.setShowCard(false)}>
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={props.collapsed}>
                <CCardBody>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_username" name="username" className="input-sm" onChange={handleInputChange} value={currentUser.username} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">First Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_first_name" name="first_name" className="input-sm" onChange={handleInputChange} value={currentUser.first_name} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">Last Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_last_name" name="last_name" className="input-sm" onChange={handleInputChange} value={currentUser.last_name} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="selectSm">Role</CLabel>
                      </CCol>
                      <CCol xs="8" md="8">
                        <CSelect custom size="sm" name="role" id="SelectLm" onChange={handleSelectOptionChange} >
                          <option value="0">Please select</option>

                          {props.itemsRole.map(item => (
                            <option value={item.value} selected={item.label === currentUser.role} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="selectSm">Status</CLabel>
                      </CCol>
                      <CCol xs="8" md="8">
                        <CSelect custom size="sm" name="status" id="SelectLm" onChange={handleSelectOptionChange}>
                          <option value="0">Please select</option>
                          {props.itemsStatus.map(item => (
                            <option value={item.value} selected={item.label === currentUser.status} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </CForm>

                </CCardBody>
                <CCardFooter>

                  <CButton type="submit" size="sm" color="primary" onClick={getValueFormEdit}>Submit</CButton>
                </CCardFooter>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>

        </>
    )
}
export default FormEditUser
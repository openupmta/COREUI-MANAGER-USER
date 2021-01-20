import React, { useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CLink,
  CRow,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CCardFooter,
  CButton
} from '@coreui/react'
import ManagerUserService from "../../services/manager_user/ManagerUserService";
import { useForm } from "react-hook-form";
// import usersData from '../users/UsersData'
import CIcon from '@coreui/icons-react'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = [{ key: 'username', label: 'Name' }, { key: 'create_date', label: 'Registered' }, , 'role', 'status']


const ManagerUser = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showCard, setShowCard] = React.useState(false)
  const [userCurrent, setUserCurrent] = React.useState({})
  const [usersData, setUsersData] = React.useState([])
  const { register:registerSearch, handleSubmit:handleSubmitSearch, setValue:setValueSearch } = useForm({
    defaultValues: {
      filter_name: "",
      role: "0",
      status: "0",
      pageSize: "0",
      pageNumber: "10"
  }});
  const { register:registerEdit, handleSubmit:handleSubmitEdit, setValue:setValueEdit } = useForm();
 
  const getValueFormSearch = (data) =>{
    if(data.role > 0){
      data.role = itemsRole[data.role -1 ].label
    }
    else{
      data.role = ""
    }
    if(data.status > 0){
      data.status = itemsStatus[data.status-1].label
    }
    else{
      data.status = ""
    }

    getAllSearch(data.filter_name, data.role, data.status)
    
  }
  const getValueFormEdit = (data) =>{
    console.log(data)
  }
  const [itemsRole] = React.useState([
    {
      label: "Admin",
      value: "1"
    },
    { label: "Guest", value: "2" },
    { label: "Member", value: "3" },
    { label: "Staff", value: "4" }
  ]);
  const [itemsStatus] = React.useState([
    {
      label: "Inactive",
      value: "1"
    },
    { label: "Active", value: "2" },
    { label: "Pending", value: "3" }
  ]);
  const onClickRowTable = (item) => {
    setShowCard(true)
    getById(item.id)
  }
  
  useEffect(() => {
    getAllSearch("","","");
  }, []);

  const getAllSearch = (filter, role, status, pageNumber=0, pageSize=10) => {
    ManagerUserService.getAllSearch(filter, role, status, pageNumber, pageSize)
      .then(response => {
        setUsersData(response.data.data.users);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getById = (user_id) => {
    ManagerUserService.getById(user_id)
      .then(response => {
        setUserCurrent(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>

              <CForm onChange={handleSubmitSearch(data => getValueFormSearch(data))}>
                <CRow>
                  <CCol xl="4" md="6">
                    <CFormGroup row>
                      <CLabel md="4" col="sm" htmlFor="input-small">Search</CLabel>
                      <CCol md="8">
                        <CInput size="sm" type="text" id="input-small" name="filter_name" innerRef={registerSearch} className="input-sm" placeholder={userCurrent.name} value={userCurrent.name} />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol xl="4" md="6">
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="selectSm">Role</CLabel>
                      </CCol>
                      <CCol xs="9" md="9">
                        <CSelect custom size="sm" name="role" id="SelectLm" 
                        innerRef={registerSearch({setValueAs: (value) => parseInt(value,10)})}>
                          <option value="0">All</option>
                          {itemsRole.map(item => (
                            <option value={item.value} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol xl="4" md="6">
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="selectSm">Status</CLabel>
                      </CCol>
                      <CCol xs="9" md="9">
                        <CSelect custom size="sm" name="status" id="SelectLm" 
                       innerRef={registerSearch({setValueAs: (value) => parseInt(value,10)})}>
                          <option value="0">All</option>
                          {itemsStatus.map(item => (
                            <option value={item.value} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                bordered
                header
                clickableRows
                itemsPerPage={5}
                pagination
                hover
                onRowClick={(item) => onClickRowTable(item)}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    )

                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="4" className={!showCard ? "manager-user-show-none-card" : ""}>
          <CFade>
            <CCard>
              <CCardHeader>
                Card users
                <div className="card-header-actions">
                  <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                    <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                  </CLink>
                  <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                    <CIcon name="cil-x-circle" />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody>
                  {console.log('tien')}
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal" onChange={handleSubmitEdit(data => getValueFormEdit(data))}>
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_username" name="edit_username" className="input-sm" value={userCurrent.username} innerRef={registerEdit} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">First Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_first_name" name="edit_first_name" className="input-sm" value={userCurrent.first_name} innerRef={registerEdit} />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CLabel sm="4" col="sm" htmlFor="input-small">Last Name</CLabel>
                      <CCol sm="8">
                        <CInput size="sm" type="text" id="edit_last_name" name="edit_last_name" className="input-sm"  value={userCurrent.last_name} innerRef={registerEdit}/>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="selectSm">Role</CLabel>
                      </CCol>
                      <CCol xs="8" md="8">
                        <CSelect custom size="sm" name="edit_role" id="SelectLm" innerRef={registerEdit}>
                          <option value="0">Please select</option>

                          {itemsRole.map(item => (
                            <option value={item.value} selected={item.label === userCurrent.role} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="selectSm">Status</CLabel>
                      </CCol>
                      <CCol xs="8" md="8">
                        <CSelect custom size="sm" name="edit_status" id="SelectLm" innerRef={registerEdit}>
                          <option value="0">Please select</option>
                          {itemsStatus.map(item => (
                            <option value={item.value} selected={item.label === userCurrent.status} key={item.value}>{item.label}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </CForm>

                </CCardBody>
                <CCardFooter>

                  <CButton type="submit" size="sm" color="primary" >Submit</CButton>
                </CCardFooter>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>

      </CRow>



    </>
  )
}

export default ManagerUser

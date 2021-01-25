import React, { useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CButton
} from '@coreui/react'
import ManagerUserService from "../../services/manager_user/ManagerUserService";
import { useForm } from "react-hook-form";
// import usersData from '../users/UsersData'
import FormEditUser from './FormEditUser';
import Toaster from './NotificationManagerUser';
import ModalCreateUser from './ModalCreateUser';

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
  const [showModal, setShowModal] = React.useState(false)

  const initialNotification = {
    time_out: 3000,
    type: '',
    is_hidden: true
  }
  const [notification, setNotification] = React.useState(initialNotification)

  const initialFormState = {
    create_date: "", first_name: "", id: "", last_name: "",
    password: "",
    role: "",
    status: "",
    username: ""
  }

  const [userCurrent, setUserCurrent] = React.useState(initialFormState)
  const [usersData, setUsersData] = React.useState([])
  const { register: registerSearch, handleSubmit: handleSubmitSearch, setValue: setValueSearch } = useForm({
    defaultValues: {
      filter_name: "",
      role: "0",
      status: "0",
      pageSize: "0",
      pageNumber: "10"
    }
  });


  const getValueFormSearch = (data) => {
    if (data.role > 0) {
      data.role = itemsRole[data.role - 1].label
    }
    else {
      data.role = ""
    }
    if (data.status > 0) {
      data.status = itemsStatus[data.status - 1].label
    }
    else {
      data.status = ""
    }

    getAllSearch(data.filter_name, data.role, data.status)

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
  const updateUser = (id, updatedUser) => {
    setUsersData(usersData.map(user => (user.id === id ? updatedUser : user)))
  }

  useEffect(() => {
    getAllSearch("", "", "");
  }, []);

  const getAllSearch = (filter, role, status, pageNumber = 0, pageSize = 10) => {
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
      <React.Fragment>
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
                            innerRef={registerSearch({ setValueAs: (value) => parseInt(value, 10) })}>
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
                            innerRef={registerSearch({ setValueAs: (value) => parseInt(value, 10) })}>
                            <option value="0">All</option>
                            {itemsStatus.map(item => (
                              <option value={item.value} key={item.value}>{item.label}</option>
                            ))}
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                    <CButton color="success" onClick={() => setShowModal(!showModal)} className="mr-1">Success modal</CButton>
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
          <FormEditUser
            showCard={showCard}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setShowCard={setShowCard}
            userCurrent={userCurrent}
            itemsRole={itemsRole}
            itemsStatus={itemsStatus}
            updateUser={updateUser}
            notification={notification}
            setNotification={setNotification}
          />
          <Toaster
            notification={notification}
          />
          
        </CRow>
        <ModalCreateUser 
            showModal={showModal}
            setModalCreate={setShowModal}
            itemsRole={itemsRole}
            itemsStatus={itemsStatus}
          />
      </React.Fragment>
    </>
  )
}

export default ManagerUser

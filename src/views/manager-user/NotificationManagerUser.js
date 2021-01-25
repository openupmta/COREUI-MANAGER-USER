import React, { useEffect, useState } from 'react'
import {
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
    CAlert,
} from '@coreui/react'

const Toaster = (props) => {
    const [toasts, setToasts] = useState(
        { position: 'top-right', time_out: 3000, type: 'Success' }
    )


    useEffect(() => {
        toasts.time_out = props.notification.time_out
        toasts.type = props.notification.type
        setToasts(toasts)
    }, [props.notification]);
    return (
        <>
            {props.notification.is_hidden === false &&
                <CToaster
                    position={toasts.position}
                >
                    <CToast
                        show={true}
                        autohide={toasts.time_out}
                    // fade={toasts.fade}
                        style={{background:"#2eb85c"}}
                    >
                        <CToastHeader>
                        {toasts.type}
                        </CToastHeader>
                        <CToastBody>
                        {toasts.type}
                        </CToastBody>
                        
                    </CToast>
                </CToaster>
            }
        </>
    )
}

export default Toaster

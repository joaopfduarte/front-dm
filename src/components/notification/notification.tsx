import {useState, useEffect} from 'react'
import {requestForToken, onMessageListener} from '../../firebase';
import {toast} from 'react-toastify';

function Notification() {
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = () => toast(<ToastDisplay/>);

    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    requestForToken();

    onMessageListener()
        .then((payload:any) => {
            setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
        })
        .catch((err:any) => console.log('failed: ', err));

    return null;
}

export default Notification
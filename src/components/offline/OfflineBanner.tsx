import {useOnlineStatus } from "../userStatus/status"

function OfflineBanner() {
  const isOnline = useOnlineStatus()

  return (
    <div>
      {!isOnline && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: 'red',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          zIndex: 9999
        }}>
          Você está offline! Alguns recursos podem não funcionar.
        </div>
      )}
    </div>
  )
}

export default OfflineBanner
const { useState, useEffect, useRef } = React

import { eventBusService } from "../../../services/event-bus.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            console.log('timeoutIdRef.current', timeoutIdRef.current)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }

            timeoutIdRef.current = setTimeout(onCloseMsg, 3000)
        })

        return unsubscribe

    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return <div className={"mail-msg " + msg.type}>
        <span>{msg.txt} <button className="msg-btn fa fa-times" onClick={onCloseMsg}></button></span>


    </div>
}

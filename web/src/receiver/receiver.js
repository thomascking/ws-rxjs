import { useEffect, useState } from "react";
import { webSocket } from "rxjs/webSocket";

const Receiver = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        return webSocket('ws://localhost:8001').subscribe(message => setMessages(m => [...m, message])).unsubscribe;
    }, []);

    return (
        <div>
            <h1>receiver:</h1>
            <ul>
                {messages.map((m, i) => (<li key={i}>{ m.message }</li>))}
            </ul>
        </div>
    );
};

export default Receiver;
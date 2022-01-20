import { useState } from "react";

import { fromFetch } from "rxjs/fetch";

const Sender = () => {
    const [message, setMessage] = useState('');
    const handleSubmit = event => {
        event.preventDefault();
        fromFetch('http://localhost:8000', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
            }),
        }).subscribe();
    }

    return (<div>
        <form onSubmit={ handleSubmit }>
            <input value={message} onChange={ event => setMessage(event.target.value) } />
        </form>
    </div>);
};

export default Sender;
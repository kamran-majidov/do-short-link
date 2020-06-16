import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";

const CreatePage = () => {
    const history = useHistory()
    const {request} = useHttp()
    const message = useMessage()
    const [link, setLink] = useState('')
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const createHandler = async () => {
        const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        console.log(regex.test(link))
        if (!link) {
            message("Can't create empty link!")
            return
        }


        try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
            message('Link created!')
            await history.push(`/detail/${data.link._id}`)
        } catch (e) {
        }
    }

    return (
        <>
            <h4 className="teal-text">Create link</h4>

            <div className="row">
                <div className="col s10" style={{paddingTop: '2rem'}}>
                    <label htmlFor="link">Which link do you want to shorten?</label>
                    <input
                        placeholder="Paste the link here (ex. https://www.youtube.com/)"
                        id="link"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && createHandler()}
                    />
                    <button className="btn waves-effect waves-light teal" onClick={createHandler}>
                        Create
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreatePage;

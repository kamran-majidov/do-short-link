import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import LinksList from "../components/LinksList";
import {AuthContext} from "../context/AuthContext";

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {

        }
    }, [token, request])

    const deleteLink = async (id) => {
        try {
            await request(`/api/link/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(links.filter(item => item._id !== id))
        } catch (e) {}
    }

    useEffect(() => {
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }


    return (
        <>
            {!loading && <LinksList links={links} deleteLink={deleteLink}/>}
        </>
    );
};

export default LinksPage;

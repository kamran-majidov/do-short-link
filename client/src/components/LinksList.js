import React from 'react';
import {Link} from "react-router-dom";


const LinksList = ({links, deleteLink}) => {

    if (!links?.length) {
        return <p className="center">You have not created links yet...</p>
    }

    return (
        <>
            <h4 className="teal-text">Created links</h4>
            <table className="responsive-table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Original</th>
                    <th>Shorted</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link, index) => (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <div className="row">
                                <div className="col s6">
                                    <Link
                                        title="Open detail info"
                                        className="waves-effect waves-light btn teal"
                                        to={`/detail/${link._id}`}
                                    >
                                        <i className="material-icons">launch</i>
                                    </Link>
                                </div>
                                <div className="col s6">
                                    <button
                                        title="Remove link from list"
                                        onClick={() => deleteLink(link._id)}
                                        className="waves-effect waves-light btn red"
                                    >
                                        <i className="material-icons">delete_forever</i>
                                    </button>
                                </div>

                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default LinksList;

import React from 'react';
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className="section">
            <h1 className="header center teal-text">Welcome</h1>
            <div className="row center">
                <h5 className="header col s12 light">
                    Glad to see you on our link shortening service. <br/>
                    On our resource you can shorten any link and send it to <br/>
                    your friends or share on social networks. <br/><br/>

                    You can also view the number of clicks on your link and detailed information about it
                </h5>
            </div>
            <div className="row center">
                <Link
                    to="/create"
                    className="btn-large waves-effect waves-light teal"
                >Start creating a link
                </Link>

                <div>
                    
                </div>
            </div>
            <br/>
        </div>
    );
};

export default MainPage;

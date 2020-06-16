import React from 'react';

const Footer = () => {
    return (
        <footer className="page-footer teal">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Contacts</h5>
                        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your
                            footer content.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li>
                                <a
                                    target="_blank"
                                    className="grey-text text-lighten-3"
                                    href="https://www.linkedin.com/in/djkamry/"
                                >
                                    Linkedin
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    className="grey-text text-lighten-3"
                                    href="mailto:djkamry@gmail.com"
                                >
                                    Gmail
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright darken-3">
                <div className="container center">
                    © {new Date().getFullYear()} DoShortLink
                </div>
            </div>
        </footer>
    );
};

export default Footer;

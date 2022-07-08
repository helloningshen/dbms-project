import React, { useState, useEffect } from 'react'
import classes from "./pop-up.module.scss"

const Modal = ({ children }) => <div className={classes.modal}>{children}</div>;

const Component = () =>
    <div className={classes.component}>
        <h1 className={classes.h1}>
            DBMS - Project
        </h1>
        <div className={classes.content}>
            <div className={classes.box}>
                <h2>Tools and Services Used.</h2>
                <ol style={{ listStyleType: "none" }}>
                    <li>FRONT END
                        <ol className={classes.listOuter}>
                            <li className={classes.list}>
                                Language - React Framework
                            </li>
                            <li className={classes.list}>
                                StyleSheet  -  SCSS
                            </li>
                            <li className={classes.list}>
                                State management - Redux
                            </li>

                        </ol>
                    </li>

                    <li>BACK END
                        <ol className={classes.listOuter}>
                            <li className={classes.list}>
                                Auth Data Storage - REDIS
                            </li>
                            <li className={classes.list}>
                                Database - MYSQL
                            </li>
                            <li className={classes.list}>
                                Language - Node.js
                            </li>

                        </ol>
                    </li>

                </ol>
            </div>


        </div>
        <p className={[classes.bold, classes.danger_color_light].join(' ')}>Press ESC to close</p>
    </div>

const PopUp = (props) => {
    const [showModal, setShowModal] = useState(true);
    const handleKeyup = e => e.keyCode === 27 && setShowModal(false);
    const toggleModal = () => setShowModal(!showModal);

    useEffect(() => {
        if (showModal) window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    });

    return <div>
        {showModal && <Modal>
            <Component />
        </Modal>}
    </div>;
}


export default PopUp
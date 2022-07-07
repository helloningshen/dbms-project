import React, { useState, useEffect } from 'react'

import "./pop-up.css"
const Modal = ({ children }) => <div className='Modal'>{children}</div>;

const Component = () =>
    <div className="Component">
        <h1>
            DBMS PROJECT
        </h1>
    </div>

const PopUp = (props) => {
    const [showModal, setShowModal] = useState(true);
    const handleKeyup = e => e.keyCode === 27 && setShowModal(false);
    const toggleModal = () => setShowModal(!showModal);

    useEffect(() => {
        if (showModal) window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    });

    return <div onClick={toggleModal} className="App">
        App - click window
        {showModal && <Modal>
            <Component />
        </Modal>}
    </div>;
}


export default PopUp
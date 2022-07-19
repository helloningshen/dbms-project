import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from "../../Components/MasonryLayout/MasonryBox/MasonryBox2"
import { storeArchive } from '../../features/file-slice';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from "../../Components/Modal"
import Box from "@mui/material/Box"


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



export default function BasicTabs() {

    const dispatch = useDispatch()
    const { archive } = useSelector(store => store.fileList)
    const [value, setValue] = React.useState(0);





    const { downloadModal } = useSelector(store => store.modal)
    const { currentUrl } = useSelector(store => store.fileList)

    const downloadDocument = (id, url) => {
        dispatch(downloadOne({ id, path: url, mimetype: "application/pdf" }))
        dispatch(openDownloadModal())
    }
    const handleCloseModal = () => dispatch(closeDownloadModal())




    const ms1 = () => {
        return archive.map((item, idx) => {
            if (item.bookType == "msc1") {
                const { id, url } = item;

                return (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 24, padding: 12, background: "#90e0ef" }}>
                        <a key={idx} >{idx + 1}  &rarr; {item.name.toUpperCase()}</a>
                        <p style={{ fontStyle: "italic", color: "#e36414" }}>Author: {item.author}</p>
                        <button onClick={() => downloadDocument(id, url)}>
                            <DownloadIcon style={{ color: "blue", fontSize: "24" }} />
                        </button>
                    </div>)
            }

        })
    }



    const ms2 = () => {
        return archive.map((item, idx) => {
            if (item.bookType == "msc2") {
                const { id, url } = item;
                return (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 24, padding: 12, background: "#90e0ef" }}>
                        <a key={idx} >{idx + 1}  &rarr; {item.name.toUpperCase()}</a>
                        <p style={{ fontStyle: "italic", color: "#e36414" }}>Author: {item.author}</p>
                        <button onClick={() => downloadDocument(id, url)}>
                            <DownloadIcon style={{ color: "blue", fontSize: "24" }} />
                        </button>
                    </div>)
            }

        })
    }


    const ms3 = () => {
        return archive.map((item, idx) => {
            if (item.bookType == "msc3") {
                const { id, url } = item;

                return (
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 24, padding: 12, background: "#90e0ef" }}>
                        <a key={idx} >{idx + 1}  &rarr; {item.name.toUpperCase()}</a>
                        <p style={{ fontStyle: "italic", color: "#e36414" }}>Author: {item.author}</p>
                        <button onClick={() => downloadDocument(id, url)}>
                            <DownloadIcon style={{ color: "blue", fontSize: "24" }} />
                        </button>
                    </div>)
            }

        })
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <>
            <Modal open={downloadModal} btn={"Download File."}>
                <div>
                    <a href={currentUrl} target="_blank" onClick={handleCloseModal}>Download Your file</a>
                </div>
            </Modal>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab style={{ color: "white", fontSize: 30, paddingRight: 60 }} label="MSC-I" />
                        <Tab style={{ color: "white", fontSize: 30, paddingRight: 60 }} label="MSC-II" />
                        <Tab style={{ color: "white", fontSize: 30, paddingRight: 60 }} label="MSC-III" />
                        <Tab style={{ color: "white", fontSize: 30 }} label="MSC-IV" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} style={{ backgroundColor: "white" }}>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "space-between", justifyContent: "space-between", padding: 20 }}>
                        {
                            ms1()
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ backgroundColor: "white" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "space-between", justifyContent: "space-between", padding: 20 }}>
                        {
                            ms2() || <h1>No book available.</h1>
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} style={{ backgroundColor: "white" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "space-between", justifyContent: "space-between", padding: 20 }}>
                        {
                            ms3()
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3} style={{ backgroundColor: "white" }}>
                    Project.
                </TabPanel>
            </Box>
        </>
    );
}

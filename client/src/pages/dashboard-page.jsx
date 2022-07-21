import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, InputBase, IconButton } from '@mui/material';
import { ToastContainer } from "react-toastify";
import MasonryLayout from './components/masonry/masonry-layout';
import ContainerCard from './components/container-card/container-card'
import Header from "./components/header/header"
import SearchIcon from '@mui/icons-material/Search';
import debouce from 'lodash.debounce';

const Dashboard = () => {
    const { docs, success } = useSelector((store) => store.fileList);
    const [searchTerm, setSearchTerm] = useState("");
    let listToDisplay = docs;
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    if (searchTerm !== "") {
        listToDisplay = docs.filter((fruit) => {
            return fruit.name.includes(searchTerm);
        });
    }
    const debouncedResults = useMemo(() => {
        return debouce(handleChange, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });



    return (
        <>
            {success && <ToastContainer />}
            <Header />
            <div className="flex justify-content-center" >
                <div style={{ color: "white" }}>
                </div>
                <ContainerCard>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', float: "right", width: 900 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                onChange={debouncedResults}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>

                    </div>
                    <MasonryLayout docs={listToDisplay} />
                </ContainerCard>
            </div>
        </>
    )
}

export default Dashboard
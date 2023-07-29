import makeData from "@/components/makeData";
import Pagination from "@/components/pagination";
import {useEffect, useState} from "react";
import {Autocomplete, IconButton, TextField} from "@mui/material";

import InfoIcon from '@mui/icons-material/Info';
import MyModal from "@/components/myModal";



export default function MyTable() {

    // const t = makeData(90);
    const copyOfOrginalTable = makeData(90);
    const [tableData, setTableData] = useState(copyOfOrginalTable);
    // setTableData(t)
    // let tableData = makeData(90);
    //
    // console.log("tableData: ",tableData)
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);
    const firstPersonInTable = currentPage * postsPerPage - (postsPerPage-1);
    const lastPersonInTable = currentPage * postsPerPage;

    //styles
    const tdStyles = "border-x-2 border-x-gray text-center";
    const thStyles = "px-20";

    let subset = tableData.slice(firstPersonInTable-1, lastPersonInTable)

    // modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [modalData, setModalData] = useState({age: 0, visits: 0, progress: 0, status: "aaa"});

    const clickAction = (data) => {
        setOpen(true);
        setModalData(data)
    }

    //search
    const [searchValue, setSearchValue] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const handleSearch = () => {
        console.log()
        switch (searchBy) {
            case "age":
                console.log("new age is:",searchValue)
                setTableData(copyOfOrginalTable.filter((row)=> row.age == searchValue))
                break
            case "visits":
                console.log("new visits is:",searchValue)
                setTableData(copyOfOrginalTable.filter((row)=> row.visits == searchValue))
                // tableData = tableData.filter(()=>filterOnVisits())
                break
            case "progress":
                console.log("new progress is:",searchValue)
                setTableData(copyOfOrginalTable.filter((row)=> row.progress == searchValue))
                break
            case "status":
                console.log("new status is:",searchValue)
                setTableData(copyOfOrginalTable.filter((row)=> row.status == searchValue))
                break
        }
        console.log("copyOfOrginalTable",copyOfOrginalTable)
        console.log("dataTable",tableData)
    }


    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }



    return (
        <>
            <div>
                <Autocomplete
                    disablePortal
                    value={searchBy||null}
                    onChange={(event, newValue) => {
                        setSearchBy(newValue);
                    }}
                    id="combo-box"
                    options={["age", "visits","progress", "status"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="search by" />}
                />
                <TextField
                    id="searchInput"
                    label="search input"
                    onChange={e=> setSearchValue(e.target.value)}
                    variant="outlined"
                />

                <button className="bg-gray" onClick={handleSearch}>search</button>

            </div>









            <table className="table-auto border-x-2 border-x-gray">
                <thead className="bg-gray">
                <tr>
                    <th>#</th>
                    <th className={thStyles}>age</th>
                    <th className={thStyles}>visits</th>
                    <th className={thStyles}>progress</th>
                    <th className={thStyles}>status</th>
                    <th className={thStyles}>action</th>
                </tr>
                </thead>
                <tbody>

                {subset.map((person, index) => {
                    return (
                        <tr key={index} className={`border-b-2 border-b-gray ${person.status === "single"? "bg-light-red" :""}`}>
                            <td>{index+firstPersonInTable}</td>
                            <td className={tdStyles}>{person.age}</td>
                            <td className={tdStyles}>{person.visits}</td>
                            <td className={tdStyles}>{person.progress}</td>
                            <td className={tdStyles}>{person.status}</td>
                            <td className={tdStyles}>
                                <IconButton onClick={()=>clickAction(person)}><InfoIcon /></IconButton>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>


            <Pagination
                postsPerPage={postsPerPage}
                totalRows={90}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
                firstPersonInTable={firstPersonInTable}
                lastPersonInTable={lastPersonInTable}
            />

            <MyModal
                open={open}
                handleClose={handleClose}
                modalData={modalData}
            />
        </>

    )
}
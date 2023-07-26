import makeData from "@/components/makeData";
import Pagination from "@/components/pagination";
import {useEffect, useState} from "react";
import {IconButton} from "@mui/material";

import InfoIcon from '@mui/icons-material/Info';
import MyModal from "@/components/myModal";



export default function MyTable() {

    const tableData = makeData(90);

    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 12;


    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    const firstPersonInTable = currentPage * postsPerPage - (postsPerPage-1);
    const lastPersonInTable = currentPage * postsPerPage;

    const tdStyles = "border-x-2 border-x-gray text-center";
    const thStyles = "px-20";

    let subset = tableData.slice(firstPersonInTable, lastPersonInTable)

    // modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [modalData, setModalData] = useState({age: 0, visits: 0, progress: 0, status: "aaa"});


    // setShowModal(true);
    const clickAction = (data) => {
        setOpen(true);
        setModalData(data)
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
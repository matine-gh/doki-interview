import makeData from "@/components/makeData";
import Pagination from "@/components/pagination";
import {useState} from "react";

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}


export default function MyTable() {

    const tableData = makeData(90);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;


    // console.log(makeData(20));
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tableData.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);

    const firstPersonInTable = currentPage * postsPerPage - (postsPerPage-1);
    const lastPersonInTable = currentPage * postsPerPage;

    const tdStyles = "border-x-2 border-x-gray text-center";
    const thStyles = "px-20";

    let subset = tableData.slice(firstPersonInTable, lastPersonInTable)


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
                </tr>
                </thead>
                <tbody>

                {subset.map((person, index) => {
                    return (
                        <tr key={index} className="border-b-2 border-b-gray">
                            <td>{index+firstPersonInTable}</td>
                            <td className={tdStyles}>{person.age}</td>
                            <td className={tdStyles}>{person.visits}</td>
                            <td className={tdStyles}>{person.progress}</td>
                            <td className={tdStyles}>{person.status}</td>
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


        </>

)
}
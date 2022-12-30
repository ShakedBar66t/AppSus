const { useState, useEffect, useRef } = React

export function MailFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState({ txt: '' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const elInputRef = useRef({ txt: '' });

    function handleChange(event) {
        const { value } = event.target;
        setFilterBy({ txt: value });
    }


    function onSubmitFilter(event) {
        event.preventDefault();
        console.log(filterBy); // print the value of the filterBy object
        console.log(onSetFilter); // print the value of the onSetFilter function
        onSetFilter(filterBy);
    }

    function deleteInput() {
        // elInputRef.current.value = '';
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <section className="mail-filter ">
            <form className="mail-filter-form" onSubmit={onSubmitFilter}>
                <button className="search-btn  fa fa-search" />
                <input
                    className="search-input"
                    type="text"
                    id="vendor"
                    name="txt"
                    placeholder="Search mail"
                    ref={elInputRef}
                    value={elInputRef.current.value}
                    onChange={handleChange}
                />
                <span onClick={deleteInput} className=" close fa fa-times" />
                <div className="dropdown">
                    <div className="fa fa-filter select" onClick={toggleDropdown} />
                    <ul
                        className={
                            isDropdownOpen ? 'menu flex active clean-list' : 'menu flex clean-list'
                        }
                    >
                        <li className="menu-item btn-nav">All</li>
                        <li className="menu-item btn-nav">Read</li>
                        <li className="menu-item btn-nav">Unread</li>
                    </ul>
                </div>
            </form>
        </section>
    );

}



// export function MailFilter({ onSetFilter }) {

//     const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
//     const elInputRef = useRef(null)




//     function onSubmitFilter(ev) {
//         console.log('ch')
//         ev.preventDefault()
//     }

//     function deleteInput() {
//         elInputRef.current.value = '';
//     }


//     function toggleDropdown() {
//         console.log(isDropdownOpen)
//         setIsDropdownOpen(!isDropdownOpen);
//         console.log(isDropdownOpen)
//     };

//     return <section className="mail-filter ">
//         <form className="mail-filter-form" onSubmit={onSubmitFilter} >
//             <button className="search-btn  fa fa-search"></button>
//             <input className="search-input"
//                 type="text"
//                 id="vendor"
//                 name="txt"
//                 placeholder="Search mail"
//                 // value={filterByToEdit.txt}
//                 // onChange={handleChange}
//                 ref={elInputRef}
//             />
//             <span onClick={() => deleteInput()} className=" close fa fa-times"></span>
//             <div className="dropdown">
//                 <div className="fa fa-filter select" onClick={toggleDropdown}></div>
//                 <ul className={(isDropdownOpen) ? 'menu flex active clean-list' : 'menu flex clean-list'}>
//                     <li className="menu-item btn-nav">All</li>
//                     <li className="menu-item btn-nav">Read</li>
//                     <li className="menu-item btn-nav">Unread</li>
//                 </ul>
//             </div>

//         </form>
//     </section>
// }
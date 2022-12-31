const { Link } = ReactRouterDOM

export function HeaderModal(){

    function onCloseModal(){
        closeModal()
    }

    return (
        <section className="header-modal flex align-center">
            <Link to="/note" onClick={onCloseModal}>
                <i className="fa-solid fa-file-pen note-pick"></i>
            </Link>
            <Link to="/mail/inbox" onClick={onCloseModal}>
                <i className="fa-solid fa-envelopes-bulk mail-pick"></i>
            </Link>
            <Link to="/book" onClick={onCloseModal}>
                <i className="fa fa-book book-pick"></i>
            </Link>

        </section>
    )
}
const { Link } = ReactRouterDOM

export function HeaderModal({ onCloseModal }) {
    console.log(closeModal)
    function closeModal() {
        onCloseModal()
    }

    return (
        <section className="header-modal flex align-center">
            <Link to="/note" onClick={closeModal}>
                <i className="fa-solid fa-file-pen note-pick"></i>
            </Link>
            <Link to="/mail/inbox" onClick={closeModal}>
                <i className="fa-solid fa-envelopes-bulk mail-pick"></i>
            </Link>
            <Link to="/book" onClick={closeModal}>
                <i className="fa fa-book book-pick"></i>
            </Link>

        </section>
    )
}
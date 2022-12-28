const { Link } = ReactRouterDOM

export function AddNote(){
    return (
        <section>
            <Link to="/note/edit">
                <div>
                    <button className="add-note-button">+</button>
                </div>
            </Link>
        </section>
    )
}
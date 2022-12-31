const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect, useRef } = React


import { BookIndex } from "./apps/books/pages/book-index.jsx"
import { BookDetails } from "./apps/books/pages/book-details.jsx"
import { BookEdit } from "./apps/books/pages/book-edit.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteEdit } from "./apps/note/views/note-edit.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { UserMsg } from "./apps/mail/cmps/user-msg.jsx"
import { AppFooter } from "./cmps/app-footer.jsx"



export function App() {

    const [filterByFromFilter, setfilterByFromFilter] = useState()
    function useFilter(filterBy) {
        setfilterByFromFilter(filterBy)
    }


    return <Router>
        <section className="app">
            <AppHeader useFilter={useFilter} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mail/inbox/" element={<MailIndex filterByFromFilter={filterByFromFilter} />} >
                    <Route path="/mail/inbox/:starred" element={<MailIndex />} />
                    <Route path="/mail/inbox/:sent" element={<MailIndex />} />
                    <Route path="/mail/inbox/:drafts" element={<MailIndex />} />
                    <Route path="/mail/inbox/:bin" element={<MailIndex />} />
                </Route>
                <Route path="/details" element={<MailDetails />} />
                <Route path="/details/:mailId" element={<MailDetails />} />


                <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
            </Routes>
            <AppFooter />
        </section>
    </Router >
}

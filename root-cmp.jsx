const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

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



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/details" element={<MailDetails />} />
                <Route path="/details/:mailId" element={<MailDetails />} />


                <Route path="/note/edit" element={<NoteEdit />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
            </Routes>
        </section>
    </Router>
}

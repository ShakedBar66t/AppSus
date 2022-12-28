import { DataTable } from "./data-table/data-table.jsx"


export function MailList({ mails }) {
    console.log(mails)
    return <ul className="mails-list clean-list">
        {
            // mails.map(mail => console.log(mail.id))
            // mails.map(mail =>
            //     <li key={mail.id}>
            //         <article >

            //             <h1> {mail.id}</h1>
            //         </article>
            //     </li>)
            <DataTable mails={mails}></DataTable>

        }
    </ul>

}

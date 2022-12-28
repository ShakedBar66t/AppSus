import { MailPreview } from "./mail-preview.jsx"


export function MailList({ mails }) {
    console.log(mails)
    return <table border="0">
        <thead className="table-head">
            <tr>
                <th></th>
                <th>from </th>
                <th>mail</th>
                <th>time</th>
            </tr>
        </thead>
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </tbody>
    </table>

}
/// better is to filter by object keys like star or bin
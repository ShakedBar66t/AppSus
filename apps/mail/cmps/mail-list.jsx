import { MailPreview } from "./mail-preview.jsx"


export function MailList({ mails }) {
    console.log(mails)
    return <table border="1">
        <thead>
            <tr>
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

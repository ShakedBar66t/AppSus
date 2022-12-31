import { MailPreview } from "./mail-preview.jsx"
const { useParams, Link } = ReactRouterDOM


export function MailList({ mails, mailRead }) {

    return (
        <table border="0">
            <thead>
                <tr className="tr-head">
                    <th></th>
                    <th></th>
                    <th>from</th>
                    <th>mail</th>
                    <th>time</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                {mails.map(mail => (
                    <MailPreview key={mail.id} mail={mail} mailRead={mailRead} />
                ))}
            </tbody>
        </table>
    );


}
/// better is to filter by object keys like star or bin



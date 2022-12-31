import { MailFilter } from "./mail-filter.jsx";
import { MailNav } from "./mail-nav.jsx";
import { MailPreview } from "./mail-preview.jsx"
const { useParams, Link } = ReactRouterDOM


export function MailList({ mails, mailRead, setIsOpen }) {

    return (
        <table border="0">
            <thead>
                <tr className="tr-head">
                    <th className="mail-nav-phone"><MailNav setIsOpen={setIsOpen} /> <MailFilter /> </th>
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



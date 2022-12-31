import { MailFilter } from "./mail-filter.jsx";
import { MailNav } from "./mail-nav.jsx";
import { MailPreview } from "./mail-preview.jsx"
const { useState } = React


export function MailList({ mails, mailRead, setIsOpen }) {

    const [isOpen, setIsNavOpen] = useState(false);

    function handleClick() {
        setIsNavOpen(!isOpen);
    }

    return (
        <table border="0">
            <thead>
                <tr className="tr-head">
                    <td className="mail-nav-button fa fa-arrow-right" onClick={handleClick}></td>
                    <th className={`mail-nav-phone ${isOpen ? 'open' : 'close'}`}><MailNav setIsOpen={setIsOpen} handleClick={handleClick} /> </th>
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



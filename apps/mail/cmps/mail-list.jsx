import { MailPreview } from "./mail-preview.jsx"
const { useParams, Link } = ReactRouterDOM


export function MailList({ mails }) {

    const params = useParams()
    const values = Object.values(params);
    const param = values[0];
    // console.log(paramValue)
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
            {mails.map(mail => <MailPreview param={param} key={mail.id} mail={mail} />)}
        </tbody>
    </table>

}
/// better is to filter by object keys like star or bin
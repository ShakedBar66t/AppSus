import { DataTableRow } from "./data-table-row.jsx"

const { useState, useEffect } = React

export function DataTable({ mails }) {

    return <table border="1">
        <thead>
            <tr>
                <th>from </th>
                <th>mail</th>
                <th>time</th>
            </tr>
        </thead>
        <tbody>
            {mails.map(mail => <DataTableRow key={mail.id} mail={mail} />)}
        </tbody>
    </table>
}

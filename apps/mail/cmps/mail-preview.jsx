const { useState, useEffect, Fragment } = React
const { Link, useNavigate } = ReactRouterDOM

export function MailPreview({ mail }) {
    const navigate = useNavigate()


    return <tr onClick={() => navigate(`/details/${mail.id}`)}>
        <td>id: {mail.id}</td>
        <td>sub: {mail.subject}</td>
        <td>at: {mail.sentAt}</td>
    </tr>


}

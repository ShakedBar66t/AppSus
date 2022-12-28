const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ mail }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            <td>id :{mail.id}</td>
            <td>sub{mail.subject}</td>
            <td>at {mail.sentAt}</td>
            {/* <td>
                <Link to={`/car/${car.id}`}>Details</Link> |
                <Link to={`/car/edit/${car.id}`}>Edit</Link>
            </td> */}
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <p>Lorem ipsum dolor</p>
            </td>
        </tr>
    </Fragment>

}

const { useRef } = React
import { utilService } from "../services/util.service.js"

const { Outlet, NavLink } = ReactRouterDOM

export function About() {

    const titleRef = useRef()
    const style = {
        backgroundColor: 'lightcoral',
        padding: 'Spx', margin: '5px'
    }

    return <section className="about">
        <h3 className="animate__animated animate__bounce"> welcome to our about page</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa distinctio a perferendis vitae, ad est ex fuga aliquam reprehenderit vero beatae fugiat, quam voluptate iure delectus commodi, repellat ullam accusantium!</p>

        <hr />
        <section style={style}>
            <h4 ref={titleRef}>Lets Go</h4>
            <button onClick={() => {
                utilService.animateCSS(titleRef.current, 'jackInTheBox')
            }}>Go</button>
        </section>
        <hr />


        <nav>
            <NavLink to="/about">Index</NavLink> |
            <NavLink to="/about/team">Team</NavLink> |
            <NavLink to="/about/vision">Vision</NavLink>
        </nav>

        <div className="nested-route">
            <Outlet />
        </div>
    </section>
}
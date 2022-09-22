import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logo">THIS IS LOGO</div>
            <Link to="/">Logo</Link>
            <Link to="/todo">TodoList</Link>
            <Link to="/memo">Memo</Link>
        </header>
    )
}
export default Header
  
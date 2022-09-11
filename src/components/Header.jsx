import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Link to="/">Logo</Link>
            <Link to="/todo">TodoList</Link>
            <Link to="/memo">Memo</Link>
        </div>
    )
}
export default Header
  
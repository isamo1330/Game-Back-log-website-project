import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Game Backlog</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
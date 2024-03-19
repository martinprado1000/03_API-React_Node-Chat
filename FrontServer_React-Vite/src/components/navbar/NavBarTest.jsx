
import {
  NavLink,
} from "react-router-dom";

function NavBarTest() {
    return (
      <nav>
        test
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Registrar</NavLink>
        </li>

      </ul>
    </nav>
      );
    }

export default NavBarTest;

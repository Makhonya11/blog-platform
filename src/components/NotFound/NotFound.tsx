import { Link } from "react-router";

const NotFound = () => (
    <h1>
        Такой страницы не существует, 
        <Link to={'/'}>
        вернуться на главную страницу
        
        </Link>
    </h1>
)

export default NotFound

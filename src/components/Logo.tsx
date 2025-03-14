import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link
      to="/">
      <img
        src="/Logo.svg"
        alt="logo"
        className="w-36 block md:w-48" />
    </Link>
  )
}

export default Logo
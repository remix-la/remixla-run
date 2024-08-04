
import { Link } from "@remix-run/react";

interface ButtonProps {
  link: string;
  text: string;
  class: string;
}

const LinkButton = (props: ButtonProps ) => {

    return (
      <Link
      to={props.link}
      className={props.class}
    >
      {props.text}
    </Link>
    )
}

export default LinkButton
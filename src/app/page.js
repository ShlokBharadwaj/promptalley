import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
}

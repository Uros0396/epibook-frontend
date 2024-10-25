import { render } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";

test("test del component Welcome", () => {
  render(<Welcome />);
});

//npm i -D jest babel-jest @testing-library/react @testing-library/jest-dom @babel/preset-env @babel/preset-react

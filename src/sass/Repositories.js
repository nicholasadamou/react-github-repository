
import styled from "styled-components";

import { device, until } from "../utilities/mixins";

const Repositories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin: 2rem 1rem 2rem;

  text-align: left;

  ${until(
    device.iPad(),
    () => `
		grid-template-columns: 1fr;
	`
  )}

  ${until(
    device.iPhone(),
    () => `
		grid-template-columns: 1fr;

		margin: 0;
	`
  )}
`;

export default Repositories;

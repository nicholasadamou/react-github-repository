import React from "react";

import Layout from "./components/Layout/Layout";
import Repository from "./components/Repository/Repository";

import Repositories from "./sass/Repositories";

const App = () => Layout(() => (
	<Repositories>
		{Repository('minipwner')}
		{Repository('auto-wifi-hotspot')}
		{Repository('pifi')}
	</Repositories>
));

export default App;

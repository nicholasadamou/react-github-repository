import React from "react";

import "carbon-components/scss/globals/scss/styles.scss";

import { Helmet } from "react-helmet";

import GlobalStyles from "../../sass/GlobalStyles";

import Fonts from "../../assets/Fonts/Fonts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faStar,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faHeart, faStar, faCodeBranch);

const Layout = (content) => (
	<>
		<GlobalStyles />
		<Fonts />
		<Helmet htmlAttributes={{ lang: "en" }} title="React Starter Kit">
			<link rel="icon" href="/assets/favicons/favicon.ico" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/assets/favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/assets/favicons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/assets/favicons/favicon-16x16.png"
			/>
		</Helmet>
		{content()}
	</>
);

export default Layout;

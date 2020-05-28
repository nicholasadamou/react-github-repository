import React, { useState, useEffect } from "react";

import { SkeletonText } from "carbon-components-react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

import { device, until } from "../../utilities/mixins";

import { github } from "../../utilities/utilities";

const Container = styled.article`
  margin: 10px 20px;

  font-size: var(--copy-size);

  ${until(
    device.iPhone(),
    () => `
		width: 100%;
    max-width: 100%;

    margin: 10px 0;
    padding: 0 20px;
	`
  )}

  a {
    text-decoration: none;
    color: var(--black);
  }

  div {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;

    margin-bottom: 10px;

    span > div {
      display: inline-block;

      margin: 0;
    }

    div {
      display: inline-block;

      margin: 0;

      width: 100%;
    }

    svg[data-prefix="fas"] {
      -webkit-transition: all 0.25s ease-in-out;
      transition: all 0.25s ease-in-out;

      &:hover {
        -webkit-transform: scale(1.25);
        transform: scale(1.25);
      }
    }

    a {
      color: var(--red);
      font-size: var(--copy-size);
      text-decoration: none;

      -webkit-transition: color 0.25ms ease-in-out;

      transition: color 0.25ms ease-in-out;

      &:hover {
        color: var(--light-grey);
      }

      span {
        padding: 5px;

        background: var(--grey);
        border-radius: 5px;

        &[role="img"] {
          margin-left: 10px;
        }

        &[aria-label="title"] {
          color: var(--red);

          text-decoration: underline;

          &:hover {
            color: var(--light-grey);
          }
        }

        &[aria-label="star"],
        &[aria-label="branch"] {
          font-weight: normal;
        }

        &[aria-label="star"] {
          color: var(--yellow);
        }

        &[aria-label="branch"] {
          color: var(--black);
        }
      }
    }
  }
`;

// Round the number like "3.5k" https://stackoverflow.com/a/9461657
const round = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

const useGitHub = (repositoryName) => {
  const [repository, setRepository] = useState({});

  useEffect(() => {
    function fetchRepository() {
      github
        .getRepo(github.__auth.username, repositoryName)
        .getDetails()
        .then((response) => {
          const { name, description, html_url, stargazers_count, forks_count } = response.data;

          setRepository({
            name: name.toLowerCase(),
            description,
						link: html_url,
						stars: stargazers_count,
						forks: forks_count
          });
        });
    }

    fetchRepository();
  }, [repositoryName, repository]);

  return repository;
};

const Repository = (repositoryName) => {
  const repository = useGitHub(repositoryName);

	if (true) return <SkeletonRepository />;

  const { id, name, description, link, stars, forks } = repository;

  return (
		<Container key={id}>
			<div>
				<a
					href={link}
					target="_blank"
					aria-hidden="true"
					rel="noopener noreferrer"
					className="link"
				>
					<span aria-label="title">{name}</span>
				</a>
				<a
					href={link}
					target="_blank"
					aria-hidden="true"
					aria-label={`${name} github stars`}
					title="star"
					rel="noopener noreferrer"
				>
					<span role="img" aria-label="star">
						<FontAwesomeIcon icon={["fas", "star"]} /> {round(stars)}
					</span>
				</a>
				<a
					href={`${link}/fork`}
					target="_blank"
					aria-hidden="true"
					aria-label={`fork ${name} on github`}
					title="fork"
					rel="noopener noreferrer"
				>
					<span role="img" aria-label="branch">
						<FontAwesomeIcon icon={["fas", "code-branch"]} /> {round(forks)}
					</span>
				</a>
			</div>
			<p>{description}</p>
		</Container>
  );
};

const SkeletonRepository = (id) => (
  <Container key={id}>
    <div>
      <span aria-label="title">
        <CircularProgress />
      </span>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        target="_blank"
        aria-hidden="true"
        aria-label={`github stars`}
        title="star"
        rel="noopener noreferrer"
      >
        <span role="img" aria-label="star">
          <FontAwesomeIcon icon={["fas", "star"]} />
          <>
            {" "}
            <CircularProgress />
          </>
        </span>
      </a>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        target="_blank"
        aria-hidden="true"
        aria-label={`fork on github`}
        title="fork"
        rel="noopener noreferrer"
      >
        <span role="img" aria-label="branch">
          <FontAwesomeIcon icon={["fas", "code-branch"]} />
          <>
            {" "}
            <CircularProgress />
          </>
        </span>
      </a>
    </div>
    <div>
      <SkeletonText heading={false} lineCount={2} paragraph width="100%" />
    </div>
  </Container>
);

export default Repository;

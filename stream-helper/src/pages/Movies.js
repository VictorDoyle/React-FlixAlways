import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
/* components */
import NavigationBar from "../components/Navbar/NavigationBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import moviesHeroImage from "../media/moviesHeroImage.jpg";
// import MovieCard from "../components/MovieCard/MovieCard";
import CheckUser from "../hooks/checkUser";
import AmazonPrimeMovies from "../components/providers/AmazonPrimeMovies";
import DisneyPlusMovies from "../components/providers/DisneyPlusMovies";
import HboMaxMovies from "../components/providers/HboMaxMovies";
import HuluMovies from "../components/providers/HuluMovies";
import NetflixMovies from "../components/providers/NetflixMovies";
/* gql */
import { useQuery } from "@apollo/client";
import { USERMOVIERECOMMENDATIONS } from "../graphql/operations";
/* vendor imports */
import InfiniteRecommendations from "../components/Infinite/InfiniteRecommendations";
function Movies({ history }) {
  /* Hero banner content */
  const heroTitle = "Welcome To FlixAlways";
  const heroText = "These Movies Will Update As You Use FlixAlways";
  const mainImage = { moviesHeroImage };
  const [userMovieRecommendations, setUserMovieRecommendations] = useState();
  /* base states */
  const [take] = useState(20);
  const [cursor, setCursor] = useState(1);
  const [skip, setSkip] = useState(0);
  const [providerfilter, setProviderfilter] = useState(false);
  const [providerid, setProviderid] = useState();
  const [incrementingCursor, setIncrementingCursor] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const { loading: loadingAll, data: dataAll, fetchMore } = useQuery(
    USERMOVIERECOMMENDATIONS,
    {
      variables: {
        userMovieRecommendationsTake: take,
        userMovieRecommendationsSkip: skip,
        userMovieRecommendationsMyCursor: cursor,
      },
    },
  );

  useEffect(() => {
    if (loadingAll === false && dataAll) {
      setUserMovieRecommendations(dataAll.userMovieRecommendations);
    }
    if (userMovieRecommendations) {
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1]
          .categoryId,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAll, dataAll]);

  const bigFetch = () => {
    fetchMore(
      {
        variables: {
          userMovieRecommendationsMyCursor: /* userMovieRecommendations.length */ incrementingCursor,
        },
      },
      setCursor(
        userMovieRecommendations[userMovieRecommendations.length - 1]
          .categoryId,
      ),
    );
    if (loadingAll === false) {
      setIncrementingCursor(incrementingCursor + 20);
    }
  };

  console.log(incrementingCursor, "===== movie page");

  return (
    <>
      <NavigationBar />
      <CheckUser history={history} />
      <HeroBanner
        heroText={heroText}
        heroTitle={heroTitle}
        mainImage={mainImage}
        history={history}
      />
      {userMovieRecommendations ? (
        <>
          <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderfilter(false);
                }}
                href="/home"
              >
                Show All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderid(8);
                  setProviderfilter(true);
                }}
                eventKey="link-1"
              >
                {" "}
                <img
                  src={`https://www.themoviedb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg`}
                  className="providersImage"
                  alt="provider stream platform Icon"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderid(384);
                  setProviderfilter(true);
                }}
                eventKey="link-2"
              >
                {" "}
                <img
                  src={`https://www.themoviedb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg`}
                  className="providersImage"
                  alt="provider stream platform Icon"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderid(15);
                  setProviderfilter(true);
                }}
                eventKey="link-3"
              >
                {" "}
                <img
                  src={`https://www.themoviedb.org/t/p/original//giwM8XX4V2AQb9vsoN7yti82tKK.jpg`}
                  className="providersImage"
                  alt="provider stream platform Icon"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderid(9);
                  setProviderfilter(true);
                }}
                eventKey="link-4"
              >
                {" "}
                <img
                  src={`https://www.themoviedb.org/t/p/original/68MNrwlkpF7WnmNPXLah69CR5cb.jpg`}
                  className="providersImage"
                  alt="provider stream platform Icon"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setProviderid(337);
                  setProviderfilter(true);
                }}
                eventKey="link-5"
              >
                {" "}
                <img
                  src={`https://www.themoviedb.org/t/p/original/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg`}
                  className="providersImage"
                  alt="provider stream platform Icon"
                />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <>
            {!providerid ? (
              <>
                <InfiniteRecommendations
                  userMovieRecommendations={userMovieRecommendations}
                  onLoadMore={bigFetch}
                  cursorLength={incrementingCursor}
                />
              </>
            ) : (
              <></>
            )}
          </>
          <>{providerid === 8 ? <NetflixMovies providerId={8} /> : <></>}</>
          <>{providerid === 9 ? <AmazonPrimeMovies providerId={9} /> : <></>}</>
          <>{providerid === 384 ? <HboMaxMovies providerId={384} /> : <></>}</>
          <>{providerid === 15 ? <HuluMovies providerId={15} /> : <></>}</>
          <>
            {providerid === 337 ? <DisneyPlusMovies providerId={337} /> : <></>}
          </>
        </>
      ) : null}
    </>
  );
}

export default Movies;

import React, {useState, useEffect} from "react";
/* components */
import NavigationBar from "../components/Navbar/NavigationBar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieCard from '../components/MovieCard/MovieCard'
/* gql */
import { useQuery } from "@apollo/client";
import { USERMOVIERECOMMENDATIONS } from "../graphql/operations";
/* vendor imports */
import InfiniteRecommendations from "../components/Infinite/InfiniteRecommendations";

function Movies() {
  /* Hero banner content */
  const heroTitle = "Find Your Next Movie";
  const heroText =
    "Click On The Thumbs Down If You Dislike That Recommendation";
    const [userMovieRecommendations, setUserMovieRecommendations] = useState();
    const { loading, error, data } = useQuery(USERMOVIERECOMMENDATIONS);     
    /* base states */
  const [take] = useState(5);
  const [end, setEnd] = useState(1);
  const [skip, setSkip] = useState(0);

  const scrollData = {
    userMovieRecommendationsTake: take,
    userMovieRecommendationsSkip: skip,
    userMovieRecommendationsMyCursor: end,
  };

  const { loading: loadingAll, data: dataAll, fetchMore } = useQuery(
    USERMOVIERECOMMENDATIONS,
    {
      variables: {
        ...scrollData,
      },
    }
  );
  console.log(scrollData, "scroll data log");

 

  useEffect(() => {
    if (loadingAll === false && dataAll) {
      console.log(dataAll.userMovieRecommendations, "DATA");
      setUserMovieRecommendations(dataAll.userMovieRecommendations);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAll, dataAll]);

  const bigFetch = () => {
    fetchMore(
      {
        variables: {
          userMovieRecommendationsMyCursor: userMovieRecommendations.length - 1 /* end + take */,
        },
      },
      setEnd(userMovieRecommendations[userMovieRecommendations.length - 1].categoryId),
      setSkip(2)
    );
  };
  console.log(end, "this is the end");


    
  return (
    <>
      <NavigationBar />
      <HeroBanner heroText={heroText} heroTitle={heroTitle} />
     
      {userMovieRecommendations ? (
          <InfiniteRecommendations userMovieRecommendations={userMovieRecommendations} onLoadMore={bigFetch} />
        ) : (
          <h1> There are No Movies To Load </h1>
        )}
     
    </>
  );
}

export default Movies;
 
import React, { useEffect, useState } from "react";
/* component imports */
import NavigationBar from "../components/Navbar/NavigationBar";
/* gql */
import { useQuery } from "@apollo/client";
import { MOVIEDETAIL } from "../graphql/operations";
/* vendor styles */
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {
  StarFill,
  StarHalf,
  Star,
  Bookmark,
  HandThumbsUp,
  HandThumbsDown,
  Check2,
} from "react-bootstrap-icons";
import StarRatings from "react-star-ratings";
import "../styles/MovieDetail.css";
import ActionButtons from "../components/ActionButtons/ActionButtons";
import CreditCard from "../components/CreditCardLOL/CreditCard";
import {
  Providers,
  ProvidersBuy,
  // ProvidersRent,
} from "../components/providers/Providers";

function MovieDetail(props) {
  const [currentMovieDetails, setCurrentMovieDetails] = useState();
  const [currentMovieId, setCurrentMovieId] = useState(props.match.params.id);
  const [creditsParse, setCreditsParse] = useState({});
  const [providers, setProviders] = useState();
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [genre, setGenre] = useState();

  const { loading, data, error } = useQuery(MOVIEDETAIL, {
    variables: {
      movieMovieId: currentMovieId,
    },
  });

  console.log(data);

  useEffect(() => {
    if (!loading && data) {
      setCurrentMovieDetails(data);
      setCreditsParse(JSON.parse(data.movie.credits[0].cast));
      setProviders(JSON.parse(data.movie.watchproviders[0].providers));
    }
  }, [data, loading]);
  // console.log(currentMovieDetails, "currentmoviedetail");
  console.log(providers, "providers");

  // useEffect(() => {
  //   if (currentMovieDetails != undefined) {
  //     setCreditsParse(JSON.parse(currentMovieDetails.movie.credits[0].cast));
  //   }
  // }, [currentMovieDetails]);

  useEffect(() => {
    if (creditsParse.cast) {
      setCast(creditsParse.cast);
      setCrew(creditsParse.crew);
    }
    if (currentMovieDetails) {
      if (currentMovieDetails.movie.genres === 28) {
        setGenre("Action");
      } else if (currentMovieDetails.movie.genres === 12) {
        setGenre("Adventure");
      } else if (currentMovieDetails.movie.genres === 16) {
        setGenre("Animation");
      } else if (currentMovieDetails.movie.genres === 35) {
        setGenre("Comedy");
      } else if (currentMovieDetails.movie.genres === 80) {
        setGenre("Crime");
      } else if (currentMovieDetails.movie.genres === 99) {
        setGenre("Documentary");
      } else if (currentMovieDetails.movie.genres === 18) {
        setGenre("Drama");
      } else if (currentMovieDetails.movie.genres === 10751) {
        setGenre("Family");
      } else if (currentMovieDetails.movie.genres === 14) {
        setGenre("Fantasy");
      } else if (currentMovieDetails.movie.genres === 36) {
        setGenre("History");
      } else if (currentMovieDetails.movie.genres === 27) {
        setGenre("Horror");
      } else if (currentMovieDetails.movie.genres === 10402) {
        setGenre("Musical");
      } else if (currentMovieDetails.movie.genres === 9648) {
        setGenre("Mystery");
      } else if (currentMovieDetails.movie.genres === 10749) {
        setGenre("Romance");
      } else if (currentMovieDetails.movie.genres === 878) {
        setGenre("Science Fiction");
      } else if (currentMovieDetails.movie.genres === 10770) {
        setGenre("TV Movie");
      } else if (currentMovieDetails.movie.genres === 53) {
        setGenre("Thriller");
      } else if (currentMovieDetails.movie.genres === 10752) {
        setGenre("War");
      } else if (currentMovieDetails.movie.genres === 37) {
        setGenre("Western");
      }
    }
  }, [creditsParse]);

  const Mapper = () => (
    <div className="movieCardContainer">
      {cast.map((actor, i) => (
        <CreditCard {...actor} key={i + 1} />
      ))}
    </div>
  );

  return (
    <>
      <NavigationBar />

      {currentMovieDetails ? (
        <>
          <Container className="mainMovieDetailContainer">
            <Row>
              {/* SECTION: movie image/rating/base info */}
              <Col>
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${currentMovieDetails.movie.image}`}
                  className="movieDetailImageCard"
                />

                <div className="movieDetailRatings">
                  <div className="movieDetailActionBox">
                    {/*  <Bookmark color={"white"} size={25} className="movieDetailHeartIcon"/>
           <Check2 color={"white"} size={25} className="movieDetailHeartIcon"/>
           <HandThumbsUp color={"white"} size={25} className="movieDetailHeartIcon"/>
           <HandThumbsDown  color={"white"} size={25} className="movieDetailHeartIcon"/>  */}
                    <ActionButtons currentMovieDetails={currentMovieDetails} />
                  </div>
                  <br />
                  <br />
                  <h4>
                    {" "}
                    Rating: {currentMovieDetails.movie.vote_average / 2}
                    <StarRatings
                      rating={currentMovieDetails.movie.vote_average / 2}
                      starRatedColor="yellow"
                      starDimension="35px"
                      starSpacing="5px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </h4>
                  <h5>Genre: {genre}</h5>
                  <h5>
                    {" "}
                    Original Language:{" "}
                    {currentMovieDetails.movie.original_language}
                  </h5>
                  <h5>
                    {" "}
                    Release Date: {currentMovieDetails.movie.release_date}
                  </h5>
                </div>
              </Col>
              {/* SECTION: Movie description/cast/runtime/watchproviders */}
              <div className="streamProviderContainer">
                <p> Watch Now On:</p>
                <div className="streamProviderBox">
                  <Row>
                    <Col>
                      <Providers providers={providers} />
                    </Col>
                    <Col>
                      <ProvidersBuy providers={providers} />
                    </Col>
                  </Row>

                  {/* <ProvidersRent providers={providers} /> */}
                </div>
              </div>
              <div className="movieDetailContent">
                <h2> {currentMovieDetails.movie.title}</h2>
                <h4>
                  {" "}
                  Movie Description: {currentMovieDetails.movie.overview}
                </h4>
                <h4> Total Runtime: {currentMovieDetails.movie.runtime} </h4>
              </div>
              <Col> {cast && crew ? <Mapper /> : null} </Col>
            </Row>
            <Row>
              <Col>1 of 2</Col>
              <Col>2 of 2</Col>
            </Row>
          </Container>
        </>
      ) : (
        <div className="loadingMovieDetail">
          <Spinner animation="grow" variant="success" size="xxl" />
          <Spinner animation="grow" variant="success" size="xxl" />
          <Spinner animation="grow" variant="success" size="xxl" />
        </div>
      )}
    </>
  );
}

export default MovieDetail;

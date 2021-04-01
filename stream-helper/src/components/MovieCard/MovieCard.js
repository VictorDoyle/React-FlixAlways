import { Button, Card, Elevation } from "@blueprintjs/core";
import '../../styles/MovieCard.css'

function MovieCard() {
    return(
        <>
        <Card interactive={true} elevation={Elevation.TWO} className="movieCardMain">
            <h2><a href="#">Movie Title</a></h2>
            <p>Movie Description</p>
            <h5>Main Actors in Movie</h5>
            <h5>Genre</h5>
            <Button className="movieCardIcon bp3-intent-success" icon="tick" text="Save" />
            <Button className="movieCardIcon bp3-intent-warning" icon="eye-on" text="Watched It" />
            <Button className="movieCardIcon bp3-intent-danger" icon="thumbs-down" text="Discard" />
        </Card>
        </>
    )
}


export default MovieCard
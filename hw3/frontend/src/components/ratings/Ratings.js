import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form} from "react-bootstrap";
import { toast } from "react-toastify";
import API from "../../API";
import { toastOnError } from "../../utils/Utils";

const Ratings = ({ onAdd }) => {

    const [username, setUsername] = useState("");
    const [rating, setRating] = useState();
    const [song, setSong] = useState("");
    const [review, setReview] = useState(0);
    const [songId, setSongId] = useState(null);
    const [ratings, setRatings] = useState([]);


    const avgRating = (song) => {
        let items = ratings.filter((rating) => rating.song === song);
        var avg = 0;
        items.forEach(item => {
            avg += item.rating

            console.log(item.rating)
            }
            );
        
        console.log(avg);
        return ((Math.round(avg/items.length * 10) / 10))
    };


    useEffect(() =>
    {
        refreshRatings();
    }, []);

    const refreshRatings = () => {

        API.get("api/ratings/")
            .then((res) => {
                setRatings(res.data);
            })
    
            .catch(console.error);
    }
    const onSubmit = (e) => {
        e.preventDefault();

        let item = {username, rating, song, review}
        let match = ratings.find(element => element.username === username && element.song === song)
        if (match)
        {
            toast.error("You cannot double rate!")
            
        }
        else
        {
            API.post("api/ratings/", item).then(() => refreshRatings()).catch(error => toast.error("Every field is required, and ratings must be a number out of 5."));
        }
        
        
    };

    const onUpdate = (id) => {

        let item = {song, rating, review}
        let match = ratings.find(element => element.username === username && element.song === song)

        if (match)
        {
            API.patch("api/ratings/${match.id}/", item).then((res) => refreshRatings()).catch(error => toastOnError(error));
        }
        else{
            toast.error("No existing rating!")
        }
        
    }

    const onDelete = (id) => {

        API.delete(`api/ratings/${id}`).then((res) => refreshRatings());
    }

    function selectRating(id)
    {
        let item = ratings.filter((rating) => rating.id === id)[0];
        setUsername(username);
        setRating(item.rating);
        setReview(item.review);
        setSong(item.song);
        setSongId(item.id);
    }

    
        return(
            <div className = "container mt-5">
                <div className = "row">
                    <div className = "col-dm-4">
                        <h1 id = "pagetitle" class = "center">Song Rater</h1>
                        <h3 className = "float-left">Create a new Rating</h3>
                        <Form onSubmit={onSubmit} className = "mt-4">
                            <Form.Label>Editing Entry Number: {songId}</Form.Label>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type = "text"
                                    placeholder = "Enter Name"
                                    value = {username}
                                    onChange = { (e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className = "mb-3" controlId = "formBasicSong">
                                <Form.Label>Song</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter the name of the song"
                                    value = {song}
                                    onChange= {(e) => setSong(e.target.value)}
                                />

                            </Form.Group>
                            
                            <Form.Group className = "mb-3" controlId = "formBasicReview">
                                <Form.Label>Review</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter your Review"
                                    value = {review}
                                    onChange= {(e) => setReview(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group className = "mb-3" controlId = "formBasicRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control 
                                    type = "text"
                                    placeholder = "Enter your Rating from 1-5"
                                    value = {rating}
                                    onChange= {(e) => setRating(e.target.value)}
                                />

                            </Form.Group>
                        

                        <div className = "float-right">
                            <Button
                                variant= "primary"
                                type = "submit"
                                onClick = {onSubmit}
                                className = "mx-2"
                            >
                                Save
                            </Button> 
                            <Button
                                variant = "primary"
                                type = "button"
                                onClick = {() => onUpdate(songId)}
                                className = "mx-2"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                    </div>
                    <div className = "col-md-8 m">
                        <table className = "table">
                            <thead>
                                <tr>
                                    <th scope = "col">#</th>
                                    <th scope = "col">Song Name</th>
                                    <th scope = "col">Review</th>
                                    <th scope = "col">Rating</th>
                                    <th scope = "col">Avg. Rating</th>
                                    <th scope = "col">Reviewer</th>
                                    <th scope = "col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map((rating, index) => {
                                    return (
                                        <tr key ="">
                                            <th scope="row">{rating.id}</th>
                                            <td> {rating.song}</td>
                                            <td> {rating.review}</td>
                                            <td> {rating.rating}</td>
                                            <td>{avgRating(rating.song)}</td>
                                            <td> {rating.username}</td>
                                            <td>
                                                <i
                                                    className = "fa fa-pencil-square"
                                                    aria-hidden = "true"
                                                    onClick = {() => selectRating(rating.id)}
                                                ></i>
                                                <i
                                                    className="fa fa-trash"
                                                    aria-hidden="true"
                                                    onClick={() => onDelete(rating.id)}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );


};

export default Ratings;
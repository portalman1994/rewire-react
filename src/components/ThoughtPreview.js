import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import RewireDataService from '../services/rewire.service';

class ThoughtPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thoughts: []
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount() {
        this.retrieveThoughts();
    }

    retrieveThoughts() {
        RewireDataService.getAll()
            .then(response => {
                this.setState({
                    thoughts: response.data
                })
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    handleDeleteClick(id) {
        RewireDataService.delete(id)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
        this.retrieveThoughts();
        const {history} = this.props;
        history.push('/rewire');
    }
    handleEditClick(id) {
        this.retrieveThoughts();
        const {history} = this.props;
        history.push(`/${id}`);
    }
    render() {
        const { thoughts } = this.state;
        return (
            <>
                {thoughts && thoughts.sort((a, b) => (a.id > b.id) ? 1 : -1).reverse().map((thought, index) => {
                    return (
                        <Grid item xs={12} sm={12} md={3} key={index}>
                        <Box style={{
                            marginLeft: '60px',
                            marginRight: '60px',
                            marginBottom: '60px',
                            border: '5px solid grey', 
                            borderRadius: '15px', 
                            height: '250px', 
                            width: '250px', 
                            fontSize: "1rem",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: ".75rem",
                            paddingRight: ".75rem"
                        }}
                            key={'thoughts-' + index}>
                            <span style={{ display: "block", fontSize: "1.1rem", fontWeight: "bold", height: "35%", fontFamily: "arial", marginTop: ".4rem" }}>

                                <Typography style={{
                                    boxSizing: "border-box",
                                    fontSize: ".95rem",
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontFamily: "arial",
                                    display: "-webkit-box"

                                }}>
                                    {thought.firstThought}
                                </Typography>
                            </span>
                            <hr style={{ width: "85%", border: "1px solid gray" }} />
                            <span style={{ display: "block", fontSize: "1.1rem", fontWeight: "bold", height: "35%", fontFamily: "arial" }}>

                                <Typography style={{
                                    boxSizing: "border-box",
                                    fontSize: ".95rem",
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontFamily: "arial",
                                    display: "-webkit-box"

                                }}>
                                    {thought.fourthThought}
                                </Typography>
                            </span>
                            <Typography>
                                <Link to={`/${thought.id}`}>
                                    <IconButton
                                        size='small'
                                        sx={{ float: 'left', paddingLeft: '10px' }}
                                        key={'edit-button-' + index}
                                        onClick={() => this.handleEditClick(thought.id)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <Link to={`/`}>
                                    <IconButton
                                        size='small'
                                        sx={{ float: 'right', paddingRight: '10px' }}
                                        key={'delete-button-' + index}
                                        onClick={() => this.handleDeleteClick(thought.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Link>
                            </Typography>
                        </Box>
                </Grid>
                    );
                })}
                </>
        );
    }
}

export default withRouter(ThoughtPreview);
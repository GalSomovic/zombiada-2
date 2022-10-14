import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import validator from 'validator';
import { withFirebase } from '../Firebase';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox, Container, createTheme, CssBaseline,
    FormControlLabel,
    Grid, Popover, Snackbar,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";

const SignUpPage = () => {
    return (
        <div>
            <SignUpForm/>
        </div>
    );
};

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    error: null,
    anchorEl: null,
};

const theme = createTheme();


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    // todo: in catch, event.currentTarget is null, should be something
    onSubmit = event => {
        event.preventDefault();
        const past_event = event.currentTarget;
        console.log(typeof event.currentTarget)
        const { firstName, lastName, username, email, password } = this.state;
        this.props.firebase.doCreateUserWithEmailAndPassword(email,password).then(
            authUser => {
                this.state=({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            }
        ).catch(error => {
            this.setState({["anchorEl"]: past_event[10]});
        });
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };


    render() {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            error,
            anchorEl,
        } = this.state;

        const handleClose = () => {
            this.setState({anchorEl: null});
        };

        const open = Boolean(anchorEl);

        const id = open ? 'simple-popover' : undefined;

        let isInvalid =
            firstName.length < 3 ||
            lastName.length < 3 ||
            !validator.isStrongPassword(password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) ||
            !validator.isEmail(email) ||
            username.length < 8 ||
            !validator.isAlphanumeric(username);
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar src="" sx={{m: 1}}>
                        </Avatar>
                        <Typography component="h1" variant="h5" align="center">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.onSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        display="block"
                                        color="textSecondary"
                                        variant="caption"
                                        align="center"
                                        // sx={{mt: 0.5}}
                                    >First and last name must be at least 3 letters long,
                                        this is a role playing game, try to use a realistic name</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={this.onChange}
                                    />
                                    <Typography
                                        display="block"
                                        color="textSecondary"
                                        variant="caption"
                                        align="center"
                                        sx={{mt: 2}}
                                    >Username must be at least 8 characters long
                                        and can contain only numbers and letters</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.onChange}
                                    />
                                    <Typography
                                        display="block"
                                        color="textSecondary"
                                        variant="caption"
                                        align="center"
                                        sx={{mt: 2}}
                                    >Email will be verified</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Typography
                                    display="block"
                                    color="textSecondary"
                                    variant="caption"
                                    align="center"
                                    sx={{mt: 2}}
                                >Password must be at least 8 characters long
                                    and contain at least 1 lowercase letter,
                                    1 uppercase letter, 1 number and 1 symbol</Typography>
                            </Grid>
                            <Button
                                id="btm-submit"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={isInvalid}
                            >
                                Sign Up
                            </Button>
                            <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}
                                      anchorOrigin={{
                                          vertical: 'top',
                                          horizontal: 'center',
                                      }}>
                                <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                                    Email already exists
                                </Alert>
                            </Snackbar>
                            {/*<Popover*/}
                            {/*    id={id}*/}
                            {/*    open={open}*/}
                            {/*    anchorEl={anchorEl}*/}
                            {/*    onClose={handleClose}*/}
                            {/*    anchorOrigin={{*/}
                            {/*        vertical: 'bottom',*/}
                            {/*        horizontal: 'center',*/}
                            {/*    }}*/}
                            {/*    transformOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'center',*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <Typography sx={{ p: 2 }}>Email already exists</Typography>*/}
                            {/*</Popover>*/}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to={ROUTES.SIGN_IN} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <Typography*/}
                            {/*        display="block"*/}
                            {/*        color="textSecondary"*/}
                            {/*        variant="caption"*/}
                            {/*        align="center"*/}
                            {/*        padding={theme.spacing(5)}*/}
                            {/*    >*/}
                            {/*        Username must be at least 8 characters long*/}
                            {/*        and can contain only numbers and letters.*/}
                            {/*        <br />*/}
                            {/*        Password must be at least 8 characters long*/}
                            {/*        and contain at least 1 lowercase letter,*/}
                            {/*        1 uppercase letter, 1 number and 1 symbol.*/}
                            {/*        <br />*/}
                            {/*        First and last name must be at least 3 letters long,*/}
                            {/*        this is a role playing game, try to use a realistic name.*/}
                            {/*    </Typography>*/}
                            {/*</Grid>*/}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export {SignUpForm};
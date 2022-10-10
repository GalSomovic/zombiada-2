import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {
    Avatar,
    Box,
    Button,
    Checkbox, Container, createTheme, CssBaseline,
    FormControlLabel,
    Grid,
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
};

const theme = createTheme();

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('firstName'),
            last_name: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
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
        } = this.state;

        // todo: make this more secure
        let isInvalid =
            firstName === '' ||
            lastName === '' ||
            password === '' ||
            password.length <= 6 ||
            email === '' ||
            !(email.includes('@')) ||
            !(email.includes('.')) ||
            username === '';
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
                        <Typography component="h1" variant="h5">
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
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={this.onChange}
                                    />
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
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={isInvalid}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to={ROUTES.SIGN_IN} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

function LockOutlinedIcon() {
    return null;
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUpPage;
export {SignUpForm, SignUpLink};
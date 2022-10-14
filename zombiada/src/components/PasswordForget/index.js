import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert, Popover, Snackbar} from "@mui/material";

const theme = createTheme();

const SignInPage = () => (
    <div>
        <SignInForm/>
    </div>
);
const INITIAL_STATE = {
    email: '',
    error: null,
    anchorEl: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        const past_event = event.currentTarget;
        const {email} = this.state;
        this.props.firebase
            .doPasswordReset(email,).then(() => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
            .catch(error => {
                this.setState({["anchorEl"]: past_event[2]});
            });
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, error, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const handleClose = () => {
            this.setState({anchorEl: null});
        };
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1 }}>
                            <LockResetOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={this.onSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.onChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                reset
                            </Button>
                            {/*todo: add top location*/}
                            <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Email is not registered
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
                            {/*    <Typography sx={{ p: 2 }}>Email is not registered</Typography>*/}
                            {/*</Popover>*/}
                            <Grid container>
                                <Grid item>
                                    <Link href={ROUTES.SIGN_UP} variant="body2">
                                        {"Don't have an account? Sign Up"}
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

const SignInForm = withRouter(withFirebase(SignInFormBase));
export default SignInPage;
export {SignInForm};

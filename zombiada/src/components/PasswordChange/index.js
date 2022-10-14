import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import {AuthUserContext, withAuthorization} from '../Session';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Snackbar,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {createTheme} from "@mui/material/styles";
import validator from "validator";

const theme = createTheme();

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    anchorEl: null,
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({["anchorEl"]: true});
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {passwordOne, passwordTwo, error, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const handleClose = () => {
            this.setState({anchorEl: null});
        };
        const isInvalid =
            !validator.isStrongPassword(passwordOne, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) || !validator.isStrongPassword(passwordTwo, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
            }) ||
            passwordOne !== passwordTwo || passwordOne === '';
        return (
            <AuthUserContext.Consumer>
                {authUser => (
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
                                    change password
                                </Typography>
                                <Box component="form" noValidate onSubmit={this.onSubmit} sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="passwordOne"
                                                label="password"
                                                type="password"
                                                id="passwordOne"
                                                autoComplete="new-password"
                                                onChange={this.onChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="passwordTwo"
                                                label="password verify"
                                                type="password"
                                                id="passwordTwo"
                                                autoComplete="off"
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
                                            1 uppercase letter, 1 number and 1 symbol.
                                            password and password verify must match</Typography>
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
                                        <Alert onClose={handleClose} severity="error" variant="filled"
                                               sx={{width: '100%'}}>
                                            Email already exists
                                        </Alert>
                                    </Snackbar>
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
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(withFirebase(PasswordChangeForm))
import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {Alert, LinearProgress, Snackbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as ROUTES from "../../constants/routes";
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';

const theme = createTheme();

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
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
                            <FaceOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Account
                            <hr/>
                        </Typography>
                        <Typography component="subtitle1" variant="subtitle1">
                           {authUser.email}
                        </Typography>
                        <Button variant="contained" sx={{mt: 2}} href={ROUTES.PASSWORD_CHANGE}>change password</Button>
                    </Box>
                </Container>
            </ThemeProvider>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
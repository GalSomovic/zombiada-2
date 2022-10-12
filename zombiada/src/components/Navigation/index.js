import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {AppBar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import SignOutButton from '../SignOut';

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Navigation = ({ authUser }) => (
    <>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</>
)

const NavigationAuth = () => {
    const pages = {
        'Home': ROUTES.HOME,
        'Account': ROUTES.ACCOUNT,
    };
    return (
        <AppBar position="sticky">
            <StyledToolBar>
                <Box sx={{flexGrow: 1, display: "flex"}}>
                    {Object.entries(pages).map(([k, v]) =>
                        <Button
                            key={k}
                            href={v}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            {k}
                        </Button>
                    )
                    }
                    <SignOutButton/>
                </Box>
            </StyledToolBar>
        </AppBar>
    );
};

const NavigationNonAuth = () => {
    const pages = {
        'Landing': ROUTES.LANDING,
        'Sing In': ROUTES.SIGN_IN,
    };
    return (
        <AppBar position="sticky">
            <StyledToolBar>
                <Box sx={{flexGrow: 1, display: "flex"}}>
                    {Object.entries(pages).map(([k, v]) =>
                        <Button
                            key={k}
                            href={v}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            {k}
                        </Button>
                    )
                    }
                    <SignOutButton/>
                </Box>
            </StyledToolBar>
        </AppBar>
    );
};

export default Navigation;
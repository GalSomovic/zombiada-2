import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {AppBar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import * as PropTypes from "prop-types";

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const pages = {
    'Sign In': ROUTES.SIGN_IN,
    'Landing': ROUTES.LANDING,
    'Home': ROUTES.HOME,
    'Account': ROUTES.ACCOUNT,
    'Admin': ROUTES.ADMIN
};

const Navigation = () => {
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
                </Box>
            </StyledToolBar>
        </AppBar>
    );
};

export default Navigation;
import React from 'react';
import { withFirebase } from '../Firebase';
import Button from "@mui/material/Button";

const SignOutButton = ({ firebase }) => (
    <Button type="button" sx={{my: 2, color: 'white', display: 'block'}} onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);


export default withFirebase(SignOutButton);
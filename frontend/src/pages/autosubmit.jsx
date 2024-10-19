import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import checkLoggedIn from "../util/verifyUser";
import { Container, Typography } from "@mui/material";
import TopMenu from "../components/top-menu/TopMenu";

export default function AutoSubmit() {
    const { formId } = useParams();
    const [signedIn, setSignedIn] = useState(null);
    const [ submitted, setSubmitted ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loginCheck = async () => {
            const signed_in = await checkLoggedIn();
            setSignedIn(signed_in);
        } 
        loginCheck();
    }, []);

    useEffect(() => {
        const autosubmit = async () => {
            if(signedIn === false) {
                navigate("/option");
            }

            if(!submitted && signedIn === true) {           

                const googleUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

                console.log(googleUrl);
                const accessToken = localStorage.getItem(`present-access`);

                let response = await fetch( `https://a627-193-119-101-191.ngrok-free.app/autosubmit`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`
                            },
                            body : JSON.stringify({formUrl: googleUrl})
                        });    
                const data = await response.json();           

                if(!data) {
                    navigate("/option");
                } else if(data.includes("ok")) {;
                    navigate("/submitted")
                } else {
                    window.location.href = data;
                }

                setSubmitted(true);
            }
        }
        autosubmit();
    }, [signedIn]);

    return (
        <Container>
          <TopMenu/>
          <Typography sx={{ textAlign: 'center', fontWeight : "bold", fontSize : "2rem", color:"secondary.main" }}>
            Checking...
          </Typography>
        </Container>
    )
}
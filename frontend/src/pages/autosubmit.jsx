import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default async function AutoSubmit() {
    const { formId } = useParams();

    const googleUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

    const { res } = await fetch.get( `http://localhost:5180/autosubmit`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Conent-Type': 'application/json',
                },
                body
            }
        );
    
    console.log(res);

}
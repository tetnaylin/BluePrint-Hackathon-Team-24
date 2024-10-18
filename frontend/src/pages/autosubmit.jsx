import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default AutoSubmit() = async () => {
    const { formId } = useParams();

    const googleUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

    const { res } = await fetch.get( `http://localhost:5180/autosubmit`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Conent-Type': 'application/json',
                },
                body
            }
        );
    
    console.log(res);

}
import React, {useEffect, useState} from 'react';
import facade from '../apiFacade.js'

function Harbour({isLoggedIn}) {

    const [owners, setOwners] = useState([])
    const [harbourNames, setHarbourNames] = useState('');
    const [harbours, setHarbours] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted! Input value:', harbourNames);
    };

    useEffect(() => {
        facade.fetchData("/info/all/owners", setOwners, "GET")
        facade.fetchData("/info/all/harbours", setHarbours, "GET")
    }, [])

    console.log(owners)
    console.log(isLoggedIn)

    return (
        <div>
            { isLoggedIn ? (

                <div>
                    <h2>My harbour site</h2>
                    <div>
                        <h3>List of all owners</h3>
                        {owners.map(owner => {
                            return (
                                <li key={owner.name}>{owner.name}</li>
                            )
                        })}
                    </div>
                    <br/><br/>
                    <div>
                        <h3>All boats belonging in a specific harbour</h3>
                        <form onSubmit={handleSubmit} formAction="/submit">
                            <label>
                                Harbour Name:
                                <select
                                    value={harbourNames}
                                    onChange={(event) => setHarbourNames(event.target.value)}
                                >
                                    {harbours.map((option) => (
                                        <option key={option.name} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                </div>

            ) : (
                <div>

                    <p>Husk at logge ind først</p>
                </div>

            )}

            {/*//TODO hvorfor virker den ikke hverken her eller ovenfor??*/}
            {isLoggedIn ? (
                "Sandt"
            ) : (
                "Falsk"
            )}
        </div>

    )
}

export default Harbour;
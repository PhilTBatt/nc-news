import { useContext, useState } from "react";
import { UserContext } from "./contexts/User";
import { FancyBox } from "./FancyBox";

export function Home() {
    const [selectedUser, setSelectedUser] = useState('')
    const {user, setUser} = useContext(UserContext)

    const users = ['cooljmessy', 'grumpy19', 'happyamy2016', 'jessjelly', 'tickle122', 'weegembump']

    function handleLogin(event) {
        event.preventDefault()
        setUser(selectedUser)
    }

    return (
        <FancyBox>
            <h2>
                Welcome to NC news
            </h2>
            {user.length === 0
            ?
                <form onSubmit={handleLogin}>
                    <label htmlFor="select-user">
                        User:
                        <select id="select-user" value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)}>
                            <option value="">
                                Select a user
                            </option>
                            {users.map((user, index) => (
                                <option key={index} value={user}>{user}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Login</button>
                </form>
            :
                <h3>
                    {`Hello ${user}!`}
                </h3>
            }
        </FancyBox>
    )
}
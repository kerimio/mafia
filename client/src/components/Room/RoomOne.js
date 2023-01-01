
import { useNavigate } from 'react-router-dom'


const myBool = false;
const Room = () => {

  const navigate = useNavigate();

  if(myBool == false){
    return (
        <div>hi</div>
    )
  }
  {
  return (
    <div>
      <h1>Welcome to the ROOM room, USERNAME!</h1>
      <h2>Users in this room:</h2>
      <ul>
{/*         {users.map((user) => (
          <li key={user}>{user}</li>
        ))} */}
      </ul>
    </div>
  );
}
}

export default Room;

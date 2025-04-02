import {useState} from "react";
import './App.css';
import Box from './component/Box';

// 1. 박스 2개(타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼이 있다
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다
// 5. 3 4 의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 테두리 색이 바뀐다 (이기면 - 초록, 지면-빨강, 비기면-검으색)
const choice = {
  rock: {
    name: "Rock",
    img: "data:image/jpeg;base64,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"
  },
  scissors: {
    name: "Scissors",
    img: "data:image/jpeg;base64,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"
  },
  paper: {
    name: "Paper",
    img: "data:image/jpeg;base64,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"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect]= useState(null)
  const [result, setResult] = useState("")
  const [result2, setResult2] = useState("")
  const play=(userChoice)=>{
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
    setResult2(judgement2(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);
    if(user.name == computer.name) {
      return "tie";
    } else if(user.name == "Rock") return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors") return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper") return computer.name == "Rock" ? "win" : "lose" ;
    
  }

  const judgement2 = (user, computer) => {
    console.log("user", user, "computer", computer);
    if(user.name == computer.name) {
      return "tie";
    } else if(user.name == "Rock") return computer.name == "Scissors" ? "lose" : "win";
    else if (user.name == "Scissors") return computer.name == "Paper" ? "lose" : "win";
    else if (user.name == "Paper") return computer.name == "Rock" ? "lose" : "win" ;
    
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice);//객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
    console.log("final", final)
  }

  return (
    <div>
      <div className='main'>
      <Box title="you" item={userSelect} result={result}/>
      <Box title="Computer" item={computerSelect} result={result2}/>
      </div>
      <div className='main'>
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;

import React, { PropsWithChildren } from 'react';
import logo from './assets/images/logo.svg';
import robots from "./mockdata/robots.json"
import Robot from "./components/Robot";
import './App.css';
import styles from "./App.module.css"
import ShoppingCart from './components/ShoppingCart';
import { useState } from 'react';
import { useEffect } from 'react';

// function App() {
//   return (
//     <div className={styles.app}>
//       <div>
//         <img src={logo} className={styles.appLogo} alt="logo"></img>
//         <h1>罗伯特机器人炫酷屌炸天online购物平台的名字要长</h1>
//       </div>
//       <ShoppingCart></ShoppingCart>
//       <div className={styles.robotList}>
//         {robots.map((r) => (
//           <Robot id={r.id} email={r.email} name={r.name}></Robot>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface Props {}
// interface State {
//   robotGallery: any[];
// }

// class App extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       robotGallery: [],
//     }
//   };

//   componentDidMount() {
//       fetch("https://jsonplaceholder.typicode.com/users")
//         .then((response) => response.json())
//         .then((data) => this.setState({ robotGallery: data}))
//   }

//   render() {
//       return (
//         <div className={styles.app}>
//           <div className={styles.appHeader}>
//               <img src={logo} className={styles.appLogo} alt="logo"/>
//               <h1>罗伯特机器人炫酷屌炸天online购物平台的名字要长</h1>
//           </div>
//           <ShoppingCart/>
//           <div className={styles.robotList}>
//             {this.state.robotGallery.map((r) => (
//               <Robot id={r.id} email={r.email} name={r.name}></Robot>
//             ))}
//           </div>
//         </div>
//       )
//   }
// }

// interface Props {}

// interface Statue {
//   robotGallery: any[];
//   count: number;
// }

// const App: React.FC = (props) => {
//   const [count, setCount] = useState<number>(10);

//   return (
//     <div className={styles.app}>
//       <div className={styles.appHeader}>
//         <img src={logo} className={styles.appLogo} alt="logo" />
//         <h1>罗伯特机器人炫酷屌炸天online购物平台的名字要长</h1>
//       </div>
//       <button onClick={()=>{
//         setCount(count + 1);
//       }}>
//         Click
//       </button>
//       <span>count: {count}</span>
//       <ShoppingCart/>
//       {/* <div className={styles.robotList}>
//         {this.state.robotGallery.map((r) => (
//           <Robot id={r.id} email={r.email} name={r.name}></Robot>
//         ))}
//       </div> */}
//     </div>
//   )
// }

interface Props {}

interface Statue {
  robotGallery: any[];
  count: number;
}

const App: React.FC = (props) => {
  const [count, setCount] = useState<number>(10);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    document.title = `点击${count}次`;
  }, [count]);

  useEffect(() => {
    const fetchData =async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        )
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷屌炸天online购物平台的名字要长</h1>
      </div>
      <button onClick={()=>{
        setCount(count + 1);
      }}>
        Click
      </button>
      <span>count: {count}</span>
      <ShoppingCart/>
      {(!error || error !== "") && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r: any) => (
            <Robot id={r.id} email={r.email} name={r.name} />
          ))
          }
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
      {/* <div className={styles.robotList}>
        {this.state.robotGallery.map((r) => (
          <Robot id={r.id} email={r.email} name={r.name}></Robot>
        ))}
      </div> */}
    </div>
  )
}


export default App;

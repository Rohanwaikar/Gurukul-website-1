import Header from "./components/Header.jsx"
import Meals from "./components/Meals.jsx"

import { UserProgressProvider } from "./store/UserProgressContext.jsx"

import Checkout from "./components/Checkout.jsx"

function App() {
    return (
      <UserProgressProvider>
            <Header></Header>
            <Meals></Meals>
            <Checkout></Checkout>
      </UserProgressProvider>
    );
}

export default App

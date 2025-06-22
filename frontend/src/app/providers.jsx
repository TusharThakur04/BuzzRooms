import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

import { useAuth } from "../../context/AppDataContext";

import { lazy, Suspense } from "react";
import Loader from "../../ui/LoadingSpinner";
import WelcomeToChatix from "./WelcomeToChatix";
const Chat = lazy(() => import("./Chat"));

function Content() {
  const { isSelected } = useAuth();

  return isSelected ? (
    <Suspense fallback={<Loader />}>
      <Chat />
    </Suspense>
  ) : (
    <WelcomeToChatix />
  );
}

export default Content;

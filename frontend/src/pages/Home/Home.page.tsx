import ChatSection from "../../components/ChatSection";
import GroupContainer from "../../components/GroupContainer";
import { GroupProvider } from "../../context/group.provider";

const Home: React.FC = () => {
  return (
    <GroupProvider>
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
        <div className="w-full max-w-6xl h-[60vh] bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
          <GroupContainer />
          <ChatSection />
        </div>
      </div>
    </GroupProvider>
  );
};

export default Home;

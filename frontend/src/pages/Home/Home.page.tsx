import ChatSection from "../../components/ChatSection";
import GroupContainer from "../../components/GroupContainer";
import { GroupProvider } from "../../context/group.provider";

// TODO: Better to create a Layout component to make it more reusable

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-6xl h-[60vh] bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <GroupProvider>
          <GroupContainer />
          <ChatSection />
        </GroupProvider>
      </div>
    </div>
  );
};

export default Home;

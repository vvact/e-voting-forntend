import HeroSection from "../components/HeroSection";
import ActiveElections from "../components/ActiveElections";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("accounts/profile/");
        setUserProfile(res.data);
      } catch (err) {
        // User not logged in, ignore
        setUserProfile(null);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <HeroSection />

      {userProfile && (
        <div className="px-6 py-4 bg-blue-50 rounded-md my-6 max-w-6xl mx-auto">
          <p className="text-gray-800">
            Hi <strong>{userProfile.email}</strong>!{" "}
            {userProfile.votes.length > 0
              ? `You have voted in ${userProfile.votes.length} election(s).`
              : "You haven't voted yet. Explore elections below!"}
          </p>
          <a
            href="/profile"
            className="text-blue-600 hover:underline text-sm mt-1 inline-block"
          >
            Go to your profile
          </a>
        </div>
      )}

      <div className="px-6">
        <ActiveElections />
      </div>
    </div>
  );
}

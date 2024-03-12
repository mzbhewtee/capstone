import React, { useEffect } from "react";
import { useAuth } from "../context/authContext"; // Import useAuth
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import profile from "../assets/images/profile.png";

function Profile() {
  const { currentUser, loading } = useAuth(); // Access currentUser and loading from context
  const { uid } = useParams(); // Get the uid from the URL
  const navigate = useNavigate();

  useEffect(() => {
    console.log("currentUser:", currentUser);
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!currentUser) {
    return <div>Error: User data not available</div>; // Handle missing user data
  }

  return (
    <div className="">
      <Sidebar />
      <div className="mr-10 ml-10 font-link flex-1 p-4 flex justify-center overflow-y-auto">
        {/* Main content */}
        {currentUser && ( // Only render if currentUser is available
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="relative w-20 h-20 overflow-hidden rounded-full mr-4">
                {currentUser.profilePictureURL ? ( // Check if profile picture URL exists
                  <img
                    src={currentUser.profilePictureURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <p className="text-gray-700 text-xl font-bold">
                {currentUser.fullname}
              </p>
              <p className="text-gray-700 text-xs md:text-md md:font-medium mt-2 italic">
                ({currentUser.pronouns})
              </p>
            </div>
            <p className="text-gray-700 text-sm md:text-md:font-medium mt-2">
              {currentUser.bio}
            </p>
            <p className="text-gray-700 text-xs md:text-md md:font-medium mt-2">
              {currentUser.email}
            </p>
            {/* Link to the EditProfile route */}
            <div className="flex items-center justify-end">
              <Link to={`/profile/edit/${currentUser.uid}`}>
                {currentUser && currentUser.uid && (
                  <span className="text-primary text-xs md:text-md md:font-medium mt-2">
                    Edit Profile
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
        {/* User's posts */}
        <div className="mt-6">
          {/* Assuming posts is an array of user's posts */}
          {/* {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))} */}
        </div>
      </div>
    </div>
  );
}

export default Profile;

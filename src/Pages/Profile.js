import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext"; // Import useAuth
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import profile from "../assets/images/profile.png";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatDistanceToNow } from 'date-fns';
import LikePost from "../components/LikePost";
import CommentPost from "../components/CommentPost";
import AllComments from "../components/Comments";
import Twitterposts from "../components/Twitterposts";
import { Sidebar } from "../components/Sidebar";

function Profile() {
  const { currentUser, loading } = useAuth(); // Access currentUser and loading from context
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Track the currently selected post for editing
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, where("userId", "==", currentUser.uid)); // Filter posts by currentUser's uid
        const querySnapshot = await getDocs(q);
        const fetchedUserPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedUserPosts.push({ id: doc.id, ...doc.data() });
        });
        // Sort posts from latest to oldest
        const sortedPosts = fetchedUserPosts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        setUserPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (currentUser) {
      fetchUserPosts();
    }
  }, [currentUser]);

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setUserPosts(userPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = async (postId, newContent) => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        content: newContent
      });
      // Update the userPosts state with the edited content
      setUserPosts(userPosts.map(post => post.id === postId ? { ...post, content: newContent } : post));
      setSelectedPost(null); // Close the edit menu
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!currentUser) {
    return <div>Error: User data not available</div>; // Handle missing user data
  }

  return (
    <div className="">
      <Sidebar />
      <div className='overflow-hidden p-5 md:pl-96 md:pr-96 font-link'>
        <div className='w-full md:border rounded-md p-4 md:p-8 md:shadow-md'>
          <div className='items-center'>
            {/* <div className="w-full md:w-auto m-3 bg-white md:border md:shadow-md rounded-lg md:p-8"> */}
            {currentUser && ( // Only render if currentUser is available
              <>
                <div className="flex items-center mb-4">
                  <div className=" w-20 h-20 overflow-hidden rounded-full mr-4">
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
                <div className="flex gap-1 items-center">
                  <p className="text-gray-700 md:text-xl font-bold">
                    {currentUser.fullname}
                  </p>
                  <p className="text-gray-700 text-xs md:text-md md:font-medium italic">
                    ({currentUser.pronouns})
                  </p>
                </div>
                <p className="text-gray-700 text-xs md:text-md:font-medium md:mt-2">
                  {currentUser.bio}
                </p>
                <p className="text-gray-700 text-xs md:text-md md:font-medium md:mt-2">
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
              </>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="mt-1 p-4 md:pl-96 md:pr-96 ">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Posts</h2>
          <button
            onClick={() => navigate("/community")}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Create Post
          </button>
        </div>
      </div>
      {/* User's posts */}
      <div className="mt-1">
        {/* Display userPosts */}
        {userPosts.map((post) => (
          <div key={post.id} className='overflow-hidden p-5 md:pl-96 md:pr-96 font-link'>
            <div className='w-full border rounded-md p-4 md:p-8 shadow-md'>
              <div className='flex items-center'>
                <img src={post.profilePictureURL} alt="Profile" className="rounded-full w-12 h-12 mr-3 shadow-md" />
                <div>
                  <p className="text-sm font-semibold">{post.userDisplayName} {post.fullname}</p>
                  <p className="ml-auto text-xs text-gray-500">{formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}</p>

                </div>
                {post.userId === currentUser.uid && ( // Show edit/delete menu only for the current user's posts
                  <div className="ml-auto relative">
                    <button
                      className="text-gray-500 focus:outline-none"
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    >
                      ...
                    </button>
                    {selectedPost === post.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md">
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleEditPost(post.id, prompt("Enter new content:", post.content))}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className='mt-5 mb-3'>{post.content}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className='rounded-md shadow-md mb-5' />}
              {/* Like button */}
              <div className='flex items-end justify-between'>
                <LikePost postId={post.id} />
                <CommentPost postId={post.id} />
              </div>
              <div className='h-0.5 w-full bg-gray-200 mt-5 mb-5'></div>
              <AllComments postId={post.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
      <Twitterposts />
      </div>
    </div>

  );
}

export default Profile;

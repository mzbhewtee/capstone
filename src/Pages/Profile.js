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
  const [editModalOpen, setEditModalOpen] = useState(false); // State to control edit modal visibility
  const [editedContent, setEditedContent] = useState(""); // State to store edited content
  const [editPostId, setEditPostId] = useState(""); // State to store post id being edited
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to control delete modal visibility
  const [deletePostId, setDeletePostId] = useState(""); // State to store post id being deleted
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
      setDeleteModalOpen(false);
      setSelectedPost(null); // Return the edit/delete button to its original state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openEditModal = (postId, content) => {
    setEditModalOpen(true);
    setEditedContent(content);
    setEditPostId(postId);
    setSelectedPost(null); // Return the edit/delete button to its original state
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditedContent("");
    setEditPostId("");
  };

  const handleEditPost = async () => {
    try {
      await updateDoc(doc(db, "posts", editPostId), {
        content: editedContent
      });
      // Update the userPosts state with the edited content
      setUserPosts(userPosts.map(post => post.id === editPostId ? { ...post, content: editedContent } : post));
      closeEditModal();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const openDeleteModal = (postId) => {
    setDeleteModalOpen(true);
    setDeletePostId(postId);
    setSelectedPost(null); // Return the edit/delete button to its original state
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeletePostId("");
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
      <div className='overflow-hidden p-5 lg:pl-96 lg:pr-96 font-link'>
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
      <div className="mt-1 p-4 lg:pl-96 lg:pr-96 ">
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
      {/* Edit Post Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 lg:ml-96 lg:mr-96 w-full">
            <h2 className="text-lg font-bold mb-4">Edit Post</h2>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-40 border rounded-md px-3 py-2 mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleEditPost} className="bg-primary text-white px-4 py-2 rounded-md mr-2">Save</button>
              <button onClick={closeEditModal} className="text-gray-500 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-80">
            <h2 className="text-lg font-bold mb-4">Delete Post</h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-between">
              <button onClick={() => handleDeletePost(deletePostId)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete</button>
              <button onClick={closeDeleteModal} className="text-gray-500 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden p-5 lg:pl-96 lg:pr-96 font-link">
        <div className="w-full md:border rounded-md p-4 md:p-8 md:shadow-md">
          {userPosts.map((post) => (
            <div key={post.id} className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 overflow-hidden rounded-full mr-3">
                    {post.profilePictureURL ? (
                      <img
                        src={post.profilePictureURL}
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
                  <div>
                    <p className="text-sm font-semibold">{post.userDisplayName} {post.fullname}</p>
                    <p className="ml-auto text-xs text-gray-500">{formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    className="text-gray-500 focus:outline-none"
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                  >
                    ...
                  </button>
                  {selectedPost === post.id && (
                    <div className="absolute top-0 right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md">
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={() => openEditModal(post.id, post.content)}
                      >
                        Edit
                      </button>
                      <button
                        className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                        onClick={() => openDeleteModal(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-5 mb-3 text-justify">{post.content}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="rounded-md shadow-md mb-5" />}
              <div className="flex items-end justify-between">
                <LikePost postId={post.id} />
                <CommentPost postId={post.id} />
              </div>
              <div className="h-0.5 w-full bg-gray-200 mt-5 mb-5"></div>
              <AllComments postId={post.id} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <Twitterposts />
      </div>
    </div>
  );
}

export default Profile;

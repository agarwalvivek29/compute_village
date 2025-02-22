'use client';

import { useUser } from '@clerk/nextjs';

const UserProfileShow = () => {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <p>No user is signed in.</p>;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div style={{ textAlign: 'center' }} className="flex flex-col justify-center items-center">
      <img
        src={user.imageUrl}
        alt="User Profile"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <h2>{name || 'No Name Provided'}</h2>
      <p>{email || 'No Email Provided'}</p>
    </div>
  );
};

export default UserProfileShow;
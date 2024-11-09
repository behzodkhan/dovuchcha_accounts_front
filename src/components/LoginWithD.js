import React from 'react';

const SignInWithDovuchcha = () => {
  const handleOAuthLogin = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/profile';
    window.location.href = `http://localhost:8000/o/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read`;
  };

  return (
    <div>
      <button onClick={handleOAuthLogin}>Sign in with Dovuchcha</button>
    </div>
  );
};

export default SignInWithDovuchcha;
import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    const awsSessionToken = import.meta.env.VITE_AWS_SESSION_TOKEN;

    console.log('AWS Access Key ID:', awsAccessKeyId);
    console.log('AWS Secret Access Key:', awsSecretAccessKey);
    console.log('AWS Session Token:', awsSessionToken);

    // Utiliser ces variables pour initialiser AWS SDK ou pour des appels API
  }, []);

  return (
    <div>
      {/* Votre contenu */}
    </div>
  );
};

export default MyComponent;

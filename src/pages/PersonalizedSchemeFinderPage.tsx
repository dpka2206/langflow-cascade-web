
import React from 'react';
import PersonalizedSchemeFinder from '@/components/PersonalizedSchemeFinder';
import Navbar from '@/components/Navbar';
import SchemeChatbot from '@/components/SchemeChatbot';

const PersonalizedSchemeFinderPage = () => {
  return (
    <>
      <Navbar />
      <PersonalizedSchemeFinder />
      <SchemeChatbot />
    </>
  );
};

export default PersonalizedSchemeFinderPage;

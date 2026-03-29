"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { UserDetailsContext } from '@/context/UserDetailContext';

export type UserDetails = {
  name: string;
  email: string;
  credits: number;
};

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (user) {
      const createNewUser = async () => {
        try {
          const result = await axios.post('/api/user'); // ✅ Corrected endpoint
          console.log(result.data);
          setUserDetail(result.data);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };
      createNewUser();
    }
  }, [user]);

  return (
    <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default Provider;

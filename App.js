/*import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './navigation/AppNav';
export default function App() {
  return (
<AuthProvider>
<AppNav/>
    </AuthProvider>
   
  );
}*/

import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
<AuthProvider><AppNavigation/>
</AuthProvider>
  );
}
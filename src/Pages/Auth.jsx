import React from 'react';
import RecipeFilter from './RecipeFilter';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { View, Image, useTheme, useAuthenticator, Text, Button, Heading } from '@aws-amplify/ui-react';
import { getImageUrl } from '../components/Images';
import '../App.css'

// Custom authentication components
const logo= getImageUrl("logo.png")
const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image alt="tofu" src={logo} />
      </View>
    );
  },
  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>&copy; Made by Devanshi Prasad</Text>
      </View>
    );
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toForgotPassword} size="small" variation="link">
            Reset Password
          </Button>
        </View>
      );
    },
  },
  // Other components (SignUp, ConfirmSignUp, etc.) remain the same as before
};

// Custom form fields
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  // Other form fields (forceNewPassword, forgotPassword, etc.) remain the same as before
};

function Auth() {
  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => (
        <>
          <RecipeFilter/>
          {/* <button onClick={signOut}>Sign out</button> */}

          <View as='button'
            className='signout'
            backgroundColor="#7D4646"
            borderRadius="50px"
            border="2px solid #000000"
            padding="12px 24px"
            justifyContent="center"
            cursor="pointer"
            onClick={signOut}
          >
            sign out
          </View>
        </>
      )}
    </Authenticator>
  );
}

export default Auth;

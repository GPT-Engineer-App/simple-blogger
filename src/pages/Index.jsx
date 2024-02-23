import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Text, Input, Button, Textarea, useToast, extendTheme } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaPen } from "react-icons/fa";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const apiBaseURL = "https://backengine-staging-fcxr.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiBaseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Logged in successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed.",
          description: data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${apiBaseURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        toast({
          title: "Signed up successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Sign up failed.",
          description: data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to sign up.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    toast({
      title: "Logged out successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        {!isLoggedIn ? (
          <VStack spacing={4} align="flex-start">
            <Heading>Login or Sign Up</Heading>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
              Login
            </Button>
            <Button leftIcon={<FaUserPlus />} onClick={handleSignUp}>
              Sign Up
            </Button>
          </VStack>
        ) : (
          <VStack spacing={4} align="flex-start">
            <Heading>Create a Blog Post</Heading>
            <Textarea placeholder="What's on your mind?" />
            <Button leftIcon={<FaPen />}>Post</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Index;

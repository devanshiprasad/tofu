import React from 'react'
import './welcome.css'
import { Link, Route } from 'react-router-dom';
import Auth from './Auth';
import RecipeFilter from './RecipeFilter';
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
  Input,
} from '@aws-amplify/ui-react';
export default function Welcome() {
  return (
    <>
    <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    height="100vh">

    <View as='div' height="5rem" width="50rem" maxWidth="100%" alignSelf="center" paddingTop="70px">
      <Heading level={1} className='header'>TOFU: A recipe finder App </Heading>
    </View>
    <View as='div' height="5rem" width="30rem" maxWidth="100%" paddingTop="25px"> 
      <Heading level={3} className='hey'>Hey there!</Heading>
    </View>
    <View as='p' height="5rem" width="50rem" maxWidth="100%" className='description' fontSize="20px">
    Welcome to Tofu- an app that allows you to find recipes while taking care of your health needs, such as <b>food preferences</b> and <b>allergies*</b>. 
    </View>
    <Link to="/Auth">
    <View as="button" backgroundColor="#7D4646" borderRadius="50px" border="2px solid #000000" padding="12px 24px" justifyContent="center" width="fit-content" cursor="pointer" className='signbtn'>
      <Text color="#FFFFFF" fontWeight="bold" fontSize="1rem" >sign me up!</Text>
    </View>
    </Link>
    
    <Link to= "/RecipeFilter">
    <Text className='unauth' maxWidth="100%" lineHeight="1.5em" fontStyle="Inter"><u>no, I want to explore without an account</u></Text>
    </Link>
    <View as="div" width="rem" maxWidth="100%" className='footer' fontStyle="15px" fontWeight="bold"> <Text className='span' >*click <span ><a className='link' href='https://www.mayoclinic.org/diseases-conditions/food-allergy/symptoms-causes/syc-20355095#:~:text=When%20you%20have%20a%20food,food%20substance%2C%20called%20an%20allergen.'>here</a></span>  to learn more about food preferences and allergies and why they are important</Text></View>

    </Flex>

   

    </>
  )
}

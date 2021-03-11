import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    //arrange
    render(<ContactForm/>);
    //act
    const header = screen.queryByText(/Contact Form/i)
    //assert
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange
    render(<ContactForm/>);
    //act
    const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput, "jeff");
    //assert
    const InputError = await screen.findByText(/Error/i);
    expect(InputError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //arrange
    render(<ContactForm/>);
    //act
    const button = screen.getByRole("button");
    userEvent.click(button);
    // //assert
    const firstInputError = await screen.findByText(/Error: firstName must have at least 5 characters./i);
    const lastInputError = await screen.findByText(/Error: lastName is a required field./i);
    const emailError = await screen.findByText(/Error: email must be a valid email address./i);
    expect.assertions(3);
    expect(firstInputError).toBeInTheDocument();
    expect(lastInputError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //arrange
    render(<ContactForm/>);
    //act
    const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput, "Kevin");
    const lastInput = screen.getByLabelText("Last Name*")
    userEvent.type(lastInput, "Jeff");
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, " ");
    userEvent.clear(emailInput);
    //assert
    const emailError = await screen.findByText(/Error: email must be a valid email address./i);
    expect.assertions(1);
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //arrange
    render(<ContactForm/>);
    //act
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, "jeff");
    //assert
    const emailError = await screen.findByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //arrange
    render(<ContactForm/>);
    //act
    const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput, "Jackson");
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, "Jack@email.com");
    const button = screen.getByRole("button");
    userEvent.click(button);
    //assert
    const lastInputError = await screen.findByText(/Error: lastName is a required field./i);
    expect(lastInputError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //arrange
    render(<ContactForm/>);

    const firstName = "Jackson";
    const lastName = "Henry";
    const userEmail = "Jack@email.com";
    const userMessage = "Message";
    //act
    const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput, firstName);
    const lastInput = screen.getByLabelText("Last Name*")
    userEvent.type(lastInput, lastName);
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, userEmail);
    const messageInput = screen.getByLabelText("Message")
    userEvent.type(messageInput, "")
    const button = screen.getByRole("button");
    userEvent.click(button);
    //assert
    const firstInputField = await screen.getByTestId("firstnameDisplay");
    const lastInputField = await screen.getByTestId("lastnameDisplay");
    const emailField = await screen.getByTestId("emailDisplay");
    const messageField = await screen.queryByTestId("messageDisplay");
    expect.assertions(4);
    expect(firstInputField).toBeInTheDocument();
    expect(lastInputField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(messageField).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    //arrange
    render(<ContactForm/>);

    const firstName = "Jackson";
    const lastName = "Henry";
    const userEmail = "Jack@email.com";
    const userMessage = "Message";
    //act
    const firstInput = screen.getByLabelText("First Name*")
    userEvent.type(firstInput, firstName);
    const lastInput = screen.getByLabelText("Last Name*")
    userEvent.type(lastInput, lastName);
    const emailInput = screen.getByLabelText("Email*")
    userEvent.type(emailInput, userEmail);
    const messageInput = screen.getByLabelText("Message")
    userEvent.type(messageInput, userMessage)
    const button = screen.getByRole("button");
    userEvent.click(button);
    //assert
    const firstInputField = await screen.getByTestId("firstnameDisplay");
    const lastInputField = await screen.getByTestId("lastnameDisplay");
    const emailField = await screen.getByTestId("emailDisplay");
    const messageField = await screen.queryByTestId("messageDisplay");
    expect.assertions(4);
    expect(firstInputField).toBeInTheDocument();
    expect(lastInputField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(messageField).toBeInTheDocument()
});
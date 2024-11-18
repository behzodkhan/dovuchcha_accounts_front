import React, { useEffect, useContext, useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import '@mantine/core/styles.css';
import LogoFav from './favicon.svg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Loader } from '@mantine/core';  

const DovuchchaLogo = () => (
    <img src={LogoFav} alt="" width='43'/>
);

export function AuthenticationTitle() {
    const { loginUser, authTokens } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const redirect_url = searchParams.get('redirection');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (authTokens) {
            if (redirect_url) {
                const url = new URL(redirect_url);
                url.searchParams.append('refresh_token', authTokens.refresh);
                window.location.href = url.toString();
            } else {
                navigate('/');
            }
        }
    }, [authTokens, redirect_url, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const success = await loginUser(e);

        if (success) {
            if (redirect_url) {
                const url = new URL(redirect_url);
                url.searchParams.append('refresh_token', authTokens.refresh);
                window.location.href = url.toString();
            } else {
                navigate('/');
            }
        } else{
            setLoading(false)
        }
    };

    return (
        <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
            Welcome back to
        </Title>
        <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'center'}}>
            <h1>D</h1>
            <DovuchchaLogo />
            <h1>vuchcha</h1>
        </div> 
        <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
            Create account
            </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={handleSubmit}>
                <TextInput name="username" label="Username" placeholder="Your username" required />
                <PasswordInput name="password" label="Password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
                <Checkbox label="Remember this device" />
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
                </Group>
                <Button fullWidth mt="xl" type='submit' disabled={loading}>
                    {loading ? <div><Loader color="lime" type="dots" size='md' /></div> : 'Sign In'}
                </Button>
            </form>
        </Paper>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
            <div>
                <Anchor underline="always" style={{color: '#525150', fontSize: '14px'}}>API</Anchor>
                <span> | </span>
                <Anchor underline="always" style={{color: '#525150', fontSize: '14px'}}>Help</Anchor>
            </div>
            <div>
                
                <Anchor underline="always" style={{color: '#525150', fontSize: '14px'}}>Privacy</Anchor>
                <span> | </span>
                <Anchor underline="always" style={{color: '#525150', fontSize: '14px'}}>Terms</Anchor>
            </div>
        </div>
        </Container>
    );
}
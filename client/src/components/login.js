import React, {useState} from 'react';
import {FormField, TextInput, Form, Button, Box} from 'grommet';
import {fetchLogin} from "../actions";
const defaultValues  = {
    username: "",
    password: ""
};
const Login = ({setUserData}) => {
    const [formData, setFormData]= useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = ()=>{
        const {username, password} = formData;
        if (username.length && password.length) {
            setIsLoading(true);
            fetchLogin({username, password})
                .then((resp)=>{
                    setUserData(resp);
                })
                .finally(()=>{
                    setIsLoading(false);
                })

        }
    }
    return (
        <Box align="center" height={'100%'} width={'100%'} justify={'center'}>
        <Form
            value={formData}
            onChange={nextValue => setFormData(nextValue)}
            onReset={() => setFormData(defaultValues)}
            onSubmit={onSubmit}
        >
            <FormField
                htmlFor="text-input-id-login"
                label={"Username"}
                name="username"
            >
                <TextInput
                    a11yTitle={"username"}
                    id="text-input-id-login"
                    name="username"
                />
            </FormField>
            <Box direction={"row"}>
            <FormField
                htmlFor="text-input-id-password"
                label={"Password"}
                name="password"
            >

                    <TextInput
                        a11yTitle={"password"}
                        id="text-input-id-password"
                        name="password"
                        type={'password'}

                    />
            </FormField>
            </Box>

            <Box direction="row" gap="medium">
                <Button
                    disabled={isLoading}
                    label={"Sign In"}
                    primary
                    type="submit"
                />
                <Button
                    label={"Reset"}
                    type="reset"
                />
            </Box>
        </Form>
        </Box>
    );
};

export default Login;
import {Button, Link, Stack, TextInput, Tile} from '@carbon/react';
import {useSetState} from 'ahooks';
import Form, {Field} from 'rc-field-form';

import {history} from 'umi';

const Input = ({value = '', ...props}) =>
{
    console.log(props);
    return <TextInput value={value} {...props} />;
};

export default () =>
{
    const [form] = Form.useForm();

    const [validForm, setValidForm] = useSetState({
        username: false,
        usernameValidationMessage: '',
        password: false,
        passwordValidationMessage: ''
    });

    const finishFailed = (errorInfo) =>
    {
        const {errorFields} = errorInfo;

        console.log('failed', errorFields);
    };

    const onValuesChange = async (changedValue, _allValues) =>
    {
        const [[key, value]] = Object.entries(changedValue);

        try
        {
            await form.validateFields([key]);
        }
        catch (e)
        {
            console.log(e);
        }

        const listOfErrors = form.getFieldError(key);

        setValidForm({
            [key]: listOfErrors.length > 0,
            [`${key}ValidationMessage`]: listOfErrors[0]
        });

        if (listOfErrors.length > 0)
        {
            console.log(key, value, form.getFieldError(key));
        }
        else
        {
            setValidForm({
                [key]: false,
                [`${key}ValidationMessage`]: ''
            });
        }
    };

    return <div className={'h-box'}>
        <Tile light={true}>
            <img src={'/login.svg'}
                 width={200}
                 alt={''}/>
        </Tile>

        <Tile light={true}
              className={'login-form'}>
            <Form form={form}
                  autoComplete={'off'}
                  onValuesChange={onValuesChange}
                  onFinishFailed={finishFailed}
                  onFinish={values =>
                  {
                      console.log(values);
                  }}>
                <Stack gap={7}>
                    <h2>Login</h2>
                    <div style={{
                        borderBottom: '1px solid #e0e0e0',
                        paddingBottom: '10px'
                    }}>
                        Don't have an account? <Link onClick={() => history.push('/register')}>Register</Link>
                    </div>

                    <Field name={'username'}
                           rules={[
                               {
                                   required: true,
                                   type: 'email',
                                   message: 'The field must be in email format'
                               }
                           ]}>
                        <Input id={'username'}
                               autoComplete={'off'}
                               invalid={validForm.username}
                               invalidText={validForm.usernameValidationMessage}
                               labelText={'Username'}
                               placeholder={'Type your email'}
                            /*helperText={'Type the email address that was used during the registration'}*//>
                    </Field>

                    <Field name={'password'}
                           rules={[
                               {
                                   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                   message: 'The password must contain at least 8 characters, including uppercase, lowercase letters and numbers'
                               }
                           ]}>
                        <Input id={'password'}
                               invalid={validForm.password}
                               invalidText={validForm.passwordValidationMessage}
                               labelText={'Password'}
                               type={'password'}
                               placeholder={'Type password'}/>
                    </Field>

                    <div>
                        <Button kind={'primary'}
                                className={'w100'}
                                type={'submit'}>Login</Button>
                    </div>

                    <div>
                        <Link>Reset password</Link>
                    </div>
                </Stack>

            </Form>
        </Tile>
    </div>;
}
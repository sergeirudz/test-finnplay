import styles from './LoginForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import Input from './Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../store/apis/authApi';
import { useEffect } from 'react';

const FormSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export type LoginFormValuesProps = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    handleSubmit,
    register,

    formState: { isSubmitting },
  } = useForm<LoginFormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/login';

  useEffect(() => {
    if (isSuccess) {
      navigate(from);
    }
  }, [isLoading, isSuccess, navigate, from]);

  const onSubmit: SubmitHandler<LoginFormValuesProps> = (values) => {
    loginUser(values);
  };

  return (
    <div className={styles.container}>
      <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input label="username" register={register} required type="text" />
        <Input
          label="password"
          register={register}
          required
          showIcon
          type="password"
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </form>
      {isError ? <p style={{ color: 'red' }}>Invalid credentials</p> : null}
    </div>
  );
};

export default LoginForm;

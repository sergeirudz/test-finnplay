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
    reset,
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<LoginFormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  useEffect(() => {
    if (isSuccess) {
      navigate(from);
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => console.log(el.message));
      } else {
        console.log((error as any).data.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

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
    </div>
  );
};

export default LoginForm;

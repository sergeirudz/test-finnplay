import styles from './LoginForm.module.scss';
import {
  Controller,
  FieldValues,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import { useEffect, useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  login: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

type FormValuesProps = {
  login: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    const response = await axios.post(
      'user/login',
      {
        username: data.login,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`;

    if (response.status === 200 && response.data.token) {
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input label="login" register={register} required type="text" />
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

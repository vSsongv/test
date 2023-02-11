import React, { useRef } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import styled from 'styled-components';
import showPassword from '../../../assets/images/ShowPassword.png';

interface InputFormProps {
  purpose: 'email' | 'password' | 'password_confirm' | 'nickname' | 'phone';
  label: string;
  placeholder: string;
  option?: string;
}

interface FormValue {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const InputFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-family: 'NanumGothic';
  font-weight: 600;
  color: #858585;
  margin-bottom: 6px;
  text-align: left;
`;

const InputStyle = {
  backgroundColor: '#efefef',
  border: 'none',
  padding: '25px',
  fontFamily: 'NanumGothic',
  fontSize: '14px',
  height: '63px',
  borderRadius: '20px',
  width: '493px',
  color: 'black',
};

const CheckNickBtn = styled.button`
  font-family: NanumGothic;
  font-size: 14px;
  width: 57px;
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  padding-top: 5%;
  margin-right: 5%;
  right: 0;
`;

const ShowPwdBtn = styled.button`
  border: 0;
  background-image: url(${showPassword});
  width: 21px;
  height: 27px;
  cursor: pointer;
  background-size: contain;
  position: absolute;
  margin-top: 3.5%;
  margin-right: 5%;
  right: 0;
`;

/**
 * @author Ssong
 * @description Input Molescules
 * @param {Props} label label for input area
 * @param {Props} placeHolder example text for input area
 * @param {Props} option optional btn
 *
 * @example

 * <View style={{width: someWidth, height: someHeight}}>
 *   <Button onPress={handleClick}>
 *     <Text>메뉴 추가하기</Text>
 *   </Button>
 * </View>
**/

const InputForm = ({ purpose, label, placeholder, option }: InputFormProps) => {
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    console.log('FDds', passwordRef);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const rule: { [key: string]: FieldValues } = {
    email: {
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: '* 이메일 형식에 맞지 않습니다.',
      },
    },
    password: {
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: '* 영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.',
      },
    },
    nickname: {
      pattern: {
        value: /^[가-힣]+$^[a-zA-Z]*$/,
        message: '* 10자 이내 영어,한글로 된 닉네임을 입력해주세요.',
      },
    },
    phone: {
      pattern: {
        value: /^\d{3}\d{3,4}\d{4}$/,
        message: '* 올바르지 않은 형식입니다.',
      },
    },
  };

  return (
    <InputFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Label>{label}</Label>
      <Wrapper>
        <input
          style={InputStyle}
          placeholder={placeholder}
          {...register(purpose, {
            required: `${purpose}값은 필수값입니다.`,
            ...rule[purpose],
            validate: purpose === 'password_confirm' ? (value) => value === passwordRef.current : undefined,
          })}
        />
        {option === '중복확인' ? <CheckNickBtn onClick={() => onSubmit}>중복확인</CheckNickBtn> : option === '비밀번호확인' ? <ShowPwdBtn onClick={() => onSubmit}></ShowPwdBtn> : ''}
      </Wrapper>
      {errors[purpose] && (
        <small style={{ color: 'red', textAlign: 'right', marginTop: '5px' }} role='alert'>
          *{errors[purpose]?.message}
        </small>
      )}
    </InputFormContainer>
  );
};

export default InputForm;

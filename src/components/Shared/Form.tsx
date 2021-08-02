import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Elements from "@bit/meema.ui-components.elements";
import { pixelToRem, CustomCSSType } from "meema.utils";
import styled, { css } from "styled-components";
import Icons from '../../images/icons';
import { useHistory } from 'react-router-dom';
import { OnChangeEvent } from 'greenpeace';

/*
* TODO:
*  - Debounce input 
*/

/**
 * Defines margin right and left. Also resets margins at first and last child.
 * @param marginRight Margin Right
 * @param marginLeft Margin Right
 * @returns 
 */
const innerMargin = (marginRight: number, marginLeft: number) => css`
  margin-right: ${pixelToRem(marginRight)};
  /* margin-left: ${pixelToRem(marginLeft)}; */

  /* &:first-child {
    margin-left: 0;
  } */
  
  &:last-child {
    margin-right: 0;
  }
`;

const Main = styled(Elements.Form)`
  flex-direction: column;
  position: fixed;
  padding: ${pixelToRem(20)} ${pixelToRem(24)} ${pixelToRem(70)};
  /* background-color: ${({theme}) => theme.color.secondary.light}; */
  left: 0;
  top: 0;
  width: 100%;
  /* min-height: 100vh; */
  overflow: auto;

  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    position: relative;
  }
`;

const Content = styled(Elements.Wrapper)``;

const NavigationNav: React.FunctionComponent<{}> = memo(() => {
  const history = useHistory();

  const onBack = useCallback(() => {
    history.goBack();
  }, [
    history,
  ]);
  
  const onClose = useCallback(() => {
    history.push('/');
  }, [
    history,
  ]);

  return useMemo(() => (
    <Elements.Nav
      customCss={css`
        display: flex;
        justify-content: space-between;
        width: 100%;

        img {
          cursor: pointer;
        }
      `}
    >
      <Elements.Img src={Icons.BackIcon} role='button' onClick={onBack} />
      <Elements.Img src={Icons.XIcon} role='button' onClick={onClose} />
    </Elements.Nav>
  ), [
    onClose,
  ]);
});

const Row = styled(Elements.Wrapper)<{ title?: string; }>`
  display: flex;
  flex-direction: row;
  width: 100%;

  ${({ title }) => (title) && css`
    font-size: ${pixelToRem(18)};

    &:before {
      width: 100%;
      content: "${title}";
    }
  `}
`;

const Column = styled(Elements.Wrapper)`
  display: flex;
  width: 100%;
  
  ${innerMargin(20, 20)};
  
  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    flex-direction: row;
  }
`;

const Group: React.FunctionComponent<{
  children?: React.ReactNode | HTMLAllCollection;
  fieldName: string;
  labelText?: string;
  value?: string|number;
  showErrorMessage?: boolean;
  customCss?: CustomCSSType;
  validateFn?: (value: any) => any;
  onUpdateHandler?: (fieldName: string, isValid: boolean) => void;
}> = ({
  children,
  fieldName,
  labelText,
  showErrorMessage = false,
  value,
  customCss,
  validateFn,
  onUpdateHandler,
}) => {
  const [ isValid, setIsValid ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {
    if(validateFn) {
      const validator = validateFn(value);
      setIsValid(validator.isValid);
      setErrorMessage(validator.errorMessage);
      
      if(onUpdateHandler && fieldName) {
        onUpdateHandler(fieldName, validator.isValid);
      }
    }
  }, [
    fieldName,
    value,
  ]);

  return useMemo(() => (
    <Elements.Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: ${pixelToRem(16)};
        
        &:after {
          width: 100%;
          /* display: ${(!isValid && value !== '' && showErrorMessage && errorMessage) ? 'flex' : 'none'}; */
          margin-top: ${pixelToRem(10)};
          font-size: ${pixelToRem(15)};
          color: ${({theme}) => theme.color.error.normal};
          text-align: left;
          content: "${(!isValid && value !== '' && showErrorMessage && errorMessage) ? errorMessage : ""}";
        }
  
        input[type="text"], input[type="email"], textarea {
          width: 100%;
  
          ${(value === '') && css`
            border-color: ${({theme}) => theme.color.secondary.normal};
          `}
          
          ${(!isValid && value !== '') && css`
            border-color: ${({theme}) => theme.color.error.normal};
          `}
        }
        ${innerMargin(20, 20)};

        ${(customCss) && customCss};
      `}
    >
      {(labelText) && (
        <Elements.Label
          htmlFor={fieldName}
          customCss={css`
            text-align: left;
          `}
        >{labelText}</Elements.Label>
      )}
      {children}
    </Elements.Wrapper>
  ), [
    children,
    fieldName,
    labelText,
    showErrorMessage,
    value,
    customCss,
    validateFn,
    onUpdateHandler,
  ]);
};

const Header = styled(Elements.Header)`
  margin: ${pixelToRem(27)} 0; 
`;

const HeaderTitle = styled(Elements.H1)`
  font-size: ${pixelToRem(18)};
  font-style: normal;
  font-weight: 600;
  line-height: ${pixelToRem(34)};
  text-align: left;
  color: ${({theme}) => theme.color.primary.normal};
`;

const Text = styled(Elements.P)`
  font-size: ${pixelToRem(16)};
  font-style: normal;
  font-weight: 400;
  line-height: ${pixelToRem(18)};
  text-align: left;
`;

const MainTitle = styled(Elements.H1)`
  font-size: ${pixelToRem(24)};
  font-style: normal;
  font-weight: 600;
  line-height: ${pixelToRem(30)};
  text-align: left;
`;

const Title = styled(Elements.H2)`
  margin-bottom: ${pixelToRem(16)};
  font-size: ${pixelToRem(16)};
  font-style: normal;
  font-weight: 600;
  line-height: ${pixelToRem(30)};
  text-align: left;
`;

const Nav = styled(Elements.Nav)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Message = styled(Elements.P)`
  text-align: left;
`;

const ErrorMessage = styled(Elements.Wrapper)`
  display: flex;
  align-items: center;
  padding: ${pixelToRem(12)};
  border-radius: ${pixelToRem(5)};
  background-color: ${({theme}) => theme.color.error.normal};
  color: white;

  &:before {
    width: ${pixelToRem(20)};
    height: ${pixelToRem(20)};
    margin-right: ${pixelToRem(12)};
    background-size: ${pixelToRem(20)} ${pixelToRem(20)};
    background-position: center center;
    background-repeat: no-repeat;
    transform-origin: center;
    background-image: url(${Icons.WarningIcon});
    content: "";
  }
`;

const CarouselWrapper = styled(Elements.Wrapper)`
  flex: 0 0 100%;
`;

const TextArea = styled(Elements.TextArea)`
  display: flex;
  width: 100%;
  margin: 0;
  min-height: ${pixelToRem(100)};
  padding: ${pixelToRem(12)} ${pixelToRem(12)};
  border: none;
  background-color: white;
  border: ${pixelToRem(1)} solid ${({theme}) => theme.color.secondary.normal};
  border-radius: ${pixelToRem(10)};
  font-size: ${pixelToRem(16)};
  overflow: auto;
  outline: none;
  resize: none;
  
  &:disabled {
    opacity: .5;
  }
  
  &:focus {
    border-color: ${({theme}) => theme.color.primary.normal};
    box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} rgba(0, 0, 0, .05);
  }
`;

const Button = styled(Elements.Button)`
  /* width: 100%; */
  padding: ${pixelToRem(10)};
  color: white;
  background-color: ${({theme}) => theme.color.primary.normal};
  border-radius: ${pixelToRem(5)};
  font-size: ${pixelToRem(16)};
  font-family: ${({theme}) => theme.font.family.primary.normal};
  padding: ${pixelToRem(13)} ${pixelToRem(60)};

  &:hover {
    background-color: ${({theme}) => theme.color.primary.dark};
  }
  
  &:disabled {
    background-color: ${({theme}) => theme.color.secondary.normal};
  
    &:hover {
      background-color: ${({theme}) => theme.color.secondary.normal};
    }
  }

  ${({format}) => (format === 'text') && css`
    background-color: transparent;
    color: ${({theme}) => theme.color.secondary.normal};
    text-decoration: underline;

    &:hover {
      background-color: transparent;
      box-shadow: none !important;
    }
  `}
`;

const RadioButton: React.FunctionComponent<{
  name: string;
  value: string;
  text: string;
  checkedValue: string;
  customCss?: CustomCSSType;
  onChangeHandler: (evt: OnChangeEvent) => void;
}> = ({
  name,
  value,
  text,
  checkedValue,
  customCss,
  onChangeHandler,
}) => {
  return useMemo(() => (
    <Elements.Label
      customCss={css`
        display: inline-flex;
        align-items: center;
        width: fit-content;
        cursor: pointer;
        margin-bottom: ${pixelToRem(10)};
        user-select: none;
        text-align: left;
        
        ${(customCss) && customCss};
      `}
    >
      <Elements.Input
        type='radio'
        name={name}
        value={value}
        checked={(checkedValue === value)}
        data-text={text}
        onChange={onChangeHandler}
        customCss={css`
          position: absolute;
          width: ${pixelToRem(20)};
          opacity: 0;
          cursor: pointer;
          z-index: 1;
        `}
      />
      <Elements.Wrapper
        customCss={css`
          flex: 0 0 ${pixelToRem(20)};
          width: ${pixelToRem(20)};
          height: ${pixelToRem(20)};
          border-radius: ${pixelToRem(2)};
          background-color: white;
          border: solid ${pixelToRem(1)} ${({theme}) => theme.color.secondary.normal};
          margin-right: ${pixelToRem(10)};
          transition: all 150ms ease;

          ${(checkedValue === value) && css`
            border-color: ${({theme}) => theme.color.primary.normal};
            border-width: ${pixelToRem(4)};
          `}
        `}
      />
      {text}
    </Elements.Label>
  ), [
    name,
    value,
    text,
    checkedValue,
    customCss,
    onChangeHandler,
  ]);
};

const _ = {
  Main,
  Header,
  Text,
  NavigationNav,
  Content,
  Row,
  Column,
  Group,
  MainTitle,
  Title,
  Nav,
  Message,
  ErrorMessage,
  CarouselWrapper,
  TextArea,
  Button,
  RadioButton,
};

export default _;
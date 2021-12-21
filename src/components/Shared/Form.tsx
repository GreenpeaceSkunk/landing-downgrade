import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Elements from "@bit/meema.ui-components.elements";
import { pixelToRem, CustomCSSType } from "meema.utils";
import styled, { css } from "styled-components";
import Icons from '../../images/icons';
import { NavLink, useHistory } from 'react-router-dom';
import { OnChangeEvent } from 'greenpeace';
import { FormContext } from '../Forms/context';

// export type OnUpdateFieldHandlerFn = ( fieldName: string, value: string, isValid: boolean ) => void;
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
  
  &:last-child {
    margin-right: 0;
  }
`;

const Main = styled(Elements.Form)`
  flex-direction: column;
  /* padding: ${pixelToRem(20)} ${pixelToRem(24)} ${pixelToRem(40)}; */
  width: 100%;
  overflow: auto;

  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    position: relative;
    padding-bottom: ${pixelToRem(70)};
  }
`;

const Content = styled(Elements.Wrapper)``;

const NavigationNav: React.FunctionComponent<{ allowGoBack?: boolean }> = memo(({
  allowGoBack = true,
}) => {
  const history = useHistory();
  const { currentIndex, setCurrentIndex } = useContext(FormContext);

  const onBack = useCallback(() => {
    if(allowGoBack) {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
    }
  }, [
    allowGoBack,
    currentIndex,
    setCurrentIndex,
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
        justify-content: ${(currentIndex > 0 && allowGoBack) ? 'space-between' : 'flex-end'};
        width: 100%;
        margin-bottom: ${pixelToRem(45)};

        img {
          cursor: pointer;
        }
      `}
    >
      {(currentIndex > 0 && allowGoBack) && <Elements.Img src={Icons.BackIcon} role='button' onClick={onBack} />}
      <Elements.Img src={Icons.XIcon} role='button' onClick={onClose} />
    </Elements.Nav>
  ), [
    allowGoBack,
    currentIndex,
    onBack,
    onClose,
  ]);
});

// Changed to FunctionComponent
// Text should be a legend tag
const Row = styled.fieldset<{ title?: string; }>`
  display: flex;
  flex-direction: column;
  border: none;
  width: 100%;

  ${({ title }) => (title) && css`
    font-size: ${pixelToRem(18)};

    &:before {
      width: 100%;
      content: "${title}";
    }
  `}

  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    flex-direction: row;
  }
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
  labelBottomText?: string;
  value?: string|number;
  showErrorMessage?: boolean;
  isRequired?: boolean;
  customCss?: CustomCSSType;
  validateFn?: (value: any) => any;
  onUpdateHandler?: (fieldName: string, isValid: boolean, value?: string|number) => void;
}> = ({
  children,
  fieldName,
  labelText,
  labelBottomText,
  showErrorMessage = false,
  isRequired = false,
  value = '',
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
        onUpdateHandler(fieldName, validator.isValid, value);
      }
    }
  }, [
    fieldName,
    value,
    validateFn,
    onUpdateHandler,
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
          margin-top: ${pixelToRem(10)};
          font-size: ${pixelToRem(14)};
          line-height: 1;
          color: ${({theme}) => theme.color.error.normal};
          text-align: left;
          content: "${(!isValid && showErrorMessage && errorMessage) ? errorMessage : ""}";
        }
  
        input[type="text"], input[type="email"], textarea {
          width: 100%;
  
          ${(value === '') && css`
            border-color: ${({theme}) => theme.color.secondary.normal};
          `}
          
          ${(!isValid && showErrorMessage) && css`
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
            line-height: 1;
            font-size: ${pixelToRem(14)};
            margin-bottom: ${pixelToRem(6)};
            color: white;
            
            &:after {
              ${(isRequired) && css`
                content: "*";
                margin-left: ${pixelToRem(2)};
                color: ${({theme}) => theme.color.error.normal};
              `}
            }
          `}
        >{labelText}</Elements.Label>
      )}
      {children}
      {(labelBottomText) ? (
        <Elements.Label
          customCss={css`
            font-size: ${pixelToRem(14)};
            margin-top: ${pixelToRem(4)};
            text-align: left;
            color: white;
          `}
        >{labelBottomText}</Elements.Label>
      ) : null}
    </Elements.Wrapper>
  ), [
    children,
    fieldName,
    labelText,
    labelBottomText,
    errorMessage,
    showErrorMessage,
    value,
    customCss,
    isValid,
    isRequired,
  ]);
};

const Header = styled(Elements.Header)`
  margin: ${pixelToRem(27)} 0; 
`;

const Text = styled(Elements.P)`
  font-size: ${pixelToRem(16)};
  font-style: normal;
  font-weight: 400;
  color: white;
  text-align: center;

  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(18)};
  }
`;

const MainTitle = styled(Elements.H1)`
  font-size: ${pixelToRem(26)};
  margin-bottom: ${pixelToRem(10)};
  font-style: normal;
  font-weight: 600;
  text-align: left;
  color: white;
  text-align: center;
  font-family: ${({theme}) => theme.font.family.primary.bold};
  
  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(32)};
  }
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
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-top: ${pixelToRem(40)};

  > * {
    &:not(:last-child) {
      margin-bottom: ${pixelToRem(20)};
    }
  } 
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
  margin-top: ${pixelToRem(18)};

  &:before {
    flex: 0 0 auto;
    width: ${pixelToRem(20)};
    height: ${pixelToRem(20)};
    background-size: ${pixelToRem(20)} ${pixelToRem(20)};
    background-position: center center;
    background-repeat: no-repeat;
    transform-origin: center;
    background-image: url(${Icons.WarningIcon});
    content: "";

    @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
      margin-right: ${pixelToRem(12)};
    }
  }
`;

const CarouselWrapper = styled(Elements.Wrapper)`
  flex: 0 0 100%;
`;

const Input = styled(Elements.Input)`
  display: flex;
  margin: 0;
  padding: ${pixelToRem(13)} ${pixelToRem(16)};
  width: 100%;
  font-size: ${pixelToRem(16)};
  border: ${pixelToRem(1)} solid #BDBDBD;
  /* border: ${pixelToRem(1)} solid ${({theme}) => theme.color.secondary.normal}; */
  border-radius: ${pixelToRem(10)};
  color: #333;
  outline: none;
  appearance: none;
  box-sizing: border-box;

  &::placeholder {
    color: #828282;
  }

  &:focus {
    border-color: ${({theme}) => theme.color.primary.normal};
    box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} rgba(0, 0, 0, .05);
  }
`;

const TextArea = styled(Elements.TextArea)`
  display: flex;
  width: 100%;
  margin: 0;
  min-height: ${pixelToRem(100)};
  padding: ${pixelToRem(12)};
  border: none;
  background-color: white;
  border: ${pixelToRem(1)} solid ${({theme}) => theme.color.secondary.normal};
  border-radius: ${pixelToRem(10)};
  font-size: ${pixelToRem(16)};
  line-height: ${pixelToRem(18)};
  font-family: ${({theme}) => theme.font.family.primary.regular} !important;
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

const ButtonLink = styled(NavLink)`
  color: ${({theme}) => theme.color.primary.normal};
  text-decoration: underline;
  width: fit-content;
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
          border-radius: 50%;
          background-color: #EEEEEE;
          border: solid ${pixelToRem(2)} ${({theme}) => theme.color.secondary.normal};
          margin-right: ${pixelToRem(10)};

          ${(checkedValue === value) && css`
            position: relative;
            border-color: ${({theme}) => theme.color.primary.normal};
            background-color: ${({theme}) => theme.color.primary.normal};

            &:after {
              position: absolute;
              flex: 0 0 ${pixelToRem(10)};
              width: ${pixelToRem(10)};
              height: ${pixelToRem(10)};
              border: solid ${pixelToRem(3)} #EEEEEE;;
              background-color: ${({theme}) => theme.color.primary.normal};
              border-radius: 50%;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              content: "";
            }
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
  Input,
  TextArea,
  ButtonLink,
  RadioButton,
};

export default _;

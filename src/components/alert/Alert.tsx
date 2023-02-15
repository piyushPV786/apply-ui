import {
  Info,
  ErrorOutline,
  Warning,
  CheckCircleOutline
} from '@material-ui/icons/'
import { AlertEnums } from '../common/constant'
import styled, { css } from 'styled-components'

interface IAlertProps {
  children: string
  severity?: AlertEnums
}
interface IStyledAlertProps {
  className: string
  variant?: AlertEnums
}

const AlertBox = ({ children, severity = AlertEnums.INFO }: IAlertProps) => {
  return (
    <StyledAlert
      variant={severity}
      className='p-2 d-flex shadow border-start border-primary border-4 rounded-end align-items-center'
    >
      {severity === AlertEnums.INFO && (
        <Info
          fontSize='large'
          color='primary'
          style={{ paddingRight: '10px' }}
        />
      )}
      {severity === AlertEnums.DANGER && (
        <ErrorOutline
          fontSize='large'
          color='secondary'
          style={{ paddingRight: '10px' }}
        />
      )}
      {severity === AlertEnums.WARNING && (
        <Warning
          fontSize='large'
          color='error'
          style={{ paddingRight: '10px' }}
        />
      )}
      {severity === AlertEnums.SUCCESS && (
        <CheckCircleOutline
          fontSize='large'
          color='inherit'
          style={{ paddingRight: '10px' }}
        />
      )}

      {children}
    </StyledAlert>
  )
}

export default AlertBox

const StyledAlert = styled.div<IStyledAlertProps>`
  max-width: 400px
    ${({ variant }) =>
      variant == AlertEnums.INFO &&
      css`
        background-color: skyblue !important;
      `}
    ${({ variant }) =>
      variant == AlertEnums.DANGER &&
      css`
        background-color: red !important;
      `};
  ${({ variant }) =>
    variant == AlertEnums.WARNING &&
    css`
      background-color: yellow !important;
    `};
  ${({ variant }) =>
    variant == AlertEnums.SUCCESS &&
    css`
      background-color: green !important;
    `};
`

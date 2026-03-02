import { ErrorCode } from '../../enum/errors/error.enum';

export interface AppError {
  code: ErrorCode;
  titleKey: string;
  messageKey: string;
}

import { Component, PropsWithChildren, ErrorInfo } from 'react';
import { AxiosError } from 'axios';
import Storage from '../../storage/storage';

class CustomAxiosError extends AxiosError<{ message: string }> {}

export interface FallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

interface ErrorBoundaryProps {
  fallback: React.ComponentType<FallbackProps>;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorCase: string | null;
}

const initialState: ErrorBoundaryState = {
  error: null,
  errorCase: null,
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
    errorCase: null,
  };

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (!(error instanceof AxiosError)) {
      return { error, errorCase: null };
    }

    if (error.response?.status === 401) {
      return {
        error,
        errorCase: 'unauthorized',
      };
    }

    if (error.response?.config.method === 'get') {
      console.log('geterror');
      return {
        error,
        errorCase: 'get',
      };
    }

    return { error, errorCase: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { error: errorState, errorCase } = this.state;

    if (errorCase === 'unauthorized') {
      alert('다시 로그인해주세요.');
      return;
    }
    if (errorCase === 'get') {
      if (errorState instanceof CustomAxiosError) {
        const errorMessage =
          errorState.response?.data.message ||
          '알 수 없는 에러가 발생했습니다.';

        alert(errorMessage);

        return;
      }

      alert('알 수 없는 에러가 발생했습니다.');

      return;
    }

    if (errorCase === null) {
      alert('알 수 없는 에러가 발생했습니다.');
    }
  }

  render() {
    const { fallback: FallbackComponent } = this.props;
    const { error, errorCase } = this.state;

    if (errorCase === 'unauthorized') {
      Storage.clearToken();
      window.location.replace('/login');
    }

    if (error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

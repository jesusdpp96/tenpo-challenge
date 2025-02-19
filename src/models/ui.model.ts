export interface UIContextType {
  showError: (message: string) => void;
  showLoading: (message?: string, fullscreen?: boolean) => void;
  hideLoading: () => void;
}

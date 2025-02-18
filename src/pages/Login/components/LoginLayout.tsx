import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

const pageLayoutCss = css`
  width: 100vw;
  height: 100vh;
  background-color: #42c268;
  position: relative;
`;

type Props = { children: ReactNode };

export const LoginLayout: FC<Props> = ({ children }) => (
  <div css={pageLayoutCss}>{children}</div>
);

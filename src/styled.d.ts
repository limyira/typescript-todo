import styled from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardColor: string;
    bordColor: string;
    over: string;
    from: string;
    cardOver: string;
  }
}

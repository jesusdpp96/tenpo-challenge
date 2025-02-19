import React, { createContext } from "react";
import { UIContextType } from "../models";

export const UIContext = createContext<UIContextType | undefined>(undefined);

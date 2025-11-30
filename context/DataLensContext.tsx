"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface HoverData {
  title: string;
  source: string;
  confidence?: 'High' | 'Medium' | 'Low';
  description?: string;
  link?: string;
}

interface DataLensContextType {
  data: HoverData | null;
  setHoverData: (data: HoverData | null) => void;
  clearData: () => void;
}

const DataLensContext = createContext<DataLensContextType | undefined>(undefined);

export function DataLensProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HoverData | null>(null);

  const setHoverData = useCallback((hoverData: HoverData | null) => {
    setData(hoverData);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return (
    <DataLensContext.Provider value={{ data, setHoverData, clearData }}>
      {children}
    </DataLensContext.Provider>
  );
}

export function useDataLens() {
  const context = useContext(DataLensContext);
  if (context === undefined) {
    throw new Error('useDataLens must be used within a DataLensProvider');
  }
  return context;
}


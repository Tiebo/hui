// Generated parser types for PGN (Portable Game Notation) files

export interface PGNNode {
  move?: string;
  comment?: string;
  variations: PGNNode[];
  suffix?: string;
  nag?: string;
}

export interface PGNParsed {
  headers: Record<string, string>;
  root: PGNNode;
  result?: string;
}

export class SyntaxError extends Error {
  constructor(message: string, expected: any, found: any, location: any);
  format(sources: string[]): string;
  static buildMessage(expected: any, found: any): string;
}

export function parse(input: string, options?: any): PGNParsed;

export const StartRules: string[]; 
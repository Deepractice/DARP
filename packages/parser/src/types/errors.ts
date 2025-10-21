/**
 * Error codes for ARP parser errors
 */
export enum ARPErrorCode {
  /** Invalid ARP format - general parsing error */
  INVALID_FORMAT = 'INVALID_FORMAT',

  /** Missing 'arp:' protocol prefix */
  MISSING_PROTOCOL = 'MISSING_PROTOCOL',

  /** Missing semantic type after 'arp:' */
  MISSING_SEMANTIC = 'MISSING_SEMANTIC',

  /** Missing location part */
  MISSING_LOCATION = 'MISSING_LOCATION',
}

/**
 * Base error class for all ARP parser errors
 */
export class ARPError extends Error {
  constructor(
    message: string,
    public code: ARPErrorCode,
    public input?: string,
  ) {
    super(message)
    this.name = 'ARPError'
  }
}

/**
 * Parse error - thrown when ARP string format is invalid
 */
export class ARPParseError extends ARPError {
  constructor(message: string, input: string) {
    super(message, ARPErrorCode.INVALID_FORMAT, input)
    this.name = 'ARPParseError'
  }
}

/**
 * Validation error - thrown when ARP structure is invalid
 */
export class ARPValidationError extends ARPError {
  constructor(message: string, code: ARPErrorCode, input?: string) {
    super(message, code, input)
    this.name = 'ARPValidationError'
  }
}

import type { ARP } from '~/types/arp'
import { ARPErrorCode, ARPParseError, ARPValidationError } from '~/types/errors'

/**
 * Parse ARP string into structured ARP object
 *
 * Supports both ARL (explicit transport) and ARI (implicit registry) formats:
 * - ARL: arp:semantic:transport://location
 * - ARI: arp:semantic://location (defaults to transport: 'registry')
 *
 * @param input - ARP string to parse
 * @returns Parsed ARP object
 * @throws {ARPValidationError} When required parts are missing
 * @throws {ARPParseError} When format is invalid
 *
 * @example
 * ```typescript
 * // ARL format
 * parseARPCore('arp:tool:https://cdn.com/tool.wasm')
 * // → { protocol: 'arp', semantic: 'tool', transport: 'https', location: 'cdn.com/tool.wasm' }
 *
 * // ARI format
 * parseARPCore('arp:tool://myorg@web-search')
 * // → { protocol: 'arp', semantic: 'tool', transport: 'registry', location: 'myorg@web-search' }
 * ```
 */
export function parseARPCore(input: string): ARP {
  // 1. Validate protocol prefix
  if (!input.startsWith('arp:')) {
    throw new ARPValidationError(
      'ARP must start with "arp:"',
      ARPErrorCode.MISSING_PROTOCOL,
      input,
    )
  }

  // 2. Extract semantic and remainder
  const match = input.match(/^arp:([^:]+):(.+)$/)
  if (!match) {
    throw new ARPParseError('Invalid ARP format', input)
  }

  const [, semantic, rest] = match

  if (!semantic) {
    throw new ARPValidationError(
      'Semantic type is required',
      ARPErrorCode.MISSING_SEMANTIC,
      input,
    )
  }

  // 3. Detect explicit transport or default to registry
  const transportMatch = rest.match(/^(\w+):\/\/(.+)$/)

  if (transportMatch) {
    // Explicit transport: arp:tool:https://...
    const [, transport, location] = transportMatch

    if (!location) {
      throw new ARPValidationError(
        'Location is required',
        ARPErrorCode.MISSING_LOCATION,
        input,
      )
    }

    return {
      protocol: 'arp',
      semantic,
      transport,
      location,
    }
  } else if (rest.startsWith('//')) {
    // Implicit registry: arp:tool://...
    const location = rest.substring(2) // Remove '//'

    if (!location) {
      throw new ARPValidationError(
        'Location is required',
        ARPErrorCode.MISSING_LOCATION,
        input,
      )
    }

    return {
      protocol: 'arp',
      semantic,
      transport: 'registry',
      location,
    }
  } else {
    throw new ARPParseError('Invalid transport or location format', input)
  }
}

import type { ARP } from '~/types/arp'
import { parseARPCore } from '~/core/parser'

/**
 * Parse ARP string into structured ARP object
 *
 * This is the main public API for parsing ARP strings.
 * Supports both ARL (explicit transport) and ARI (implicit registry) formats.
 *
 * @param input - ARP string to parse
 * @returns Parsed ARP object
 * @throws {ARPError} When parsing fails
 *
 * @example
 * ```typescript
 * import { parseARP } from '@darp/parser'
 *
 * // Parse ARL
 * const arp1 = parseARP('arp:tool:https://cdn.com/tool.wasm')
 * // → { protocol: 'arp', semantic: 'tool', transport: 'https', location: 'cdn.com/tool.wasm' }
 *
 * // Parse ARI (defaults to registry)
 * const arp2 = parseARP('arp:tool://myorg@web-search')
 * // → { protocol: 'arp', semantic: 'tool', transport: 'registry', location: 'myorg@web-search' }
 * ```
 */
export function parseARP(input: string): ARP {
  return parseARPCore(input)
}

/**
 * ARP (Agent Resource Protocol) - Structured representation of an ARP resource
 *
 * This is the result of parsing an ARL or ARI string.
 * Parser only handles syntax, not semantic validation.
 *
 * @example
 * ```typescript
 * const arp: ARP = {
 *   protocol: 'arp',
 *   semantic: 'tool',
 *   transport: 'https',
 *   location: 'cdn.example.com/tool.wasm'
 * }
 * ```
 */
export interface ARP {
  /** Always 'arp' - identifies this as an ARP resource */
  protocol: 'arp'

  /**
   * Semantic type - defines how the resource should be interpreted
   * Parser does not validate this field, any string is accepted
   *
   * @example 'tool', 'prompt', 'dpml', 'data', 'custom-type'
   */
  semantic: string

  /**
   * Transport protocol - specifies how to access the resource
   * Parser does not validate this field, any string is accepted
   *
   * @example 'https', 'file', 'git', 'registry', 'ipfs'
   */
  transport: string

  /**
   * Raw location string - format depends on transport
   * Parser does not parse or validate the location format
   *
   * @example
   * - https: 'cdn.example.com/tool.wasm'
   * - file: './local/file.txt'
   * - registry: 'myorg@resource-name#v1.0.0'
   */
  location: string
}

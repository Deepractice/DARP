Feature: Parse ARL (Agent Resource Locator)
  As a developer using DARP
  I want to parse ARL strings into structured ARP objects
  So that I can work with resource locators programmatically

  Background:
    Given I have the ARP parser

  Scenario: Parse HTTPS transport ARL
    When I parse "arp:tool:https://cdn.example.com/tool.wasm"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "tool"
    And the parsed ARP should have transport "https"
    And the parsed ARP should have location "cdn.example.com/tool.wasm"

  Scenario: Parse file transport ARL with relative path
    When I parse "arp:prompt:file://./local/prompt.txt"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "prompt"
    And the parsed ARP should have transport "file"
    And the parsed ARP should have location "./local/prompt.txt"

  Scenario: Parse git transport ARL
    When I parse "arp:data:git://github.com/org/repo#main"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "data"
    And the parsed ARP should have transport "git"
    And the parsed ARP should have location "github.com/org/repo#main"

  Scenario: Parse registry transport ARL
    When I parse "arp:dpml:registry://myorg@resource-name"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "dpml"
    And the parsed ARP should have transport "registry"
    And the parsed ARP should have location "myorg@resource-name"

  Scenario: Parse ARL with unknown semantic type
    When I parse "arp:unknown:https://example.com/resource"
    Then the parsed ARP should have semantic "unknown"
    And parsing should succeed

  Scenario: Parse ARL with unknown transport protocol
    When I parse "arp:tool:ipfs://QmHash123"
    Then the parsed ARP should have transport "ipfs"
    And parsing should succeed

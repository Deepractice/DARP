Feature: Parse ARI (Agent Resource Identifier)
  As a developer using DARP
  I want to parse ARI strings (simplified registry format)
  So that I can use shorthand notation for registry resources

  Background:
    Given I have the ARP parser

  Scenario: Parse simple ARI with org and name
    When I parse "arp:tool://myorg@web-search"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "tool"
    And the parsed ARP should have transport "registry"
    And the parsed ARP should have location "myorg@web-search"

  Scenario: Parse ARI without org
    When I parse "arp:tool://web-search"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "tool"
    And the parsed ARP should have transport "registry"
    And the parsed ARP should have location "web-search"

  Scenario: Parse ARI with version
    When I parse "arp:prompt://deepractice@assistant#v1.0.0"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "prompt"
    And the parsed ARP should have transport "registry"
    And the parsed ARP should have location "deepractice@assistant#v1.0.0"

  Scenario: Parse ARI with digest
    When I parse "arp:tool://myorg@tool@sha256:abc123"
    Then the parsed ARP should have protocol "arp"
    And the parsed ARP should have semantic "tool"
    And the parsed ARP should have transport "registry"
    And the parsed ARP should have location "myorg@tool@sha256:abc123"

Feature: Parser Error Handling
  As a developer using DARP
  I want clear error messages when parsing fails
  So that I can quickly identify and fix invalid ARP strings

  Background:
    Given I have the ARP parser

  Scenario: Missing protocol prefix
    When I try to parse "tool://myorg@web-search"
    Then parsing should fail with error code "MISSING_PROTOCOL"

  Scenario: Missing semantic type
    When I try to parse "arp://myorg@resource"
    Then parsing should fail with error code "INVALID_FORMAT"
    And the error message should contain "Invalid ARP format"

  Scenario: Missing location
    When I try to parse "arp:tool:https://"
    Then parsing should fail with error code "INVALID_FORMAT"

  Scenario: Empty string
    When I try to parse ""
    Then parsing should fail with error code "MISSING_PROTOCOL"

  Scenario: Invalid format - no separator
    When I try to parse "arp:tool"
    Then parsing should fail with error code "INVALID_FORMAT"

  Scenario: Invalid format - malformed transport
    When I try to parse "arp:tool:https:cdn.com/tool"
    Then parsing should fail with error code "INVALID_FORMAT"

import { Given, When, Then } from '@deepracticex/vitest-cucumber'
import { expect } from 'vitest'
import { parseARP, ARPError, type ARP } from '@/src/index'

Given('I have the ARP parser', function () {
  // Parser is available via import, no setup needed
  this.parser = parseARP
})

When('I parse {string}', function (input: string) {
  this.result = parseARP(input)
})

When('I try to parse {string}', function (input: string) {
  try {
    this.result = parseARP(input)
  } catch (error) {
    this.error = error
  }
})

Then('the parsed ARP should have protocol {string}', function (expected: string) {
  expect(this.result).toBeDefined()
  expect(this.result.protocol).toBe(expected)
})

Then('the parsed ARP should have semantic {string}', function (expected: string) {
  expect(this.result).toBeDefined()
  expect(this.result.semantic).toBe(expected)
})

Then('the parsed ARP should have transport {string}', function (expected: string) {
  expect(this.result).toBeDefined()
  expect(this.result.transport).toBe(expected)
})

Then('the parsed ARP should have location {string}', function (expected: string) {
  expect(this.result).toBeDefined()
  expect(this.result.location).toBe(expected)
})

Then('parsing should succeed', function () {
  expect(this.result).toBeDefined()
  expect(this.error).toBeUndefined()
})

Then('parsing should fail with error code {string}', function (expectedCode: string) {
  expect(this.error).toBeDefined()
  expect(this.error).toBeInstanceOf(ARPError)
  expect(this.error.code).toBe(expectedCode)
})

Then('the error message should contain {string}', function (expectedMessage: string) {
  expect(this.error).toBeDefined()
  expect(this.error.message).toContain(expectedMessage)
})

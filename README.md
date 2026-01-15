# ARP - Agent Resource Protocol

**Unified resource protocol for AI Agents ｜ AI Agent 统一资源协议**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

ARP (Agent Resource Protocol) is a URL scheme designed specifically for AI Agents to reference and access resources in a unified way. It separates **what** a resource is from **how** to get it.

## URL Format

```
arp:{semantic}:{transport}://{location}
```

### Components

| Component | Description | Examples |
|-----------|-------------|----------|
| `semantic` | What the resource is | `text`, `json`, `image`, `prompt` |
| `transport` | How to fetch it | `https`, `http`, `file`, `s3` |
| `location` | Where to find it | `example.com/file.txt`, `/local/path` |

### Examples

```
arp:text:https://example.com/readme.txt
arp:json:file:///config/settings.json
arp:image:s3://bucket/avatar.png
arp:prompt:https://prompts.example.com/assistant.md
```

## Design Principles

### 1. Separation of Concerns

- **Semantic layer**: Defines how to interpret the content
- **Transport layer**: Defines how to fetch the content
- **Location**: Defines where the content is

### 2. Extensibility

Both semantic and transport layers are extensible:

```
arp:{custom-semantic}:{custom-transport}://{location}
```

### 3. Agent-First

Designed for AI Agents to:
- Declare resource dependencies explicitly
- Abstract away infrastructure details
- Enable unified resource management

## Semantic Types

### Core Types

| Type | Description | Content |
|------|-------------|---------|
| `text` | Plain text | String |
| `json` | JSON data | Parsed object |
| `image` | Image file | Binary/Base64 |
| `prompt` | Prompt template | String with variables |

### Extended Types (Future)

| Type | Description |
|------|-------------|
| `audio` | Audio content |
| `video` | Video content |
| `code` | Source code with syntax |
| `embedding` | Vector embedding |

## Transport Types

### Core Types

| Type | Description |
|------|-------------|
| `https` | HTTPS protocol |
| `http` | HTTP protocol |
| `file` | Local filesystem |

### Extended Types (Future)

| Type | Description |
|------|-------------|
| `s3` | AWS S3 |
| `gcs` | Google Cloud Storage |
| `ipfs` | IPFS protocol |
| `arr` | Agent Resource Registry |

## Resolution Flow

```
┌─────────────────────────────────────────────────────────┐
│                    ARP URL                              │
│         arp:text:https://example.com/file.txt           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Parse                              │
│    semantic: text, transport: https, location: ...      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                Transport Layer                          │
│              fetch(location) → Buffer                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Semantic Layer                          │
│            parse(buffer) → Resource                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Resource                             │
│          { type, content, meta }                        │
└─────────────────────────────────────────────────────────┘
```

## Implementation

The reference implementation is [ResourceX](https://github.com/Deepractice/ResourceX).

```bash
npm install resourcexjs
```

```typescript
import { createResourceX } from "resourcexjs";

const rx = createResourceX();
const resource = await rx.resolve("arp:text:https://example.com/file.txt");
```

## Versioning

This specification follows [Semantic Versioning](https://semver.org/).

**Current Version: 0.1.0**

## Ecosystem

ARP is part of the [Deepractice](https://github.com/Deepractice) AI Agent infrastructure:

- **[PromptX](https://github.com/Deepractice/PromptX)** - AI Agent context platform
- **[AgentX](https://github.com/Deepractice/AgentX)** - AI Agent runtime platform
- **[ResourceX](https://github.com/Deepractice/ResourceX)** - Unified resource manager (ARP)
- **[ToolX](https://github.com/Deepractice/ToolX)** - Tool integration
- **[UIX](https://github.com/Deepractice/UIX)** - AI-to-UI protocol layer
- **[SandboX](https://github.com/Deepractice/SandboX)** - Agent sandbox

## License

[MIT](./LICENSE)

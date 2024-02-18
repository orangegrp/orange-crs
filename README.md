![Logo](https://github.com/Order-332/orange/blob/main/images/orange-logo-w.svg#gh-dark-mode-only)
![Logo](https://github.com/Order-332/orange/blob/main/images/orange-logo-b.svg#gh-light-mode-only)

### Looking for guidance?
Head over to the [meta repo](https://github.com/Order-332/orange) for help on getting started with this project. Technical documentation will be available in the repo Wiki eventually.

# orange🟠 CRS
orange🟠 Code Runner Server

## Instances 
> Note: The status is not live and may be inaccurate from time to time. It is not a technical uptime monitor, rather, it reflects our understanding of the CRS instances.

| Server | Status |
| ------ | ------ |
| `crs-1.orange.order332.com:443` | ![Static Badge](https://img.shields.io/badge/Operational-limegreen) ![Static Badge](https://img.shields.io/badge/Sunsetting-navy)  |
| `crs-2.orange.order332.com:443` | ![Static Badge](https://img.shields.io/badge/Offline-red)  |

## `execute` API v2 🆕
- Endpoint: `/api/v2/execute`
- Method: `POST`
- Required headers: `Content-Type`, `Authorization`

## `info` API v2 🆕
- Endpoint: `/api/v2/info`
- Method: `GET`
- Required headers: `Content-Type`, `Authorization`

## `execute` API v1
- Endpoint: `/api/v1/execute`
- Method: `POST`
- Required headers: `Content-Type`, `Authorization`


## Request headers for all API requests (v1 and v2)
- `Content-Type` must be `application/json`
- Authorisation header must contain a valid token (generable using script `npm run gen-token <secret> <identifier>`)
## Request body
> API V2 is a small update at the moment. Most Features of API v1 work in v2 plus the v2 additions. See comment for each schema for additional info.

### Request schema for `execute`
```typescript
/* JSON format */
type request_schema = {
    code: string,
    lang: string,
    version: string, // API V2 only
    runtime: string, // API V2 only
    stdin?: string,
    args?: string[]
}
```
### Reply schema for `execute`
```typescript
/* JSON format */
type reply_schema = {
    id: string,
    data: any
}
```
> The `data` property contains the entire response produced by the [Piston](https://github.com/engineer-man/piston) code execution engine in JSON format. Consult the [Piston docs](https://piston.readthedocs.io/en/latest/api-v2/#post-apiv2execute) for more info or see the below example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "run": {
    "stdout": "[\n  '/piston/packages/node/15.10.0/bin/node',\n  '/piston/jobs/e87afa0d-6c2a-40b8-a824-ffb9c5c6cb64/my_cool_code.js',\n  '1',\n  '2',\n  '3'\n]\n",
    "stderr": "",
    "code": 0,
    "signal": null,
    "output": "[\n  '/piston/packages/node/15.10.0/bin/node',\n  '/piston/jobs/e87afa0d-6c2a-40b8-a824-ffb9c5c6cb64/my_cool_code.js',\n  '1',\n  '2',\n  '3'\n]\n"
  },
  "language": "javascript",
  "version": "15.10.0"
}
```

### Reply schema for `info` (v2 only)
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "language": "bash",
    "version": "5.1.0",
    "aliases": ["sh"]
  },
  {
    "language": "javascript",
    "version": "15.10.0",
    "aliases": ["node-javascript", "node-js", "javascript", "js"],
    "runtime": "node"
  }
]
```

# orange🟠 CRS
orange🟠 Code Runner Server

## Instances 
> Note: The status is not live and may be inaccurate from time to time. It is not a technical uptime monitor, rather, it reflects our understanding of the CRS instances.

| Server | Status |
| ------ | ------ |
| `crs-1.orange.order332.com:443` | ![Static Badge](https://img.shields.io/badge/Down-red) |

## `execute` API v1
> ⚠️ This API is considered to be legacy and will be replaced with a new version in the future with more features and better operability.
- Endpoint: `/api/v1/execute`
- Method: `POST`
- Required headers: `Content-Type`, `Authorization`

## Request headers
- `Content-Type` must be `application/json`
- Authorisation header must contain a valid token (generable using script `npm run gen-token <secret> <identifier>`)

## Request body
### Request schema
```typescript
/* JSON format */
type request_schema = {
    code: string,
    lang: string,
    stdin?: string,
    args?: string[]
}
```
### Reply schema
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

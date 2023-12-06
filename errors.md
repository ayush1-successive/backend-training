# HTTP response status codes

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:

1. **Informational responses:**
   Informational responses (100 – 199) signify that the request has been received and the process is continuing.

2. **Successful responses:**
   Successful responses (200 – 299) indicate that the request was successfully received, understood, and accepted.

3. **Redirection messages:**
   Redirection messages (300 – 399) inform the client that further action needs to be taken to complete the request, often involving redirection to a different location.

4. **Client error responses:**
   Client error responses (400 – 499) signify that the client seems to have made an error or the request cannot be fulfilled.

5. **Server error responses:**
   Lastly, server error responses (500 – 599) indicate that the server has encountered an error or is incapable of performing the request.

In this documentation, our main emphasis will be on understanding error responses, with a specific focus on both client error responses and server error responses.

## Error Codes

### 4xx Client Error

| Status Code | Description                     |
| ----------- | ------------------------------- |
| 400         | Bad Request                     |
| 401         | Unauthorized                    |
| 402         | Payment Required                |
| 403         | Forbidden                       |
| 404         | Not Found                       |
| 405         | Method Not Allowed              |
| 406         | Not Acceptable                  |
| 407         | Proxy Authentication Required   |
| 408         | Request Timeout                 |
| 409         | Conflict                        |
| 410         | Gone                            |
| 411         | Length Required                 |
| 412         | Precondition Failed             |
| 413         | Payload Too Large               |
| 414         | URI Too Long                    |
| 415         | Unsupported Media Type          |
| 416         | Range Not Satisfiable           |
| 417         | Expectation Failed              |
| 418         | I'm a Teapot                    |
| 421         | Misdirected Request             |
| 422         | Unprocessable Entity            |
| 423         | Locked                          |
| 424         | Failed Dependency               |
| 425         | Too Early                       |
| 426         | Upgrade Required                |
| 428         | Precondition Required           |
| 429         | Too Many Requests               |
| 431         | Request Header Fields Too Large |
| 451         | Unavailable For Legal Reasons   |

### 5xx Server Error

| Status Code | Description                     |
| ----------- | ------------------------------- |
| 500         | Internal Server Error           |
| 501         | Not Implemented                 |
| 502         | Bad Gateway                     |
| 503         | Service Unavailable             |
| 504         | Gateway Timeout                 |
| 505         | HTTP Version Not Supported      |
| 506         | Variant Also Negotiates         |
| 507         | Insufficient Storage            |
| 508         | Loop Detected                   |
| 510         | Not Extended                    |
| 511         | Network Authentication Required |

# Client-Server Architecture

Client-server architecture is a computing model that separates the functions of a computing system into two main components: the **client** and the **server**. These two components communicate over a network, and each has specific roles and responsibilities.

## Components

### Client

- The client is the end-user device or application that requests services or resources from the server.
- It is responsible for the user interface, application logic, and local processing.

### Server

- The server is a powerful computer or set of computers that store and manage data, as well as provide services or resources to clients.
- It is responsible for processing client requests, managing data, and executing business logic.

## How it works

- The user enters the uniform resource locator (URL) of the website or file and the browser sends a request to the domain name system (DNS) server.
- DNS server is responsible for searching and retrieving the IP address associated with a web server and then initiating actions using that IP address.
- After the DNS server responds, the browser sends over an HTTP or HTTPS request to the web server’s IP, which was provided by the DNS server.
- Following the request, the server proceeds to transmit the essential website files required.
- Ultimately, the files are processed by the browser and the website is subsequently presented for viewing.

## Pros

- Easily scalable by adding more servers to handle increased demand.
- Centralized control and management of data, making it easier to update and maintain.
- Easier to implement security measures as sensitive data and operations are centralized on the server.
- Easy sharing of resources across various platforms is possible.

## Cons

- If the primary server goes down, the entire architecture is disrupted.
- It is expensive to operate because of the cost of heavy hardware and software tools.
- Too many users at once can cause the problem of traffic congestion.

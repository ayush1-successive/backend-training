# 1. Monolithic architecture

## Description

In a monolithic architecture, the entire application is designed as a single, tightly-coupled unit. All components and functionalities are interdependent and share the same codebase.

## Pros

- Simplicity in development and testing.
- Easier to deploy as a single unit.

## Cons

- Scaling can be challenging as the entire application has to scale together.
- Maintenance and updates may be more complex.

# 2. Microservices architecture

## Description

In microservices, the application is decomposed into small, independent, and loosely coupled services. Each service focuses on a specific business capability and operates as a self-contained unit with its own data storage, logic, and communication mechanisms.

## Pros

- Larger applications can remain mostly unaffected by the failure of a single module.
- Since the services are separate, we can more easily scale the most needed ones at the appropriate times, as opposed to the whole application. When done correctly, this can impact cost savings.

## Cons

- Messaging between the services has a performance overhead (e.g. network latency, message processing, etc.)
- Breaking down an application into microservices and setting up the necessary infrastructure can take more time initially compared to a monolithic approach.

# 3. Serverless architecture

## Description

Serverless architecture, also known as Function as a Service (FaaS), involves breaking down an application into small, event-driven functions that are executed in response to specific events or requests. It is a way to build and run applications and services without having to manage infrastructure, the cloud provider manages the infrastructure automatically.

## Pros

- Automatic scaling based on demand.
- Cost-effective for low to moderate workloads.
- Developers don't need to worry about provisioning, configuring, or maintaining servers. This allows them to focus more on coding and less on infrastructure management.

## Cons

- Serverless functions may experience a delay (cold start) when first invoked or when they need to scale up. This can impact the response time for certain types of applications.
- Debugging is more complicated because developers do not have visibility into backend processes, and because the application is broken up into separate, smaller functions.

# 4. Event-driven architecture

## Description

Event-driven architecture (EDA) is an architectural pattern that promotes the production, detection, consumption, and reaction to **events**. In this context, an event is a change of state, or more broadly anything that can be noticed and recorded by an application or device, and shared with other applications and devices.

## Pros

- Easy to introduce new features or modify existing ones without affecting the entire system.
- Well-suited for scenarios requiring real-time responses to events, such as user interactions or system alerts.

## Cons

- Ensuring the correct order of events may be challenging in certain scenarios, impacting the consistency of the system.
- In a distributed system, there is a risk of events being lost if not properly handled, leading to data inconsistency.

# 5. Containerized architecture

## Description

Containerized architecture is a lightweight, portable, and scalable solution for deploying, managing, and scaling applications. It is based on the concept of containers, which encapsulate an application along with its dependencies and runtime environment.

## Pros

- Containers encapsulate the application and its dependencies, making it easy to run the same application consistently across different environments.
- Containerized applications can easily scale up or down to handle varying workloads.

## Cons

- Containers are designed to be stateless, which can complicate handling of persistent data.
- Containers are primarily designed for command-line applications and may not be suitable for applications with complex graphical user interfaces.

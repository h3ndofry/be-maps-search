# Backend coding challenge

**DEVELOPER NOTES:**

* I have removed the API key included in this README for security reasons (and I'm uncertain whether it's a key provided for free access by TomTom or one used by Montu developers) as this is being posted on a public Git repository.
  * Please create an `.env` from the `.env.example` file containing the given API key.
* A `.gitignore` file has been included containing [sensible defaults](https://github.com/github/gitignore/blob/main/Node.gitignore).

### What would I do if I had more time?

I'd rewrite this to use the offical TomTom Web SDK. This would be the best option as it also includes type definitions and checking. It's a bit overkill for what's being asked for in this challenge, though.

---

Scenario:
=========

A developer on our team was working on integrating the TomTom API. They did a great job laying the groundwork, but they've recently been promoted to a new project that requires their full attention.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.


Task:
=====
To take a partial address input and return full address suggestions along with the address broken into its individual components using the TomTom API.


Resources:
==========

* Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service
* API Key: [Redacted for security]

Install:
========
1. `yarn install`

Test:
=====
1. `yarn install`
2. `yarn test`


Requirements:
=============

1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The result elements should contain important information about the place (country, municipality, etc)
5. The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library

# Decentralized Identity (DiD) Solution on Algorand

## Overview
The Decentralized Identity (DiD) Solution is built on the Algorand network, allowing users to securely create, store, and manage their personal information and assets in a decentralized manner. With this solution, users can create a unique DiD that integrates with supported applications, ensuring control and ownership of their data. This solution has been successfully tested and seamlessly integrates with commerce applications that support DiD registration. The solution has also been tested with the following existing application: [Proline Buy Demo](https://proline-buy-demo.nextfi.global/?page=1).

## Key Features
- **User-Centric Identity Management**: Empowers users to control their identity and personal data securely on the blockchain.
- **Smart Contract Integration**: Deploys a smart contract for each user to store and manage their DiD documents.
- **Seamless Application Integration**: Tested to work smoothly with existing applications, supporting efficient and secure DiD registration.

## Technologies Used
- **Algorand Blockchain**: Provides the decentralized infrastructure for identity creation, storage, and management.
- **Smart Contracts**: Custom smart contracts for secure, user-specific data storage.
- **DID Document Box Storage**: Ensures secure storage and universal resolution of DiD documents.
- **Commerce App Integration**: Enables identity verification and registration support for partner applications.
- **Next.js**: Utilized for building the client-side of the application.
- **Express.js**: Used as the server framework to handle backend operations.
- **Asymmetric Encryption**: Ensures data security and confidentiality for user information.
- **Algokit**: Provides tools and utilities to facilitate the development on the Algorand blockchain.

## Key Operations
1. **User Wallet Account Creation**: A unique wallet account is created for each user, serving as the foundation for identity storage and management.

2. **User Wallet Funding**: Each wallet is funded with 1 ALGO to cover gas fees, minimum balance requirements, and DID document upload costs.

3. **Smart Contract Deployment**: A dedicated smart contract is deployed for each user to serve as a secure storage application for their DiD document.

4. **DID Document Creation and Upload**: The user's DID document, containing essential personal information, is created and uploaded to Algorand's secure box storage.

5. **DID Document Resolution**: The DiD solution supports universal resolution, allowing users and applications to access verified and updated personal data directly from the blockchain.

## Solution Workflow
1. **Create Wallet Account**: The user initiates the process by creating a new wallet account on the Algorand network.
2. **Fund Wallet**: A minimal amount (1 ALGO) is transferred to the wallet to meet Algorand's balance requirements and cover transaction fees.
3. **Deploy Smart Contract**: The system deploys a smart contract associated with the user’s wallet to act as a data storage repository for the DID document.
4. **Generate and Store DID Document**: The user’s DID document is generated and uploaded to Algorand’s secure box storage, enabling decentralized, universal data access.
5. **Resolve DID Document**: The solution supports the universal resolution of the DID document, ensuring users can access their data securely and applications can verify user identities.

## Installation and Setup
1. **Server Setup**:
   - CD into the `did-server` directory and run the following command to install dependencies:
     ```
     yarn install
     ```
   - Then start the server by running:
     ```
     yarn start
     ```

2. **Client Setup**:
   - Navigate back to the root directory and run the following command to install dependencies:
     ```
     yarn install
     ```
   - Start the client-side application by running:
     ```
     yarn dev
     ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Achievements
- **Decentralized User Identity**: Enables users to create, store, and manage their identity securely on the Algorand blockchain.
- **Smart Contract Deployment for Secure Storage**: Each user’s data is managed through a unique smart contract, ensuring privacy and security.
- **Cross-Platform DID Resolution**: Verified DID documents can be universally accessed, supporting interoperability with third-party applications.
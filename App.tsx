import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  useWindowDimensions,
  Image,
} from 'react-native';
import {
  useFonts,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

const COLORS = {
  background: '#fdfaf8',
  text: '#093c58',
  linkBg: '#e8f1f6',
  linkText: '#093c58',
  divider: '#e6ddd6',
};

export default function App() {
  const [fontsLoaded] = useFonts({ JetBrainsMono_700Bold });
  const { width } = useWindowDimensions();
  const isSmall = width < 480;

  // Set favicon on web if provided
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const faviconUrl =
        (process.env.EXPO_PUBLIC_FAVICON_URL as string | undefined) ||
        (process.env.EXPO_PUBLIC_LOGO_URL as string | undefined);
      if (faviconUrl) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = faviconUrl;
      }
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={[styles.header, isSmall && styles.headerSmall]}>
        <View style={styles.headerLeft}>
          {Boolean(process.env.EXPO_PUBLIC_LOGO_URL) && (
            <Image
              source={{ uri: String(process.env.EXPO_PUBLIC_LOGO_URL) }}
              accessibilityLabel="SLS logo"
              resizeMode="contain"
              style={[styles.headerLogo, isSmall && styles.headerLogoSmall]}
            />
          )}
          <Text style={[styles.brand, isSmall && styles.brandSmall]}>Storage Layer Security</Text>
        </View>
        <View style={[styles.linksRow, isSmall && styles.linksRowSmall]}>
          <HeaderLink label="Marketplace" url="https://marketplace.slsprotocol.com" />
          <HeaderLink label="Sign In" url="https://dashboard.slsprotocol.com" />
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {Boolean(process.env.EXPO_PUBLIC_LOGO_URL) && (
          <View style={styles.logoWrap}>
            <Image
              source={{ uri: String(process.env.EXPO_PUBLIC_LOGO_URL) }}
              accessibilityLabel="SLS logo"
              resizeMode="contain"
              style={[styles.logo, isSmall && styles.logoSmall]}
            />
          </View>
        )}
        <Text style={[styles.h1, isSmall && styles.h1Small]}>Storage Layer Security</Text>

        <Text style={styles.p}>
          SLS Protocol (Storage Layer Security Protocol) is a blockchain-based framework for secure
          data access control and interoperability. Its architecture typically combines on-chain smart
          contracts with off-chain storage and encryption mechanisms to ensure that data providers
          retain control over who can access their data and under what conditions. At a high level,
          SLS introduces a data ownership layer on top of existing storage solutions, where data
          assets are packaged in a secure format and governed by smart contract–enforced policies.
          Key architectural components include:
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Data Packaging & Encryption</Text>
        <Text style={styles.p}>
          SLS packages data into encrypted units, often with associated metadata describing the
          dataset, usage policies, and pricing. Each data asset can be assigned a unique identifier
          (for example, a Decentralized ID) and wrapped in encryption such that only authorized
          parties can decrypt it. This ensures data remains confidential until access is granted.
          Smart contracts tied to the asset define the rules for releasing decryption keys. For
          instance, data could be encrypted with a symmetric key which is itself escrowed by the
          protocol – only released when on-chain conditions (like payment or authorization) are
          fulfilled. The metadata might include details like the data’s schema, format, owner,
          license, and provenance, enabling interoperability across platforms.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>On-Chain Access Control Logic</Text>
        <Text style={styles.p}>
          Smart contracts on the blockchain form the core of SLS’s access control enforcement. These
          contracts maintain access control lists or policies defining who (or what class of users)
          can access the data and under what terms. When a user requests access to a dataset, the
          smart contract validates the request against these policies – e.g. checking if the user has
          provided a valid payment, holds a required token/NFT, or possesses a certain credential.
          Only if the policy conditions are met will the contract trigger the release of the
          decryption key or permission token needed to consume the data. This creates a trustless,
          auditable mechanism for gatekeeping data access: the blockchain transaction history can
          prove which user accessed which data and when, and enforcement is automated without relying
          on a central server.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Decentralized Identity Integration</Text>
        <Text style={styles.p}>
          SLS often integrates with Decentralized Identity (DID) standards to strengthen
          authentication and fine-grained permissions. By using DIDs, data owners can define access
          policies not just by blockchain addresses but by verifiable identities or attributes. For
          example, a dataset’s smart contract might require that the requester present a verifiable
          credential (issued by some authority) proving they are a medical researcher or are over 18
          years old, before granting access. This is achieved by linking the user’s DID to such
          credentials and having the smart contract verify the cryptographic proof. The benefit is
          that identities and roles can be verified on-chain without exposing personal data; for
          instance, a user can prove they have a certain attribute (say, a verified academic
          affiliation) without revealing extraneous personal details. Integration with DID thus
          enhances interoperability (since DIDs are standardized by W3C) and allows SLS to plug into
          existing identity frameworks and trust networks.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Smart Contracts for Licensing & Payments</Text>
        <Text style={styles.p}>
          In addition to basic access checks, SLS smart contracts often handle monetization and
          licensing. Data owners can specify pricing (e.g. a one-time fee, subscription, or
          pay-per-query rate) in the contract. When a consumer wishes to access data, they submit the
          required payment (often in cryptocurrency or a token) to the contract. The contract then
          disburses the payment (or revenue share) to the data provider and any other stakeholders
          (for example, members of a data union – discussed later) and logs an on-chain usage record.
          Only after payment is confirmed does the consumer obtain the ability to decrypt or query the
          data. The contract can also enforce usage constraints, such as limiting the duration of
          access (“this key works for 24 hours”) or number of uses, by encoding such logic in the
          smart contract and associated off-chain enforcement agents. In summary, the smart contracts
          act as a digital rights management layer, ensuring consumers “pay to play” and abide by the
          data’s terms of use, while automatically rewarding the providers.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Off-Chain Storage and Interoperability</Text>
        <Text style={styles.p}>
          Rather than storing data on-chain, SLS protocols typically rely on off-chain storage
          networks (e.g. IPFS, Filecoin, Arweave, cloud storage, etc.) to hold the actual data files.
          The blockchain stores only references or content hashes and the encrypted keys/metadata.
          This design improves scalability and allows SLS to be storage-agnostic: data can reside
          anywhere, and SLS simply adds an overlay of security and access control. Interoperability is
          a key goal – the idea is that a data asset packaged via SLS could be shared across different
          marketplaces or platforms without loss of control. By using standard identifiers (like DIDs
          for datasets) and common cryptographic packaging, SLS assets are self-describing and
          portable. For example, a dataset could be listed on multiple marketplaces; no matter where
          it’s accessed, the underlying SLS smart contract enforces the same rules. This portability is
          part of SLS’s vision for data interoperability in Web3.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Auditability and Logging</Text>
        <Text style={styles.p}>
          Every access request and fulfillment can produce an on-chain event or log, creating a
          tamper-proof audit trail of data usage. This is useful for both accountability and
          potentially for usage-based monetization (e.g. splitting revenue based on how often data was
          accessed). Additionally, SLS might integrate with decentralized logging or metrics to track
          how data is used downstream (though fully tracking downstream usage once decrypted is an
          open challenge and often involves trust or legal agreements).
        </Text>

        <Text style={styles.p}>
          In summary, the SLS Protocol’s architecture marries blockchain smart contracts (for
          enforcement, identity, and payments) with secure data packaging (encryption and metadata) to
          create a secure data sharing layer. This enables data to be shared or sold in a
          self-sovereign manner – the data remains under the owner’s control with cryptographic locks,
          and only a blockchain-verified transaction can turn the key. The use of DIDs and standard
          metadata formats further ensures that SLS-packaged data can interoperate across different
          systems and that authorization can be tied to real-world roles or attributes, not just
          wallet addresses.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Data Packaging and Access Control Mechanisms</Text>
        <Text style={[styles.h3, isSmall && styles.h3Small]}>Data Packaging</Text>
        <Text style={styles.p}>
          In SLS, each data asset is typically encapsulated as a secure data package. This package
          includes the data itself (which may be a file, a dataset, a data stream, etc.) encrypted
          with a strong encryption algorithm (e.g. AES-256 for file encryption), and a metadata
          manifest. The manifest can be a JSON or similar document detailing the asset’s properties
          (title, description, format, size, etc.), provenance, and the access policy or smart
          contract address governing it. Because this manifest might contain sensitive info (like a URL
          to the encrypted file), it is often stored in encrypted form as well. In fact, Ocean
          Protocol – a comparable data marketplace – follows a similar approach: every data asset has
          a DID and a DID Document (DDO) with metadata, and all DDOs are stored on-chain in encrypted
          form for privacy compliance. Only authorized services can decrypt that metadata. This
          concept carries into SLS: the data package’s metadata may be registered on-chain (or in a
          decentralized registry) in encrypted form, ensuring that even listing a dataset does not
          reveal its contents or sensitive details publicly.
        </Text>
        <Text style={styles.p}>
          The encryption keys are managed such that the data owner (or an SLS service node they trust)
          holds the master key to decrypt the data. When a consumer’s access is approved by the smart
          contract, a mechanism (which could be a decentralized re-encryption network, or a secure
          enclave, or a simple key release by a server keyed to the contract) will provide the
          consumer with a decryption key. Some implementations might use proxy re-encryption or
          threshold cryptography: for example, a network of nodes could collectively hold shards of
          the key and only release it if an on-chain event signals that conditions are met. The
          overall packaging ensures that without going through the proper on-chain flow, an attacker
          cannot access plaintext data – even if they obtain the encrypted file, it’s useless without
          the key.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Access Control Enforcement</Text>
        <Text style={styles.p}>
          SLS enforces access control in a two-layer approach – cryptographic and logical control. The
          cryptographic layer is the encryption on the data (as described above). The logical layer is
          the smart-contract enforced policy. This can include numerous types of conditions:
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Token-Based Access</Text>
        <Text style={styles.p}>
          One common mechanism (inspired by projects like Ocean) is to use tokenized access. A data
          owner can mint “access tokens” (which might be fungible ERC-20 tokens or a single
          non-fungible token license) that represent the right to access a dataset. Consumers purchase
          or obtain these tokens and redeem them through the contract to get access. Ocean Protocol,
          for instance, uses ERC20 datatokens where holding a datatoken (and spending it) grants
          access to the associated data asset. SLS could implement a similar pattern or even utilize
          Ocean’s token standard for interoperability. Token gating allows automated checking: the
          contract simply verifies the caller possesses X tokens and burns/locks them in exchange for
          providing the data access.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Role or Attribute-Based Access</Text>
        <Text style={styles.p}>
          Through DIDs and verifiable credentials, SLS can implement attribute-based access control.
          For example, a dataset of medical records might be restricted to “verified researchers” –
          the smart contract would require a cryptographic proof that the user’s DID has a credential
          from a trusted issuer (e.g. a university or hospital) attesting to their researcher status.
          This verification can happen on-chain by checking a zero-knowledge proof or an issuer’s
          signature. If valid, the contract allows access without ever revealing the user’s actual
          identity or other attributes on-chain (preserving privacy). Such privacy-aware, fine-grained
          control is a hallmark of combining decentralized identity with data access.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Time-bound or Usage-bound Access</Text>
        <Text style={styles.p}>
          SLS contracts can enforce time locks and usage counts. For instance, an access token could
          automatically expire after a certain block timestamp or could be single-use (one token = one
          download). Smart contracts can encode these rules (e.g. not re-issuing a decryption key
          after a deadline, or requiring a fresh payment each time). This gives data providers
          flexibility to offer subscription models or limited trials. Smart contracts and associated
          off-chain watchdogs ensure that once a token or permission is used, it can’t be reused
          beyond the allowed scope.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Compute-to-Data (Privacy-Preserving Computation)</Text>
        <Text style={styles.p}>
          In some advanced scenarios, SLS might incorporate a compute-to-data model for access. This
          means consumers don’t directly download raw data at all. Instead, they submit computation
          jobs (like queries or ML training jobs) that run where the data is stored, and only the
          results (which can be vetted to not contain raw data) are returned. This approach, pioneered
          by Ocean Protocol’s Compute-to-Data feature, inverts the data access model: the algorithm
          goes to the data. SLS could integrate with secure enclaves or off-chain compute services to
          enable this. The SLS smart contract would then not release a decryption key to the user, but
          rather instruct a secure compute service to run an approved algorithm on the encrypted data
          and return outputs. This ensures maximum privacy because the raw data never leaves the
          secure environment, addressing scenarios where even encrypted data sharing is too risky. It’s
          ideal for sensitive datasets (medical, personal data) where only aggregated or trained-model
          outputs should be exposed. While implementing compute-to-data is complex, it aligns with the
          ethos of SLS to enforce usage policies – essentially, the policy can say “data never leaves
          hosting server; only computations allowed” and SLS will enforce that via technical means.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Logging and Revocation</Text>
        <Text style={styles.p}>
          Because access is mediated by contracts, each access event can emit a log (stating which DID
          or address accessed the data and when). If a data owner needs to revoke access (for example,
          discovered misuse or regulatory requirement), SLS can support revocation by updating the
          contract’s state (e.g. adding the user to a deny list, or invalidating outstanding tokens).
          In practice, on public blockchains one cannot “undo” a data download that already happened,
          but one can prevent future access. Some SLS designs might include a notion of dynamic access
          where keys rotate for new data versions, so revocation prevents getting newer updates of a
          dataset.
        </Text>

        <Text style={styles.p}>
          In essence, the combination of cryptographic protection and on-chain validation in SLS
          provides defense-in-depth for data access. Even if someone bypassed the smart contract (say
          by hacking a server), they would still face encryption; conversely, even if someone got hold
          of a decryption key, on-chain logging would record that event and could link it to a user
          (deterring misuse). By leveraging blockchain consensus, the enforcement is tamper-proof – no
          single party can secretly grant themselves access without the transaction being recorded.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Integration with Decentralized Identity (DID) and Smart Contracts</Text>
        <Text style={styles.p}>
          SLS’s integration with decentralized identity and smart contracts is pivotal for making data
          sharing both secure and user-centric.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Decentralized Identity (DID)</Text>
        <Text style={styles.p}>
          As mentioned, DIDs allow entities (individuals, organizations, or even datasets and devices)
          to have an identity recorded on a decentralized network, often represented as a URI (e.g.,
          did:example:123456). In SLS, both data providers and consumers can have DIDs. A data
          provider might have a DID that is linked to their reputation or certifications (e.g., a
          hospital providing clinical data could present credentials proving ethical compliance). A
          consumer’s DID could carry verifiable credentials like a license (for example, a
          pharmaceutical company’s DID might carry a credential proving they paid a subscription fee or
          agreed to certain terms). By using DIDs, SLS can move beyond treating data access as purely
          an address-based entitlement, and instead incorporate real-world trust frameworks.
        </Text>
        <Text style={styles.p}>
          For instance, suppose an SLS-managed data marketplace wants to restrict certain sensitive
          data to “verified NGOs”. It could require any buyer’s DID to be signed by a known NGO
          accrediting body. The SLS smart contract would use a library (or an oracle) to check the DID
          document of the requester for that signature. If present, the access proceeds; if not, it’s
          denied. This is done without revealing the NGO’s entire identity on-chain, just a proof of
          membership. The result is a more context-aware access control, aligning with legal or ethical
          requirements for data sharing (like only licensed clinicians can access patient data, etc.),
          all enforced via code.
        </Text>
        <Text style={styles.p}>
          Integration with DID also improves interoperability: because DIDs are standard, a user could
          use one identity across multiple platforms. For example, a researcher could use the same DID
          to access datasets on an SLS-based health data exchange and an SLS-based academic data
          repository, carrying their verified attributes to both. This prevents siloed identity systems
          and makes it easier to manage consistent access rights.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Smart Contracts and Policy Logic</Text>
        <Text style={styles.p}>
          Smart contracts are the brain of SLS. They tie everything together – identity checks,
          payment, and key release. Each dataset could be associated with a dedicated smart contract
          (or a contract instance from a standard template) that encodes its access policy. Some
          platforms implement this via a factory contract that can spawn a new asset contract per
          dataset. For example, Ocean Protocol uses an NFT (ERC721) for each data asset (representing
          unique asset identity) and a corresponding ERC20 datatoken contract for access transactions.
          SLS might follow a similar pattern: when a data asset is onboarded, the protocol could mint a
          unique NFT (data token) representing the asset, and deploy a contract that handles access
          logic for it. This contract would reference the metadata (perhaps via content hash stored in
          the NFT’s metadata or a registry) and contain functions like requestAccess() or consumeData()
          that users invoke.
        </Text>
        <Text style={styles.p}>
          Because these smart contracts live on a blockchain, they benefit from transparency and
          composability. Transparency means all participants can read the code to know the rules (e.g.,
          the price, the whitelists, etc.), and they can see the log of past access events.
          Composability means other smart contracts or dApps can integrate with SLS. For example, a
          DeFi app could be built to allow staking on data assets (perhaps to curate or insure them) by
          interacting with SLS’s contracts. Or a DAO could collectively purchase access to a dataset by
          pooling funds and then having the SLS contract grant access to all DAO members’ DIDs. The use
          of smart contracts thus enables rich economic and governance models around data sharing.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Decentralized Enforcement Agents</Text>
        <Text style={styles.p}>
          While smart contracts are on-chain, certain enforcement aspects (like serving the actual data
          file, or running a compute job) happen off-chain. SLS may define an architecture of
          distributed agents or nodes that perform these tasks in response to on-chain events. For
          instance, an SLS storage node might watch the blockchain for an event like
          “AccessGranted(datasetID, userDID)”. Upon seeing that, it will retrieve the encrypted data,
          decrypt it (with the key it holds) and deliver it to the user (perhaps via a secure download
          link or via a peer-to-peer transfer). These agents could be run by the data provider
          themselves or by a decentralized network of providers. Trust in these agents is bootstrapped
          by the smart contracts – e.g., the agent will only act if a valid on-chain event exists, and
          users can audit that event. Some protocols use a concept of “provider” component; indeed, in
          Ocean’s architecture an off-chain Provider service handles data encryption/decryption and
          serves the data, checking that the consumer has a valid on-chain token before doing so. SLS
          would have analogous components, potentially decentralized further (multiple nodes hosting
          copies of data for availability, each enforcing the same checks).
        </Text>
        <Text style={styles.p}>
          To summarize, through DIDs SLS brings in real-world identity and trust, and through smart
          contracts it automates and secures the enforcement of data access policies. This combination
          allows sophisticated scenarios – e.g., “Only verified doctors from Country X (as per DID
          credential) who have paid 10 tokens can run analytics on this dataset, and the raw data will
          never leave the server” – to be executed seamlessly. The user experience is also improved:
          users control their own identity (self-sovereign identity) and can consent to sharing just
          enough info to get access, rather than handing over all personal details to each data
          provider. Meanwhile, data providers get cryptographic assurances that only the intended
          recipients (and nobody else) can use their data as specified. In the next sections, we
          explore how this architecture enables new kinds of data-driven applications.
        </Text>

        <Text style={[styles.h2, isSmall && styles.h2Small]}>Use Cases and Applications of SLS</Text>
        <Text style={styles.p}>
          The design of SLS Protocol opens up a range of use cases in the emerging Web3 data economy.
          Its ability to securely monetize and share data with fine-grained control is particularly
          relevant in the following scenarios:
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Data Marketplaces</Text>
        <Text style={styles.p}>
          Data marketplaces are platforms where data providers can publish datasets and consumers can
          discover and purchase access to those datasets. SLS can serve as the backbone for
          decentralized data marketplaces by handling the listing, pricing, and secure exchange of
          data. In a traditional (Web2) data marketplace, users must trust the platform to enforce
          access rights and payments. With SLS, the marketplace can be trust-minimized: the platform
          might just be a frontend interface, while the actual purchase and permission granting happens
          via smart contracts on-chain.
        </Text>
        <Text style={styles.p}>
          In practice, a data marketplace using SLS would allow a provider to register their dataset
          (uploading the encrypted data to storage and publishing the SLS smart contract with its
          metadata and price). Buyers browsing the marketplace would see descriptions of the data and a
          price. When a buyer decides to purchase, an on-chain transaction (perhaps calling buyAccess()
          on the dataset’s contract) would be executed to transfer payment. Once that transaction is
          confirmed, the SLS protocol automatically allows the buyer to fetch the data (either by
          giving them a decryption key or by triggering a direct download). Because all of this is
          encoded, there is no need for a third-party escrow or manual approval – the blockchain
          transaction itself validates the buyer’s rights.
        </Text>
        <Text style={styles.p}>
          Notably, Ocean Protocol is an example of a decentralized data marketplace implementation. In
          Ocean, users publish data assets and set a price in OCEAN tokens or a datatoken; consumers
          then redeem an ERC20 datatoken to get access, with on-chain permission checks in place. SLS-
          based marketplaces would be similar, potentially using their own token or even leveraging
          Ocean’s datatoken standard for compatibility. The advantage of SLS in marketplaces is
          enhanced interoperability and security: a dataset published on one marketplace could be
          accessible on another if both recognize the same SLS contracts (imagine an “app store” model
          where multiple portals sell the same data but all tie back to the one SLS-managed source of
          truth). For data providers, this means wider reach without losing control – they don’t have
          to upload their data separately to every platform, they just reference the SLS package. For
          consumers, it means more uniform access – they can use one identity and one wallet to buy
          from many sources, and they have on-chain proofs of purchase (which could be useful for
          expense tracking, compliance, or reselling rights if allowed).
        </Text>
        <Text style={styles.p}>
          Marketplaces can also build additional services around SLS, such as search and discovery
          (using the metadata in the on-chain registries), reputation systems (rating data quality via
          on-chain reviews or curation markets), and combo offerings (e.g., bundling multiple datasets
          or offering subscriptions). All financial exchanges (payments, royalties) can be handled by
          SLS smart contracts. This is far more efficient and transparent than current data brokerage,
          where often the actual usage of data is opaque and providers don’t know who is using their
          data. With SLS, each access is a transparent event, and usage metrics could even be
          aggregated to allow dynamic pricing or popularity tracking.
        </Text>
        <Text style={styles.p}>
          Importantly, compliance can be enhanced on an SLS-powered marketplace. Because data access is
          controlled and logged, a provider can demonstrate compliance with regulations like GDPR – for
          instance, they could show an auditor an on-chain log of exactly who accessed personal data
          and when, as consented. Also, if a deletion request is made by a data subject, the provider
          could use SLS to revoke access going forward (and possibly even issue an update that tells
          all compute functions to exclude that individual’s data – though fully enforcing deletions is
          tricky, at least new access can be cut off).
        </Text>
        <Text style={styles.p}>
          In summary, SLS enables data marketplaces that are decentralized, secure, and user-centric,
          potentially eliminating the need for data brokers. Providers can monetize data directly, and
          consumers gain access to a wealth of data with cryptographic guarantees that the data is as
          advertised (since integrity can be verified via hashes) and that their usage rights are
          protected.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Data Unions and Collective Data Monetization</Text>
        <Text style={styles.p}>
          A Data Union is a concept where individuals pool their personal data as a collective, so
          they can sell it and share in the profits. This addresses the imbalance in Web2 where big
          companies harvest and monetize user data without compensating users. Web3 data unions aim to
          give people control and income from their own data by leveraging group bargaining power. SLS
          Protocol is well-suited to empower data unions, by providing the technical means to
          aggregate, protect, and permission data from many individuals and then enable collective
          selling.
        </Text>
        <Text style={styles.p}>
          In a data union scenario, potentially thousands of individuals contribute data (for example,
          browsing behavior, health tracker data, etc.). The union (which could be a DAO) uses SLS to
          ensure each person’s raw data is securely stored (encrypted with keys that the individual or
          union controls). The union’s smart contracts could then offer aggregated datasets or insights
          derived from this collective data. Buyers (like market researchers or advertisers) would pay
          to run queries or train models on the aggregated data, and the revenue would be automatically
          split among the contributors according to some formula (perhaps proportionate to how much
          their data was used). Using SLS’s capabilities, the union could make sure that no single
          buyer ever sees an individual’s raw data, only the combined or anonymized results, thereby
          preserving privacy while still extracting value. For instance, the contract might only allow
          compute-to-data style queries that produce statistical outputs.
        </Text>
        <Text style={styles.p}>
          Because all contributors and usage are tracked on-chain, transparency and fairness are
          improved. Members of the data union could verify that they are getting their fair share of
          revenue (the smart contract could be set to, say, distribute 70% of all earnings to
          contributors’ wallets, with 30% to the union DAO for operations – all visible on-chain). This
          kind of model is being actively explored: projects like Pool Data (founded by the Streamr
          team) are building data union marketplaces, and note that data unions ensure “every
          stakeholder… has a genuine seat at the table and that value is based on consent and
          co-operation, rather than… exploitation of people’s data”. SLS provides the infrastructure to
          enforce that consent and handle the co-operative data management.
        </Text>
        <Text style={styles.p}>
          A concrete example could be Swash, a Web3 data union focused on browsing data. Swash has a
          browser plugin that lets users contribute anonymized browsing behavior into a pool, and
          advertisers or brands can pay to get insights from that pool. They partnered with an ad tech
          protocol (Adshares) to create a pipeline from user data to ad targeting in a
          privacy-preserving way. An SLS-like system underpins this by ensuring only aggregate data
          goes out to advertisers, and only after smart contract conditions (like payment and user
          consent flags) are met. Each user might have an SLS-managed profile that they can turn on or
          off (consent withdrawal), and the union contract enforces those choices globally.
        </Text>
        <Text style={styles.p}>
          Another area is IoT data unions – for example, drivers contributing car data (as in the
          project DIMO) or smart city sensor data being shared. SLS can manage machine-generated data
          streams, too, controlling access to real-time data feeds via smart contracts. A union of
          users with similar data can use SLS to strike deals with companies (for example, a group of
          electric vehicle owners selling aggregated battery performance data to a research firm). The
          flexibility of SLS to handle not just static files but also streams or API-based data (via
          tokens that meter API calls) means data unions can monetize dynamic data as well.
        </Text>
        <Text style={styles.p}>
          In summary, SLS Protocol can provide data unions with a trust framework and toolset:
          individuals trust that their data is safe and only used as they agree (enforced by code), and
          buyers trust that the data they’re paying for is properly consented and high-quality (since
          the union can be audited). The automation of revenue sharing and enforcement lowers the
          overhead of running a data union, making the model more viable.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Web3 AdTech and Personalized Advertising</Text>
        <Text style={styles.p}>
          Web3 is poised to transform advertising technology (adtech) by introducing user-centric data
          control and transparency. In Web2 adtech, user data (browsing history, clicks, preferences)
          is often collected behind the scenes and traded among advertisers and data brokers, leading
          to privacy issues and lack of user benefit. Web3 adtech flips this model: users could opt-in
          to share data with advertisers and get paid for it, and all parties rely on smart contracts
          to ensure fairness. SLS Protocol can be a foundational layer for such systems, as it can
          securely hold a user’s attention or preference data and only release it under agreed
          conditions.
        </Text>
        <Text style={styles.p}>
          One application is personal data vaults for advertising preferences. Imagine each user has an
          SLS-encrypted profile containing their demographic info and interests (perhaps self-declared
          or inferred by an AI from their on-chain activities or other data unions they’re part of).
          The user could choose to share parts of this profile with advertisers in exchange for
          micro-payments or rewards (similar to how Brave Browser and BAT reward users for viewing
          ads). An SLS smart contract might manage this process: an advertiser places a bid for
          “targeting data” of users who fit a certain profile; the contract checks which users have
          consented and fit the criteria, then perhaps delivers an anonymized segment data to the
          advertiser or allows the advertiser’s ad to be delivered to those users via a
          blockchain-based ad network. Throughout, users remain in control – they could revoke
          permission by toggling a setting (which updates their profile’s access policy on-chain).
        </Text>
        <Text style={styles.p}>
          A concrete example in Web3 adtech is the concept of an on-chain advertising marketplace (for
          instance, projects like MadNet or other decentralized ad exchanges). These aim to connect
          advertisers and publishers without centralized intermediaries like Google Ads. By using SLS,
          such a platform could ensure that any user data used for ad targeting is only accessed when
          the user is a) rewarded and b) anonymized. For example, an SLS contract could allow aggregate
          reporting like “X user clicked ad Y” to flow to advertisers for analytics, but not the user’s
          full history. The malicious use of data is mitigated because SLS acts like a firewall – only
          specific queries or views are permitted.
        </Text>
        <Text style={styles.p}>
          Another aspect is fraud prevention and transparency. In the current adtech, a lot of metrics
          (impressions, clicks) are taken on trust. If those events are logged on-chain (which some Web3
          ad projects do), then SLS can tie user data release to actual engagement. For instance, a user
          might get paid only if their anonymized ID is seen to interact with an ad, which is logged in
          a smart contract. This ensures advertisers pay for real attention, and users aren’t tempted to
          cheat because the data is cross-validated on-chain.
        </Text>
        <Text style={styles.p}>
          Web3 adtech also intersects with data unions (like Swash as mentioned), where users
          collectively negotiate with advertisers. SLS can run the logic of such negotiations. Consider
          a “market” where an advertiser posts an offer: $X for showing an ad to 1000 users who have
          recently searched for electric cars. Data union contracts can accept the offer and use SLS to
          safely identify members who match that criteria (perhaps by securely querying their data
          vaults) without exposing each individual’s search history to the advertiser – instead, the
          union contract might just output a list of wallet addresses (or ephemeral ad IDs) that should
          receive the ad. The advertiser then pays, the ad is delivered (maybe via a decentralized app
          or browser extension), and the union’s SLS contract distributes the payment to those users.
          This kind of arrangement becomes possible with the fine-grained control and cryptographic
          assurances of SLS. It promises an adtech ecosystem where privacy is preserved, users are
          rewarded, and advertisers still reach their desired audience, all with far less intermediary
          overhead.
        </Text>
        <Text style={styles.p}>
          Finally, Web3 adtech can use SLS for frequency capping and preference management across
          platforms. For example, a user could store an SLS-managed preference that they don’t want to
          see more than 5 ads a day, or they dislike certain categories of ads. Any ad network
          respecting the SLS standard could check the user’s preference via their DID/ profile before
          serving an ad. Because it’s on-chain (or at least in a universally accessible format),
          different apps can honor the same preference without each independently tracking the user.
          This gives users a consistent, self-sovereign way to control their advertising experience – a
          stark contrast to Web2 where you have to trust each site’s settings.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Pay-to-Play Training Datasets for AI/LLMs</Text>
        <Text style={styles.p}>
          One of the most talked-about trends is the use of large datasets to train Large Language
          Models (LLMs) and other AI. There is a growing realization that the data used to train AI is
          extremely valuable, and many data providers (from social media platforms to academic
          institutions) are looking to monetize access to their data for AI training. SLS Protocol can
          facilitate a “pay-to-play” model for AI training datasets – that is, if an AI company or
          researcher wants to train a model on a certain dataset, they must pay according to the data
          owner’s terms, and the training happens under controlled conditions.
        </Text>
        <Text style={styles.p}>
          A real-world scenario underscoring this need is Reddit’s recent move to charge for API access
          to its content, after realizing AI firms were scraping it for free. Reddit disclosed that it
          entered data licensing contracts worth over $203 million for allowing companies to train AI on
          Reddit data. This indicates a shift: valuable data will not be freely available to AI model
          builders; instead, they’ll need to pay or agree to licenses. SLS could bring this model to a
          broader range of data owners, not just tech giants. For example, a community or a small
          company with a unique dataset (say a specialized medical research data collection or a set of
          high-quality images) could use SLS to license it to AI developers in a fair way.
        </Text>
        <Text style={styles.p}>
          Here’s how it might work: The data owner uses SLS to package the training dataset (which
          could be large – potentially billions of data points). The SLS contract might specify that any
          AI training use of the data requires a certain payment or royalty. Because copying is
          inevitable once data is out, one approach is to never give the raw data out at all but
          instead do Compute-to-Data for model training. That means an AI company could send its
          training algorithm (or neural network code) to run on the data within a secure environment
          that SLS governs, rather than obtaining the data directly. The SLS contract could charge
          tokens based on the size of the data or number of training epochs, etc., and only after
          payment, the training job executes. The model that results can be released to the AI company,
          but the raw dataset never leaves the provider’s infrastructure. This way the AI gets learned
          patterns from the data, but not the data itself – protecting the asset from unauthorized
          reuse. The provider could even embed watermarks or tracking in the data or model to ensure
          the terms (like not using the model for certain purposes) are followed, although enforcing
          that gets into legal territory.
        </Text>
        <Text style={styles.p}>
          If the use case is simpler (just selling the dataset for offline training), SLS can still be
          used to handle the transaction and access. The buyer might buy a “training license NFT” which
          is a unique token granting them rights to use the data in an AI model. The terms of that
          license (like “you may not further distribute the data, and you must attribute the source”)
          could be written in human-readable form and also logged on-chain as part of the NFT’s
          metadata. The act of purchase is recorded, and the NFT could even carry a usage policy that
          an AI model developer could later show to demonstrate they had rights to the training data
          (this might become important as AI regulation comes into play – models might need to prove
          they respect data licenses).
        </Text>
        <Text style={styles.p}>
          The monetization models here could be one-time purchase, subscription (e.g., access to
          ongoing data feed for model updates), or even usage-based (for instance, a per-API-call fee if
          the model queries the dataset during training). SLS smart contracts can accommodate these by
          design – e.g., having a counter for API calls and charging micropayments per call.
        </Text>
        <Text style={styles.p}>
          Consider also collaborative training or federated learning: Multiple parties each have
          datasets that, combined, would yield a powerful model (common in medical research across
          hospitals). However, they can’t pool data due to privacy concerns. An SLS-based system could
          allow a model to be trained across these datasets without actually combining them in one
          place. Each dataset owner runs the training on their own data slice via SLS’s compute-to-data,
          and partial model updates (gradients) are aggregated (with techniques like federated
          averaging) to yield a global model. Smart contracts manage the coordination and ensure that
          each party is compensated or that the model’s ownership is shared according to contributions.
          This is a complex workflow, but it highlights that SLS’s principles – keeping data in silos
          unless access is granted – can facilitate advanced AI training approaches where data stays at
          rest and models move.
        </Text>
        <Text style={styles.p}>
          Lastly, marketplace for AI datasets: Similar to general data marketplaces, there could be
          specialized marketplaces for AI-ready datasets (text corpora, image collections, etc.). SLS
          would underpin these by making sure buyers actually cannot just steal the data without
          paying. A provider might even offer a sample of the data (to evaluate quality) and then sell
          the full dataset via an SLS contract. If an LLM needs a proprietary dataset (say a dataset of
          legal documents for a law-specific AI), the law firm owning those documents could use SLS to
          license it to an AI company for a hefty price, with the contract possibly including a revenue
          share if the AI product succeeds (smart contracts could enforce ongoing royalties whenever the
          AI model is used commercially, by tying payments to the data license NFT).
        </Text>
        <Text style={styles.p}>
          In conclusion, SLS stands to play a crucial role in the AI data economy: enabling data owners
          to confidently share their data for AI development, knowing that they’ll be compensated and
          their data won’t be misused, and enabling AI developers to legally and efficiently access the
          vast amount of privately-held data out there. This creates a more sustainable ecosystem where
          the most expensive part of an LLM – the training data – can be obtained in a compliant, fair
          manner, rather than via unauthorized scraping.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Similar Platforms</Text>
        <Text style={[styles.h4, isSmall && styles.h4Small]}>Streamr/Swash (Data Union model)</Text>
        <Text style={styles.p}>
          Streamr provides a protocol for real-time data streams, with a Data Union framework that lets
          users crowd-sell their data. Technically, Streamr uses Ethereum for reward tokens and
          off-chain nodes for transporting data. It focuses on streaming data (pub/sub) rather than
          static datasets. Its data union smart contracts manage member contributions and revenue
          splitting. In terms of approach, Streamr’s emphasis is on real-time publish/subscribe and
          crowdsourced data, whereas SLS is a more static access control model (though it could be
          extended to streams). However, the concept of rewarding users for data and pooling data is
          shared. Swash (built on Streamr) takes user browser data, anonymizes it, and sells insights
          to brands. It uses a token (SWASH) for rewards. The privacy relies on anonymization and the
          fact that only aggregated data is exposed. SLS might provide a more formalized security layer
          to such efforts, e.g., by encrypting each user’s data and only permitting aggregate queries
          via smart contract. So one could see Streamr’s approach as complementary – they provide the
          transport and integration (browser plugin etc.), while SLS could provide governance and
          encryption.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Secret Network (private computation)</Text>
        <Text style={styles.p}>
          Secret Network is a blockchain with built-in support for encrypted smart contracts (using
          secure enclaves to keep data secret even from nodes). It’s often cited for sensitive data and
          could be used to build data marketplaces where the data lives inside the blockchain’s secure
          contract state. Compared to SLS: Secret provides privacy at the computation level (you can run
          a contract on data without revealing it), but it is its own chain and requires users to trust
          the enclave setup. SLS typically works off-chain for data storage and on standard chains for
          access control. If ultimate privacy is needed, SLS could integrate with something like Secret
          for the compute portion (run the SLS compute-to-data jobs on Secret contracts, for instance).
          Monetization on Secret would involve their SCRT token, while SLS can be token-agnostic.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Lit Protocol / Access Control Protocols</Text>
        <Text style={styles.p}>
          There are tools like Lit Protocol that allow creators to encrypt content and have it
          decryptable based on on-chain conditions (e.g., possession of an NFT or membership in a DAO).
          Lit is not a full data marketplace, but a decentralized key management network keyed to
          blockchain conditions. In spirit, Lit Protocol is close to one piece of SLS – the conditional
          decryption part. A comparison: Lit uses a network of nodes that collectively hold a key and
          will release a decryption share if they see the user meets the condition (checked via reading
          blockchain state). SLS could adopt a similar mechanism under the hood for its key release.
          However, SLS extends beyond that by also addressing metadata, identity integration, and
          integration with specific vertical use cases (marketplaces, etc.). One could imagine using
          Lit’s network as the key-release engine in an SLS implementation. The advantage of Lit or
          similar is that it’s chain-agnostic and already decentralizes the trust (no single point that
          holds the key). Ocean currently uses a single provider (which could be a vulnerability if
          that provider misbehaves), whereas SLS might aim to decentralize that via threshold
          cryptography.
        </Text>

        <Text style={[styles.h4, isSmall && styles.h4Small]}>Filecoin and Data DAOs</Text>
        <Text style={styles.p}>
          Filecoin is decentralized storage with its own incentive layer. By itself, it doesn’t do
          access control (data can be encrypted but key management is up to the user). However, there
          is a concept of Data DAOs emerging (e.g., on Arweave or using smart contracts with Filecoin)
          where communities collectively own data and set rules for its use. SLS would be a natural
          component in building Data DAOs – the DAO could control the SLS contract and thereby
          collectively decide who gets access (through governance tokens). Compared to Ocean, which is
          more like a marketplace operator model, a Data DAO with SLS is fully community-driven.
          Technically, bridging SLS with storage: in Filecoin, you could store an encrypted dataset and
          put the decryption key in an SLS contract; only if the DAO’s conditions are met, the key is
          given. Interoperability here means SLS could work atop various storage networks (Filecoin,
          Arweave, Storj, etc.), providing a unified access control plane.
        </Text>

        <Text style={styles.p}>
          The table below summarizes some of the key differences and similarities between SLS Protocol,
          Ocean Protocol, and a Data Union model (Streamr/Swash as an example of that category):
        </Text>
        <Text style={styles.h4}>Feature</Text>
        <Text style={styles.h4}>SLS Protocol (general)</Text>
        <Text style={styles.p}>
          Data Tokenization: Optional; SLS can use tokens or direct on-chain policies. Not inherently
          tied to a single token economy; flexible payment tokens.
        </Text>
        <Text style={styles.h4}>Ocean Protocol</Text>
        <Text style={styles.p}>
          Uses Data NFTs (ERC721) for asset identity and ERC20 datatokens for access permissions. OCEAN
          token used for staking/fees.
        </Text>
        <Text style={styles.h4}>Streamr/Swash (Data Unions)</Text>
        <Text style={styles.p}>
          Streamr uses DATA/SWASH tokens to reward contributors, but data streams aren’t tokenized per
          asset (access via joining the union or subscribing).
        </Text>
        <Text style={styles.h4}>Access Control</Text>
        <Text style={styles.p}>
          SLS: Smart-contract policies (ACL, conditions based on DIDs, payments, etc.). Encryption
          enforced; keys released on conditions. Supports attribute-based access (e.g. role
          credentials).
        </Text>
        <Text style={styles.p}>
          Ocean: Smart-contract enforced via datatokens. Provider checks token balance before serving
          data. Mainly wallet-based permissions.
        </Text>
        <Text style={styles.p}>
          Data Unions: Union contract manages membership. Privacy relies on aggregation.
        </Text>

        <Text style={[styles.h3, isSmall && styles.h3Small]}>Conclusion</Text>
        <Text style={styles.p}>
          The Storage Layer Security (SLS) Protocol is a compelling development in the blockchain and
          Web3 space, targeting one of the most valuable commodities of our time: data. By architecting
          a system where data can be securely shared, monetized, and managed across platforms, SLS
          addresses critical challenges of the digital economy – from privacy preservation and
          compliance, to fair monetization and interoperability. Its architecture builds on lessons from
          earlier platforms like Ocean Protocol (which introduced on-chain data tokens and
          compute-to-data) and expands them with stronger identity integration and flexible policy
          enforcement.
        </Text>
        <Text style={styles.p}>
          In practical terms, SLS enables new paradigms such as decentralized data marketplaces where
          users truly own their data assets, data unions where individuals collectively bargain with
          their data, Web3 advertising where users consent to and profit from their attention, and
          controlled AI training data pipelines where data owners are compensated and their rights
          respected. Compared to similar platforms, SLS tends to provide a more holistic and modular
          toolkit – rather than a single network or token, it’s an approach that can be adopted in
          various contexts (potentially even bridging Web2 and Web3, as enterprises could use a private
          SLS network to manage data internally while interfacing with public chains for transactions).
        </Text>
        <Text style={styles.p}>
          As the demand for data grows (especially for AI) and as regulations increasingly demand
          consent and transparency, protocols like SLS offer a way to reconcile innovation with
          individual and corporate rights. It embodies the Web3 ethos of decentralization by removing
          central gatekeepers yet ensures that “who can access what data” is never left to chance or
          unchecked exploitation – it’s encoded on the blockchain, visible to all participants and
          enforced by code. While SLS is still an evolving concept, prioritizing official standards and
          interoperability gives it a strong chance to become a foundational layer in the decentralized
          data stack, much like Transport Layer Security (TLS) became fundamental for secure
          communications. In the coming years, we can expect SLS and similar protocols to mature,
          possibly converging with initiatives like Ocean Protocol or being adopted by data consortiums,
          ultimately moving us closer to a fair and secure data economy where data sovereignty is a
          reality for all stakeholders.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderLink({ label, url }: { label: string; url: string }) {
  const onPress = React.useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.linkButton, pressed && { opacity: 0.7 }]}>
      <Text style={styles.linkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerSmall: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  brand: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 18,
  },
  brandSmall: {
    fontSize: 16,
    marginBottom: 8,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  linksRowSmall: {
    alignSelf: 'stretch',
  },
  linkButton: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 0,
  },
  linkLabel: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.background,
    fontSize: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerLogoSmall: {
    width: 32,
    height: 32,
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 320,
    height: 140,
  },
  logoSmall: {
    width: 220,
    height: 96,
  },
  h1: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 28,
    marginBottom: 8,
  },
  h1Small: {
    fontSize: 24,
  },
  h2: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 22,
    marginTop: 16,
  },
  h2Small: {
    fontSize: 20,
  },
  h3: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 18,
    marginTop: 14,
  },
  h3Small: {
    fontSize: 16,
  },
  h4: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 16,
    marginTop: 12,
  },
  h4Small: {
    fontSize: 15,
  },
  p: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
  },
});

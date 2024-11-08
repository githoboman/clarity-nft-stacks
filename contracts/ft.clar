;; SIP-010 Compliant Fungible Token
;; This implements all required functions from the SIP-010 trait

;; Define the fungible token with an arbitrary max supply
(define-fungible-token my-token u1000000000)

;; Constants for token metadata
(define-constant contract-owner tx-sender)
(define-constant token-name "MyToken")
(define-constant token-symbol "MTK")
(define-constant token-decimals u6) ;; 6 decimal places, like STX
(define-constant token-uri-string "https://my-token-metadata.json")

;; SIP-010 Interface Implementation

;; Transfer token to a specified principal
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        ;; Ensure tx-sender is the sender
        (asserts! (is-eq tx-sender sender) (err u4))
        ;; Ensure non-zero amount
        (asserts! (> amount u0) (err u3))
        ;; Ensure sender != recipient
        (asserts! (not (is-eq sender recipient)) (err u2))
        ;; Perform the transfer
        (match (ft-transfer? my-token amount sender recipient)
            success
                (begin
                    ;; Print memo if provided
                    (match memo to-print (print to-print) 0x)
                    (ok true))
            error (err u1))))

;; Get the token's name
(define-read-only (get-name)
    (ok token-name))

;; Get the token's symbol
(define-read-only (get-symbol)
    (ok token-symbol))

;; Get number of decimals used for token amounts
(define-read-only (get-decimals)
    (ok token-decimals))

;; Get the token balance of owner
(define-read-only (get-balance (who principal))
    (ok (ft-get-balance my-token who)))

;; Get the current total supply
(define-read-only (get-total-supply)
    (ok (ft-get-supply my-token)))

;; Get the token URI - returns an optional string
(define-read-only (get-token-uri)
    (ok (some token-uri-string)))

;; Mint tokens - restricted to contract owner
(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) (err u403))
        (ft-mint? my-token amount recipient)))

;; Burn tokens - can only burn own tokens
(define-public (burn (amount uint))
    (ft-burn? my-token amount tx-sender))
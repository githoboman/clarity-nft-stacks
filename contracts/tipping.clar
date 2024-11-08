;; title: Tipping Contract Zero to Clarity Contract 1
;; version: v0.001  
;; summary: This contract is a simple tipping contract. You can provide a recipient and tip them 1STX. 

;; constants
(define-constant tip-amount u1000000)
(define-constant err-sending-tip (err u101))
(define-constant err-unauthorized (err u102))


;; public function
(define-public (tip (recipient principal))
(begin
(asserts! (not (is-eq tx-sender recipient)) (err u102))
(asserts! (is-ok (stx-transfer? tip-amount tx-sender recipient)) (err u101))
(ok true)
))
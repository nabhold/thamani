# Supplier onboarding events

`contracts/supplier-onboarding/v1` (`nabhold/shared`) defines four events,
all built on the canonical CloudEvents envelope
(`contracts/events/v1/envelope.schema.json`):

- `com.nabhold.supplier-onboarding.application.submitted.v1`
- `com.nabhold.supplier-onboarding.application.decided.v1`
- `com.nabhold.supplier-onboarding.qualification.updated.v1`
- `com.nabhold.supplier-onboarding.capability.verified.v1`

Thamani does not publish any of these yet. No message broker exists
anywhere in this ecosystem today — the same position `nabhold/baobab-erp`'s
own published event contracts are already in, and the same reasoning
`nabhold/zuribeans` ADR-0006 gives for not building one: "building a broker
integration with nothing on the other end would be exactly the heavyweight
infrastructure... not justified by current workload."

`SupplierStatusEvent` (Thamani's own audit-trail record, see
`domain-model.md`) is the durable local record a future outbox/publisher can
replay from once a broker exists — the same seam `nabhold/zuribeans`
deliberately left for itself.

When Thamani does publish, envelope fields are populated as:

| Field | Value |
|---|---|
| `source` | `urn:nabhold:service:thamani` |
| `baobabscope` | `tenant` |
| `tenantid` | The Control Plane tenant context for the request, once Thamani resolves one (it does not today — no `baobab-cp` integration exists yet). |
| `dataschema` | The matching `contracts/supplier-onboarding/v1/*.schema.json` `$id`. |

See `contracts/supplier-onboarding/v1/examples/` in `nabhold/shared` for
complete, schema-validated example payloads.

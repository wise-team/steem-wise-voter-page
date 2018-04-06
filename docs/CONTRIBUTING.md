# Contribution guide

### How to run in test environment?

```bash
$ docker-compose -f scripts/docker-compose.yml up
```
<br>

### How to generate sha384 integrity checksums?

These checksums implement W3C recomendations on **Subresource Integrity**.
For detailed info please see []https://www.w3.org/TR/SRI/](https://www.w3.org/TR/SRI/).

To generate checksums:
```bash
$ scripts/integrity.sh
```


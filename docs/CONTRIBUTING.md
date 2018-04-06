# Contribution guide

### How to generate sha384 integrity checksums?

These checksums implement W3C recomendations on **Subresource Integrity**.
For detailed info please see []https://www.w3.org/TR/SRI/](https://www.w3.org/TR/SRI/).

To obtain checksums:
```bash
echo "<link rel=\"stylesheet\" href=\"vendor/bootstrap/bootstrap-4.0.0.min.css\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/bootstrap/bootstrap-4.0.0.min.css | xxd -r -p | base64)\" />"

echo "<link rel=\"stylesheet\" href=\"vendor/jquery/jquery-3.3.1.min.js\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/jquery/jquery-3.3.1.min.js | xxd -r -p | base64)\" />"

echo "<link rel=\"stylesheet\" href=\"vendor/popper.min.js\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/popper.min.js | xxd -r -p | base64)\" />"

echo "<link rel=\"stylesheet\" href=\"vendor/bootstrap/bootstrap-4.0.0.min.js\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/bootstrap/bootstrap-4.0.0.min.js | xxd -r -p | base64)\" />"

```


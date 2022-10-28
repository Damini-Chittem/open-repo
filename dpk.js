const crypto = require("crypto");
import { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } from "./constant"
function createHash() {
  return crypto.createHash("sha3-512").update(candidate).digest("hex")
}

exports.deterministicPartitionKey = (event) => {
  let candidate;
  if (event?.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }

  if (candidate && typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};


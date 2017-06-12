export default function ifEqualReturnOtherwise(value, toBeComparedValue, otherwiseValue) {
  if (value === toBeComparedValue) {
    return otherwiseValue;
  }

  return value;
}

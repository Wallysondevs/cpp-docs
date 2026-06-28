# std::experimental::concat

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class... Abis >
simd<T, simd_abi::deduce_t<T, (simd_size_v<T, Abis> + ...)>>
concat( const simd<T, Abis>&... vs ) noexcept;
template< class T, class... Abis >
simd_mask<T, simd_abi::deduce_t<T, (simd_size_v<T, Abis> + ...)>>
concat( const simd_mask<T, Abis>&... vs ) noexcept;
```

Concatena os objetos de entrada [`simd`](<#/doc/experimental/simd/simd>) ou [`simd_mask`](<#/doc/experimental/simd/simd_mask>).

### Parâmetros

- **vs** — o pacote de parâmetros de entrada [`simd`](<#/doc/experimental/simd/simd>) ou [`simd_mask`](<#/doc/experimental/simd/simd_mask>)

### Valor de retorno

O resultado concatenado de um único objeto [`simd`](<#/doc/experimental/simd/simd>) ou [`simd_mask`](<#/doc/experimental/simd/simd_mask>).

### Exemplo
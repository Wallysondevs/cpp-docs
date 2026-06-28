# std::experimental::min

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi >
simd<T, Abi> min( const simd<T, Abi>& a, const simd<T, Abi>& b ) noexcept;
```

### Parâmetros

- **a** — o primeiro vetor de elementos para min
- **b** — o segundo vetor de elementos para min

### Valor de retorno

O resultado da aplicação binária elemento a elemento de [std::min](<#/doc/algorithm/min>)(a[i], b[i]) para todo i ∈ `[`​0​`, `size()`)`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também
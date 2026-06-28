# std::experimental::minmax

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi >
std::pair<simd<T, Abi>, simd<T, Abi>>
minmax( const simd<T, Abi>& a, const simd<T, Abi>& b ) noexcept;
```

Retorna tanto o resultado mínimo elemento a elemento quanto o resultado máximo elemento a elemento.

### Parâmetros

- **a** — o primeiro vetor de elementos para `minmax`
- **b** — o segundo vetor de elementos para `minmax`

### Valor de retorno

Um objeto `r`, onde o i-ésimo elemento de r.first é [std::min](<#/doc/algorithm/min>)(a[i], b[i]), e o i-ésimo elemento de r.second é [std::max](<#/doc/algorithm/max>)(a[i], b[i]).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também
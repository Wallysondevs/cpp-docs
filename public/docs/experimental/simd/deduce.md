# std::experimental::simd_abi::deduce

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, std::size_t N, class ...Abis >
struct deduce;
```

O tipo deduce<T, N, Abis...>::type está presente se e somente se:

*   T é um tipo vetorizável,
*   simd_abi::fixed_size&lt;N&gt; é suportado, e
*   cada tipo em Abis... é uma tag ABI.

Seja `DA` denotando deduce<T, N, Abis...>::type quando presente, então

*   simd_size_v<T, DA> == N,
*   simd<T, DA> é construtível por padrão, ou seja, é suportado,
*   `DA` é [`simd_abi::scalar`](<#/doc/experimental/simd/scalar>) se N == 1, caso contrário é definido pela implementação.

### Tipos Membro

Nome | Definição
---|---
`type` | um tipo de tag ABI adequado para o tipo de elemento `T` e tamanho `N` especificados

### Tipos Auxiliares

template< class T, [std::size_t](<#/doc/types/size_t>) N, class ...Abis >
using deduce_t = typename deduce<T, N, Abis...>::type; | | (parallelism TS v2)

### Notas

`simd_abi::deduce` é compatível com SFINAE.

A tag ABI deduzida através desta facilidade é uma característica de Qualidade de Implementação. As implementações podem basear a escolha em Abis..., mas também podem ignorar os argumentos Abis.... Uma implementação simples pode simplesmente retornar fixed_size&lt;N&gt; incondicionalmente. Uma implementação otimizada pode retornar uma tag ABI estendida definida pela implementação para a maioria das entradas. Consequentemente, se você precisar de uma tag ABI para um certo número de elementos, use [`fixed_size`](<#/doc/experimental/simd/fixed_size>) se a estabilidade da ABI for uma preocupação, e prefira `deduce_t` caso contrário.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ scalar](<#/doc/experimental/simd/scalar>)(parallelism TS v2) | tipo de tag para armazenar um único elemento
(typedef)
[ fixed_size](<#/doc/experimental/simd/fixed_size>)(parallelism TS v2) | tipo de tag para armazenar um número especificado de elementos
(alias template)
[ compatible](<#/doc/experimental/simd/compatible>)(parallelism TS v2) | tipo de tag que garante compatibilidade ABI
(alias template)
[ native](<#/doc/experimental/simd/native>)(parallelism TS v2) | tipo de tag que é mais eficiente
(alias template)
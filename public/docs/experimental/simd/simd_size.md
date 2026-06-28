# std::experimental::simd_size

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi = simd_abi::compatible<T> >
struct simd_size;
```

Se `T` for um tipo vetorizável e `is_abi_tag_v<Abi>` for verdadeiro, fornece a constante membro `value` igual à largura (número de elementos) de `simd<T, Abi>`, independentemente de `simd<T, Abi>` ser suportado ou não. Para quaisquer outros tipos `T` e `Abi`, não há membro `value`.

Se o programa adicionar especializações para `std::simd_size` ou `std::simd_size_v`(desde C++17), o comportamento é indefinido.

### Template de variável auxiliar

template< class T, class Abi = simd_abi::compatible&lt;T&gt; >
constexpr [std::size_t](<#/doc/types/size_t>) simd_size_v = simd_size<T, Abi>::value; | | (parallelism TS v2)

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | a largura de `simd<T, Abi>`
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ size](<#/doc/experimental/simd/simd/size>)[static] (parallelism TS v2) | retorna a largura / número de elementos
(função membro estática pública de `std::experimental::simd<T,Abi>`)
[ size](<#/doc/experimental/simd/simd_mask/size>)[static] (parallelism TS v2) | retorna a largura / número de elementos
(função membro estática pública de `std::experimental::simd_mask<T,Abi>`)
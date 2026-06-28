# std::experimental::memory_alignment

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class U = typename T::value_type >
struct memory_alignment;
```

Se `is_simd_mask_v<T>` for `true` e `U` for `bool`, ou se `is_simd_v<T>` for `true` e `U` for um tipo vetorizável, fornece a constante membro `value` igual ao alinhamento mínimo de um ponteiro passado para um construtor de carregamento, função `copy_from`, ou função `copy_to`. Para quaisquer outros tipos `T` e `U`, não há membro `value`.

Se o programa adicionar especializações para `std::memory_alignment` ou `std::memory_alignment_v` (desde C++17), o comportamento é indefinido.

### template de variável auxiliar

template< class T, class U = typename T::value_type >
constexpr [std::size_t](<#/doc/types/size_t>) memory_alignment_v = memory_alignment<T, U>::value; |  |  (parallelism TS v2)

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | o alinhamento mínimo de um ponteiro passado para um construtor de carregamento, função `copy_from`, ou função `copy_to`
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
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

[ vector_aligned_tagvector_aligned](<#/doc/experimental/simd/vector_aligned>)(parallelism TS v2) | flag indicando o alinhamento do endereço de carregamento/armazenamento ao alinhamento do vetor
(classe)
[ (constructor)](<#/doc/experimental/simd/simd/simd>)(parallelism TS v2) | constrói um objeto [`simd`](<#/doc/experimental/simd/simd>)
(função membro pública de `std::experimental::simd<T,Abi>`)
[ copy_from](<#/doc/experimental/simd/simd/copy_from>)(parallelism TS v2) | carrega elementos [`simd`](<#/doc/experimental/simd/simd>) de memória contígua
(função membro pública de `std::experimental::simd<T,Abi>`)
[ copy_to](<#/doc/experimental/simd/simd/copy_to>)(parallelism TS v2) | armazena elementos [`simd`](<#/doc/experimental/simd/simd>) em memória contígua
(função membro pública de `std::experimental::simd<T,Abi>`)
[ (constructor)](<#/doc/experimental/simd/simd_mask/simd_mask>)(parallelism TS v2) | constrói um objeto [`simd_mask`](<#/doc/experimental/simd/simd_mask>)
(função membro pública de `std::experimental::simd_mask<T,Abi>`)
[ copy_from](<#/doc/experimental/simd/simd_mask/copy_from>)(parallelism TS v2) | carrega elementos [`simd_mask`](<#/doc/experimental/simd/simd_mask>) de memória contígua
(função membro pública de `std::experimental::simd_mask<T,Abi>`)
[ copy_to](<#/doc/experimental/simd/simd_mask/copy_to>)(parallelism TS v2) | armazena elementos [`simd_mask`](<#/doc/experimental/simd/simd_mask>) em memória contígua
(função membro pública de `std::experimental::simd_mask<T,Abi>`)
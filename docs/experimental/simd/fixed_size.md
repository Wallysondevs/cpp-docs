# std::experimental::simd_abi::fixed_size

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< int N >
struct fixed_size {};
```

O tipo de tag simd_abi::fixed_size&lt;N&gt; garante que tipos data-parallel armazenem e manipulem `N` elementos (ou seja, simd<T, simd_abi::fixed_size&lt;N&gt;>::size() retorna `N`). Uma implementação deve suportar pelo menos todos os `N` ∈ `[`1`, `32`]`. Além disso, para cada simd<T, Abi> suportado, onde `Abi` é uma tag ABI definida pela implementação, N = simd<T, Abi>::size() deve ser suportado.

### Notas

Uma implementação pode optar por renunciar à compatibilidade ABI entre unidades de tradução compiladas de forma diferente para instanciações de `simd` e `simd_mask` usando a mesma tag simd_abi::fixed_size&lt;N&gt;. Caso contrário, a eficiência de simd<T, Abi> provavelmente será melhor do que simd<T, fixed_size<simd_size_v<T, Abi>>> (com `Abi` não sendo uma instância de simd_abi::fixed_size).

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ max_fixed_size](<#/doc/experimental/simd/max_fixed_size>)(parallelism TS v2) | o número máximo de elementos garantidos a serem suportados por fixed
(constante)
[ scalar](<#/doc/experimental/simd/scalar>)(parallelism TS v2) | tipo de tag para armazenar um único elemento
(typedef)
[ compatible](<#/doc/experimental/simd/compatible>)(parallelism TS v2) | tipo de tag que garante compatibilidade ABI
(alias template)
[ native](<#/doc/experimental/simd/native>)(parallelism TS v2) | tipo de tag que é mais eficiente
(alias template)
[ deducededuce_t](<#/doc/experimental/simd/deduce>)(parallelism TS v2) | obtém um tipo ABI para um dado tipo de elemento e número de elementos
(class template)
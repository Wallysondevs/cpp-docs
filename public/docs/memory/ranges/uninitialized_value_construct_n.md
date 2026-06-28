# std::ranges::uninitialized_value_construct_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-iterator I >
requires std::default_initializable<std::iter_value_t<I>>
I uninitialized_value_construct_n( I first,
std::iter_difference_t<I> count );
(constexpr desde C++26)
```

Constrói objetos do tipo [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt; na área de memória não inicializada `first` + `[`​0​`, `count`)` por [inicialização por valor](<#/doc/language/value_initialization>), como se fosse por return [ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)([std::counted_iterator](<#/doc/iterator/counted_iterator>)(first, count),
[std::default_sentinel](<#/doc/iterator/default_sentinel>)).base();

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

  * Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first | \- | o início do range de elementos a serem inicializados
---|---|---
count | \- | o número de elementos a serem construídos

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em count.

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_value_construct_n`, por exemplo, usando [ranges::fill_n](<#/doc/algorithm/ranges/fill_n>), se o tipo de valor do range for um [CopyAssignable](<#/doc/named_req/CopyAssignable>) [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>)

### Possível implementação
```cpp
    struct uninitialized_value_construct_n_fn
    {
        template<no-throw-forward-iterator I>
            requires std::default_initializable<std::iter_value_t<I>>
        constexpr I operator()(I first, std::iter_difference_t<I> count) const
        {
            auto iter = std::counted_iterator(first, count);
            return ranges::uninitialized_value_construct(iter, std::default_sentinel).base();
        }
    };
     
    inline constexpr uninitialized_value_construct_n_fn uninitialized_value_construct_n{};
```

---

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
     
    int main()
    {
        struct S { std::string m{"█▓▒░ █▓▒░ █▓▒░ "}; };
     
        constexpr int n{4};
        alignas(alignof(S)) char out[n * sizeof(S)];
     
        try
        {
            auto first{reinterpret_cast<S*>(out)};
            auto last = std::ranges::uninitialized_value_construct_n(first, n);
     
            auto count{1};
            for (auto it{first}; it != last; ++it)
                std::cout << count++ << ' ' << it->m << '\n';
     
            std::ranges::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
     
        // For scalar types, uninitialized_value_construct_n
        // zero-initializes the given uninitialized memory area.
        int v[]{1, 2, 3, 4, 5, 6, 7, 8};
        std::cout << ' ';
        for (const int i : v)
            std::cout << i << ' ';
        std::cout << "\n ";
        std::ranges::uninitialized_value_construct_n(std::begin(v), std::size(v));
        for (const int i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 █▓▒░ █▓▒░ █▓▒░ 
    2 █▓▒░ █▓▒░ █▓▒░ 
    3 █▓▒░ █▓▒░ █▓▒░ 
    4 █▓▒░ █▓▒░ █▓▒░
    1 2 3 4 5 6 7 8
    0 0 0 0 0 0 0 0
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Ver também

[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ uninitialized_value_construct_n](<#/doc/memory/uninitialized_value_construct_n>)(C++17) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
# std::ranges::uninitialized_default_construct

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-iterator I, no-throw-sentinel-for<I> S >
requires std::default_initializable<std::iter_value_t<I>>
I uninitialized_default_construct( I first, S last );
(constexpr desde C++26)
template< no-throw-forward-range R >
requires std::default_initializable<ranges::range_value_t<R>>
ranges::borrowed_iterator_t<R>
uninitialized_default_construct( R&& r );
(constexpr desde C++26)
```

1) Constrói objetos do tipo [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt; na área de memória não inicializada `[`first`, `last`)` por [inicialização padrão](<#/doc/language/default_initialization>), como se por

for (; first != last; ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first))
` `[std::remove_reference_t](<#/doc/types/remove_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>;
return first;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) Equivalente a ranges::uninitialized_default_construct([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r)).

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — par de iterador-sentinela denotando o range dos elementos a serem inicializados
- **r** — o range dos elementos a serem inicializados

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear na distância entre first e last.

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Observações

Uma implementação pode pular a construção dos objetos (sem alterar o efeito observável) se nenhum construtor padrão não trivial for chamado durante a inicialização padrão de um objeto [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;, o que pode ser detectado por [std::is_trivially_default_constructible](<#/doc/types/is_default_constructible>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1,2](<#/doc/memory/ranges/uninitialized_default_construct>))

### Possível implementação
```cpp
    struct uninitialized_default_construct_fn
    {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S>
            requires std::default_initializable<std::iter_value_t<I>>
        constexpr I operator()(I first, S last) const
        {
            using ValueType = std::remove_reference_t<std::iter_reference_t<I>>;
            if constexpr (std::is_trivially_default_constructible_v<ValueType>)
                return ranges::next(first, last); // skip initialization
            I rollback{first};
            try
            {
                for (; !(first == last); ++first)
                    ::new (static_cast<void*>(std::addressof(*first))) ValueType;
                return first;
            }
            catch (...) // rollback: destroy constructed elements
            {
                for (; rollback != first; ++rollback)
                    ranges::destroy_at(std::addressof(*rollback));
                throw;
            }
        }
    
        template<no-throw-forward-range R>
            requires std::default_initializable<ranges::range_value_t<R>>
        constexpr ranges::borrowed_iterator_t<R> operator()(R&& r) const
        {
            return (*this)(ranges::begin(r), ranges::end(r));
        }
    };
    
    inline constexpr uninitialized_default_construct_fn uninitialized_default_construct{};
```

---

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        struct S { std::string m{"▄▀▄▀▄▀▄▀"}; };
    
        constexpr int n{4};
        alignas(alignof(S)) char out[n * sizeof(S)];
    
        try
        {
            auto first{reinterpret_cast<S*>(out)};
            auto last{first + n};
    
            std::ranges::uninitialized_default_construct(first, last);
    
            auto count{1};
            for (auto it{first}; it != last; ++it)
                std::cout << count++ << ' ' << it->m << '\n';
    
            std::ranges::destroy(first, last);
        }
        catch (...) { std::cout << "Exception!\n"; }
    
        // Notice that for "trivial types" the uninitialized_default_construct
        // generally does not zero-fill the given uninitialized memory area.
        constexpr char sample[]{'A', 'B', 'C', 'D', '\n'};
        char v[]{'A', 'B', 'C', 'D', '\n'};
        std::ranges::uninitialized_default_construct(std::begin(v), std::end(v));
        if (std::memcmp(v, sample, sizeof(v)) == 0)
        {
            std::cout << "  ";
            // Maybe undefined behavior, pending CWG 1997 to be resolved:
            // for (const char c : v) { std::cout << c << ' '; }
            for (const char c : sample)
                std::cout << c << ' ';
        }
        else
            std::cout << "Unspecified\n";
    }
```

Saída possível:
```
    1 ▄▀▄▀▄▀▄▀
    2 ▄▀▄▀▄▀▄▀
    3 ▄▀▄▀▄▀▄▀
    4 ▄▀▄▀▄▀▄▀
      A B C D
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ ranges::uninitialized_default_construct_n](<#/doc/memory/ranges/uninitialized_default_construct_n>)(C++20) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ ranges::uninitialized_value_construct_n](<#/doc/memory/ranges/uninitialized_value_construct_n>)(C++20) | constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(C++17) | constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range
(modelo de função)
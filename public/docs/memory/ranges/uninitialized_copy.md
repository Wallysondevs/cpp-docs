# std::ranges::uninitialized_copy, std::ranges::uninitialized_copy_result

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Call signature
template< std::input_iterator I, std::sentinel_for<I> S1,
no-throw-forward-iterator O, no-throw-sentinel-for<O> S2 >
requires std::constructible_from<std::iter_value_t<O>,
std::iter_reference_t<I>>
uninitialized_copy_result<I, O>
uninitialized_copy( I ifirst, S1 ilast, O ofirst, S2 olast );
(constexpr desde C++26)
template< ranges::input_range IR, no-throw-forward-range OR >
requires std::constructible_from<ranges::range_value_t<OR>,
ranges::range_reference_t<IR>>
uninitialized_copy_result<ranges::borrowed_iterator_t<IR>,
ranges::borrowed_iterator_t<OR>>
uninitialized_copy( IR&& in_range, OR&& out_range );
(constexpr desde C++26)
Helper types
template< class I, class O >
using uninitialized_copy_result = ranges::in_out_result<I, O>;
```

Seja \\(\scriptsize N\\)N [ranges::min](<#/doc/algorithm/ranges/min>)([ranges::distance](<#/doc/iterator/ranges/distance>)(ifirst, ilast), [ranges::distance](<#/doc/iterator/ranges/distance>)(ofirst, olast)).

1) Constrói \\(\scriptsize N\\)N elementos do range `[`ifirst`, `ilast`)` para uma área de memória não inicializada `[`ofirst`, `olast`)` como se por

for (; ifirst != ilast && ofirst != olast; ++ofirst, (void)++ifirst)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*ofirst)) [std::remove_reference_t](<#/doc/types/remove_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;O&gt;>(*ifirst);
return {std::move(ifirst), ofirst};

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

Se `[`ofirst`, `olast`)` se sobrepuser com `[`ifirst`, `ilast`)`, o comportamento é indefinido.

2) Equivalente a return ranges::uninitialized_copy([ranges::begin](<#/doc/ranges/begin>)(in_range), [ranges::end](<#/doc/ranges/end>)(in_range),
[ranges::begin](<#/doc/ranges/begin>)(out_range), [ranges::end](<#/doc/ranges/end>)(out_range));.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

*   Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **ifirst, ilast** — par iterador-sentinela denotando o range de elementos a copiar de
- **in_range** — o range de elementos a copiar de
- **ofirst, olast** — par iterador-sentinela denotando o range de destino
- **out_range** — o range de destino

### Valor de retorno

Conforme descrito acima.

### Complexidade

\\(\scriptsize\mathcal{O}(N)\\)𝓞(N).

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_copy` se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1,2](<#/doc/memory/ranges/uninitialized_copy>))

### Possível implementação
```cpp
    struct uninitialized_copy_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S1,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S2>
            requires std::constructible_from<std::iter_value_t<O>, std::iter_reference_t<I>>
        constexpr ranges::uninitialized_copy_result<I, O>
            operator()(I ifirst, S1 ilast, O ofirst, S2 olast) const
        {
            O current{ofirst};
            try
            {
                for (; !(ifirst == ilast or current == olast); ++ifirst, ++current)
                    ranges::construct_at(std::addressof(*current), *ifirst);
                return {std::move(ifirst), std::move(current)};
            }
            catch (...) // rollback: destroy constructed elements
            {
                for (; ofirst != current; ++ofirst)
                    ranges::destroy_at(std::addressof(*ofirst));
                throw;
            }
        }
    
        template<ranges::input_range IR, no-throw-forward-range OR>
            requires std::constructible_from<ranges::range_value_t<OR>,
        constexpr ranges::range_reference_t<IR>>
            ranges::uninitialized_copy_result<ranges::borrowed_iterator_t<IR>,
                                              ranges::borrowed_iterator_t<OR>>
        operator()(IR&& in_range, OR&& out_range) const
        {
            return (*this)(ranges::begin(in_range), ranges::end(in_range),
                           ranges::begin(out_range), ranges::end(out_range));
        }
    };
    
    inline constexpr uninitialized_copy_fn uninitialized_copy{};
```

---

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        const char* v[]{"This", "is", "an", "example"};
    
        if (const auto sz{std::size(v)};
            void* pbuf = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
        {
            try
            {
                auto first{static_cast<std::string*>(pbuf)};
                auto last{first + sz};
                std::ranges::uninitialized_copy(std::begin(v), std::end(v), first, last);
    
                std::cout << "{";
                for (auto it{first}; it != last; ++it)
                    std::cout << (it == first ? "" : ", ") << std::quoted(*it);
                std::cout << "};\n";
    
                std::ranges::destroy(first, last);
            }
            catch (...)
            {
                std::cout << "uninitialized_copy exception\n";
            }
            std::free(pbuf);
        }
    }
```

Saída:
```
    {"This", "is", "an", "example"};
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ ranges::uninitialized_copy_n](<#/doc/memory/ranges/uninitialized_copy_n>)(C++20) | copia um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) | copia um range de objetos para uma área de memória não inicializada
(modelo de função)
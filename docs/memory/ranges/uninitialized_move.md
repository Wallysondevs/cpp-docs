# std::ranges::uninitialized_move, std::ranges::uninitialized_move_result

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S1,
no-throw-forward-iterator O, no-throw-sentinel-for<O> S2 >
requires std::constructible_from<std::iter_value_t<O>,
std::iter_rvalue_reference_t<I>>
uninitialized_move_result<I, O>
uninitialized_move( I ifirst, S1 ilast, O ofirst, S2 olast );
(constexpr desde C++26)
template< ranges::input_range IR, no-throw-forward-range OR >
requires std::constructible_from
<ranges::range_value_t<OR>,
ranges::range_rvalue_reference_t<IR>>
uninitialized_move_result<ranges::borrowed_iterator_t<IR>,
ranges::borrowed_iterator_t<OR>>
uninitialized_move( IR&& in_range, OR&& out_range );
(constexpr desde C++26)
Helper types
template< class I, class O >
using uninitialized_move_result = ranges::in_out_result<I, O>;
```

Seja \\(\scriptsize N\\)N igual a [ranges::min](<#/doc/algorithm/ranges/min>)([ranges::distance](<#/doc/iterator/ranges/distance>)(ifirst, ilast), [ranges::distance](<#/doc/iterator/ranges/distance>)(ofirst, olast)).

1) Copia \\(\scriptsize N\\)N elementos de `[`ifirst`, `ilast`)` (usando move semantics, se suportado) para uma área de memória não inicializada `[`ofirst`, `olast`)` como se por

for (; ifirst != ilast && ofirst != olast; ++ofirst, (void)++ifirst)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*ofirst))
` `[std::remove_reference_t](<#/doc/types/remove_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;O&gt;>([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(ifirst));
return {std::move(ifirst), ofirst};

Se uma exceção for lançada durante a inicialização, os objetos já construídos em `[`ofirst`, `olast`)` são destruídos em uma ordem não especificada. Além disso, os objetos em `[`ifirst`, `ilast`)` que já foram movidos, são deixados em um estado válido, mas não especificado.

2) Equivalente a return ranges::uninitialized_move([ranges::begin](<#/doc/ranges/begin>)(in_range), [ranges::end](<#/doc/ranges/end>)(in_range),
[ranges::begin](<#/doc/ranges/begin>)(out_range), [ranges::end](<#/doc/ranges/end>)(out_range));.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **ifirst, ilast** — par de iterador-sentinela denotando o range de entrada de elementos a serem movidos
- **in_range** — o range de entrada de elementos a serem movidos
- **ofirst, olast** — par de iterador-sentinela denotando o range de saída a ser inicializado
- **out_range** — o range de saída a ser inicializado

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em \\(\scriptsize N\\)N.

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Observações

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_move`, por exemplo, usando [ranges::copy_n](<#/doc/algorithm/ranges/copy_n>), se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1,2](<#/doc/memory/ranges/uninitialized_move>))

### Possível implementação
```cpp
    struct uninitialized_move_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S1,
                 no-throw-forward-iterator O, no-throw-sentinel-for<O> S2>
            requires std::constructible_from<std::iter_value_t<O>,
                                             std::iter_rvalue_reference_t<I>>
        constexpr ranges::uninitialized_move_result<I, O>
            operator()(I ifirst, S1 ilast, O ofirst, S2 olast) const
        {
            using ValueType = std::remove_reference_t<std::iter_reference_t<O>>;
            O current{ofirst};
            try
            {
                for (; !(ifirst == ilast or current == olast); ++ifirst, ++current)
                    ::new (static_cast<void*>(std::addressof(*current))))
                        ValueType(ranges::iter_move(ifirst));
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
                                             ranges::range_rvalue_reference_t<IR>>
        constexpr ranges::uninitialized_move_result<ranges::borrowed_iterator_t<IR>,
                                                    ranges::borrowed_iterator_t<OR>>
            operator()(IR&& in_range, OR&& out_range) const
        {
            return (*this)(ranges::begin(in_range), ranges::end(in_range),
                           ranges::begin(out_range), ranges::end(out_range));
        }
    };
    
    inline constexpr uninitialized_move_fn uninitialized_move{};
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
    
    void print(auto rem, auto first, auto last)
    {
        for (std::cout << rem; first != last; ++first)
            std::cout << std::quoted(*first) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::string in[]{"Home", "World"};
        print("initially, in: ", std::begin(in), std::end(in));
    
        if (constexpr auto sz = std::size(in);
            void* out = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
        {
            try
            {
                auto first{static_cast<std::string*>(out)};
                auto last{first + sz};
                std::ranges::uninitialized_move(std::begin(in), std::end(in), first, last);
    
                print("after move, in: ", std::begin(in), std::end(in));
                print("after move, out: ", first, last);
    
                std::ranges::destroy(first, last);
            }
            catch (...)
            {
                std::cout << "Exception!\n";
            }
            std::free(out);
        }
    }
```

Saída possível:
```
    initially, in: "Home" "World"
    after move, in: "" ""
    after move, out: "Home" "World"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ ranges::uninitialized_move_n](<#/doc/memory/ranges/uninitialized_move_n>)(C++20) | move um número de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_move](<#/doc/memory/uninitialized_move>)(C++17) | move um range de objetos para uma área de memória não inicializada
(modelo de função)
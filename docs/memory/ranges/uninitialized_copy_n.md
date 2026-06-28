# std::ranges::uninitialized_copy_n, std::ranges::uninitialized_copy_n_result

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< std::input_iterator I,
no-throw-input-iterator O, no-throw-sentinel-for<O> S >
requires std::constructible_from<std::iter_value_t<O>,
std::iter_reference_t<I>>
uninitialized_copy_n_result<I, O>
uninitialized_copy_n( I ifirst, std::iter_difference_t<I> count,
O ofirst, S olast );
(constexpr desde C++26)
Tipos auxiliares
template< class I, class O >
using uninitialized_copy_n_result = ranges::in_out_result<I, O>;
```

Seja \\(\scriptsize N\\)N igual a [ranges::min](<#/doc/algorithm/ranges/min>)(count, [ranges::distance](<#/doc/iterator/ranges/distance>)(ofirst, olast)).

Copia \\(\scriptsize N\\)N elementos do range que começa em ifirst para uma área de memória não inicializada `[`ofirst`, `olast`)` como se por
auto ret = [ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)([std::counted_iterator](<#/doc/iterator/counted_iterator>)(std::move(ifirst), count),
[std::default_sentinel](<#/doc/iterator/default_sentinel>), ofirst, olast);
return {std::move(ret.in).base(), ret.out};

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

Se `[`ofirst`, `olast`)` se sobrepuser com ifirst` + `[`​0​`, `count`)`, o comportamento é indefinido.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **ifirst** — o início do range de elementos a serem copiados
- **count** — o número de elementos a serem copiados
- **ofirst, olast** — par iterador-sentinela denotando o range de destino

### Valor de retorno

Conforme descrito acima.

### Complexidade

\\(\scriptsize\mathcal{O}(N)\\)𝓞(N).

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_copy_n`, usando, por exemplo, [ranges::copy_n](<#/doc/algorithm/ranges/copy_n>), se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1](<#/doc/memory/ranges/uninitialized_copy_n>))

### Possível implementação
```cpp
    struct uninitialized_copy_n_fn
    {
        template<std::input_iterator I, no-throw-input-iterator O, no-throw-sentinel-for<O> S>
            requires std::constructible_from<std::iter_value_t<O>, std::iter_reference_t<I>>
        constexpr ranges::uninitialized_copy_n_result<I, O>
            operator()(I ifirst, std::iter_difference_t<I> count, O ofirst, S olast) const
        {
            auto iter = std::counted_iterator(std::move(ifirst), count);
            auto ret = ranges::uninitialized_copy(iter, std::default_sentinel, ofirst, olast);
            return {std::move(ret.in).base(), ret.out};
        }
    };
    
    inline constexpr uninitialized_copy_n_fn uninitialized_copy_n{};
```

---

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        const char* stars[]{"Procyon", "Spica", "Pollux", "Deneb", "Polaris"};
    
        constexpr int n{4};
        alignas(alignof(std::string)) char outn * sizeof([std::string)];
    
        try
        {
            auto first{reinterpret_cast<std::string*>(out)};
            auto last{first + n};
            auto ret{std::ranges::uninitialized_copy_n(std::begin(stars), n, first, last)};
    
            std::cout << '{';
            for (auto it{first}; it != ret.out; ++it)
                std::cout << (it == first ? "" : ", ") << std::quoted(*it);
            std::cout << "};\n";
    
            std::ranges::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "uninitialized_copy_n exception\n";
        }
    }
```

Saída:
```
    {"Procyon", "Spica", "Pollux", "Deneb"};
```

### Veja também

[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(C++20) | copia um range de objetos para uma área de memória não inicializada
(objeto de função de algoritmo)
[ uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)(C++11) | copia um número de objetos para uma área de memória não inicializada
(modelo de função)
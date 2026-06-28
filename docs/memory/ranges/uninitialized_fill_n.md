# std::ranges::uninitialized_fill_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-range I, class T >
requires std::constructible_from<std::iter_value_t<I>, const T&>
I uninitialized_fill_n( I first, std::iter_difference_t<I> count,
const T& value );
(constexpr desde C++26)
```

Copia `value` para uma área de memória não inicializada `first` + `[`​0​`, `count`)` como se fosse por retorno de [ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)([std::counted_iterator](<#/doc/iterator/counted_iterator>)(first, count),
[std::default_sentinel](<#/doc/iterator/default_sentinel>), value).base();

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first | \- | o início do range dos elementos a serem inicializados
---|---|---
count | \- | número de elementos a serem construídos
value | \- | o valor com o qual construir os elementos

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear em `count`.

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_fill_n`, por exemplo, usando [ranges::fill_n](<#/doc/algorithm/ranges/fill_n>), se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>)

### Possível implementação
```cpp
    struct uninitialized_fill_n_fn
    {
        template<no-throw-forward-range I, class T>
        requires std::constructible_from<std::iter_value_t<I>, const T&>
        I operator()(I first, std::iter_difference_t<I> n, const T& x) const
        {
            I rollback{first};
            try
            {
                for (; n-- > 0; ++first)
                    ranges::construct_at(std::addressof(*first), x);
                return first;
            }
            catch (...) // rollback: destroy constructed elements
            {
                for (; rollback != first; ++rollback)
                    ranges::destroy_at(std::addressof(*rollback));
                throw;
            }
        }
    };
    
    inline constexpr uninitialized_fill_n_fn uninitialized_fill_n{};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    
    int main()
    {
        constexpr int n{3};
        alignas(alignof(std::string)) char outn * sizeof([std::string)];
    
        try
        {
            auto first{reinterpret_cast<std::string*>(out)};
            auto last = std::ranges::uninitialized_fill_n(first, n, "cppreference");
    
            for (auto it{first}; it != last; ++it)
                std::cout << *it << '\n';
    
            std::ranges::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
    }
```

Saída:
```
    cppreference
    cppreference
    cppreference
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo poderia criar objetos em um armazenamento const | mantido como não permitido

### Veja também

[ ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um range
(objeto de função de algoritmo)
[ uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(modelo de função)
# std::ranges::uninitialized_fill

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-forward-iterator I, no-throw-sentinel-for<I> S,
class T >
requires std::constructible_from<std::iter_value_t<I>, const T&>
I uninitialized_fill( I first, S last, const T& value );
(constexpr desde C++26)
template< no-throw-forward-range R, class T >
requires std::constructible_from<ranges::range_value_t<R>,
const T&>
ranges::borrowed_iterator_t<R> uninitialized_fill( R&& r,
const T& value );
(constexpr desde C++26)
```

1) Copia value para uma área de memória não inicializada `[`first`, `last`)` como se por

for (; first != last; ++first)
` `::new ([`_voidify_`](<#/doc/memory/voidify>)(*first)) [std::remove_reference_t](<#/doc/types/remove_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>(value);
return first;

Se uma exceção for lançada durante a inicialização, os objetos já construídos são destruídos em uma ordem não especificada.

2) Equivalente a return ranges::uninitialized_fill([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r), value);.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — par iterador-sentinela denotando o range de elementos a inicializar
- **r** — o range dos elementos a inicializar
- **value** — o valor para construir os elementos

### Valor de retorno

Conforme descrito acima.

### Complexidade

Linear no tamanho da área de memória não inicializada.

### Exceções

Qualquer exceção lançada na construção dos elementos no range de destino.

### Notas

Uma implementação pode melhorar a eficiência de `ranges::uninitialized_fill`, por exemplo, usando [ranges::fill](<#/doc/algorithm/ranges/fill>), se o tipo de valor do range de saída for [TrivialType](<#/doc/named_req/TrivialType>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_raw_memory_algorithms`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para [algoritmos de memória especializados](<#/doc/memory>), ([1,2](<#/doc/memory/ranges/uninitialized_fill>))

### Possível implementação
```cpp
    struct uninitialized_fill_fn
    {
        template<no-throw-forward-iterator I, no-throw-sentinel-for<I> S, class T>
            requires std::constructible_from<std::iter_value_t<I>, const T&>
        constexpr I operator()(I first, S last, const T& value) const
        {
            I rollback{first};
            try
            {
                for (; !(first == last); ++first)
                    ranges::construct_at(std::addressof(*first), value);
                return first;
            }
            catch (...)
            {   
                // rollback: destrói elementos construídos
                for (; rollback != first; ++rollback)
                    ranges::destroy_at(std::addressof(*rollback));
                throw;
            }
        }
    
        template<no-throw-forward-range R, class T>
            requires std::constructible_from<ranges::range_value_t<R>, const T&>
        constexpr ranges::borrowed_iterator_t<R> operator()(R&& r, const T& value) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value);
        }
    };
    
    inline constexpr uninitialized_fill_fn uninitialized_fill{};
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
        constexpr int n{4};
        alignas(alignof(std::string)) char outn * sizeof([std::string)];
    
        try
        {
            auto first{reinterpret_cast<std::string*>(out)};
            auto last{first + n};
            std::ranges::uninitialized_fill(first, last, "▄▀▄▀▄▀▄▀");
    
            int count{1};
            for (auto it{first}; it != last; ++it)
                std::cout << count++ << ' ' << *it << '\n';
    
            std::ranges::destroy(first, last);
        }
        catch(...)
        {
            std::cout << "Exception!\n";
        }
    }
```

Saída:
```
    1 ▄▀▄▀▄▀▄▀
    2 ▄▀▄▀▄▀▄▀
    3 ▄▀▄▀▄▀▄▀
    4 ▄▀▄▀▄▀▄▀
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | este algoritmo pode criar objetos em um armazenamento const | mantido como não permitido

### Ver também

[ ranges::uninitialized_fill_n](<#/doc/memory/ranges/uninitialized_fill_n>)(C++20) | copia um objeto para uma área de memória não inicializada, definida por um início e uma contagem
(objeto de função de algoritmo)
[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) | copia um objeto para uma área de memória não inicializada, definida por um range
(modelo de função)
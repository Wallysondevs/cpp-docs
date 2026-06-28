# std::ranges::iota, std::ranges::iota_result

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
Assinatura da chamada
template< std::input_or_output_iterator O, std::sentinel_for<O> S,
std::weakly_incrementable T >
requires std::indirectly_writable<O, const T&>
constexpr iota_result<O, T>
iota( O first, S last, T value );
template< std::weakly_incrementable T, ranges::output_range<const T&> R >
constexpr iota_result<ranges::borrowed_iterator_t<R>, T>
iota( R&& r, T value );
Tipos auxiliares
template< class O, class T >
using iota_result = ranges::out_value_result<O, T>;
```

Preenche o range `[`first`, `last`)` com valores sequencialmente crescentes, começando com value e avaliando repetidamente ++value.

Operação equivalente:
```cpp
    *(first)     = value;
    *(first + 1) = ++value;
    *(first + 2) = ++value;
    *(first + 3) = ++value;
    ...
```

### Parâmetros

- **first, last** — o range de elementos a ser preenchido com valores sequencialmente crescentes começando com value
- **value** — valor inicial a ser armazenado; a expressão ++value deve ser bem-formada

### Valor de retorno

{last, value + [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)}

### Complexidade

Exatamente last - first incrementos e atribuições.

### Implementação possível
```cpp
    struct iota_fn
    {
        template<std::input_or_output_iterator O, std::sentinel_for<O> S,
                std::weakly_incrementable T>
        requires std::indirectly_writable<O, const T&>
        constexpr iota_result<O, T> operator()(O first, S last, T value) const
        {
            while (first != last)
            {
                *first = as_const(value);
                ++first;
                ++value;
            }
            return {std::move(first), std::move(value)};
        }
    
        template<std::weakly_incrementable T, std::ranges::output_range<const T&> R>
        constexpr iota_result<std::ranges::borrowed_iterator_t<R>, T>
        operator()(R&& r, T value) const
        {
            return (*this)(std::ranges::begin(r), std::ranges::end(r), std::move(value));
        }
    };
    
    inline constexpr iota_fn iota;
```

---

### Notas

A função é nomeada em homenagem à função inteira ⍳ da linguagem de programação [APL](<https://en.wikipedia.org/wiki/APL_\(programming_language\)> "enwiki:APL \(programming language\)").

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_iota`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::ranges::iota`

### Exemplo

Usa o [vector](<#/doc/container/vector>) de iteradores ([std::vector](<#/doc/container/vector>)<[std::list](<#/doc/container/list>)&lt;T&gt;::iterator>) como um proxy para embaralhar os elementos da [std::list](<#/doc/container/list>), porque [ranges::shuffle](<#/doc/algorithm/ranges/shuffle>) não pode ser aplicado diretamente à [std::list](<#/doc/container/list>).

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <list>
    #include <numeric>
    #include <random>
    #include <vector>
    
    template <typename Proj = std::identity>
    void println(auto comment, std::ranges::input_range auto&& range, Proj proj = {})
    {
        for (std::cout << comment; auto const &element : range)
            std::cout << proj(element) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::list<int> list(8);
    
        // Fill the list with ascending values: 0, 1, 2, ..., 7
        std::ranges::iota(list, 0);
        println("List: ", list);
    
        // A vector of iterators (see the comment to Example)
        std::vector<std::list<int>::iterator> vec(list.size());
    
        // Fill with iterators to consecutive list's elements
        std::ranges::iota(vec.begin(), vec.end(), list.begin());
    
        std::ranges::shuffle(vec, std::mt19937 {std::random_device {}()});
        println("List viewed via vector: ", vec,  { return *it; });
    }
```

Saída possível:
```
    List: 0 1 2 3 4 5 6 7
    List viewed via vector: 5 7 6 0 1 3 4 2
```

### Veja também

[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor dado a cada elemento em um range
(modelo de função)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(objeto de função de algoritmo)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(modelo de função)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que consiste em uma sequência gerada pelo incremento repetido de um valor inicial
(modelo de classe) (objeto de ponto de customização)
[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(modelo de função)
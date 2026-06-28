# std::ranges::fill

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, std::output_iterator<const T&> O, std::sentinel_for<O> S >
constexpr O fill( O first, S last, const T& value );
(até C++26)
template< class O, std::sentinel_for<O> S, class T = std::iter_value_t<O> >
requires std::output_iterator<O, const T&>
constexpr O fill( O first, S last, const T& value );
template< class T, ranges::output_range<const T&> R >
constexpr ranges::borrowed_iterator_t<R> fill( R&& r, const T& value );
(até C++26)
template< class R, class T = ranges::range_value_t<R> >
requires ranges::output_range<R, const T&>
constexpr ranges::borrowed_iterator_t<R> fill( R&& r, const T& value );
```

1) Atribui o valor fornecido aos elementos no range `[`first`, `last`)`.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos a modificar
- **r** — o range de elementos a modificar
- **value** — o valor a ser atribuído

### Valor de retorno

Um iterator de saída que se compara como igual a `last`.

### Complexidade

Exatamente `last - first` atribuições.

### Possível implementação
```cpp
    struct fill_fn
    {
        template<class O, std::sentinel_for<O> S, class T = std::iter_value_t<O>>
        requires std::output_iterator<O, const T&>
        constexpr O operator()(O first, S last, const T& value) const
        {
            while (first != last)
                *first++ = value;
    
            return first;
        }
    
        template<class R, class T = ranges::range_value_t<R>>
        requires ranges::output_range<R, const T&>
        constexpr ranges::borrowed_iterator_t<R> operator()(R&& r, const T& value) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value);
        }
    };
    
    inline constexpr fill_fn fill;
```

---

### Notas

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/fill>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    void println(const auto& seq)
    {
        for (const auto& e : seq)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4, 5};
    
        // set all elements to -1 using overload (1)
        std::ranges::fill(v.begin(), v.end(), -1);
        println(v);
    
        // set all element to 10 using overload (2)
        std::ranges::fill(v, 10);
        println(v);
    
        std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
        println(nums);
        #ifdef __cpp_lib_algorithm_default_value_type
            std::ranges::fill(nums, {4, 2}); // T gets deduced
        #else
            std::ranges::fill(nums, std::complex<double>{4, 2});
        #endif
        println(nums);
    }
```

Saída:
```
    -1 -1 -1 -1 -1 -1
    10 10 10 10 10 10
    (1,3) (2,2) (4,8)
    (4,2) (4,2) (4,2)
```

### Ver também

[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(objeto de função de algoritmo)
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) | preenche um range com números aleatórios de um gerador de bits aleatórios uniforme
(objeto de função de algoritmo)
[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor fornecido a cada elemento em um range
(modelo de função)
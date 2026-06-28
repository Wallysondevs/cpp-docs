# std::ranges::fill_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, std::output_iterator<const T&> O >
constexpr O fill_n( O first, std::iter_difference_t<O> n, const T& value );
(até C++26)
template< class O, class T = std::iter_value_t<O> >
requires std::output_iterator<O, const T&>
constexpr O fill_n( O first, std::iter_difference_t<O> n, const T& value );
```

Atribui o valor fornecido a todos os elementos no range `[`first`, `first + n`)`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first** — o início do range de elementos a serem modificados
- **n** — número de elementos a serem modificados
- **value** — o valor a ser atribuído

### Valor de retorno

Um output iterator que se compara como igual a first + n.

### Complexidade

Exatamente n atribuições.

### Possível implementação
```cpp
    struct fill_n_fn
    {
        template<class O, class T = std::iter_value_t<O>>
        requires std::output_iterator<O, const T&>
        constexpr O operator()(O first, std::iter_difference_t<O> n, const T& value) const
        {
            for (std::iter_difference_t<O> i {}; i != n; ++first, ++i)
                *first = value;
            return first;
        }
    };
    
    inline constexpr fill_n_fn fill_n {};
```

---

### Notas

Teste de recurso macro | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iostream>
    #include <string>
    #include <vector>
    
    void println(const auto& v)
    {
        for (const auto& elem : v)
            std::cout << ' ' << elem;
        std::cout << '\n';
    }
    
    int main()
    {
        constexpr auto n{8};
    
        std::vector<std::string> v(n, "▓▓░░");
        println(v);
    
        std::ranges::fill_n(v.begin(), n, "░░▓▓");
        println(v);
    
        std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
        println(nums);
        #ifdef __cpp_lib_algorithm_default_value_type
            std::ranges::fill_n(nums.begin(), 2, {4, 2});
        #else
            std::ranges::fill_n(nums.begin(), 2, std::complex<double>{4, 2});
        #endif
        println(nums);
    }
```

Saída:
```
     ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░ ▓▓░░
     ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓ ░░▓▓
     (1,3) (2,2) (4,8)
     (4,2) (4,2) (4,8)
```

### Veja também

[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(objeto de função de algoritmo)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(C++26) | preenche um range com números aleatórios de um gerador de bits aleatórios uniforme
(objeto de função de algoritmo)
[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor fornecido a N elementos em um range
(modelo de função)
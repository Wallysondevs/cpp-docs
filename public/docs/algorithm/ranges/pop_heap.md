# std::ranges::pop_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I pop_heap( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
pop_heap( R&& r, Comp comp = {}, Proj proj = {} );
```

Troca o primeiro elemento e o último elemento do [heap](<#/doc/algorithm>) especificado em relação a comp e proj e transforma o sub-range, excluindo a primeira posição, em um heap em relação a comp e proj. Isso tem o efeito de remover o primeiro elemento do heap especificado.

1) O heap especificado é `[`first`, `last`)`.

2) O heap especificado é r.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o iterator e sentinel que designam o range de elementos a modificar
- **r** — o range de elementos a modificar
- **comp** — comparador a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

1) last

2) [ranges::end](<#/doc/ranges/end>)(r)

### Complexidade

No máximo \\(\scriptsize 2\log{(N)}\\)2log(N) aplicações de comp e \\(\scriptsize 4\log{(N)}\\)4log(N) aplicações de proj, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <string_view>
    
    template<class I = int*>
    void print(std::string_view rem, I first = {}, I last = {},
               std::string_view term = "\n")
    {
        for (std::cout << rem; first != last; ++first)
            std::cout << *first << ' ';
        std::cout << term;
    }
    
    int main()
    {
        std::array v{3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
        print("initially, v: ", v.cbegin(), v.cend());
    
        std::ranges::make_heap(v);
        print("make_heap, v: ", v.cbegin(), v.cend());
    
        print("convert heap into sorted array:");
        for (auto n {std::ssize(v)}; n >= 0; --n)
        {
            std::ranges::pop_heap(v.begin(), v.begin() + n);
            print("[ ", v.cbegin(), v.cbegin() + n, "]  ");
            print("[ ", v.cbegin() + n, v.cend(), "]\n");
        }
    }
```

Saída:
```
    initially, v: 3 1 4 1 5 9 2 6 5 3
    make_heap, v: 9 6 4 5 5 3 2 1 1 3
    convert heap into sorted array:
    [ 6 5 4 3 5 3 2 1 1 9 ]  [ ]
    [ 5 5 4 3 1 3 2 1 6 ]  [ 9 ]
    [ 5 3 4 1 1 3 2 5 ]  [ 6 9 ]
    [ 4 3 3 1 1 2 5 ]  [ 5 6 9 ]
    [ 3 2 3 1 1 4 ]  [ 5 5 6 9 ]
    [ 3 2 1 1 3 ]  [ 4 5 5 6 9 ]
    [ 2 1 1 3 ]  [ 3 4 5 5 6 9 ]
    [ 1 1 2 ]  [ 3 3 4 5 5 6 9 ]
    [ 1 1 ]  [ 2 3 3 4 5 5 6 9 ]
    [ 1 ]  [ 1 2 3 3 4 5 5 6 9 ]
    [ ]  [ 1 1 2 3 3 4 5 5 6 9 ]
```

### Ver também

[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(template de função)
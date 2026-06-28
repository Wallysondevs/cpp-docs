# std::iota

Definido no header `[<numeric>](<#/doc/header/numeric>)`

```cpp
template< class ForwardIt, class T >
void iota( ForwardIt first, ForwardIt last, T value );  // (desde C++11)
(constexpr desde C++20)
```

Preenche o range `[`first`, `last`)` com valores sequencialmente crescentes, começando com value e avaliando repetidamente `++value`.

Operação equivalente (assumindo que `++value` retorna o valor incrementado):
```cpp
    *first   = value;
    *++first = ++value;
    *++first = ++value;
    *++first = ++value;
    // repete até que “last” seja alcançado
```

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

  * `T` não é conversível para o [tipo de valor](<#/doc/iterator>) de `ForwardIt`.
  * A expressão `++val` é malformada, onde `val` é uma variável do tipo `T`.

### Parâmetros

- **first, last** — o range de elementos a ser preenchido com valores sequencialmente crescentes começando com value
- **value** — valor inicial a ser armazenado

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) incrementos e atribuições.

### Implementação possível
```cpp
    template<class ForwardIt, class T>
    constexpr // desde C++20
    void iota(ForwardIt first, ForwardIt last, T value)
    {
        for (; first != last; ++first, ++value)
            *first = value;
    }
```

---

### Notas

A função é nomeada em homenagem à função inteira ⍳ da linguagem de programação [APL](<https://en.wikipedia.org/wiki/APL_\(programming_language\)> "enwiki:APL \(programming language\)"). Foi um dos [componentes da STL](<https://web.archive.org/web/20220816102741/http://www.martinbroadhurst.com/stl/iota.html>) que não foram incluídos no C++98, mas que entraram na standard library em C++11.

### Exemplo

O exemplo a seguir aplica [std::shuffle](<#/doc/algorithm/random_shuffle>) a um [vector](<#/doc/container/vector>) de iterators de [std::list](<#/doc/container/list>). `std::iota` é usado para popular containers.

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <list>
    #include <numeric>
    #include <random>
    #include <vector>
    
    class BigData // cópia ineficiente
    {
        int data[1024]; /* alguns dados brutos */
    public:
        explicit BigData(int i = 0) { data[0] = i; /* ... */ }
        operator int() const { return data[0]; }
        BigData& operator=(int i) { data[0] = i; return *this; }
        /* ... */
    };
    
    int main()
    {
        std::list<BigData> l(10);
        std::iota(l.begin(), l.end(), -4);
    
        std::vector<std::list<BigData>::iterator> v(l.size());
        std::iota(v.begin(), v.end(), l.begin());
        // Um vector de iterators (para os dados originais) é usado para evitar cópias caras,
        // e porque std::shuffle (abaixo) não pode ser aplicado diretamente a uma std::list.
    
        std::shuffle(v.begin(), v.end(), std::mt19937{std::random_device{}()});
    
        std::cout << "Conteúdo original da lista l:\t";
        for (const auto& n : l)
            std::cout << std::setw(2) << n << ' ';
        std::cout << '\n';
    
        std::cout << "Conteúdo de l, visto através de v embaralhado:\t";
        for (const auto i : v)
            std::cout << std::setw(2) << *i << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    Original contents of the list l:	-4 -3 -2 -1  0  1  2  3  4  5
    Contents of l, viewed via shuffled v:	-1  5 -4  0  2  1  4 -2  3 -3
```

### Veja também

[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo de uma sequência gerada pelo incremento repetido de um valor inicial
(class template) (objeto de ponto de customização)
[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor dado a cada elemento em um range
(function template)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui um certo valor a um range de elementos
(algorithm function object)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(function template)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(algorithm function object)
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(algorithm function object)
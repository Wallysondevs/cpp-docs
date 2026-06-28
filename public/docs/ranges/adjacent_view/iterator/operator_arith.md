# std::ranges::adjacent_view&lt;V,N&gt;::iterator&lt;Const&gt;::operator++,--,+=,-=

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++23)
constexpr /*iterator*/ operator++( int );  // (2) (desde C++23)
constexpr /*iterator*/& operator\--()
requires ranges::bidirectional_range<Base>;  // (3) (desde C++23)
constexpr /*iterator*/ operator\--( int )
requires ranges::bidirectional_range<Base>;  // (4) (desde C++23)
constexpr /*iterator*/& operator+=( difference_type n )
requires ranges::random_access_range<Base>;  // (5) (desde C++23)
constexpr /*iterator*/& operator-=( difference_type n )
requires ranges::random_access_range<Base>;  // (6) (desde C++23)
```

  
Incrementa ou decrementa o iterator. 

Seja [`_current__`](<#/doc/ranges/adjacent_view/iterator>) um array subjacente de iterators. 

1) Equivalente a: 
```cpp
    for (auto& i : current_)
        i = std::ranges::next(i);
    return *this;
```

O comportamento é indefinido se, antes da chamada, current_.back() não for incrementável.

2) Equivalente a: 
```cpp
    auto tmp = *this;
    ++*this;
    return tmp;
```

3) Equivalente a: 
```cpp
    for (auto& i : current_)
        i = std::ranges::prev(i);
    return *this;
```

O comportamento é indefinido se, antes da chamada, current_.front() não for decrementável.

4) Equivalente a: 
```cpp
    auto tmp = *this;
    --*this;
    return tmp;
```

5) Equivalente a: 
```cpp
    for (auto& i : current_)
        i = i + n;
    return *this;
```

O comportamento é indefinido se, antes da chamada, current_.back() + n não tiver comportamento bem definido.

6) Equivalente a: 
```cpp
    for (auto& i : current_)
        i = i - n;
    return *this;
```

O comportamento é indefinido se, antes da chamada, current_.front() - n não tiver comportamento bem definido.

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

1,3,5,6) *this

2,4) Uma cópia de *this que foi feita antes da alteração.

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <list>
    #include <ranges>
    #include <utility>
    #include <vector>
     
    int main()
    {
        {
            auto v = std::vector{0, 1, 2, 3, 4, 5};
            auto i = (v | std::views::pairwise).begin();
            assert((*i == std::pair{0, 1}));
            ++i;                            // sobrecarga (1)
            assert((*i == std::pair{1, 2}));
            --i;                            // sobrecarga (3)
            assert((*i == std::pair{0, 1}));
            i += 2;                         // sobrecarga (5)
            assert((*i == std::pair{2, 3}));
            i -= 2;                         // sobrecarga (6)
            assert((*i == std::pair{0, 1}));
        }
        {
            auto v = std::list{0, 1, 2, 3, 4, 5};
            auto i = (v | std::views::pairwise).begin();
            assert((*i == std::pair{0, 1}));
            ++i;                            // sobrecarga (1)
            assert((*i == std::pair{1, 2}));
            --i;                            // sobrecarga (3)
            assert((*i == std::pair{0, 1}));
    //      i += 2; // Erro: v não é um random_access_range; sobrecarga (5)
    //      i -= 2; // Erro: v não é um random_access_range; sobrecarga (6)
        }
    }
```

### Veja também

[ operator+operator-](<#/doc/ranges/adjacent_view/iterator/operator_arith2>)(C++23) | realiza aritmética de iterators   
(função membro pública)  
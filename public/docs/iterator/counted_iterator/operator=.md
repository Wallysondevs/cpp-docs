# std::counted_iterator&lt;I&gt;::operator=

```cpp
template< class I2 >
requires std::assignable_from<I&, const I2&>
constexpr counted_iterator& operator=( const counted_iterator<I2>& other );  // (desde C++20)
```

  
O iterator subjacente e o _comprimento_ são atribuídos com os de other. 

### Parâmetros

other  |  \-  |  adaptador de iterator para atribuir de   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <initializer_list>
    #include <iterator>
    
    int main()
    {
        auto a = {3, 1, 4, 1, 5, 9, 2};
        std::counted_iterator<std::initializer_list<int>::iterator> p(begin(a), size(a) - 2);
        std::counted_iterator<std::initializer_list<int>::iterator> q;
        assert(q.count() == 0);
        assert(q.count() != p.count());
        q = p;
        assert(q.count() == p.count());
        assert(std::ranges::equal(p, std::default_sentinel, q, std::default_sentinel));
    }
```

### Ver também

[ (constructor)](<#/doc/iterator/counted_iterator/counted_iterator>)(C++20) |  constrói um novo adaptador de iterator   
(função membro pública)  
# std::counted_iterator&lt;I&gt;::counted_iterator

```cpp
constexpr counted_iterator() requires std::default_initializable<I> = default;  // (1) (desde C++20)
constexpr counted_iterator( I x, std::iter_difference_t<I> n );  // (2) (desde C++20)
template< class I2 >
requires std::convertible_to<const I2&, I>
constexpr counted_iterator( const counted_iterator<I2>& other );  // (3) (desde C++20)
```

  
Constrói um novo adaptador de iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o iterator subjacente e inicializa o _comprimento_ subjacente com ​0​. As operações no iterator resultante têm comportamento definido se e somente se as operações correspondentes em um `I` inicializado por valor também tiverem comportamento definido.

2) O iterator subjacente é inicializado com std::move(x) e o _comprimento_ subjacente é inicializado com n. O comportamento é indefinido se n for negativo.

3) O iterator e o _comprimento_ subjacentes são inicializados com os de other.

### Parâmetros

x  |  \-  |  iterator a adaptar   
---|---|---
n  |  \-  |  distância até o fim   
other  |  \-  |  adaptador de iterator a converter   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        static constexpr auto pi = {3, 1, 4, 1, 5, 9, 2};
     
        // (1) construtor padrão:
        constexpr std::counted_iterator<std::initializer_list<int>::iterator> i1{};
        static_assert(i1 == std::default_sentinel);
        static_assert(i1.count() == 0);
     
        // (2) inicializa o iterator e o comprimento, respectivamente:
        constexpr std::counted_iterator<std::initializer_list<int>::iterator> i2{
            pi.begin(), pi.size() - 2
        };
        static_assert(i2.count() == 5);
        static_assert(*i2 == 3 && i2[1] == 1);
     
        // (3) construtor de conversão:
        std::counted_iterator<std::initializer_list<const int>::iterator> i3{i2};
     
        std::ranges::copy(i3, std::default_sentinel,
            std::ostream_iterator<const int>{std::cout, " "});
    }
```

Saída: 
```
    3 1 4 1 5
```

### Veja também

[ operator=](<#/>)(C++20) |  atribui outro adaptador de iterator   
(função membro pública)  
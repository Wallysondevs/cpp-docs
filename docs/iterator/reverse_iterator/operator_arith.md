# std::reverse_iterator&lt;Iter&gt;::operator++,+,+=,--,-,-=

reverse_iterator& operator++(); |  (1) | (constexpr desde C++17)  
---|---|---
reverse_iterator& operator\--(); |  (2) | (constexpr desde C++17)  
reverse_iterator operator++( int ); |  (3) | (constexpr desde C++17)  
reverse_iterator operator\--( int ); |  (4) | (constexpr desde C++17)  
reverse_iterator operator+( difference_type n ) const; |  (5) | (constexpr desde C++17)  
reverse_iterator operator-( difference_type n ) const; |  (6) | (constexpr desde C++17)  
reverse_iterator& operator+=( difference_type n ); |  (7) | (constexpr desde C++17)  
reverse_iterator& operator-=( difference_type n ); |  (8) | (constexpr desde C++17)  

  
Incrementa ou decrementa o iterator subjacente de forma reversa.

Sobrecarga | Equivalente a   
---|---
(1) | \--`[current](<#/doc/iterator/reverse_iterator>)`; return *this;  
(2) | ++`[current](<#/doc/iterator/reverse_iterator>)`; return *this;  
(3) |  reverse_iterator tmp = *this; \--`[current](<#/doc/iterator/reverse_iterator>)`; return tmp;  
(4) | reverse_iterator tmp = *this; ++`[current](<#/doc/iterator/reverse_iterator>)`; return tmp;  
(5) | return reverse_iterator(`[current](<#/doc/iterator/reverse_iterator>)` `- n);  
(6) | return reverse_iterator(`[current](<#/doc/iterator/reverse_iterator>)` `+ n);  
(7) | `[current](<#/doc/iterator/reverse_iterator>)` `-= n; return *this;  
(8) | `[current](<#/doc/iterator/reverse_iterator>)` `+= n; return *this;  
  
### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

Conforme descrito acima.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
     
    int main()
    {
        std::vector v{0, 1, 2, 3, 4};
        auto rv = std::reverse_iterator{v.rbegin()};
        std::cout << *(++rv) << ' '; // 3
        std::cout << *(--rv) << ' '; // 4
        std::cout << *(rv + 3) << ' '; // 1
        rv += 3;
        std::cout << rv[0] << ' '; // 1
        rv -= 3;
        std::cout << rv[0] << '\n'; // 4
     
        std::list l{5, 6, 7, 8};
        auto rl = std::reverse_iterator{l.rbegin()};
        std::cout << *(++rl) << ' '; // OK: 3
        std::cout << *(--rl) << '\n'; // OK: 4
        // As seguintes instruções geram erro de compilação porque o
        // iterator subjacente não modela o random access iterator:
    //  *(rl + 3) = 13;
    //  rl += 3;
    //  rl -= 3;
    }
```

Saída: 
```
    3 4 1 1 4
    7 8
```

### Veja também

[ operator+](<#/>) |  avança o iterator   
(modelo de função)  
[ operator-](<#/doc/iterator/reverse_iterator/operator->) |  calcula a distância entre dois adaptadores de iterator   
(modelo de função)
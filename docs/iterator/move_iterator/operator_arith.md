# std::move_iterator&lt;Iter&gt;::operator++,+,+=,--,-,-=

```cpp
move_iterator& operator++(); |  (1) | (constexpr desde C++17)
move_iterator& operator\--(); |  (2) | (constexpr desde C++17)
  // (3)
move_iterator operator++( int ); |  | (constexpr desde C++17)
(até C++20)
constexpr auto operator++( int );  // (desde C++20)
move_iterator operator\--( int ); |  (4) | (constexpr desde C++17)
move_iterator operator+( difference_type n ) const; |  (5) | (constexpr desde C++17)
move_iterator operator-( difference_type n ) const; |  (6) | (constexpr desde C++17)
move_iterator& operator+=( difference_type n ); |  (7) | (constexpr desde C++17)
move_iterator& operator-=( difference_type n ); |  (8) | (constexpr desde C++17)
```

  
Incrementa ou decrementa o iterator subjacente. 

Sobrecarga  | Equivalente a   
---|---
(1) | ++`_[current](<#/doc/iterator/move_iterator>)_` ﻿; return *this;  
(2) | \--`_[current](<#/doc/iterator/move_iterator>)_` ﻿; return *this;  
(3) |  |  move_iterator tmp = *this; ++`_[current](<#/doc/iterator/move_iterator>)_` ﻿; return tmp; | (até C++20)  
  
  * move_iterator tmp = *this; ++`_[current](<#/doc/iterator/move_iterator>)_` ﻿; return tmp;  
se `Iter` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>)
  * ++`_[current](<#/doc/iterator/move_iterator>)_` ; caso contrário 

| (desde C++20)  
---|---
(4) | move_iterator tmp = *this; \--`_[current](<#/doc/iterator/move_iterator>)_` ﻿; return tmp;  
(5) | return move_iterator(`_[current](<#/doc/iterator/move_iterator>)_` `+ n);  
(6) | return move_iterator(`_[current](<#/doc/iterator/move_iterator>)_` `- n);  
(7) | `_[current](<#/doc/iterator/move_iterator>)_` `+= n; return *this;  
(8) | `_[current](<#/doc/iterator/move_iterator>)_` `-= n; return *this;  
  
### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

Conforme descrito acima. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator+](<#/>)(C++11) |  avança o iterator   
(modelo de função)  
[ operator-](<#/doc/iterator/move_iterator/operator->)(C++11) |  calcula a distância entre dois adaptadores de iterator   
(modelo de função)
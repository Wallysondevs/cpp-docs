# std::move_iterator&lt;Iter&gt;::base

```cpp
  // (1)
iterator_type base() const; |  | (constexpr desde C++17)
(ate C++20)
constexpr const iterator_type& base() const& noexcept;  // (desde C++20)
constexpr iterator_type base() &&;  // (2) (desde C++20)
```

  
Retorna o iterator subjacente.

1) Retorna uma cópia do (ate C++20) referência para (desde C++20) o iterator subjacente.

2) Retorna um iterator construído por move a partir do iterator subjacente.

### Valor de retorno

1) `_[current](<#/doc/iterator/move_iterator>)_`

2) std::move(`_[current](<#/doc/iterator/move_iterator>)_` ﻿)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4};
        std::move_iterator<std::vector<int>::reverse_iterator>
            m1{v.rbegin()},
            m2{v.rend()};
     
        std::copy(m1.base(), m2.base(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída: 
```
    4 3 2 1 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3391](<https://cplusplus.github.io/LWG/issue3391>) | C++20  | a sobrecarga ([1](<#/doc/iterator/move_iterator/base>)) retornava uma cópia do iterator subjacente  | retorna uma referência   
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20  | a sobrecarga ([1](<#/doc/iterator/move_iterator/base>)) não era noexcept  | tornada noexcept   
  
### Veja também

[ operator*operator->](<#/doc/iterator/move_iterator/operator_star_>)(C++11)(C++11)(obsoleto em C++20) |  acessa o elemento apontado   
(função membro pública)  
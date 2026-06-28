# std::move_iterator&lt;Iter&gt;::operator[]

```cpp
/* não especificado */ operator const; |  | (constexpr desde C++17)
(ate C++20)
constexpr reference operator const;  // (desde C++20)
```

  
Retorna uma referência para o elemento na localização relativa especificada. 

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

std::move(`_[current](<#/doc/iterator/move_iterator>)_` ﻿[n])(ate C++20)[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(`_[current](<#/doc/iterator/move_iterator>)_` `+ n)(desde C++20)

### Observações

O tipo de retorno é não especificado porque o tipo de retorno do operator[] do iterator subjacente também é não especificado (veja [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>)).  | (ate C++20)  
  
### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <string>
    #include <vector>
    
    void print(auto rem, const auto& v)
    {
        for (std::cout << rem; const auto& e : v)
            std::cout << std::quoted(e) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<std::string> p{"alpha", "beta", "gamma", "delta"}, q;
        print("1) p: ", p);
    
        std::move_iterator it{p.begin()};
    
        for (std::size_t t{}; t != p.size(); ++t)
            q.emplace_back(it[t]); 
    
        print("2) p: ", p);
        print("3) q: ", q);
    
        std::list l{1, 2, 3};
        std::move_iterator it2{l.begin()};
    //  it2[1] = 13; // Erro de compilação: o iterator subjacente
                     // não modela o iterator de acesso aleatório
    //  *it2 = 999;  // Erro de compilação: usando rvalue como lvalue
    }
```

Saída possível: 
```
    1) p: "alpha" "beta" "gamma" "delta"
    2) p: "" "" "" ""
    3) q: "alpha" "beta" "gamma" "delta"
```

### Veja também

[ operator*operator->](<#/doc/iterator/move_iterator/operator_star_>)(C++11)(C++11)(obsoleto desde C++20) | acessa o elemento apontado   
(função membro pública)  
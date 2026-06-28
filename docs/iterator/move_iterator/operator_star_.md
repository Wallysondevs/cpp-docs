# std::move_iterator&lt;Iter&gt;::operator*,-&gt;

```cpp
reference operator*() const;  // (1) (desde C++11)
(constexpr desde C++17)
pointer operator->() const;  // (2) (desde C++11)
(constexpr desde C++17)
(obsoleto em C++20)
```

Retorna uma rvalue reference ou um ponteiro para o elemento atual.

### Valor de retorno

1) static_cast&lt;reference&gt;(*`_[current](<#/doc/iterator/move_iterator>)_` ﻿)(até C++20)[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(`_[current](<#/doc/iterator/move_iterator>)_` ﻿)(desde C++20)

2) `_[current](<#/doc/iterator/move_iterator>)_`

### Notas

operator-> é obsoleto porque desreferenciar seu resultado pode produzir um lvalue. Isso pode levar a um comportamento não intencional.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
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
        for (std::move_iterator it{p.begin()}, end{p.end()}; it != end; ++it)
        {
            it->push_back('!'); // calls -> string::push_back(char)
            q.emplace_back(*it); // *it <- overload (1)
        }
        print("2) p: ", p);
        print("3) q: ", q);
    
        std::vector v{1, 2, 3};
        std::move_iterator it{v.begin()};
        // *it = 13; // error: using rvalue as lvalue
    }
```

Saída possível:
```
    1) p: "alpha" "beta" "gamma" "delta"
    2) p: "" "" "" ""
    3) q: "alpha!" "beta!" "gamma!" "delta!"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2106](<https://cplusplus.github.io/LWG/issue2106>) | C++11 | operator* retornaria uma referência pendente
se *`_[current](<#/doc/iterator/move_iterator>)_` produzisse um prvalue | retorna o objeto
neste caso

### Veja também

[ operator[]](<#/doc/iterator/move_iterator/operator_at>)(C++11) | acessa um elemento por índice
(função membro pública)
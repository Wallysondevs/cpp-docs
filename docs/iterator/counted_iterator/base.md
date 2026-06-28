# std::counted_iterator&lt;I&gt;::base

```cpp
constexpr const I& base() const& noexcept;  // (1) (desde C++20)
constexpr I base() &&;  // (2) (desde C++20)
```

Retorna o iterator base subjacente.

1) Retorna uma referência para o iterator subjacente.

2) Constrói por movimento o valor de retorno a partir do iterator subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

1) Uma referência para o iterator subjacente.

2) Um iterator construído por movimento a partir do iterator subjacente.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <type_traits>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4};
    
        std::reverse_iterator<std::vector<int>::iterator> reverse{v.rbegin()};
    
        std::counted_iterator counted{reverse, 3};
    
        static_assert(std::is_same<
            decltype(counted.base()),
            std::reverse_iterator<std::vector<int>::iterator> const&
        >{});
    
        std::cout << "Print with reverse_iterator: ";
        for (auto r = counted.base(); r != v.rend(); ++r)
            std::cout << *r << ' ';
        std::cout << '\n';
    
        std::cout << "Print with counted_iterator: ";
        for (; counted != std::default_sentinel; ++counted)
            std::cout << counted[0] << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    Print with reverse_iterator: 4 3 2 1 0
    Print with counted_iterator: 4 3 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3391](<https://cplusplus.github.io/LWG/issue3391>) | C++20 | a versão `const` de `base` retorna uma cópia do iterator subjacente | retorna uma referência
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20 | a versão `const` de `base` retorna uma referência, mas pode não ser `noexcept` | tornada `noexcept`

### Ver também

[ operator*operator->](<#/doc/iterator/counted_iterator/operator_star_>)(C++20) | acessa o elemento apontado
(função membro pública)
[ count](<#/doc/iterator/counted_iterator/count>)(C++20) | retorna a distância até o final
(função membro pública)
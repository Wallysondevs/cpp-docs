# std::ranges::transform_view&lt;V,F&gt;::iterator&lt;Const&gt;::base

```cpp
constexpr const ranges::iterator_t<Base>& base() const & noexcept;  // (1) (desde C++20)
constexpr ranges::iterator_t<Base> base() &&;  // (2) (desde C++20)
```

Retorna o iterator subjacente.

1) Retorna uma referência para o iterator subjacente.

2) Constrói por movimento o resultado a partir do iterator subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

1) Uma referência para o iterator subjacente.

2) Um iterator construído por movimento a partir do iterator subjacente.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        const auto v = { 0, 1, 2, 3, 4 };
        auto x2 =  { return x << 1; };
        std::ranges::transform_view tv{ v, x2 };
        std::ostream_iterator<int> ostr{ std::cout, " " };
    
        std::ranges::copy(v, ostr), std::cout << '\n';
        std::ranges::copy(tv.base(), ostr), std::cout << '\n';
        std::ranges::copy(tv, ostr), std::cout << '\n';
    }
```

Saída:
```
    0 1 2 3 4
    0 1 2 3 4
    0 2 4 6 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3533](<https://cplusplus.github.io/LWG/issue3533>) | C++20 | a sobrecarga `const&` de `base` retorna uma cópia do iterator subjacente | retorna uma referência
[LWG 3593](<https://cplusplus.github.io/LWG/issue3593>) | C++20 | a sobrecarga `const&` de `base` pode não ser noexcept | tornou-se noexcept
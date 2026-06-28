# std::ranges::elements_view&lt;V,F&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++20)
```

  
Retorna o elemento em `V` para o qual o iterator subjacente aponta.

Efetivamente retorna /*get-element*/(this->base()), onde para uma expressão e, /*get-element*/(e) é:

  * std::get&lt;N&gt;(*e), se [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt; for um tipo de referência. Caso contrário,
  * static_cast&lt;E&gt;(std::get&lt;N&gt;(*e)), onde E é [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::tuple_element_t](<#/doc/utility/tuple_element>)<N, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>>.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento atual.

### Notas

operator-> não é fornecido.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <tuple>
     
    int main()
    {
        using T = std::tuple<int, char, std::string_view>;
     
        const auto il = {
            T{1, 'A', "α"},
            T{2, 'B', "β"},
            T{3, 'C', "γ"},
        };
     
        const auto view {il | std::views::elements<2>};
     
        const auto iter {view.begin() + 1};
     
        std::cout << *iter << '\n';
    }
```

Saída:
```
    β
```

### Ver também

[ operator[]](<#/doc/ranges/elements_view/iterator/operator_at>)(C++20) | acessa um elemento por índice   
(função membro pública)  
# std::compare_three_way_result

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
template< class T, class U = T >
struct compare_three_way_result;
```

Sejam `t` e `u` lvalues de `const [std::remove_reference_t](<#/doc/types/remove_reference>)<T>` e `const [std::remove_reference_t](<#/doc/types/remove_reference>)<U>` respectivamente, se a expressão `t <=> u` for bem-formada, fornece o typedef membro `type` igual a `decltype(t <=> u)`, caso contrário, não há membro `type`.

Se o programa adicionar especializações para `std::compare_three_way_result`, o comportamento é indefinido.

### Tipos Membro

Nome | Definição
---|---
`type` | o tipo de resultado do `operator<=>` em lvalue qualificado como const de `T` e `U`

### Tipos Auxiliares

```cpp
template< class T, class U = T >
using compare_three_way_result_t = compare_three_way_result<T, U>::type;  // (desde C++20)
```

### Implementação Possível
```cpp
    // recomendado por Casey Carter
    // veja também: https://github.com/microsoft/STL/pull/385#discussion_r357894054
    template<class T, class U = T>
    using compare_three_way_result_t = decltype(
        std::declval<const std::remove_reference_t<T>&>() <=>
        std::declval<const std::remove_reference_t<U>&>()
    );
    
    template<class T, class U = T>
    struct compare_three_way_result {};
    
    template<class T, class U>
        requires requires { typename compare_three_way_result_t<T, U>; }
    struct compare_three_way_result<T, U>
    {
        using type = compare_three_way_result_t<T, U>;
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <compare>
    #include <iostream>
    #include <type_traits>
    
    template<class Ord>
    void print_cmp_type()
    {
        if constexpr (std::is_same_v<Ord, std::strong_ordering>)
            std::cout << "strong ordering\n";
        else if constexpr (std::is_same_v<Ord, std::weak_ordering>)
            std::cout << "weak ordering\n";
        else if constexpr (std::is_same_v<Ord, std::partial_ordering>)
            std::cout << "partial ordering\n";
        else
            std::cout << "illegal comparison result type\n";
    }
    
    int main()
    {
        print_cmp_type<std::compare_three_way_result_t<int>>();
        print_cmp_type<std::compare_three_way_result_t<double>>();
    }
```

Saída:
```
    strong ordering
    partial ordering
```

### Veja também

[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(classe)
[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(classe)
[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(classe)
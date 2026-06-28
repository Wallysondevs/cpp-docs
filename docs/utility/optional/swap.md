# std::optional&lt;T&gt;::swap

```cpp
`void swap( optional& other ) noexcept(/* see below */);`  // (desde C++17)
(constexpr desde C++20)
```

Troca o conteúdo com o de `other`.

*   Se nem `*this` nem `other` contêm um valor, a função não tem efeito.
*   Se apenas um de `*this` e `other` contém um valor (vamos chamar este objeto de `in` e o outro de `un`), o valor contido de `un` é [inicializado diretamente](<#/doc/language/direct_initialization>) a partir de `std::move(*in)`, seguido pela destruição do valor contido de `in` como se por `in->T::~T()`. Após esta chamada, `in` não contém um valor; `un` contém um valor.
*   Se ambos `*this` e `other` contêm valores, os valores contidos são trocados chamando [std::swap](<#/doc/algorithm/swap>); `swap(**this, *other)`.

O programa é malformado a menos que o tipo `T` seja [Swappable](<#/doc/named_req/Swappable>) e `std::is_move_constructible_v<T>` seja `true`.

### Parameters

- **other** — o objeto `optional` com o qual trocar o conteúdo

### Return value

(nenhum)

### Exceptions

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

`noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<T> &&`
`[std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)<T>)`

No caso de uma exceção ser lançada, os estados dos valores contidos de `*this` e `other` são determinados pelas garantias de segurança de exceção de `swap` do tipo `T` ou do construtor de movimento de `T`, o que for chamado. Para ambos `*this` e `other`, se o objeto continha um valor, ele permanece contendo um valor, e vice-versa.

```cpp
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr
```

### Example

Execute este código
```cpp
    #include <iostream>
    #include <optional>
    #include <string>
    
    int main()
    {
        std::optional<std::string> opt1("First example text");
        std::optional<std::string> opt2("2nd text");
    
        enum Swap { Before, After };
        auto print_opts = &
        {
            std::cout << (e == Before ? "Before swap:\n" : "After swap:\n");
            std::cout << "opt1 contains '" << opt1.value_or("") << "'\n";
            std::cout << "opt2 contains '" << opt2.value_or("") << "'\n";
            std::cout << (e == Before ? "---SWAP---\n": "\n");
        };
    
        print_opts(Before);
        opt1.swap(opt2);
        print_opts(After);
    
        // Swap with only 1 set
        opt1 = "Lorem ipsum dolor sit amet, consectetur tincidunt.";
        opt2.reset();
    
        print_opts(Before);
        opt1.swap(opt2);
        print_opts(After);
    }
```

Saída:
```
    Before swap:
    opt1 contains 'First example text'
    opt2 contains '2nd text'
    ---SWAP---
    After swap:
    opt1 contains '2nd text'
    opt2 contains 'First example text'
    
    Before swap:
    opt1 contains 'Lorem ipsum dolor sit amet, consectetur tincidunt.'
    opt2 contains ''
    ---SWAP---
    After swap:
    opt1 contains ''
    opt2 contains 'Lorem ipsum dolor sit amet, consectetur tincidunt.'
```

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | `swap` não era `constexpr` enquanto as operações necessárias podem ser `constexpr` em C++20 | tornada `constexpr`

### See also

[ std::swap(std::optional)](<#/doc/utility/optional/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
# std::swap(std::variant)

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class... Types >
void swap( std::variant<Types...>& lhs,
std::variant<Types...>& rhs ) noexcept(/* veja abaixo */);
(constexpr desde C++20)
```

Sobrecarga do algoritmo [std::swap](<#/doc/utility/swap>) para [std::variant](<#/doc/utility/variant>). Efetivamente chama lhs.swap(rhs).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i> e [std::is_swappable_v](<#/doc/types/is_swappable>)<T_i> forem ambos verdadeiros para todos os `T_i` em `Types...`.

### Parâmetros

- **lhs, rhs** — objetos `variant` cujos valores devem ser trocados

### Valor de retorno

(nenhum)

### Exceções

Especificação `noexcept`:

noexcept(noexcept(lhs.swap(rhs)))

### Notas

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_lib_variant` | `202106L`  // (C++20)
(DR) | `std::variant` totalmente constexpr
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <variant>
     
    void print(auto const& v, char term = '\n')
    {
        std::visit( { std::cout << o; }, v);
        std::cout << term;
    }
     
    int main()
    {
        std::variant<int, std::string> v1{123}, v2{"XYZ"};
        print(v1, ' ');
        print(v2);
     
        std::swap(v1, v2);
        print(v1, ' ');
        print(v2);
     
        std::variant<double, std::string> v3{3.14};
        // std::swap(v1, v3); // ERROR: ~ inconsistent parameter packs
    }
```

Saída:
```
    123 XYZ
    XYZ 123
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | `swap` não era constexpr enquanto as operações necessárias podem ser constexpr em C++20 | tornado constexpr

### Veja também

[ swap](<#/doc/utility/variant/swap>) | troca com outro `variant`
(função membro pública)
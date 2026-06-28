# std::swap(std::optional)

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
template< class T >
void swap( std::optional<T>& lhs,
std::optional<T>& rhs ) noexcept(/* see below */);
(constexpr desde C++20)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::optional](<#/doc/utility/optional>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; e [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt; forem ambos verdadeiros.

### Parâmetros

lhs, rhs | \- | objetos `optional` cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exceções

Especificação `noexcept`:

noexcept(noexcept(lhs.swap(rhs)))

### Notas

```cpp
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_optional` | `202106L`  // (C++20)
(DR20) | Totalmente constexpr
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
    #include <string>
    
    int main()
    {
        std::optional<std::string> a{"██████"}, b{"▒▒▒▒▒▒"};
    
        auto print = &
        {
            std::cout << s << "\t"
                         "a = " << a.value_or("(null)") << "  "
                         "b = " << b.value_or("(null)") << '\n';
        };
    
        print("Initially:");
        std::swap(a, b);
        print("swap(a, b):");
        a.reset();
        print("\n""a.reset():");
        std::swap(a, b);
        print("swap(a, b):");
    }
```

Saída:
```
    Initially:   a = ██████  b = ▒▒▒▒▒▒
    swap(a, b):  a = ▒▒▒▒▒▒  b = ██████
    
    a.reset():   a = (null)  b = ██████
    swap(a, b):  a = ██████  b = (null)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20 | `swap` não era constexpr enquanto as operações necessárias podem ser constexpr em C++20 | tornada constexpr

### Veja também

[ swap](<#/doc/utility/optional/swap>) | troca o conteúdo
(função membro pública)
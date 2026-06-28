# std::get_pointer_safety

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
std::pointer_safety get_pointer_safety() noexcept;  // (desde C++11)
(removido em C++23)
```

Obtém o modelo de segurança de ponteiro definido pela implementação, que é um valor do tipo [std::pointer_safety](<#/doc/memory/gc/pointer_safety>).

### Parâmetros

(nenhum)

### Valor de retorno

A segurança de ponteiro utilizada por esta implementação.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    int main()
    {
        std::cout << "Pointer safety: ";
        switch (std::get_pointer_safety())
        {
            case std::pointer_safety::strict:
                std::cout << "strict\n";
                break;
            case std::pointer_safety::preferred:
                std::cout << "preferred\n";
                break;
            case std::pointer_safety::relaxed:
                std::cout << "relaxed\n";
                break;
        }
    }
```

Saída possível:
```
    Pointer safety: relaxed
```

### Veja também

[ pointer_safety](<#/doc/memory/gc/pointer_safety>)(C++11)(removido em C++23) | lista modelos de segurança de ponteiro
(enum)
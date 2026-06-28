# swap(std::expected)

```cpp
friend constexpr void swap( expected& lhs, expected& rhs ) noexcept(/*see below*/);  // (desde C++23)
```

  
Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::expected. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.swap(rhs) for válido.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando [std::expected](<#/doc/utility/expected>)<T, E> é uma classe associada dos argumentos.

### Parâmetros

lhs, rhs  |  \-  |  objetos `expected` cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept(lhs.swap(rhs)))

### Exemplo

Execute este código
```
    #include <expected>
    #include <iostream>
    #include <string>
     
    using Ex = std::expected<std::string, int>;
     
    void show(const Ex& ex1, const Ex& ex2)
    {
        for (int i{}; i < 2; ++i)
        {
            std::cout << (i ? "ex2" : "ex1");
            if (const Ex& ex = (i ? ex2 : ex1); ex.has_value())
                std::cout << ".has_value() = " << *ex << '\n';
            else
                std::cout << ".error() = " << ex.error() << '\n';
        }
    }
     
    int main()
    {
        Ex ex1("\N{DOG FACE}");
        Ex ex2{"\N{BONE}"};
        show(ex1, ex2);
        swap(ex1, ex2);
        std::cout << "swap(ex1, ex2);\n";
        show(ex1, ex2);
        std::cout << '\n';
     
        ex2 = std::unexpected(13);
        show(ex1, ex2);
        swap(ex1, ex2);
        std::cout << "swap(ex1, ex2);\n";
        show(ex1, ex2);
        std::cout << '\n';
     
        ex2 = std::unexpected(19937);
        show(ex1, ex2);
        swap(ex1, ex2);
        std::cout << "swap(ex1, ex2);\n";
        show(ex1, ex2);
        std::cout << '\n';
    }
```

Saída: 
```
    ex1.has_value() = 🐶
    ex2.has_value() = 🦴
    swap(ex1, ex2);
    ex1.has_value() = 🦴
    ex2.has_value() = 🐶
     
    ex1.has_value() = 🦴
    ex2.error() = 13
    swap(ex1, ex2);
    ex1.error() = 13
    ex2.has_value() = 🦴
     
    ex1.error() = 13
    ex2.error() = 19937
    swap(ex1, ex2);
    ex1.error() = 19937
    ex2.error() = 13
```

### Veja também

[ swap](<#/doc/utility/expected/swap>) |  troca os conteúdos   
(função membro pública)  
# Comentários

Comentários servem como uma espécie de documentação dentro do código. Quando inseridos em um programa, eles são efetivamente ignorados pelo compilador; eles são destinados unicamente a serem usados como notas pelos humanos que leem o código-fonte. Embora a documentação específica não faça parte do padrão C++, existem várias utilidades que analisam comentários com diferentes formatos de documentação.

### Sintaxe

---
`/*` comment `*/` | (1) |
---|---|---
`//` comment | (2) |

1) Frequentemente conhecidos como comentários "estilo C" ou "de múltiplas linhas".

2) Frequentemente conhecidos como comentários "estilo C++" ou "de linha única".

Todos os comentários são removidos do programa na [fase de tradução 3](<#/doc/language/translation_phases>) substituindo cada comentário por um único caractere de espaço em branco.

### Estilo C

Comentários estilo C são geralmente usados para comentar grandes blocos de texto, no entanto, eles podem ser usados para comentar linhas únicas. Para inserir um comentário estilo C, basta cercar o texto com `/*` e `*/`; isso fará com que o conteúdo do comentário seja ignorado pelo compilador. Embora não faça parte do padrão C++, `/` e `*/` são frequentemente usados para indicar blocos de documentação; isso é legal porque o segundo asterisco é simplesmente tratado como parte do comentário. Comentários estilo C não podem ser aninhados.

### Estilo C++

Comentários estilo C++ são geralmente usados para comentar linhas únicas, no entanto, múltiplos comentários estilo C++ podem ser colocados juntos para formar comentários de múltiplas linhas. Comentários estilo C++ instruem o compilador a ignorar todo o conteúdo entre `//` e uma nova linha.

### Notas

Como os comentários [são removidos](<#/doc/language/translation_phases>) antes da fase do pré-processador, uma macro não pode ser usada para formar um comentário e um comentário estilo C não terminado não se estende de um arquivo `#include`.

Além de comentar, outros mecanismos usados para exclusão de código-fonte são
```cpp
    #if 0
        std::cout << "this will not be executed or even compiled\n";
    #endif
```

e
```cpp
    if (false)
    {
        std::cout << "this will not be executed\n";
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    /* C-style comments can contain
    multiple lines */
    /* or just one */
     
    /**************
     *  you can insert any *, but
     *  you can't make comments nested
     */
     
    // C++-style comments can comment one line
     
    // or, they can
    // be strung together
     
    int main()
    {
        // comments are removed before preprocessing,
        // so ABC is "1", not "1//2134", and "1 hello world"
        // will be printed
    #define ABC 1//2134
        std::cout << ABC << " hello world\n";
     
        // The below code won't be run
        // return 1;
     
        // The below code will be run
        return 0;
    }
```

Saída:
```
    1 hello world
```

### Veja também

[documentação C](<#/>) para comentário
---
# Cabeçalho da biblioteca padrão &lt;ciso646&gt; (até C++20), &lt;iso646.h&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<iso646.h>`](<#/>).

Cabeçalho de compatibilidade, em C define [representações alternativas de operadores](<#/doc/language/operator_alternative>) que são palavras-chave em C++.

Isso significa que, em uma implementação conforme, incluir este cabeçalho não tem efeito.

### Notas

Em compiladores antigos ou não conformes, o uso das [representações alternativas de operadores](<#/doc/language/operator_alternative>) ainda pode exigir a inclusão deste cabeçalho.

`<ciso646>` é removido em C++20. O `<iso646.h>` correspondente ainda está disponível em C++20.

Antes de C++20, a inclusão de `<ciso646>` era por vezes usada como uma técnica para obter definições de macros de versão de biblioteca específicas da implementação sem causar outros efeitos. A partir de C++20, o cabeçalho [`<version>`](<#/doc/header/version>) foi adicionado para este propósito.

Execute este código
```cpp
    #include <ciso646>
    #ifdef _LIBCPP_VERSION
    #error Using LLVM libc++
    #elif __GLIBCXX__ // Note: only version 6.1 or newer define this in ciso646
    #error Using GNU libstdc++
    #elif _CPPLIB_VER // Note: used by Visual Studio
    #error Using Microsoft STL
    #else
    #error Using an unknown standard library
    #endif
```

Saída possível:
```
    main.cpp:7:2: error: Using Microsoft STL
    #error Using Microsoft STL
     ^
    1 error generated.
```
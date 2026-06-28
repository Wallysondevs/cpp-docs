# Pré-processador

O pré-processador é executado na [fase de tradução 4](<#/doc/language/translation_phases>), antes da compilação. O resultado do pré-processamento é um único arquivo que é então passado para o compilador real.

### Diretivas

As diretivas de pré-processamento controlam o comportamento do pré-processador. Cada diretiva ocupa uma linha e tem o seguinte formato:

*   o caractere #.
*   uma sequência de:

    *   um nome de diretiva definido pelo padrão (listado [abaixo](<#/doc/preprocessor>)) seguido pelos argumentos correspondentes, ou
    *   um ou mais [tokens de pré-processamento](<#/doc/language/translation_phases>) onde o token inicial não é um nome de diretiva definido pelo padrão; neste caso, a diretiva é condicionalmente suportada com semântica definida pela implementação (por exemplo, uma extensão não padrão comum é a diretiva #warning que emite uma mensagem definida pelo usuário durante a compilação)(até C++23), ou
    *   nada; neste caso, a diretiva não tem efeito.

*   uma quebra de linha.

As [diretivas de módulo e importação](<#/doc/language/modules>) também são diretivas de pré-processamento. | (desde C++20)

Diretivas de pré-processamento não devem vir de expansão de macro.
```cpp
    #define EMPTY
    EMPTY   #   include <file.h> // not a preprocessing directive
```

### Capacidades

O pré-processador possui as seguintes capacidades de tradução de arquivo fonte:

*   **[compilar condicionalmente](<#/doc/preprocessor/conditional>)** partes do arquivo fonte (controlado pelas diretivas #if, #ifdef, #ifndef, #else, #elif, #elifdef, #elifndef(desde C++23), e #endif).
*   **[substituir](<#/doc/preprocessor/replace>)** macros de texto, possivelmente concatenando ou citando identificadores (controlado pelas diretivas #define e #undef, e pelos operadores # e ##).
*   **[incluir](<#/doc/preprocessor/include>)** outros arquivos (controlado pela diretiva #include e verificado com `__has_include`(desde C++17)).
*   causar um **[erro](<#/doc/preprocessor/error>)** ou **[aviso](<#/doc/preprocessor/error>)**(desde C++23) (controlado pelas diretivas #error ou #warning, respectivamente(desde C++23)).

Os seguintes aspectos do pré-processador podem ser controlados:

*   comportamento **[definido pela implementação](<#/doc/preprocessor/impl>)** (controlado pela diretiva #pragma e pelo operador `_Pragma`(desde C++11)). Além disso, alguns compiladores suportam (em graus variados) o operador `__pragma` como uma extensão _não padrão_.
*   **[nome do arquivo e informações de linha](<#/doc/preprocessor/line>)** disponíveis para o pré-processador (controlado pela diretiva #line).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2001](<https://cplusplus.github.io/CWG/issues/2001.html>) | C++98 | o comportamento do uso de diretivas não definidas pelo padrão não era claro | tornou-se condicionalmente suportado

### Ver também

[documentação C++](<#/doc/preprocessor/replace>) para Símbolos de Macro Predefinidos
[documentação C++](<#/>) para Índice de Símbolos de Macro
[documentação C](<#/>) para pré-processador
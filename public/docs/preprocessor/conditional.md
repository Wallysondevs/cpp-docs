# Inclusão condicional

O pré-processador suporta a compilação condicional de partes de um arquivo fonte. Este comportamento é controlado pelas diretivas `#if`, `#else`, `#elif`, `#ifdef`, `#ifndef`, `#elifdef`, `#elifndef`(desde C++23), e `#endif`.

### Sintaxe

---
`#if` expression
`#ifdef` identifier
`#ifndef` identifier
`#elif` expression
`#elifdef` identifier | | (desde C++23)
---|---|---
`#elifndef` identifier | | (desde C++23)
`#else`
`#endif`

### Explicação

O bloco de pré-processamento condicional começa com uma diretiva `#if`, `#ifdef` ou `#ifndef`, então opcionalmente inclui qualquer número de diretivas `#elif`, `#elifdef`, ou `#elifndef`(desde C++23), então opcionalmente inclui no máximo uma diretiva `#else` e é terminado com a diretiva `#endif`. Quaisquer blocos de pré-processamento condicional internos são processados separadamente.

Cada uma das diretivas `#if`, `#ifdef`, `#ifndef`, `#elif`, `#elifdef`, `#elifndef`(desde C++23), e `#else` controla o bloco de código até a primeira diretiva `#elif`, `#elifdef`, `#elifndef`(desde C++23), `#else`, `#endif` que não pertença a nenhum bloco de pré-processamento condicional interno.

As diretivas `#if`, `#ifdef` e `#ifndef` testam a condição especificada (veja abaixo) e, se ela for avaliada como verdadeira, compilam o bloco de código controlado. Nesse caso, as diretivas subsequentes `#else`, `#elifdef`, `#elifndef`,(desde C++23) e `#elif` são ignoradas. Caso contrário, se a condição especificada for avaliada como falsa, o bloco de código controlado é ignorado e a diretiva subsequente `#else`, `#elifdef`, `#elifndef`,(desde C++23) ou `#elif` (se houver) é processada. Se a diretiva subsequente for `#else`, o bloco de código controlado pela diretiva `#else` é compilado incondicionalmente. Caso contrário, a diretiva `#elif`, `#elifdef`, ou `#elifndef`(desde C++23) age como se fosse uma diretiva `#if`: verifica a condição, compila ou ignora o bloco de código controlado com base no resultado e, neste último caso, processa as diretivas subsequentes `#elif`, `#elifdef`, `#elifndef`,(desde C++23) e `#else`. O bloco de pré-processamento condicional é terminado pela diretiva `#endif`.

### Avaliação da condição

#### #if, #elif

A expressão pode conter:

  * operadores unários na forma `defined` identifier ou `defined (` identifier`)`. O resultado é 1 se o identificador foi [definido como um nome de macro](<#/doc/preprocessor/replace>), caso contrário o resultado é ​0​. `__has_­include` e `__has_cpp_attribute`(desde C++20) são tratados como se fossem os nomes de macros definidas neste contexto.(desde C++17)
  * (desde C++17) expressões [`__has_include`](<#/doc/preprocessor/include>), que detectam se um header ou arquivo fonte existe.
  * (desde C++20) expressões [`__has_cpp_attribute`](<#/doc/feature_test>), que detectam se um dado token de atributo é suportado e sua versão suportada.

Após toda a expansão de macro e avaliação das expressões `defined`, `__has_include`(desde C++17), e `__has_cpp_attribute`(desde C++20), qualquer identificador que não seja um [literal booleano](<#/doc/language/bool_literal>) é substituído pelo número ​0​ (isso inclui identificadores que são lexicamente palavras-chave, mas não tokens alternativos como and).

Então a expressão é avaliada como uma [expressão constante integral](<#/doc/language/constant_expression>).

Se a expressão for avaliada para um valor diferente de zero, o bloco de código controlado é incluído e, caso contrário, é ignorado.

Nota: Até a resolução do [problema CWG 1955](<https://cplusplus.github.io/CWG/issues/1955.html>), `#if _cond1_` ... `#elif _cond2_` é diferente de `#if _cond1_` ... `#else` seguido por `#if _cond2_` porque se `_cond1_` for verdadeiro, o segundo `#if` é ignorado e `_cond2_` não precisa ser bem-formado, enquanto o `_cond2_` de `#elif` deve ser uma expressão válida. A partir do CWG 1955, `#elif` que leva ao bloco de código ignorado também é ignorado.

#### Diretivas combinadas

Verifica se o identificador foi [definido como um nome de macro](<#/doc/preprocessor/replace>).

`#ifdef` identifier é essencialmente equivalente a `#if defined` identifier.

`#ifndef` identifier é essencialmente equivalente a `#if !defined` identifier.

`#elifdef` identifier é essencialmente equivalente a `#elif defined` identifier. `#elifndef` identifier é essencialmente equivalente a `#elif !defined` identifier. | (desde C++23)

### Notas

Embora as diretivas `#elifdef` e `#elifndef` visem o C++23, as implementações são encorajadas a fazer o backport delas para modos de linguagem mais antigos como extensões conformes.

### Exemplo

Execute este código
```cpp
    #define ABCD 2
    #include <iostream>
    
    int main()
    {
    
    #ifdef ABCD
        std::cout << "1: yes\n";
    #else
        std::cout << "1: no\n";
    #endif
    
    #ifndef ABCD
        std::cout << "2: no1\n";
    #elif ABCD == 2
        std::cout << "2: yes\n";
    #else
        std::cout << "2: no2\n";
    #endif
    
    #if !defined(DCBA) && (ABCD < 2*4-3)
        std::cout << "3: yes\n";
    #endif
    
    
    // Note que se um compilador não suportar as diretivas #elifdef/#elifndef do C++23
    // então o bloco "inesperado" (veja abaixo) será selecionado.
    #ifdef CPU
        std::cout << "4: no1\n";
    #elifdef GPU
        std::cout << "4: no2\n";
    #elifndef RAM
        std::cout << "4: yes\n"; // bloco esperado
    #else
        std::cout << "4: no!\n"; // seleciona inesperadamente este bloco ignorando
                                 // diretivas desconhecidas e "pulando" diretamente
                                 // de "#ifdef CPU" para este bloco "#else"
    #endif
    
    // Para corrigir o problema acima, podemos definir condicionalmente a
    // macro ELIFDEF_SUPPORTED apenas se as diretivas C++23
    // #elifdef/#elifndef forem suportadas.
    #if 0
    #elifndef UNDEFINED_MACRO
    #define ELIFDEF_SUPPORTED
    #else
    #endif
    
    #ifdef ELIFDEF_SUPPORTED
        #ifdef CPU
            std::cout << "4: no1\n";
        #elifdef GPU
            std::cout << "4: no2\n";
        #elifndef RAM
            std::cout << "4: yes\n"; // bloco esperado
        #else
            std::cout << "4: no3\n";
        #endif
    #else // quando #elifdef não é suportado, use o antigo e verboso `#elif defined`
        #ifdef CPU
            std::cout << "4: no1\n";
        #elif defined GPU
            std::cout << "4: no2\n";
        #elif !defined RAM
            std::cout << "4: yes\n"; // bloco esperado
        #else
            std::cout << "4: no3\n";
        #endif
    #endif
    }
```

Saída possível:
```
    1: yes
    2: yes
    3: yes
    4: no!
    4: yes
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 1955](<https://cplusplus.github.io/CWG/issues/1955.html>) | C++98 | a expressão do #elif falho era exigida como válida | #elif falho é ignorado

### Veja também

[documentação C](<#/>) para Inclusão condicional
---
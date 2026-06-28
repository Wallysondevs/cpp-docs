# especificador inline

O especificador `inline`, quando usado em um [decl-specifier-seq](<#/doc/language/declarations>) de uma função, declara a função como uma _função inline_.

Uma função definida inteiramente dentro de uma [definição de classe/struct/union](<#/doc/language/classes>), seja ela uma função membro ou uma função amiga não-membro, é implicitamente uma função inline, a menos que esteja anexada a um [módulo nomeado](<#/doc/language/modules>) (desde C++20).

```cpp
Uma função declarada `constexpr` ou `consteval` (desde C++20) em sua primeira declaração é implicitamente uma função inline. Uma função deletada é implicitamente uma função inline: sua definição (deletada) pode aparecer em mais de uma unidade de tradução.  // (desde C++11)
O especificador `inline`, quando usado em um decl-specifier-seq de uma variável com duração de armazenamento estática (membro estático de classe ou variável de escopo de namespace), declara a variável como uma _variável inline_. Um membro de dados estático declarado `constexpr` em sua primeira declaração é implicitamente uma variável inline.  // (desde C++17)
```

### Explicação

Uma função inline ou variável inline (desde C++17) possui as seguintes propriedades:

*   A definição de uma função inline ou variável inline (desde C++17) deve ser alcançável na unidade de tradução onde é acessada (não necessariamente antes do ponto de acesso).
*   Uma função inline ou variável inline (desde C++17) com [ligação externa](<#/doc/language/storage_duration>) (por exemplo, não declarada `static`) possui as seguintes propriedades adicionais:
    *   Pode haver [mais de uma definição](<#/doc/language/definition>) de uma função inline ou variável inline (desde C++17) no programa, desde que cada definição apareça em uma unidade de tradução diferente e (para funções e variáveis inline não-estáticas (desde C++17)) todas as definições sejam idênticas. Por exemplo, uma função inline ou uma variável inline (desde C++17) pode ser definida em um arquivo de cabeçalho que é incluído em múltiplos arquivos-fonte.
    *   Deve ser declarada `inline` em cada unidade de tradução.
    *   Possui o mesmo endereço em cada unidade de tradução.

Em uma função inline,

*   Objetos estáticos locais da função em todas as definições de função são compartilhados entre todas as unidades de tradução (todos eles se referem ao mesmo objeto definido em uma unidade de tradução).
*   Tipos definidos em todas as definições de função também são os mesmos em todas as unidades de tradução.

Variáveis `const` inline no escopo de namespace possuem [ligação externa](<#/doc/language/storage_duration>) por padrão (ao contrário das variáveis `const`-qualificadas não-inline e não-voláteis). | (desde C++17)

A intenção original da palavra-chave `inline` era servir como um indicador para o otimizador de que a [substituição inline de uma função](<https://en.wikipedia.org/wiki/inline_expansion> "enwiki:inline expansion") é preferível à chamada de função, ou seja, em vez de executar a instrução de CPU de chamada de função para transferir o controle para o corpo da função, uma cópia do corpo da função é executada sem gerar a chamada. Isso evita a sobrecarga criada pela chamada de função (passagem de argumentos e recuperação do resultado), mas pode resultar em um executável maior, pois o código da função precisa ser repetido várias vezes.

Como a substituição inline é inobservável na semântica padrão, os compiladores são livres para usar a substituição inline para qualquer função que não esteja marcada como `inline`, e são livres para gerar chamadas de função para qualquer função marcada como `inline`. Essas escolhas de otimização não alteram as regras relativas a múltiplas definições e estáticos compartilhados listadas acima.

Como o significado da palavra-chave `inline` para funções passou a significar "múltiplas definições são permitidas" em vez de "inlining é preferido" desde C++98, esse significado foi estendido para variáveis. | (desde C++17)

### Notas

Se uma função inline ou variável inline (desde C++17) com ligação externa for definida de forma diferente em diferentes unidades de tradução, o programa é malformado, sem diagnóstico exigido.

O especificador `inline` não pode ser usado com uma declaração de função ou variável (desde C++17) em escopo de bloco (dentro de outra função).

O especificador `inline` não pode redeclarar uma função ou variável (desde C++17) que já foi definida na unidade de tradução como não-inline.

As funções membro geradas implicitamente e qualquer função membro declarada como `defaulted` em sua primeira declaração são inline, assim como qualquer outra função definida dentro de uma definição de classe.

Se uma função inline for declarada em diferentes unidades de tradução, os conjuntos acumulados de [argumentos padrão](<#/doc/language/default_arguments>) devem ser os mesmos no final de cada unidade de tradução.

Em C, funções inline não precisam ser declaradas `inline` em todas as unidades de tradução (no máximo uma pode ser não-inline ou `extern inline`), as definições de função não precisam ser idênticas (mas o comportamento do programa é não especificado se depender de qual é chamada), e os estáticos locais da função são distintos entre diferentes definições da mesma função.

Consulte [membros de dados estáticos](<#/doc/language/static>) para regras adicionais sobre membros estáticos inline. Variáveis inline eliminam o principal obstáculo para empacotar código C++ como bibliotecas somente de cabeçalho. | (desde C++17)
---|---|---|---
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_inline_variables`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | Variáveis inline

### Palavras-chave

[`inline`](<#/doc/keyword/inline>)

### Exemplo

Cabeçalho "example.h":
```
    #ifndef EXAMPLE_H
    #define EXAMPLE_H
     
    #include <atomic>
     
    // function included in multiple source files must be inline
    inline int sum(int a, int b)
    {
        return a + b;
    }
     
    // variable with external linkage included in multiple source files must be inline
    inline std::atomic<int> counter(0);
     
    #endif
```

Arquivo-fonte #1:
```
    #include "example.h"
     
    int a()
    {
        ++counter;
        return sum(1, 2);
    }
```

Arquivo-fonte #2:
```
    #include "example.h"
     
    int b()
    {
        ++counter;
        return sum(3, 4);
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 281](<https://cplusplus.github.io/CWG/issues/281.html>) | C++98 | uma declaração de função amiga poderia usar o especificador inline
mesmo que a função amiga não fosse uma função inline | proibir tais usos
[CWG 317](<https://cplusplus.github.io/CWG/issues/317.html>) | C++98 | uma função poderia ser declarada inline mesmo que tivesse uma definição não-inline
na mesma unidade de tradução antes da declaração | o programa é mal-
formado neste caso
[CWG 765](<https://cplusplus.github.io/CWG/issues/765.html>) | C++98 | um tipo definido em uma função inline poderia
ser diferente em diferentes unidades de tradução | tais tipos são os mesmos
em todas as unidades de tradução
[CWG 1823](<https://cplusplus.github.io/CWG/issues/1823.html>) | C++98 | literais de string em todas as definições de uma função inline
eram compartilhados entre todas as unidades de tradução | o requisito é removido devido à
consistência e implementações
[CWG 2531](<https://cplusplus.github.io/CWG/issues/2531.html>) | C++17 | um membro de dados estático poderia ser implicitamente inline mesmo que
não fosse declarado constexpr em sua primeira declaração | não é implicitamente
inline neste caso

### Ver também

[Documentação C](<#/>) para inline
---
# Módulos (desde C++20)

A maioria dos projetos C++ usa múltiplas unidades de tradução e, portanto, precisam compartilhar [declarações](<#/doc/language/declarations>) e [definições](<#/doc/language/definition>) entre essas unidades. O uso de [headers](<#/doc/standard_library>) é proeminente para este propósito, um exemplo sendo a [biblioteca padrão](<#/doc/standard_library>) cujas declarações podem ser fornecidas [incluindo o header correspondente](<#/doc/standard_library>).

Módulos são um recurso da linguagem para compartilhar declarações e definições entre unidades de tradução. Eles são uma alternativa para alguns casos de uso de headers.

Módulos são ortogonais a [namespaces](<#/doc/language/namespace>).
```cpp
    // helloworld.cpp
    export module helloworld; // module declaration
     
    import <iostream>;        // import declaration
     
    export void hello()       // export declaration
    {
        std::cout << "Hello world!\n";
    }
```
```cpp
    // main.cpp
    import helloworld; // import declaration
     
    int main()
    {
        hello();
    }
```

### Sintaxe

---
`export`(opcional) `module` module-name module-partition ﻿(opcional) attr ﻿(opcional) `;` | (1) |
---|---|---
`export` declaration | (2) |
`export {` declaration-seq ﻿(opcional) `}` | (3) |
`export`(opcional) `import` module-name attr ﻿(opcional) `;` | (4) |
`export`(opcional) `import` module-partition attr ﻿(opcional) `;` | (5) |
`export`(opcional) `import` header-name attr ﻿(opcional) `;` | (6) |
`module;` | (7) |
`module : private;` | (8) |

1) Declaração de módulo. Declara que a unidade de tradução atual é uma _unidade de módulo_.

2,3) Declaração de exportação. Exporta todas as declarações de escopo de namespace em `declaration` ou `declaration-seq`.

4,5,6) Declaração de importação. Importa uma unidade de módulo/partição de módulo/unidade de header.

7) Inicia um [fragmento de módulo global](<#/doc/language/modules>).

8) Inicia um [fragmento de módulo privado](<#/doc/language/modules>).

### Declarações de módulo

Uma unidade de tradução pode ter uma declaração de módulo, caso em que é considerada uma _unidade de módulo_. A _declaração de módulo_, se fornecida, deve ser a primeira declaração da unidade de tradução (exceto o _fragmento de módulo global_, que será abordado mais adiante). Cada unidade de módulo é associada a um _nome de módulo_ (e opcionalmente uma partição), fornecido na declaração de módulo.

---
`export`(opcional) `module` module-name module-partition ﻿(opcional) attr ﻿(opcional) `;`

O nome do módulo consiste em um ou mais identificadores separados por pontos (por exemplo: `mymodule`, `mymodule.mysubmodule`, `mymodule2`...). Os pontos não têm significado intrínseco, no entanto, são usados informalmente para representar hierarquia.

Se qualquer identificador no nome do módulo ou partição do módulo for definido como uma [macro tipo objeto](<#/doc/preprocessor/replace>), o programa é malformado.

Um _módulo nomeado_ é a coleção de unidades de módulo com o mesmo nome de módulo.

Unidades de módulo cuja declaração possui a palavra-chave `export` são denominadas _unidades de interface de módulo_; todas as outras unidades de módulo são denominadas _unidades de implementação de módulo_.

Para cada módulo nomeado, deve haver exatamente uma unidade de interface de módulo que não especifica partição de módulo; esta unidade de módulo é denominada _unidade de interface de módulo primária_. Seu conteúdo exportado estará disponível ao importar o módulo nomeado correspondente.
```cpp
    // (cada linha representa uma unidade de tradução separada)
     
    export module A;   // declara a unidade de interface de módulo primária para o módulo nomeado 'A'
    module A;          // declara uma unidade de implementação de módulo para o módulo nomeado 'A'
    module A;          // declara outra unidade de implementação de módulo para o módulo nomeado 'A'
    export module A.B; // declara a unidade de interface de módulo primária para o módulo nomeado 'A.B'
    module A.B;        // declara uma unidade de implementação de módulo para o módulo nomeado 'A.B'
```

### Exportando declarações e definições

Unidades de interface de módulo podem exportar declarações (incluindo definições), que podem ser importadas por outras unidades de tradução. Para exportar uma declaração, prefixe-a com a palavra-chave `export`, ou coloque-a dentro de um bloco `export`.

---
`export` declaration
`export {` declaration-seq ﻿(opcional) `}`
```cpp
    export module A; // declara a unidade de interface de módulo primária para o módulo nomeado 'A'
     
    // hello() será visível para unidades de tradução que importam 'A'
    export char const* hello() { return "hello"; }
     
    // world() NÃO será visível.
    char const* world() { return "world"; }
     
    // Ambas one() e zero() serão visíveis.
    export
    {
        int one()  { return 1; }
        int zero() { return 0; }
    }
     
    // Exportar namespaces também funciona: hi::english() e hi::french() serão visíveis.
    export namespace hi
    {
        char const* english() { return "Hi!"; }
        char const* french()  { return "Salut!"; }
    }
```

### Importando módulos e unidades de header

Módulos são importados através de uma _declaração de importação_:

---
`export`(opcional) `import` module-name attr ﻿(opcional) `;`

Todas as declarações e definições exportadas nas unidades de interface de módulo do módulo nomeado fornecido estarão disponíveis na unidade de tradução que usa a declaração de importação.

Declarações de importação podem ser exportadas em uma unidade de interface de módulo. Ou seja, se o módulo `B` exporta-importa `A`, então importar `B` também tornará visíveis todas as exportações de `A`.

Em unidades de módulo, todas as declarações de importação (incluindo export-imports) devem ser agrupadas após a declaração de módulo e antes de todas as outras declarações.
```cpp
    /////// A.cpp (unidade de interface de módulo primária de 'A')
    export module A;
     
    export char const* hello() { return "hello"; }
     
    /////// B.cpp (unidade de interface de módulo primária de 'B')
    export module B;
     
    export import A;
     
    export char const* world() { return "world"; }
     
    /////// main.cpp (não é uma unidade de módulo)
    #include <iostream>
    import B;
     
    int main()
    {
        std::cout << hello() << ' ' << world() << '\n';
    }
```

[` #include`](<#/doc/preprocessor/include>) não deve ser usado em uma unidade de módulo (fora do _fragmento de módulo global_), porque todas as declarações e definições incluídas seriam consideradas parte do módulo. Em vez disso, headers também podem ser importados como _unidades de header_ com uma _declaração de importação_:

---
`export`(opcional) `import` header-name attr ﻿(opcional) `;`

Uma unidade de header é uma unidade de tradução separada sintetizada a partir de um header. Importar uma unidade de header tornará acessíveis todas as suas definições e declarações. Macros de pré-processador também são acessíveis (porque as declarações de importação são reconhecidas pelo pré-processador).

No entanto, ao contrário do `#include`, macros de pré-processamento já definidas no ponto da declaração de importação não afetarão o processamento do header. Isso pode ser inconveniente em alguns casos (alguns headers usam macros de pré-processamento como forma de configuração), caso em que o uso do _fragmento de módulo global_ é necessário.
```cpp
    /////// A.cpp (unidade de interface de módulo primária de 'A')
    export module A;
     
    import <iostream>;
    export import <string_view>;
     
    export void print(std::string_view message)
    {
        std::cout << message << std::endl;
    }
     
    /////// main.cpp (não é uma unidade de módulo)
    import A;
     
    int main()
    {
        std::string_view message = "Hello, world!";
        print(message);
    }
```

### Fragmento de módulo global

Unidades de módulo podem ser prefixadas por um _fragmento de módulo global_, que pode ser usado para incluir headers quando a importação dos headers não é possível (notavelmente quando o header usa macros de pré-processamento como configuração).

---
`module;` preprocessing-directives ﻿(opcional) module-declaration

Se uma unidade de módulo tiver um fragmento de módulo global, então sua primeira declaração deve ser `module;`. Então, apenas [diretivas de pré-processamento](<#/doc/preprocessor>) podem aparecer no fragmento de módulo global. Então, uma declaração de módulo padrão marca o fim do fragmento de módulo global e o início do conteúdo do módulo.
```cpp
    /////// A.cpp (unidade de interface de módulo primária de 'A')
    module;
     
    // Definir _POSIX_C_SOURCE adiciona funções a headers padrão,
    // de acordo com o padrão POSIX.
    #define _POSIX_C_SOURCE 200809L
    #include <stdlib.h>
     
    export module A;
     
    import <ctime>;
     
    // Apenas para demonstração (má fonte de aleatoriedade).
    // Use C++ <random> em vez disso.
    export double weak_random()
    {
        std::timespec ts;
        std::timespec_get(&ts, TIME_UTC); // de <ctime>
     
        // Fornecido em <stdlib.h> de acordo com o padrão POSIX.
        srand48(ts.tv_nsec);
     
        // drand48() retorna um número aleatório entre 0 e 1.
        return drand48();
    }
     
    /////// main.cpp (não é uma unidade de módulo)
    import <iostream>;
    import A;
     
    int main()
    {
        std::cout << "Random value between 0 and 1: " << weak_random() << '\n';
    }
```

### Fragmento de módulo privado

A unidade de interface de módulo primária pode ser sufixada por um _fragmento de módulo privado_, que permite que um módulo seja representado como uma única unidade de tradução sem tornar todo o conteúdo do módulo acessível aos importadores.

---
`module : private;` declaration-seq ﻿(opcional)

O _fragmento de módulo privado_ encerra a porção da unidade de interface de módulo que pode afetar o comportamento de outras unidades de tradução. Se uma unidade de módulo contiver um _fragmento de módulo privado_, ela será a única unidade de módulo de seu módulo.
```cpp
    export module foo;
     
    export int f();
     
    module : private; // encerra a porção da unidade de interface de módulo que
                      // pode afetar o comportamento de outras unidades de tradução
                      // inicia um fragmento de módulo privado
     
    int f()           // definição não acessível a partir de importadores de foo
    {
        return 42;
    }
```

### Partições de módulo

Um módulo pode ter _unidades de partição de módulo_. São unidades de módulo cujas declarações de módulo incluem uma partição de módulo, que começa com dois pontos `:` e é colocada após o nome do módulo.
```cpp
    export module A:B; // Declara uma unidade de interface de módulo para o módulo 'A', partição ':B'.
```

Uma partição de módulo representa exatamente uma unidade de módulo (duas unidades de módulo não podem designar a mesma partição de módulo). Elas são visíveis apenas de dentro do módulo nomeado (unidades de tradução fora do módulo nomeado não podem importar uma partição de módulo diretamente).

Uma partição de módulo pode ser importada por unidades de módulo do mesmo módulo nomeado.

---
`export`(opcional) `import` module-partition attr ﻿(opcional) `;`
```cpp
    /////// A-B.cpp
    export module A:B;
    ...
     
    /////// A-C.cpp
    module A:C;
    ...
     
    /////// A.cpp
    export module A;
     
    import :C;
    export import :B;
     
    ...
```

Todas as definições e declarações em uma partição de módulo são visíveis pela unidade de módulo importadora, sejam elas exportadas ou não.

Partições de módulo podem ser unidades de interface de módulo (quando suas declarações de módulo possuem `export`). Elas devem ser export-importadas pela unidade de interface de módulo primária, e suas declarações exportadas serão visíveis quando o módulo for importado.

---
`export`(opcional) `import` module-partition attr ﻿(opcional) `;`
```cpp
    ///////  A.cpp
    export module A;     // unidade de interface de módulo primária
     
    export import :B;    // Hello() é visível ao importar 'A'.
    import :C;           // WorldImpl() agora é visível apenas para 'A.cpp'.
    // export import :C; // ERRO: Não é possível exportar uma unidade de implementação de módulo.
     
    // World() é visível por qualquer unidade de tradução que importa 'A'.
    export char const* World()
    {
        return WorldImpl();
    }
```
```cpp
    /////// A-B.cpp
    export module A:B; // unidade de interface de módulo de partição
     
    // Hello() é visível por qualquer unidade de tradução que importa 'A'.
    export char const* Hello() { return "Hello"; }
```
```cpp
    /////// A-C.cpp
    module A:C; // unidade de implementação de módulo de partição
     
    // WorldImpl() é visível por qualquer unidade de módulo de 'A' que importa ':C'.
    char const* WorldImpl() { return "World"; }
```
```cpp
    /////// main.cpp
    import A;
    import <iostream>;
     
    int main()
    {
        std::cout << Hello() << ' ' << World() << '\n';
        // WorldImpl(); // ERRO: WorldImpl() não é visível.
    }
```

### Propriedade do módulo

Em geral, se uma declaração aparece após a declaração de módulo em uma unidade de módulo, ela está _anexada a_ esse módulo.

Se uma declaração de uma entidade está anexada a um módulo nomeado, essa entidade só pode ser definida nesse módulo. Todas as declarações de tal entidade devem estar anexadas ao mesmo módulo.

Se uma declaração está anexada a um módulo nomeado e não é exportada, o nome declarado possui [ligação de módulo](<#/doc/language/storage_duration>).
```cpp
    export module lib_A;
     
    int f() { return 0; } // f tem ligação de módulo
    export int x = f();   // x é igual a 0
```
```cpp
    export module lib_B;
     
    int f() { return 1; } // OK, f em lib_A e f em lib_B referem-se a entidades diferentes
    export int y = f(); // y é igual a 1
```

Se [duas declarações de uma entidade](<#/doc/language/conflicting_declarations>) estiverem anexadas a módulos diferentes, o programa é malformado; nenhum diagnóstico é exigido se nenhuma delas for alcançável a partir da outra.
```cpp
    /////// decls.h
    int f(); // #1, anexado ao módulo global
    int g(); // #2, anexado ao módulo global
```
```cpp
    /////// Interface do módulo M
    module;
    #include "decls.h"
    export module M;
    export using ::f; // OK, não declara uma entidade, exporta #1
    int g();          // Erro: corresponde a #2, mas anexado a M
    export int h();   // #3
    export int k();   // #4
```
```cpp
    /////// Outra unidade de tradução
    import M;
    static int h();   // Erro: corresponde a #3
    int k();          // Erro: corresponde a #4
```

As seguintes declarações não estão anexadas a nenhum módulo nomeado (e, portanto, a entidade declarada pode ser definida fora do módulo):

*   definições de [namespace](<#/doc/language/namespace>) com ligação externa;
*   declarações dentro de uma especificação de [ligação de linguagem](<#/doc/language/language_linkage>).

```cpp
    export module lib_A;
     
    namespace ns // ns não está anexado a lib_A.
    {
        export extern "C++" int f(); // f não está anexado a lib_A.
               extern "C++" int g(); // g não está anexado a lib_A.
        export              int h(); // h está anexado a lib_A.
    }
    // ns::h deve ser definido em lib_A, mas ns::f e ns::g podem ser definidos em outro lugar (por exemplo,
    // em um arquivo fonte tradicional).
```

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_modules`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Módulos — suporte à linguagem principal
[`__cpp_lib_modules`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [Módulos da biblioteca padrão](<#/doc/standard_library>) std e std.compat

### Palavras-chave

[`private`](<#/doc/keyword/private>), [`module`](<#/doc/identifier_with_special_meaning/module>), [`import`](<#/doc/identifier_with_special_meaning/import>), [`export`](<#/doc/keyword/export>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 2732](<https://cplusplus.github.io/CWG/issues/2732.html>) | C++20 | não estava claro se headers importáveis podem reagir ao estado do pré-processador a partir do ponto de importação | nenhuma reação
[P3034R1](<https://wg21.link/P3034R1>) | C++20 | nomes de módulos e partições de módulos poderiam conter identificadores definidos como macros tipo objeto | proibido
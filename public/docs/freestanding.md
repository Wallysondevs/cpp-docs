# Implementações freestanding e hosted

Existem dois tipos de implementações definidos pelo padrão C++: implementações _**hosted**_ e _**freestanding**_. Para implementações _hosted_, o conjunto de headers da standard library exigido pelo padrão C++ é muito maior do que para as _freestanding_. Em uma implementação _freestanding_, a execução pode ocorrer sem um sistema operacional.

O tipo da implementação é definido pela implementação. A macro `__STDC_HOSTED__` é predefinida para `1` para implementações hosted e `0` para implementações freestanding. (desde C++11)

### Requisitos para [execuções multi-threaded e data races](<#/doc/language/memory_model>)

| _freestanding_ | _hosted_ |
|---|---|
| Em uma implementação _freestanding_, é definido pela implementação se um programa pode ter mais de um [thread de execução](<#/doc/atomic>). | Em uma implementação _hosted_, um programa C++ pode ter mais de um [thread](<#/doc/atomic>) sendo executado concorrentemente. |
(desde C++11)

### Requisitos para a função [`main`](<#/doc/language/main_function>)

| _freestanding_ | _hosted_ |
|---|---|
| Em uma implementação _freestanding_, é definido pela implementação se um programa é obrigado a definir uma função [`main`](<#/doc/language/main_function>). A inicialização e a terminação são definidas pela implementação; a inicialização contém a execução de [construtores](<#/doc/language/initializer_list>) para objetos de [escopo de namespace](<#/doc/language/scope>) com static storage duration; a terminação contém a execução de [destrutores](<#/doc/language/destructor>) para objetos com static [storage duration](<#/doc/language/storage_duration>). | Em uma implementação _hosted_, um programa deve conter uma função global chamada [`main`](<#/doc/language/main_function>). A execução de um programa inicia um [thread de execução](<#/doc/atomic>) principal no qual a função `main` é invocada, e no qual variáveis com static [storage duration](<#/doc/language/storage_duration>) podem ser inicializadas e destruídas. |

### Requisitos para [headers da standard library](<#/doc/headers>)

Uma implementação _freestanding_ possui um conjunto de headers definido pela implementação. Este conjunto inclui pelo menos os headers na tabela a seguir.

Para headers parcialmente freestanding, implementações freestanding precisam fornecer apenas parte das entidades na sinopse correspondente:

*   Se uma entidade é comentada // freestanding, é garantido que ela será fornecida.

*   Se uma entidade (função ou function template) é comentada // freestanding-deleted, é garantido que ela será fornecida ou deletada.

| (desde C++26) |
|---|
| Headers exigidos para uma implementação freestanding | Biblioteca | Componente | Headers | Freestanding |
| [Suporte à linguagem](<#/doc/utility>) | Definições comuns | [`<cstddef>`](<#/doc/header/cstddef>) | All |
| Standard library C | [`<cstdlib>`](<#/doc/header/cstdlib>) | Partial |
| Propriedades da implementação | [`<cfloat>`](<#/doc/header/cfloat>)<br/>[`<climits>`](<#/doc/header/climits>) (desde C++11)<br/>[`<limits>`](<#/doc/header/limits>)<br/>[`<version>`](<#/doc/header/version>) (desde C++20) | All |
| Tipos inteiros | [`<cstdint>`](<#/doc/header/cstdint>) (desde C++11) | All |
| Gerenciamento de memória dinâmica | [`<new>`](<#/doc/header/new>) | All |
| Identificação de tipo | [`<typeinfo>`](<#/doc/header/typeinfo>) | All |
| Localização de código-fonte | [`<source_location>`](<#/doc/header/source_location>) (desde C++20) | All |
| Tratamento de exceções | [`<exception>`](<#/doc/header/exception>) | All |
| Listas de inicializadores | [`<initializer_list>`](<#/doc/header/initializer_list>) (desde C++11) | All |
| Comparações | [`<compare>`](<#/doc/header/compare>) (desde C++20) | All |
| Suporte a coroutines | [`<coroutine>`](<#/doc/header/coroutine>) (desde C++20) | All |
| Outro suporte em tempo de execução | [`<cstdarg>`](<#/doc/header/cstdarg>) | All |
| Suporte a depuração | [`<debugging>`](<#/doc/header/debugging>) (desde C++26) | All |
| [Concepts](<#/doc/concepts>) | [`<concepts>`](<#/doc/header/concepts>) (desde C++20) | All |
| [Diagnósticos](<#/doc/error>) | Números de erro | [`<cerrno>`](<#/doc/header/cerrno>) (desde C++26) | Partial |
| Suporte a erros de sistema | [`<system_error>`](<#/doc/header/system_error>) (desde C++26) | Partial |
| [Gerenciamento de memória](<#/doc/memory>) | Memória | [`<memory>`](<#/doc/header/memory>) (desde C++23) | Partial |
| [Metaprogramação](<#/doc/meta>) | Type traits | [`<type_traits>`](<#/doc/header/type_traits>) (desde C++11) | All |
| Aritmética racional em tempo de compilação | [`<ratio>`](<#/doc/header/ratio>) (desde C++23) | All |
| [Utilitários gerais](<#/doc/utility>) | Componentes utilitários | [`<utility>`](<#/doc/header/utility>) (desde C++23) | All |
| Tuplas | [`<tuple>`](<#/doc/header/tuple>) (desde C++23) | All |
| Objetos de função | [`<functional>`](<#/doc/header/functional>) (desde C++20) | Partial |
| Conversões numéricas primitivas | [`<charconv>`](<#/doc/header/charconv>) (desde C++26) | Partial |
| Manipulação de bits | [`<bit>`](<#/doc/header/bit>) (desde C++20) | All |
| [Strings](<#/doc/string>) | Classes de string | [`<string>`](<#/doc/header/string>) (desde C++26) | Partial |
| Utilitários de sequência terminada em nulo | [`<cstring>`](<#/doc/header/cstring>) (desde C++26)<br/>[`<cwchar>`](<#/doc/header/cwchar>) (desde C++26) | Partial |
| [Iterators](<#/doc/iterator>) | [`<iterator>`](<#/doc/header/iterator>) (desde C++23) | Partial |
| [Ranges](<#/doc/ranges>) | [`<ranges>`](<#/doc/header/ranges>) (desde C++23) | Partial |
| [Numéricos](<#/doc/numeric>) | Funções matemáticas para tipos de ponto flutuante | [`<cmath>`](<#/doc/header/cmath>) (desde C++26) | Partial |
| [Suporte à concorrência](<#/doc/atomic>) | Atômicos | [`<atomic>`](<#/doc/header/atomic>) (desde C++11) | All[1](<#/doc/freestanding>) |
| Headers **depreciados** | [`<ciso646>`](<#/doc/header/ciso646>) (até C++20)<br/>[`<cstdalign>`](<#/doc/header/cstdalign>) (desde C++11)(até C++20)<br/>[`<cstdbool>`](<#/doc/header/cstdbool>) (desde C++11)(até C++20) | All |

1.  [↑](<#/doc/freestanding>) O suporte para tipos atômicos integrais sempre lock-free e a presença dos aliases de tipo [std::atomic_signed_lock_free](<#/doc/atomic/atomic>) e [std::atomic_unsigned_lock_free](<#/doc/atomic/atomic>) são definidos pela implementação em uma implementação freestanding. (desde C++20)

### Notas

Alguns fornecedores de compiladores podem não suportar totalmente a implementação freestanding. Por exemplo, a libstdc++ do GCC teve problemas de implementação e build antes da versão 13, enquanto LLVM libcxx e MSVC STL não suportam freestanding.

No C++23, muitas funcionalidades são tornadas freestanding com headers parciais. No entanto, ainda está em discussão no WG21 se alguns headers serão tornados freestanding em futuros padrões. Independentemente disso, containers como [vector](<#/doc/container/vector>), [list](<#/doc/container/list>), [deque](<#/doc/container/list>) e [map](<#/doc/container/map>) nunca serão freestanding devido às suas dependências de exceções e heap.

GCC 13 fornece mais headers, como [`<optional>`](<#/doc/header/optional>), [`<span>`](<#/doc/header/span>), [`<array>`](<#/doc/header/array>) e [`<bitset>`](<#/doc/header/bitset>), para freestanding, embora esses headers possam não ser portáveis ou fornecer as mesmas capacidades de uma implementação hosted. É melhor evitar usá-los em um ambiente freestanding, mesmo que a toolchain os forneça.

| Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade |
|---|---|---|---|
| [`__cpp_lib_freestanding_feature_test_macros`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | macros de teste de funcionalidade freestanding |
| [`__cpp_lib_freestanding_algorithm`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<algorithm>`](<#/doc/header/algorithm>) freestanding |
| [`__cpp_lib_freestanding_array`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<array>`](<#/doc/header/array>) freestanding |
| [`__cpp_lib_freestanding_char_traits`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [std::char_traits](<#/doc/string/char_traits>) freestanding |
| [`__cpp_lib_freestanding_charconv`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<charconv>`](<#/doc/header/charconv>) freestanding |
| [`__cpp_lib_freestanding_cstdlib`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<cstdlib>`](<#/doc/header/cstdlib>) freestanding |
| [`__cpp_lib_freestanding_cstring`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<cstring>`](<#/doc/header/cstring>) freestanding |
| [`__cpp_lib_freestanding_cwchar`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<cwchar>`](<#/doc/header/cwchar>) freestanding |
| [`__cpp_lib_freestanding_errc`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [std::errc](<#/doc/error/errc>) freestanding |
| [`__cpp_lib_freestanding_expected`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<expected>`](<#/doc/header/expected>) freestanding |
| [`__cpp_lib_freestanding_functional`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<functional>`](<#/doc/header/functional>) freestanding |
| [`__cpp_lib_freestanding_iterator`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<iterator>`](<#/doc/header/iterator>) freestanding |
| [`__cpp_lib_freestanding_mdspan`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<mdspan>`](<#/doc/header/mdspan>) freestanding |
| [`__cpp_lib_freestanding_memory`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<memory>`](<#/doc/header/memory>) freestanding |
| [`__cpp_lib_freestanding_numeric`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<numeric>`](<#/doc/header/numeric>) freestanding |
| [`__cpp_lib_freestanding_optional`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<optional>`](<#/doc/header/optional>) freestanding |
| [`__cpp_lib_freestanding_ranges`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<ranges>`](<#/doc/header/ranges>) freestanding |
| [`__cpp_lib_freestanding_ratio`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<ratio>`](<#/doc/header/ratio>) freestanding |
| [`__cpp_lib_freestanding_string_view`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<string_view>`](<#/doc/header/string_view>) freestanding |
| [`__cpp_lib_freestanding_tuple`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<tuple>`](<#/doc/header/tuple>) freestanding |
| [`__cpp_lib_freestanding_utility`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | [`<utility>`](<#/doc/header/utility>) freestanding |
| [`__cpp_lib_freestanding_variant`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [`<variant>`](<#/doc/header/variant>) freestanding |

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   4.1 Conformidade da implementação [intro.compliance] (p: 10)

    *   6.9.2 Execuções multi-threaded e data races [intro.multithread] (p: 84)

    *   6.9.3.1 função main [basic.start.main] (p: 89)

    *   16.4.2.5 Implementações freestanding [compliance] (p: 483)

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   4.1 Conformidade da implementação [intro.compliance] (p: 7)

    *   6.9.2 Execuções multi-threaded e data races [intro.multithread] (p: 77)

    *   6.9.3.1 função main [basic.start.main] (p: 82)

    *   16.5.1.3 Implementações freestanding [compliance] (p: 470)

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   4.1 Conformidade da implementação [intro.compliance] (p: 5)

    *   4.7 Execuções multi-threaded e data races [intro.multithread] (p: 15)

    *   6.6.1 função main [basic.start.main] (p: 66)

    *   20.5.1.3 Implementações freestanding [compliance] (p: 458)

*   Padrão C++14 (ISO/IEC 14882:2014):

    *   1.4 Conformidade da implementação [intro.compliance] (p: 5)

    *   1.10 Execuções multi-threaded e data races [intro.multithread] (p: 11)

    *   3.6.1 Função Main [basic.start.main] (p: 62)

    *   17.6.1.3 Implementações freestanding [compliance] (p: 441)

*   Padrão C++11 (ISO/IEC 14882:2011):

    *   1.4 Conformidade da implementação [intro.compliance] (p: 5)

    *   1.10 Execuções multi-threaded e data races [intro.multithread] (p: 11)

    *   3.6.1 Função Main [basic.start.main] (p: 58)

    *   17.6.1.3 Implementações freestanding [compliance] (p: 408)

*   Padrão C++03 (ISO/IEC 14882:2003):

    *   1.4 Conformidade da implementação [intro.compliance] (p: 3)

    *   3.6.1 Função Main [basic.start.main] (p: 43)

    *   17.4.1.3 Implementações freestanding [lib.compliance] (p: 326)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

| DR | Aplicado a | Comportamento conforme publicado | Comportamento correto |
|---|---|---|---|
| [CWG 1938](<https://cplusplus.github.io/CWG/issues/1938.html>) | C++98 | uma implementação não precisava documentar se era hosted | tornou o tipo de implementação definido pela implementação (portanto, exige documentação) |
| [LWG 3653](<https://cplusplus.github.io/LWG/issue3653>)<br/>([P1642R11](<https://wg21.link/P1642R11>)) | C++20 | [`<coroutine>`](<#/doc/header/coroutine>) é freestanding, mas usa [std::hash](<#/doc/utility/hash>) que não era | tornou [`<functional>`](<#/doc/header/functional>) parcialmente freestanding |

### Veja também

[Documentação C](<#/>) para Conformidade
---
\*\[Valor]: O ano/mês em que a funcionalidade foi adotada. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para a funcionalidade dada.
\*\[Padrão]: Padrão no qual a funcionalidade é introduzida; DR significa relatório de defeito contra essa revisão
# Biblioteca Padrão C++

A biblioteca padrão C++ oferece uma ampla gama de funcionalidades que podem ser usadas em C++ padrão.

### Categoria

A [biblioteca de suporte à linguagem](<#/doc/utility>) fornece componentes que são exigidos por certas partes da linguagem C++, como alocação de memória ([new](<#/doc/language/new>)/[delete](<#/doc/language/delete>)) e [processamento de exceções](<#/doc/language/exceptions>).

A [biblioteca de concepts](<#/doc/concepts>) descreve componentes da biblioteca que programas C++ podem usar para realizar validação em tempo de compilação de [argumentos de template](<#/doc/language/template_parameters>) e realizar dispatch de função baseado em propriedades de tipos. | (desde C++20)

A [biblioteca de diagnósticos](<#/doc/error>) fornece um framework consistente para relatar erros em um programa C++, incluindo [classes de exceção predefinidas](<#/doc/error>).

A [biblioteca de gerenciamento de memória](<#/doc/memory>) fornece componentes para gerenciamento de memória, incluindo [smart pointers](<#/doc/memory>) e [scoped allocator](<#/doc/memory/scoped_allocator_adaptor>) (desde C++11).

A [biblioteca de metaprogramação](<#/doc/meta>) descreve funcionalidades para uso em [templates](<#/doc/language/templates>) e durante a avaliação de constantes, incluindo [type traits](<#/doc/meta>), [integer sequence](<#/doc/utility/integer_sequence>) (desde C++14), e [aritmética racional](<#/doc/numeric/ratio>). | (desde C++11)

A [biblioteca de utilitários gerais](<#/doc/utility>) inclui componentes usados por outros elementos da biblioteca, como um [allocator de armazenamento predefinido](<#/doc/memory>) para gerenciamento de armazenamento dinâmico, e componentes usados como infraestrutura em programas C++, como [tuples](<#/doc/utility/tuple>) e (desde C++11) [function wrappers](<#/doc/utility/functional>).

As bibliotecas de [containers](<#/doc/container>), [iterators](<#/doc/iterator>), [ranges](<#/doc/ranges>) (desde C++20) e [algorithms](<#/doc/algorithm>) fornecem a um programa C++ acesso a um subconjunto dos algoritmos e estruturas de dados mais amplamente utilizados.

A [biblioteca de strings](<#/doc/string>) fornece suporte para manipular texto representado como sequências homogêneas dos seguintes tipos: char, char8_t (desde C++20), char16_t, char32_t (desde C++11), wchar_t, e quaisquer outros tipos semelhantes a caracteres.

A [biblioteca de processamento de texto](<#/doc/text>) fornece correspondência e busca de [expressões regulares](<#/doc/regex>) (desde C++11), utilitários para [formatação de texto](<#/doc/utility/format>) (desde C++20) e [identificação de codificações de texto](<#/doc/locale/text_encoding>) (desde C++26), e [funcionalidades de localização](<#/doc/locale>).

A [biblioteca de numéricos](<#/doc/numeric>) fornece [algoritmos numéricos](<#/doc/numeric>) e componentes de [números complexos](<#/doc/numeric/complex>) que estendem o suporte para processamento numérico. O componente [valarray](<#/doc/numeric/valarray>) fornece suporte para processamento n-por-vez, potencialmente implementado como operações paralelas em plataformas que suportam tal processamento. O [componente de números aleatórios](<#/doc/numeric/random>) fornece funcionalidades para gerar números pseudoaleatórios. (desde C++11)

A [biblioteca de tempo](<#/doc/chrono>) fornece utilitários de tempo geralmente úteis.

A [biblioteca de entrada/saída](<#/doc/io>) fornece os [componentes iostream](<#/doc/io>) que são o mecanismo primário para entrada e saída de programas C++. Eles podem ser usados com outros elementos da biblioteca, particularmente strings, locales e iterators.

A [biblioteca de suporte a threads](<#/doc/atomic>) fornece componentes para criar e gerenciar threads, incluindo [operações atômicas](<#/doc/atomic/atomic>), [exclusão mútua](<#/doc/thread/mutex>) e comunicação entre threads. | (desde C++11)

A [biblioteca de suporte à execução](<#/doc/experimental/execution>) fornece um framework para gerenciar a execução assíncrona em recursos de execução genéricos. | (desde C++26)

### Conteúdo da biblioteca

A biblioteca padrão C++ fornece definições para as [entidades](<#/doc/language/basic_concepts>) e [macros](<#/doc/preprocessor/replace>) descritas nas sinopses dos [headers da biblioteca padrão C++](<#/doc/headers>), a menos que especificado de outra forma.

Todas as entidades da biblioteca, exceto [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>), são definidas dentro do namespace std ou [namespaces](<#/doc/language/namespace>) aninhados dentro do namespace std (exceto as entidades para as funcionalidades da biblioteca padrão C, veja abaixo). Não é especificado se os nomes declarados em um namespace específico são declarados diretamente nesse namespace ou em um [inline namespace](<#/doc/language/namespace>) dentro desse namespace. (desde C++11)

#### Headers

Cada elemento da biblioteca padrão C++ é declarado ou definido (conforme apropriado) em um _header_. Um header não é necessariamente um arquivo fonte, nem as sequências delimitadas por `<` e `>` nos nomes dos headers são necessariamente nomes de arquivos fonte válidos.

A biblioteca padrão C++ fornece os _headers da biblioteca C++_ e _headers C++ adicionais para funcionalidades da biblioteca C_ (veja a página '[headers](<#/doc/headers>)' para descrições):

C++ library headers
---
[`<algorithm>`](<#/doc/header/algorithm>) | [`<iomanip>`](<#/doc/header/iomanip>) | [`<list>`](<#/doc/header/list>) | [`<ostream>`](<#/doc/header/ostream>) | [`<streambuf>`](<#/doc/header/streambuf>)
---|---|---|---|---
[`<bitset>`](<#/doc/header/bitset>) | [`<ios>`](<#/doc/header/ios>) | [`<locale>`](<#/doc/header/locale>) | [`<queue>`](<#/doc/header/queue>) | [`<string>`](<#/doc/header/string>)
[`<complex>`](<#/doc/header/complex>) | [`<iosfwd>`](<#/doc/header/iosfwd>) | [`<map>`](<#/doc/header/map>) | [`<set>`](<#/doc/header/set>) | [`<typeinfo>`](<#/doc/header/typeinfo>)
[`<deque>`](<#/doc/header/deque>) | [`<iostream>`](<#/doc/header/iostream>) | [`<memory>`](<#/doc/header/memory>) | [`<sstream>`](<#/doc/header/sstream>) | [`<utility>`](<#/doc/header/utility>)
[`<exception>`](<#/doc/header/exception>) | [`<istream>`](<#/doc/header/istream>) | [`<new>`](<#/doc/header/new>) | [`<stack>`](<#/doc/header/stack>) | [`<valarray>`](<#/doc/header/valarray>)
[`<fstream>`](<#/doc/header/fstream>) | [`<iterator>`](<#/doc/header/iterator>) | [`<numeric>`](<#/doc/header/numeric>) | [`<stdexcept>`](<#/doc/header/stdexcept>) | [`<vector>`](<#/doc/header/vector>)
[`<functional>`](<#/doc/header/functional>) | [`<limits>`](<#/doc/header/limits>)
Headers adicionados em C++11
[`<array>`](<#/doc/header/array>) | [`<condition_variable>`](<#/doc/header/condition_variable>) | [`<mutex>`](<#/doc/header/mutex>) | [`<scoped_allocator>`](<#/doc/header/scoped_allocator>) | [`<type_traits>`](<#/doc/header/type_traits>)
---|---|---|---|---
[`<atomic>`](<#/doc/header/atomic>) | [`<forward_list>`](<#/doc/header/forward_list>) | [`<random>`](<#/doc/header/random>) | [`<system_error>`](<#/doc/header/system_error>) | [`<typeindex>`](<#/doc/header/typeindex>)
[`<chrono>`](<#/doc/header/chrono>) | [`<future>`](<#/doc/header/future>) | [`<ratio>`](<#/doc/header/ratio>) | [`<thread>`](<#/doc/header/thread>) | [`<unordered_map>`](<#/doc/header/unordered_map>)
[`<codecvt>`](<#/doc/header/codecvt>) | [`<initializer_list>`](<#/doc/header/initializer_list>) | [`<regex>`](<#/doc/header/regex>) | [`<tuple>`](<#/doc/header/tuple>) | [`<unordered_set>`](<#/doc/header/unordered_set>)
Headers adicionados em C++14
[`<shared_mutex>`](<#/doc/header/shared_mutex>)
Headers adicionados em C++17
[`<any>`](<#/doc/header/any>) | [`<execution>`](<#/doc/header/execution>) | [`<memory_resource>`](<#/doc/header/memory_resource>) | [`<string_view>`](<#/doc/header/string_view>) | [`<variant>`](<#/doc/header/variant>)
[`<charconv>`](<#/doc/header/charconv>) | [`<filesystem>`](<#/doc/header/filesystem>) | [`<optional>`](<#/doc/header/optional>)
Headers adicionados em C++20
[`<barrier>`](<#/doc/header/barrier>) | [`<concepts>`](<#/doc/header/concepts>) | [`<latch>`](<#/doc/header/latch>) | [`<semaphore>`](<#/doc/header/semaphore>) | [`<stop_token>`](<#/doc/header/stop_token>)
---|---|---|---|---
[`<bit>`](<#/doc/header/bit>) | [`<coroutine>`](<#/doc/header/coroutine>) | [`<numbers>`](<#/doc/header/numbers>) | [`<source_location>`](<#/doc/header/source_location>) | [`<syncstream>`](<#/doc/header/syncstream>)
[`<compare>`](<#/doc/header/compare>) | [`<format>`](<#/doc/header/format>) | [`<ranges>`](<#/doc/header/ranges>) | [`<span>`](<#/doc/header/span>) | [`<version>`](<#/doc/header/version>)
Headers adicionados em C++23
[`<expected>`](<#/doc/header/expected>) | [`<flat_set>`](<#/doc/header/flat_set>) | [`<mdspan>`](<#/doc/header/mdspan>) | [`<spanstream>`](<#/doc/header/spanstream>) | [`<stdfloat>`](<#/doc/header/stdfloat>)
---|---|---|---|---
[`<flat_map>`](<#/doc/header/flat_map>) | [`<generator>`](<#/doc/header/generator>) | [`<print>`](<#/doc/header/print>) | [`<stacktrace>`](<#/doc/header/stacktrace>) |
Headers adicionados em C++26
[`<debugging>`](<#/doc/header/debugging>) | [`<inplace_vector>`](<#/doc/header/inplace_vector>) | [`<rcu>`](<#/doc/header/rcu>) | [`<simd>`](<#/doc/header/simd>) | [`<text_encoding>`](<#/doc/header/text_encoding>)
[`<hazard_pointer>`](<#/doc/header/hazard_pointer>) | [`<linalg>`](<#/doc/header/linalg>)
Headers removidos
[`<codecvt>`](<#/doc/header/codecvt>) | (desde C++11)(obsoleto em C++17)(removido em C++26)
---|---
[`<strstream>`](<#/doc/header/strstream>) | (obsoleto em C++98)(removido em C++26)
Headers C++ para funcionalidades da biblioteca C
---
[`<cassert>`](<#/doc/header/cassert>) | [`<clocale>`](<#/doc/header/clocale>) | [`<cstdarg>`](<#/doc/header/cstdarg>) | [`<cstring>`](<#/doc/header/cstring>)
---|---|---|---
[`<cctype>`](<#/doc/header/cctype>) | [`<cmath>`](<#/doc/header/cmath>) | [`<cstddef>`](<#/doc/header/cstddef>) | [`<ctime>`](<#/doc/header/ctime>)
[`<cerrno>`](<#/doc/header/cerrno>) | [`<csetjmp>`](<#/doc/header/csetjmp>) | [`<cstdio>`](<#/doc/header/cstdio>) | [`<cwchar>`](<#/doc/header/cwchar>)
[`<cfloat>`](<#/doc/header/cfloat>) | [`<csignal>`](<#/doc/header/csignal>) | [`<cstdlib>`](<#/doc/header/cstdlib>) | [`<cwctype>`](<#/doc/header/cwctype>)
[`<climits>`](<#/doc/header/climits>)
Headers adicionados em C++11
[`<cfenv>`](<#/doc/header/cfenv>) | [`<cinttypes>`](<#/doc/header/cinttypes>) | [`<cstdint>`](<#/doc/header/cstdint>) | [`<cuchar>`](<#/doc/header/cuchar>)
Headers removidos
[`<ccomplex>`](<#/doc/header/ccomplex>) | (desde C++11)(obsoleto em C++17)(removido em C++20)
---|---
[`<ciso646>`](<#/doc/header/ciso646>) | (removido em C++20)
[`<cstdalign>`](<#/doc/header/cstdalign>) | (desde C++11)(obsoleto em C++17)(removido em C++20)
[`<cstdbool>`](<#/doc/header/cstdbool>) | (desde C++11)(obsoleto em C++17)(removido em C++20)
[`<ctgmath>`](<#/doc/header/ctgmath>) | (desde C++11)(obsoleto em C++17)(removido em C++20)

Uma [implementação freestanding](<#/doc/freestanding>) possui um conjunto de headers definido pela implementação, veja [aqui](<#/doc/freestanding>) para o requisito mínimo no conjunto de headers.

### Biblioteca padrão C

A biblioteca padrão C++ também disponibiliza as funcionalidades da biblioteca padrão C, adequadamente ajustadas para garantir a segurança de tipo estática. As descrições de muitas funções da biblioteca dependem da biblioteca padrão C para a semântica dessas funções.

Em alguns casos, as assinaturas especificadas no C++ padrão podem ser diferentes das assinaturas na biblioteca padrão C, e sobrecargas adicionais podem ser declaradas, mas o comportamento e as pré-condições (incluindo aquelas implícitas pelo [restrict](<#/>) do C) (desde C++17) são os mesmos, a menos que declarado de outra forma.

Para compatibilidade com a biblioteca padrão C, a biblioteca padrão C++ fornece os headers C listados abaixo. O uso pretendido desses headers é apenas para interoperabilidade. É possível que arquivos fonte C++ precisem incluir um desses headers para serem válidos ISO C. Arquivos fonte que não se destinam a ser também válidos ISO C não devem usar nenhum dos headers C. Veja [aqui](<#/doc/headers>) para descrições.

C headers
---
[`<assert.h>`](<#/doc/header/cassert>) | [`<limits.h>`](<#/doc/header/climits>) | [`<stdarg.h>`](<#/doc/header/cstdarg>) | [`<string.h>`](<#/doc/header/cstring>)
---|---|---|---
[`<ctype.h>`](<#/doc/header/cctype>) | [`<locale.h>`](<#/doc/header/clocale>) | [`<stddef.h>`](<#/doc/header/cstddef>) | [`<time.h>`](<#/doc/header/ctime>)
[`<errno.h>`](<#/doc/header/cerrno>) | [`<math.h>`](<#/doc/header/cmath>) | [`<stdio.h>`](<#/doc/header/cstdio>) | [`<wchar.h>`](<#/doc/header/cwchar>)
[`<float.h>`](<#/doc/header/cfloat>) | [`<setjmp.h>`](<#/doc/header/csetjmp>) | [`<stdlib.h>`](<#/doc/header/cstdlib>) | [`<wctype.h>`](<#/doc/header/cwctype>)
[`<iso646.h>`](<#/doc/header/ciso646>) | [`<signal.h>`](<#/doc/header/csignal>)
Headers adicionados em C++11
[`<complex.h>`](<#/doc/header/ccomplex>) | [`<inttypes.h>`](<#/doc/header/cinttypes>) | [`<stdbool.h>`](<#/doc/header/cstdbool>) | [`<tgmath.h>`](<#/doc/header/ctgmath>)
---|---|---|---
[`<fenv.h>`](<#/doc/header/cfenv>) | [`<stdalign.h>`](<#/doc/header/cstdalign>) | [`<stdint.h>`](<#/doc/header/cstdint>) | [`<uchar.h>`](<#/doc/header/cuchar>)
Headers adicionados em C++23
[`<stdatomic.h>`](<#/doc/header/stdatomic.h>)
Headers adicionados em C++26
[`<stdbit.h>`](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/stdbit.h&action=edit&redlink=1> "cpp/header/stdbit.h \(page does not exist\)") | [`<stdchkint.h>`](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/stdchkint.h&action=edit&redlink=1> "cpp/header/stdchkint.h \(page does not exist\)")

Salvo indicação em contrário, o conteúdo de cada header `c _xxx_` é o mesmo do header `_xxx_.h` correspondente, conforme especificado na [biblioteca padrão C](<#/>). Na biblioteca padrão C++, no entanto, as declarações (exceto para nomes que são definidos como macros em C) estão dentro do escopo do namespace std. Não é especificado se esses nomes (incluindo quaisquer sobrecargas adicionadas) são primeiro declarados no escopo do namespace global e depois injetados no namespace std por [using-declarations](<#/doc/language/namespace>) explícitas.

Nomes que são definidos como macros em C ([`assert`](<#/doc/error/assert>), [`offsetof`](<#/doc/types/offsetof>), [`setjmp`](<#/doc/utility/program/setjmp>), [`va_arg`](<#/doc/utility/variadic/va_arg>), [`va_end`](<#/doc/utility/variadic/va_end>) e [`va_start`](<#/doc/utility/variadic/va_start>)) devem ser definidos como macros na biblioteca padrão C++, mesmo que C conceda licença para implementação como funções.

Nomes que são definidos como funções em C devem ser definidos como funções na biblioteca padrão C++. Isso desautoriza a prática, permitida em C, de fornecer uma macro de mascaramento além do protótipo da função. A única maneira de obter um comportamento inline equivalente em C++ é fornecer uma definição como uma [função inline](<#/doc/language/inline>) extern.

Identificadores que são palavras-chave ou operadores em C++ não podem ser definidos como macros nos headers da biblioteca padrão C++. Em particular, incluir o header padrão [`<iso646.h>`](<#/doc/header/ciso646>) não tem efeito.

#### Nomes associados a funções seguras no C padrão (desde C++17)

Se qualquer header C++ for incluído, é definido pela implementação se algum dos seguintes nomes do Anexo K do padrão C é declarado no namespace global (nenhum deles é declarado no namespace std):

C standard Annex K names
---
[`abort_handler_s`](<#/>) | [`mbstowcs_s`](<#/>) | [`strncat_s`](<#/>) | [`vswscanf_s`](<#/>)
---|---|---|---
[`asctime_s`](<#/>) | [`memcpy_s`](<#/>) | [`strncpy_s`](<#/>) | [`vwprintf_s`](<#/>)
[`bsearch_s`](<#/>) | [`memmove_s`](<#/>) | [`strtok_s`](<#/>) | [`vwscanf_s`](<#/>)
[`constraint_handler_t`](<#/>) | [`memset_s`](<#/>) | [`swprintf_s`](<#/>) | [`wcrtomb_s`](<#/>)
[`ctime_s`](<#/>) | [`printf_s`](<#/>) | [`swscanf_s`](<#/>) | [`wcscat_s`](<#/>)
[`errno_t`](<#/>) | [`qsort_s`](<#/>) | [`tmpfile_s`](<#/>) | [`wcscpy_s`](<#/>)
[`fopen_s`](<#/>) | [`RSIZE_MAX`](<#/>) | [`TMP_MAX_S`](<#/>) | [`wcsncat_s`](<#/>)
[`fprintf_s`](<#/>) | [`rsize_t`](<#/>) | [`tmpnam_s`](<#/>) | [`wcsncpy_s`](<#/>)
[`freopen_s`](<#/>) | [`scanf_s`](<#/>) | [`vfprintf_s`](<#/>) | [`wcsnlen_s`](<#/>)
[`fscanf_s`](<#/>) | [`set_constraint_handler_s`](<#/>) | [`vfscanf_s`](<#/>) | [`wcsrtombs_s`](<#/>)
[`fwprintf_s`](<#/>) | [`snprintf_s`](<#/>) | [`vfwprintf_s`](<#/>) | [`wcstok_s`](<#/>)
[`fwscanf_s`](<#/>) | [`snwprintf_s`](<#/>) | [`vfwscanf_s`](<#/>) | [`wcstombs_s`](<#/>)
[`gets_s`](<#/>) | [`sscanf_s`](<#/>) | [`vprintf_s`](<#/>) | [`wmemcpy_s`](<#/>)
[`gmtime_s`](<#/>) | [`mbstowcs_s`](<#/>) | [`vscanf_s`](<#/>) | [`vswscanf_s`](<#/>)
[`abort_handler_s`](<#/>) | [`strcat_s`](<#/>) | [`vsnprintf_s`](<#/>) | [`wmemmove`](<#/>)
[`ignore_handler_s`](<#/>) | [`strcpy_s`](<#/>) | [`vsnwprintf_s`](<#/>) | [`wprintf_s`](<#/>)
[`localtime_s`](<#/>) | [`strerrorlen_s`](<#/>) | [`vsprintf_s`](<#/>) | [`wscanf_s`](<#/>)
[`L_tmpnam_s`](<#/>) | [`strerror_s`](<#/>) | [`vsscanf_s`](<#/>) |
[`mbsrtowcs_s`](<#/>) | [`strlen_s`](<#/>) | [`vswprintf_s`](<#/>) |

### Usando a biblioteca

#### Incluindo headers

As entidades na biblioteca padrão C++ são definidas em headers, cujo conteúdo é disponibilizado a uma unidade de tradução quando ela contém a diretiva de pré-processamento [` #include`](<#/doc/preprocessor/include>) apropriada.

Uma unidade de tradução pode incluir headers da biblioteca em qualquer ordem. Cada um pode ser incluído mais de uma vez, sem efeito diferente de ser incluído exatamente uma vez, exceto que o efeito de incluir [`<cassert>`](<#/doc/header/cassert>) ou [`<assert.h>`](<#/doc/header/cassert>) depende a cada vez da definição lexicalmente atual de NDEBUG.

Uma unidade de tradução só pode incluir um header fora de qualquer declaração ou definição, e lexicalmente antes da primeira referência nessa unidade de tradução a qualquer uma das entidades declaradas nesse header. Nenhum diagnóstico é exigido.

Em [unidades de módulo](<#/doc/language/modules>), headers só podem ser incluídos em [fragmentos de módulo globais](<#/doc/language/modules>). | (desde C++20)

#### Importando headers

Os [headers da biblioteca C++](<#/doc/standard_library>), ou, para uma implementação freestanding, o subconjunto de tais headers que são fornecidos pela implementação, são coletivamente conhecidos como os _headers da biblioteca C++ importáveis_. O conteúdo dos headers da biblioteca C++ importáveis é disponibilizado a uma unidade de tradução quando ela contém a [declaração de importação](<#/doc/language/modules>) apropriada. | (desde C++20)

#### Importando módulos

A biblioteca padrão C++ fornece os seguintes _módulos da biblioteca C++_ :

*   O [módulo nomeado](<#/doc/language/modules>) std exporta declarações no namespace `std` que são fornecidas pelos headers da biblioteca C++ importáveis (por exemplo, [std::rotr](<#/doc/numeric/rotr>) de [`<bit>`](<#/doc/header/bit>)) e os [headers C++ para funcionalidades da biblioteca C](<#/doc/standard_library>) (por exemplo, [std::puts](<#/doc/io/c/puts>) de [`<cstdio>`](<#/doc/header/cstdio>)). Ele adicionalmente exporta declarações no namespace global para as funções de [alocação](<#/doc/memory/new/operator_new>) e [dealocação](<#/doc/memory/new/operator_delete>) de armazenamento que são fornecidas por [`<new>`](<#/doc/header/new>) (por exemplo, [::operator new](<#/doc/memory/new/operator_new>)).
*   O módulo nomeado std.compat exporta as mesmas declarações que o módulo nomeado std, e adicionalmente exporta declarações no namespace global correspondentes às declarações no namespace `std` que são fornecidas pelos headers C++ para funcionalidades da biblioteca C (por exemplo, [::fclose](<#/doc/io/c/fclose>)).

Para cada declaração na biblioteca padrão,

*   o módulo ao qual ela [se anexa](<#/doc/language/modules>) não é especificado, e
*   ela denota a mesma [entidade](<#/doc/language/basic_concepts>) independentemente de ter sido tornada acessível através da inclusão de um header, importação de uma unidade de header, ou importação de um módulo da biblioteca C++.

| [Feature-test](<#/doc/utility/feature_test>) macro | Value | Std | Feature
[`__cpp_lib_modules`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Standard library modules std and std.compat
(desde C++23)

#### Linkage

Entidades na biblioteca padrão C++ têm [storage duration#external linkage](<#/doc/language/storage_duration>). A menos que especificado de outra forma, objetos e funções têm o [linkage](<#/doc/language/language_linkage>) padrão extern "C++".

Se um nome da biblioteca padrão C declarado com external linkage tem linkage extern "C" ou extern "C++" é definido pela implementação. O padrão C++ recomenda usar extern "C++" neste caso.

Objetos e funções definidos na biblioteca e exigidos por um programa C++ são incluídos no programa antes do início da execução do programa.

### Requisitos para implementações da biblioteca padrão

#### Garantias

Um header C++ deve fornecer [declarações](<#/doc/language/declarations>) e [definições](<#/doc/language/definition>) que aparecem em

*   a sinopse desse header, ou
*   a sinopse de outro header que parece estar incluído na sinopse desse header.

Para tipos e macros definidos em múltiplos headers (como [`NULL`](<#/doc/types/NULL>)), incluir qualquer número desses headers em qualquer ordem nunca viola a [regra de uma definição](<#/doc/language/definition>).

A menos que especificado de outra forma, todas as [macros tipo objeto](<#/doc/preprocessor/replace>) definidas pela biblioteca padrão C que se expandem para [expressões constantes](<#/doc/language/constant_expression>) integrais podem ser usadas em diretivas de pré-processamento [`#if`](<#/doc/preprocessor/conditional>).

Chamar uma assinatura de função não-membro da biblioteca padrão sempre resulta na chamada real dessa função. Portanto, uma implementação da biblioteca padrão em conformidade não pode definir funções não-membro adicionais que possam ser chamadas por um programa C++ válido.

Assinaturas de funções não-membro nunca são declaradas com [argumentos padrão](<#/doc/language/default_arguments>) adicionais.

A menos que especificado de outra forma, chamadas feitas por funções na biblioteca padrão para funções não-operador, não-membro não usam funções de outro [namespace](<#/doc/language/namespace>) que são encontradas através de [argument-dependent name lookup](<#/doc/language/adl>).

Para cada [declaração friend](<#/doc/language/friend>) de uma função (template) dentro de uma definição de classe (template), nenhuma outra declaração é fornecida para essa função (template).

Assinaturas de funções da biblioteca padrão só podem ser declaradas como constexpr se forem exigidas como [constexpr](<#/doc/language/constexpr>) (libstdc++ cmath [é notavelmente não-conforme](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=102916>) aqui). Se um header fornecer quaisquer declarações não-definidoras de funções ou construtores constexpr, as definições correspondentes também devem ser fornecidas dentro desse header. A menos que especificado de outra forma, cada função da biblioteca padrão deve atender a cada um dos seguintes requisitos para prevenir [data races](<#/doc/language/memory_model>):

*   Uma função da biblioteca padrão C++ não pode (direta ou indiretamente) acessar objetos acessíveis por threads diferentes da thread atual, a menos que os objetos sejam acessados (direta ou indiretamente) através dos argumentos da função, incluindo this.
*   Uma função da biblioteca padrão C++ não pode (direta ou indiretamente) modificar objetos acessíveis por threads diferentes da thread atual, a menos que os objetos sejam acessados (direta ou indiretamente) através dos argumentos não-const da função, incluindo this.
    *   Por exemplo, um objeto com static storage duration não pode ser usado para propósitos internos sem sincronização, pois isso pode causar uma data race mesmo em programas que não compartilham objetos explicitamente entre threads.
*   Uma função da biblioteca padrão C++ não pode acessar objetos indiretamente acessíveis através de seus argumentos ou através de elementos de seus argumentos [container](<#/doc/container>), exceto invocando funções exigidas por sua especificação nesses elementos do container.
  * Uma operação em [iterators](<#/doc/iterator>) obtidos ao chamar uma função membro de um container ou string da standard library pode acessar, mas não modificar, o container subjacente.
    * Em particular, operações de container que invalidam iterators entram em conflito com operações em iterators associados a esse container.
  * Uma função da standard library C++ só pode realizar todas as operações exclusivamente dentro da thread atual se essas operações tiverem efeitos que são [visíveis](<#/doc/language/memory_model>) para os usuários.
    * Operações sem efeitos colaterais visíveis podem ser paralelizadas.

| (desde C++11)

Para cada classe definida na standard library C++ que é exigida ser [derivada](<#/doc/language/derived_class>) de outra classe definida na standard library C++,

  * a classe base deve ser [virtual](<#/doc/language/derived_class>) se for especificada como virtual,
  * a classe base não pode ser virtual se não for especificada como virtual, e
  * a menos que especificado de outra forma, tipos com nomes distintos devem ser tipos distintos.

A menos que especificado de outra forma, todos os tipos especificados na standard library C++ são tipos não-[final](<#/doc/language/final>). | (desde C++11)

Se uma função definida na standard library C++ for especificada para lançar uma [exceção](<#/doc/language/exceptions>) (em uma situação particular) de um determinado tipo, a exceção lançada só pode ter esse tipo ou um tipo derivado desse tipo para que um handler de exceção para o tipo base possa capturá-la.

Funções da standard library C só podem lançar exceções quando tal função chama uma função fornecida pelo programa que lança uma exceção ([`qsort()`](<#/doc/algorithm/qsort>) e [`bsearch()`](<#/doc/algorithm/bsearch>) atendem a essa condição).

Operações de destrutor definidas na standard library C++ nunca lançam exceções. Cada destrutor na standard library C++ se comporta como se tivesse uma [especificação de exceção não-lançadora](<#/doc/language/noexcept_spec>).

```cpp
Se uma função na standard library C++ reportar erros via um objeto std::error_code, o membro `category()` desse objeto deve retornar std::system_category() para erros originados do sistema operacional, ou uma referência a um objeto std::error_category definido pela implementação para erros originados em outro lugar. Os valores possíveis de `value()` para cada uma dessas categorias de erro devem ser definidos. Objetos de tipos definidos na standard library C++ podem ser movidos de. Operações de move podem ser explicitamente especificadas ou implicitamente geradas. A menos que especificado de outra forma, tais objetos movidos de serão colocados em um estado válido, mas não especificado. Um objeto de um tipo definido na standard library C++ pode ser move-atribuído a si mesmo. A menos que especificado de outra forma, tal atribuição coloca o objeto em um estado válido, mas não especificado.  // (desde C++11)
```

#### Liberdade de implementação

É não especificado se quaisquer funções membro ou não-membro na standard library C++ são definidas como [inline](<#/doc/language/inline>).

Para uma função membro não-[virtual](<#/doc/language/virtual>) da standard library C++, um conjunto diferente de assinaturas de funções membro pode ser declarado, desde que qualquer chamada a essa função membro que selecionaria uma sobrecarga do conjunto de declarações fornecido se comporte como se essa sobrecarga tivesse sido selecionada. Isso permite, por exemplo:

  * adicionar parâmetros com argumentos padrão,
  * substituir uma função membro com argumentos padrão por duas ou mais funções membro com comportamento equivalente, ou
  * adicionar assinaturas adicionais para um nome de função membro.

A menos que especificado de outra forma, é definido pela implementação quais funções na standard library C++ podem ser reentradas recursivamente.

Implementações da standard library C++ podem compartilhar seus próprios objetos internos entre threads se os objetos não forem visíveis para os usuários e forem protegidos contra data races. | (desde C++11)

É não especificado se qualquer assinatura de função ou classe na standard library C++ é amiga de outra classe na standard library C++.

Os nomes e assinaturas de funções globais descritos [aqui](<#/doc/standard_library>) são reservados para a implementação.

Qualquer classe na standard library C++ pode ser derivada de uma classe com um nome reservado para a implementação. Se uma classe definida na standard library C++ for exigida ser derivada de outras classes na standard library C++, essa classe pode ser derivada diretamente da base exigida ou indiretamente através de uma hierarquia de classes base com nomes reservados para a implementação.

Se uma função definida na standard library C++ não for especificada para lançar uma exceção, mas não tiver uma especificação de exceção não-lançadora, a exceção lançada é definida pela implementação, mas seu tipo deve ser [std::exception](<#/doc/error/exception>) ou qualquer tipo derivado de [std::exception](<#/doc/error/exception>).

A especificação de exceção para uma função não-virtual pode ser fortalecida adicionando uma especificação de exceção não-lançadora.

### Defect reports

Os seguintes defect reports que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1](<https://cplusplus.github.io/LWG/issue1>) | C++98 | as ligações de linguagem dos nomes da standard library C eram não especificadas | elas são definidas pela implementação
[LWG 119](<https://cplusplus.github.io/LWG/issue119>) | C++98 | as especificações de exceção de funções virtuais podiam ser fortalecidas | permitido apenas para funções não-virtuais
[LWG 147](<https://cplusplus.github.io/LWG/issue147>) | C++98 | a especificação sobre funções não-membro considerava apenas funções globais | também considera funções não-globais
[LWG 225](<https://cplusplus.github.io/LWG/issue225>) | C++98 | funções da standard library podiam chamar funções não-membro de outros namespaces devido à pesquisa dependente de argumento | proibido a menos que especificado de outra forma
[LWG 336](<https://cplusplus.github.io/LWG/issue336>) | C++98 | [`<strstream>`](<#/doc/header/strstream>) não era um header da library C++ | é um header da library C++
[LWG 343](<https://cplusplus.github.io/LWG/issue343>) | C++98 | as dependências de header da library não eram especificadas | especificadas (listadas em sinopses)
[LWG 456](<https://cplusplus.github.io/LWG/issue456>) | C++98 | headers C++ para facilidades da library C podiam fornecer definições apenas no namespace std | permitido definir no namespace global e então injetar no namespace std
[LWG 465](<https://cplusplus.github.io/LWG/issue465>) | C++98 | identificadores que são palavras-chave ou operadores em C++ podiam ser definidos como macros em headers da standard library C++ (apenas [`<ciso646>`](<#/doc/header/ciso646>) é exigido para não defini-los como macros) | todos os headers da standard library C++ não podem defini-los como macros
[LWG 1178](<https://cplusplus.github.io/LWG/issue1178>) | C++98 | headers C++ devem incluir um header C++ que contém qualquer definição necessária | headers C++ devem fornecer declarações e definições que são direta ou indiretamente incluídas em sua sinopse
[LWG 2013](<https://cplusplus.github.io/LWG/issue2013>) | C++11 | era não especificado se as funções não exigidas pelo padrão para serem constexpr podem ser declaradas constexpr pela standard library | proibido
[LWG 2225](<https://cplusplus.github.io/LWG/issue2225>) | C++98 | um diagnóstico era exigido se um header fosse incluído em uma posição incorreta | nenhum diagnóstico é exigido neste caso
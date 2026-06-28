# Headers da Biblioteca Padrão C++

A interface da biblioteca padrão C++ é definida pela seguinte coleção de headers.

### Headers de uso geral

---
[ &lt;cstdlib&gt;](<#/doc/header/cstdlib>) | Utilitários de uso geral: [controle de programa](<#/doc/utility/program>), [alocação dinâmica de memória](<#/doc/memory/c>), [números aleatórios](<#/doc/numeric/random>), [ordenação e busca](<#/doc/algorithm>)
---|---
[ &lt;execution&gt;](<#/doc/header/execution>)(C++17) | Políticas de execução predefinidas para versões paralelas dos algoritmos e componentes de controle de execução (desde C++26)

### Biblioteca de suporte à linguagem

[ &lt;cfloat&gt;](<#/doc/header/cfloat>) | [Limites de tipos de ponto flutuante](<#/doc/types/climits>)
---|---
[ &lt;climits&gt;](<#/doc/header/climits>) | [Limites de tipos integrais](<#/doc/types/climits>)
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte ao [operador de comparação de três vias](<#/doc/language/operator_comparison>)
[ &lt;coroutine&gt;](<#/doc/header/coroutine>)(C++20) | [Biblioteca de suporte a coroutines](<#/doc/coroutine>)
[ &lt;csetjmp&gt;](<#/doc/header/csetjmp>) | [Macro (e função) que salva (e salta para) um contexto de execução](<#/doc/utility/program/setjmp>)
[ &lt;csignal&gt;](<#/doc/header/csignal>) | [Funções e constantes de macro para gerenciamento de sinais](<#/doc/utility/program>)
[ &lt;cstdarg&gt;](<#/doc/header/cstdarg>) | [Manipulação de listas de argumentos de comprimento variável](<#/doc/utility/variadic>)
[ &lt;cstddef&gt;](<#/doc/header/cstddef>) | [Macros e typedefs padrão](<#/doc/types>)
[ &lt;cstdint&gt;](<#/doc/header/cstdint>)(C++11) | [Tipos inteiros de largura fixa](<#/doc/types/integer>) e [limites de outros tipos](<#/doc/types/climits>)
[ &lt;exception&gt;](<#/doc/header/exception>) | [Utilitários de tratamento de exceções](<#/doc/error>)
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | template de classe [std::initializer_list](<#/doc/utility/initializer_list>)
[ &lt;limits&gt;](<#/doc/header/limits>) | [Consulta de propriedades de tipos aritméticos](<#/doc/types/numeric_limits>)
[ &lt;new&gt;](<#/doc/header/new>) | [Utilitários de gerenciamento de memória de baixo nível](<#/doc/memory/new>)
[ <source_location>](<#/doc/header/source_location>)(C++20) | Fornece meios para obter a [localização do código-fonte](<#/doc/utility/source_location>)
[ &lt;stdfloat&gt;](<#/doc/header/stdfloat>)(C++23) | [Tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>)
[ &lt;typeindex&gt;](<#/doc/header/typeindex>)(C++11) | [std::type_index](<#/doc/types/type_index>)
[ &lt;typeinfo&gt;](<#/doc/header/typeinfo>) | [Utilitários de informação de tipo em tempo de execução](<#/doc/types>)
[ &lt;version&gt;](<#/doc/header/version>)(C++20) | Fornece macros para verificar o status de implementação da biblioteca

### Biblioteca de Concepts

[ &lt;concepts&gt;](<#/doc/header/concepts>)(C++20) | [Concepts fundamentais da biblioteca](<#/doc/concepts>)

### Biblioteca de Diagnóstico

[ &lt;cassert&gt;](<#/doc/header/cassert>) | [Macro compilada condicionalmente que compara seu argumento a zero](<#/doc/error/assert>)
---|---
[ &lt;cerrno&gt;](<#/doc/header/cerrno>) | [Macro contendo o último número de erro](<#/doc/error/errno>)
[ &lt;debugging&gt;](<#/doc/header/debugging>)(C++26) | Biblioteca de depuração
[ &lt;stacktrace&gt;](<#/doc/header/stacktrace>)(C++23) | Biblioteca de [stacktrace](<#/doc/utility/basic_stacktrace>)
[ &lt;stdexcept&gt;](<#/doc/header/stdexcept>) | [Tipos de exceção padrão](<#/doc/error>)
[ <system_error>](<#/doc/header/system_error>)(C++11) | Define [std::error_code](<#/doc/error/error_code>), um código de erro dependente da plataforma

### Biblioteca de gerenciamento de memória

[ &lt;memory&gt;](<#/doc/header/memory>) | [Utilitários de gerenciamento de memória de alto nível](<#/doc/memory>)
---|---
[ <memory_resource>](<#/doc/header/memory_resource>)(C++17) | [Alocadores polimórficos e recursos de memória](<#/doc/memory/memory_resource>)
[ <scoped_allocator>](<#/doc/header/scoped_allocator>)(C++11) | [Classe de alocador aninhado](<#/doc/memory/scoped_allocator_adaptor>)

### Biblioteca de Metaprogramação

[ &lt;ratio&gt;](<#/doc/header/ratio>)(C++11) | [Aritmética racional em tempo de compilação](<#/doc/numeric/ratio>)
---|---
[ <type_traits>](<#/doc/header/type_traits>)(C++11) | [Utilitários de informação de tipo em tempo de compilação](<#/doc/types>)

### Biblioteca de utilitários gerais

[ &lt;any&gt;](<#/doc/header/any>)(C++17) | Classe [std::any](<#/doc/utility/any>)
---|---
[ &lt;bit&gt;](<#/doc/header/bit>)(C++20) | Funções de [manipulação de bits](<#/doc/numeric>)
[ &lt;bitset&gt;](<#/doc/header/bitset>) | template de classe [std::bitset](<#/doc/utility/bitset>)
[ &lt;expected&gt;](<#/doc/header/expected>)(C++23) | template de classe std::expected
[ &lt;functional&gt;](<#/doc/header/functional>) | [Objetos de função, invocações de função, operações de bind e wrappers de referência](<#/doc/utility/functional>)
[ &lt;optional&gt;](<#/doc/header/optional>)(C++17) | template de classe [std::optional](<#/doc/utility/optional>)
[ &lt;tuple&gt;](<#/doc/header/tuple>)(C++11) | template de classe [std::tuple](<#/doc/utility/tuple>)
[ &lt;utility&gt;](<#/doc/header/utility>) | Vários [componentes utilitários](<#/doc/utility>)
[ &lt;variant&gt;](<#/doc/header/variant>)(C++17) | template de classe [std::variant](<#/doc/utility/variant>)

### Biblioteca de Containers

[ &lt;array&gt;](<#/doc/header/array>)(C++11) | Container [std::array](<#/doc/container/array>)
---|---
[ &lt;deque&gt;](<#/doc/header/deque>) | Container [std::deque](<#/doc/container/deque>)
[ <flat_map>](<#/doc/header/flat_map>)(C++23) | Adaptadores de container std::flat_map e std::flat_multimap
[ <flat_set>](<#/doc/header/flat_set>)(C++23) | Adaptadores de container std::flat_set e std::flat_multiset
[ <forward_list>](<#/doc/header/forward_list>)(C++11) | Container [std::forward_list](<#/doc/container/forward_list>)
[ <inplace_vector>](<#/doc/header/inplace_vector>)(C++26) | Container std::inplace_vector
[ &lt;list&gt;](<#/doc/header/list>) | Container [std::list](<#/doc/container/list>)
[ &lt;map&gt;](<#/doc/header/map>) | Containers associativos [std::map](<#/doc/container/map>) e [std::multimap](<#/doc/container/multimap>)
[ &lt;mdspan&gt;](<#/doc/header/mdspan>)(C++23) | View std::mdspan
[ &lt;queue&gt;](<#/doc/header/queue>) | Adaptadores de container [std::queue](<#/doc/container/queue>) e [std::priority_queue](<#/doc/container/priority_queue>)
[ &lt;set&gt;](<#/doc/header/set>) | Containers associativos [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>)
[ <span>](<#/doc/header/span>)(C++20) | View std::span
[ &lt;stack&gt;](<#/doc/header/stack>) | Adaptador de container [std::stack](<#/doc/container/stack>)
[ <unordered_map>](<#/doc/header/unordered_map>)(C++11) | Containers associativos não ordenados [std::unordered_map](<#/doc/container/unordered_map>) e [std::unordered_multimap](<#/doc/container/unordered_multimap>)
[ <unordered_set>](<#/doc/header/unordered_set>)(C++11) | Containers associativos não ordenados [std::unordered_set](<#/doc/container/unordered_set>) e [std::unordered_multiset](<#/doc/container/unordered_multiset>)
[ &lt;vector&gt;](<#/doc/header/vector>) | Container [std::vector](<#/doc/container/vector>)

### Biblioteca de Iterators

[ &lt;iterator&gt;](<#/doc/header/iterator>) | [Iterators de range](<#/doc/iterator>)

### Biblioteca de Ranges

[ &lt;generator&gt;](<#/doc/header/generator>)(C++23) | template de classe std::generator
---|---
[ &lt;ranges&gt;](<#/doc/header/ranges>)(C++20) | [Acesso a ranges, primitivas, requisitos, utilitários e adaptadores](<#/doc/ranges>)

### Biblioteca de Algoritmos

[ &lt;algorithm&gt;](<#/doc/header/algorithm>) | [Algoritmos que operam em ranges](<#/doc/algorithm>)
---|---
[ &lt;numeric&gt;](<#/doc/header/numeric>) | [Operações numéricas em valores em ranges](<#/doc/numeric>)

### Biblioteca de Strings

[ &lt;cstring&gt;](<#/doc/header/cstring>) | Várias [funções de manipulação de strings de caracteres estreitos](<#/doc/string/byte>)
---|---
[ &lt;string&gt;](<#/doc/header/string>) | template de classe [std::basic_string](<#/doc/string/basic_string>)
[ <string_view>](<#/doc/header/string_view>)(C++17) | template de classe [std::basic_string_view](<#/doc/string/basic_string_view>)

### Biblioteca de processamento de texto

[ &lt;cctype&gt;](<#/doc/header/cctype>) | [Funções para determinar a categoria de caracteres estreitos](<#/doc/string/byte>)
---|---
[ &lt;charconv&gt;](<#/doc/header/charconv>)(C++17) | std::to_chars e std::from_chars
[ &lt;clocale&gt;](<#/doc/header/clocale>) | [Utilitários de localização C](<#/doc/locale>)
[ &lt;codecvt&gt;](<#/doc/header/codecvt>)(C++11)(obsoleto em C++17)(removido em C++26) | [Facilidades de conversão Unicode](<#/doc/locale>)
[ &lt;cuchar&gt;](<#/doc/header/cuchar>)(C++11) | [Funções de conversão de caracteres Unicode](<#/doc/string/multibyte>) estilo C
[ &lt;cwchar&gt;](<#/doc/header/cwchar>) | Várias funções de manipulação de strings [wide](<#/doc/string/wide>) e [multibyte](<#/doc/string/multibyte>)
[ &lt;cwctype&gt;](<#/doc/header/cwctype>) | [Funções para determinar a categoria de caracteres wide](<#/doc/string/wide>)
[ &lt;format&gt;](<#/doc/header/format>)(C++20) | [Biblioteca de formatação](<#/doc/utility/format>) incluindo [std::format](<#/doc/utility/format/format>)
[ &lt;locale&gt;](<#/doc/header/locale>) | [Utilitários de localização](<#/doc/locale>)
[ &lt;regex&gt;](<#/doc/header/regex>)(C++11) | [Classes, algoritmos e iterators para suportar o processamento de expressões regulares](<#/doc/regex>)
[ <text_encoding>](<#/doc/header/text_encoding>)(C++26) | Identificações de codificação de texto

### Biblioteca Numérica

[ &lt;cfenv&gt;](<#/doc/header/cfenv>)(C++11) | Funções de acesso ao [ambiente de ponto flutuante](<#/doc/numeric/fenv>)
---|---
[ &lt;cmath&gt;](<#/doc/header/cmath>) | [Funções matemáticas comuns](<#/doc/numeric/math>)
[ &lt;complex&gt;](<#/doc/header/complex>) | [Tipo de número complexo](<#/doc/numeric/complex>)
[ &lt;linalg&gt;](<#/doc/header/linalg>)(C++26) | [Algoritmos básicos de álgebra linear (BLAS)](<#/doc/numeric/linalg>)
[ &lt;numbers&gt;](<#/doc/header/numbers>)(C++20) | [Constantes matemáticas](<#/doc/numeric/constants>)
[ &lt;random&gt;](<#/doc/header/random>)(C++11) | [Geradores de números aleatórios e distribuições](<#/doc/numeric/random>)
[ &lt;simd&gt;](<#/doc/header/simd>)(C++26) | [Tipos de dados paralelos e operações nesses tipos](<#/doc/numeric/simd>)
[ &lt;valarray&gt;](<#/doc/header/valarray>) | [Classe para representar e manipular arrays de valores](<#/doc/numeric/valarray>)

### Biblioteca de Tempo

[ &lt;chrono&gt;](<#/doc/header/chrono>)(C++11) | [Utilitários de tempo C++](<#/doc/chrono>)
---|---
[ &lt;ctime&gt;](<#/doc/header/ctime>) | [Utilitários de tempo/data estilo C](<#/doc/chrono/c>)

### Biblioteca de Entrada/Saída

[ &lt;cinttypes&gt;](<#/doc/header/cinttypes>)(C++11) | [Macros de formatação](<#/doc/types/integer>), matemática e conversões de `intmax_t` e `uintmax_t`
---|---
[ &lt;cstdio&gt;](<#/doc/header/cstdio>) | [Funções de entrada-saída estilo C](<#/doc/io/c>)
[ &lt;filesystem&gt;](<#/doc/header/filesystem>)(C++17) | Classe [std::filesystem::path](<#/doc/filesystem/path>) e [funções de suporte](<#/doc/filesystem>)
[ &lt;fstream&gt;](<#/doc/header/fstream>) | templates de classe [std::basic_fstream](<#/doc/io/basic_fstream>), [std::basic_ifstream](<#/doc/io/basic_ifstream>), [std::basic_ofstream](<#/doc/io/basic_ofstream>) e typedefs
[ &lt;iomanip&gt;](<#/doc/header/iomanip>) | [Funções auxiliares para controlar o formato de entrada e saída](<#/doc/io/manip>)
[ &lt;ios&gt;](<#/doc/header/ios>) | Classe [std::ios_base](<#/doc/io/ios_base>), template de classe [std::basic_ios](<#/doc/io/basic_ios>) e typedefs
[ &lt;iosfwd&gt;](<#/doc/header/iosfwd>) | Declarações forward de todas as classes na biblioteca de entrada/saída
[ &lt;iostream&gt;](<#/doc/header/iostream>) | Vários objetos de stream padrão
[ &lt;istream&gt;](<#/doc/header/istream>) | template de classe [std::basic_istream](<#/doc/io/basic_istream>) e typedefs
[ &lt;ostream&gt;](<#/doc/header/ostream>) | templates de classe [std::basic_ostream](<#/doc/io/basic_ostream>), [std::basic_iostream](<#/doc/io/basic_iostream>) e typedefs
[ &lt;print&gt;](<#/doc/header/print>)(C++23) | Biblioteca de saída formatada incluindo std::print
[ &lt;spanstream&gt;](<#/doc/header/spanstream>)(C++23) | templates de classe std::basic_spanstream, std::basic_ispanstream, std::basic_ospanstream e typedefs
[ &lt;sstream&gt;](<#/doc/header/sstream>) | templates de classe [std::basic_stringstream](<#/doc/io/basic_stringstream>), [std::basic_istringstream](<#/doc/io/basic_istringstream>), [std::basic_ostringstream](<#/doc/io/basic_ostringstream>) e typedefs
[ &lt;streambuf&gt;](<#/doc/header/streambuf>) | template de classe [std::basic_streambuf](<#/doc/io/basic_streambuf>)
[ &lt;strstream&gt;](<#/doc/header/strstream>)(obsoleto em C++98)(removido em C++26) | [std::strstream](<#/doc/io/strstream>), [std::istrstream](<#/doc/io/istrstream>), [std::ostrstream](<#/doc/io/ostrstream>)
[ &lt;syncstream&gt;](<#/doc/header/syncstream>)(C++20) | std::basic_osyncstream, std::basic_syncbuf e typedefs

### Biblioteca de suporte à concorrência

[ &lt;atomic&gt;](<#/doc/header/atomic>)(C++11) | [Biblioteca de operações atômicas](<#/doc/atomic>)
---|---
[ &lt;barrier&gt;](<#/doc/header/barrier>)(C++20) | [Barreiras](<#/doc/thread/barrier>)
[ <condition_variable>](<#/doc/header/condition_variable>)(C++11) | [Condições de espera de thread](<#/doc/atomic>)
[ &lt;future&gt;](<#/doc/header/future>)(C++11) | [Primitivas para computações assíncronas](<#/doc/atomic>)
[ <hazard_pointer>](<#/doc/header/hazard_pointer>)(C++26) | Hazard pointers
[ &lt;latch&gt;](<#/doc/header/latch>)(C++20) | [Latches](<#/doc/thread/latch>)
[ &lt;mutex&gt;](<#/doc/header/mutex>)(C++11) | [Primitivas de exclusão mútua](<#/doc/atomic>)
[ &lt;rcu&gt;](<#/doc/header/rcu>)(C++26) | Mecanismos de read-copy update
[ &lt;semaphore&gt;](<#/doc/header/semaphore>)(C++20) | [Semáforos](<#/doc/thread/counting_semaphore>)
[ <shared_mutex>](<#/doc/header/shared_mutex>)(C++14) | [Primitivas de exclusão mútua compartilhada](<#/doc/atomic>)
[ <stop_token>](<#/doc/header/stop_token>)(C++20) | Stop tokens para [std::jthread](<#/doc/thread/jthread>)
[ &lt;thread&gt;](<#/doc/header/thread>)(C++11) | Classe [std::thread](<#/doc/thread/thread>) e [funções de suporte](<#/doc/atomic>)

### Headers de compatibilidade C

Para alguns dos headers da biblioteca padrão C na forma `_xxx_.h`, a biblioteca padrão C++ inclui tanto um header com nome idêntico quanto outro header na forma `c_xxx_` (todos os headers `c_xxx_` significativos estão listados acima). O uso pretendido dos headers na forma `_xxx_.h` é apenas para interoperabilidade. É possível que arquivos-fonte C++ precisem incluir um desses headers para serem válidos como ISO C. Arquivos-fonte que não se destinam a ser também válidos como ISO C não devem usar nenhum dos headers C.

Com exceção de [`complex.h`](<#/doc/header/ccomplex>), cada header `_xxx_.h` incluído na biblioteca padrão C++ coloca no namespace global cada nome que o header `c_xxx_` correspondente teria colocado no namespace std.

Esses headers podem também declarar os mesmos nomes no namespace std, e os headers `c_xxx_` correspondentes podem também declarar os mesmos nomes no namespace global: incluir [`<cstdlib>`](<#/doc/header/cstdlib>) definitivamente fornece [std::malloc](<#/doc/memory/c/malloc>) e pode também fornecer `::malloc`. Incluir [`<stdlib.h>`](<#/>) definitivamente fornece `::malloc` e pode também fornecer [std::malloc](<#/doc/memory/c/malloc>). Isso se aplica até mesmo a funções e sobrecargas de função que não fazem parte da biblioteca padrão C.

Notas: Os headers `_xxx_.h` foram descontinuados em C++98 e reabilitados em C++23. Esses headers são desencorajados para código C++ puro, mas não estão sujeitos a remoção futura.

[ <assert.h>](<#/doc/header/cassert>) | Comporta-se da mesma forma que [`<cassert>`](<#/doc/header/cassert>)
---|---
[ <ctype.h>](<#/doc/header/cctype>) | Comporta-se como se cada nome de [`<cctype>`](<#/doc/header/cctype>) fosse colocado no namespace global
[ <errno.h>](<#/doc/header/cerrno>) | Comporta-se da mesma forma que [`<cerrno>`](<#/doc/header/cerrno>)
[ <fenv.h>](<#/doc/header/cfenv>)(C++11) | Comporta-se como se cada nome de [`<cfenv>`](<#/doc/header/cfenv>) fosse colocado no namespace global
[ <float.h>](<#/doc/header/cfloat>) | Comporta-se da mesma forma que [`<cfloat>`](<#/doc/header/cfloat>)
[ <inttypes.h>](<#/doc/header/cinttypes>)(C++11) | Comporta-se como se cada nome de [`<cinttypes>`](<#/doc/header/cinttypes>) fosse colocado no namespace global
[ <limits.h>](<#/doc/header/climits>) | Comporta-se da mesma forma que [`<climits>`](<#/doc/header/climits>)
[ <locale.h>](<#/doc/header/clocale>) | Comporta-se como se cada nome de [`<clocale>`](<#/doc/header/clocale>) fosse colocado no namespace global
[ <math.h>](<#/doc/header/cmath>) | Comporta-se como se cada nome de [`<cmath>`](<#/doc/header/cmath>) fosse colocado no namespace global, exceto pelos nomes das [funções matemáticas especiais](<#/doc/numeric/special_functions>)
[ <setjmp.h>](<#/doc/header/csetjmp>) | Comporta-se como se cada nome de [`<csetjmp>`](<#/doc/header/csetjmp>) fosse colocado no namespace global
[ <signal.h>](<#/doc/header/csignal>) | Comporta-se como se cada nome de [`<csignal>`](<#/doc/header/csignal>) fosse colocado no namespace global
[ <stdarg.h>](<#/doc/header/cstdarg>) | Comporta-se como se cada nome de [`<cstdarg>`](<#/doc/header/cstdarg>) fosse colocado no namespace global
[ <stddef.h>](<#/doc/header/cstddef>) | Comporta-se como se cada nome de [`<cstddef>`](<#/doc/header/cstddef>) fosse colocado no namespace global, exceto pelos nomes de [`std::byte` e funções relacionadas](<#/doc/types/byte>)
[ <stdint.h>](<#/doc/header/cstdint>)(C++11) | Comporta-se como se cada nome de [`<cstdint>`](<#/doc/header/cstdint>) fosse colocado no namespace global
[ <stdio.h>](<#/doc/header/cstdio>) | Comporta-se como se cada nome de [`<cstdio>`](<#/doc/header/cstdio>) fosse colocado no namespace global
[ <stdlib.h>](<#/doc/header/cstdlib>) | Comporta-se como se cada nome de [`<cstdlib>`](<#/doc/header/cstdlib>) fosse colocado no namespace global
[ <string.h>](<#/doc/header/cstring>) | Comporta-se como se cada nome de [`<cstring>`](<#/doc/header/cstring>) fosse colocado no namespace global
[ <time.h>](<#/doc/header/ctime>) | Comporta-se como se cada nome de [`<ctime>`](<#/doc/header/ctime>) fosse colocado no namespace global
[ <uchar.h>](<#/doc/header/cuchar>)(C++11) | Comporta-se como se cada nome de [`<cuchar>`](<#/doc/header/cuchar>) fosse colocado no namespace global
[ <wchar.h>](<#/doc/header/cwchar>) | Comporta-se como se cada nome de [`<cwchar>`](<#/doc/header/cwchar>) fosse colocado no namespace global
[ <wctype.h>](<#/doc/header/cwctype>) | Comporta-se como se cada nome de [`<cwctype>`](<#/doc/header/cwctype>) fosse colocado no namespace global

#### Headers especiais de compatibilidade C

O header [`<stdatomic.h>`](<#/>) declara nomes que também são fornecidos na biblioteca padrão C, e define a macro `_Atomic` que é uma [palavra-chave](<#/>) em C. Ao contrário de outros headers `_xxx_.h`, o `<cstdatomic>` correspondente não é fornecido.

[ <stdatomic.h>](<#/doc/header/stdatomic.h>)(C++23) | Define `_Atomic` e fornece componentes correspondentes na biblioteca padrão C

#### Headers C vazios

Os headers [`<complex.h>`](<#/>), [`<ccomplex>`](<#/doc/header/ccomplex>), [`<tgmath.h>`](<#/>) e [`<ctgmath>`](<#/doc/header/ctgmath>) não contêm nenhum conteúdo da biblioteca padrão C e, em vez disso, apenas incluem outros headers da biblioteca padrão C++.

[ &lt;ccomplex&gt;](<#/doc/header/ccomplex>)(C++11)(obsoleto em C++17)(removido em C++20) | Simplesmente inclui o header [`<complex>`](<#/doc/header/complex>)
---|---
[ <complex.h>](<#/doc/header/ccomplex>)(C++11) | Simplesmente inclui o header [`<complex>`](<#/doc/header/complex>)
[ &lt;ctgmath&gt;](<#/doc/header/ctgmath>)(C++11)(obsoleto em C++17)(removido em C++20) | Simplesmente inclui os headers [`<complex>`](<#/doc/header/complex>) e [`<cmath>`](<#/doc/header/cmath>): as sobrecargas equivalentes ao conteúdo do header C `tgmath.h` já são fornecidas por esses headers
[ <tgmath.h>](<#/doc/header/ctgmath>)(C++11) | Simplesmente inclui os headers [`<complex>`](<#/doc/header/complex>) e [`<cmath>`](<#/doc/header/cmath>)

#### Headers C sem significado

Os headers [`<ciso646>`](<#/doc/header/ciso646>), [`<cstdalign>`](<#/doc/header/cstdalign>) e [`<cstdbool>`](<#/doc/header/cstdbool>) são sem significado em C++ porque as macros que eles fornecem em C são palavras-chave da linguagem em C++.

[ &lt;ciso646&gt;](<#/doc/header/ciso646>)(removido em C++20) | Header vazio. [As macros que aparecem em `iso646.h` em C](<#/>) são [palavras-chave em C++](<#/doc/language/operator_alternative>)
---|---
[ &lt;cstdalign&gt;](<#/doc/header/cstdalign>)(C++11)(obsoleto em C++17)(removido em C++20) | Define uma [constante de macro de compatibilidade](<#/doc/types>)
[ &lt;cstdbool&gt;](<#/doc/header/cstdbool>)(C++11)(obsoleto em C++17)(removido em C++20) | Define uma [constante de macro de compatibilidade](<#/doc/types>)
[ <iso646.h>](<#/doc/header/ciso646>) | Não tem efeito
[ <stdalign.h>](<#/doc/header/cstdalign>)(C++11) | Define uma [constante de macro de compatibilidade](<#/doc/types>)
[ <stdbool.h>](<#/doc/header/cstdbool>)(C++11) | Define uma [constante de macro de compatibilidade](<#/doc/types>)

#### Headers C não suportados

Os headers C [`<stdatomic.h>`](<#/>),(até C++23) [`<stdnoreturn.h>`](<#/>) e [`<threads.h>`](<#/>) não são incluídos em C++ e não possuem equivalentes `c_xxx_`.

### [Bibliotecas experimentais](<#/doc/header/experimental>)

[TRs/TSs C++](<#/doc/experimental>) também definem várias coleções de headers.

### Veja também

[Documentação C](<#/>) para headers da Biblioteca Padrão C
---
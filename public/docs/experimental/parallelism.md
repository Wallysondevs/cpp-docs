# Extensões para paralelismo

As Extensões C++ para Paralelismo, ISO/IEC TS 19570:2015, definem os seguintes novos componentes para a standard library C++:

### Políticas de execução

O TS de paralelismo descreve três políticas de execução: [sequential](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/parallelism/execution_policy&action=edit&redlink=1> "cpp/experimental/parallelism/execution policy \(page does not exist\)"), [parallel](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/parallelism/execution_policy&action=edit&redlink=1> "cpp/experimental/parallelism/execution policy \(page does not exist\)"), e [parallel+vector](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/parallelism/execution_policy&action=edit&redlink=1> "cpp/experimental/parallelism/execution policy \(page does not exist\)"), e fornece tipos e objetos de política de execução correspondentes. Usuários podem selecionar uma política de execução estaticamente invocando um algoritmo paralelo com um objeto de política de execução do tipo correspondente, ou dinamicamente usando a classe `execution_policy` que apaga tipos.

Implementações podem definir políticas de execução adicionais como uma extensão. A semântica de algoritmos paralelos invocados com um objeto de política de execução de tipo definido pela implementação é definida pela implementação.

Definido no header `[<experimental/execution_policy>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/execution_policy&action=edit&redlink=1> "cpp/header/experimental/execution policy \(page does not exist\)")`
---
[ sequential_execution_policyparallel_execution_policyparallel_vector_execution_policy](<#/doc/experimental/execution_policy_tag_t>) | tipos de política de execução
(classe)
[ seqparpar_vec](<#/doc/experimental/execution_policy_tag>) | objetos de política de execução globais
(constante)
[ execution_policy](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/execution_policy&action=edit&redlink=1> "cpp/experimental/execution policy \(page does not exist\)") | política de execução dinâmica
(classe)
[ is_execution_policy](<#/doc/experimental/is_execution_policy>) | testa se uma classe representa uma política de execução
(template de classe)

### Listas de exceção

Definido no header `[<experimental/exception_list>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/exception_list&action=edit&redlink=1> "cpp/header/experimental/exception list \(page does not exist\)")`
---
[ exception_list](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/exception_list&action=edit&redlink=1> "cpp/experimental/exception list \(page does not exist\)") | exceções lançadas durante execuções paralelas
(classe)

### Versões paralelizadas de algoritmos existentes

O TS fornece [versões paralelizadas](<#/doc/experimental/parallelism/existing>) dos seguintes 69 algoritmos de &lt;algorithm&gt;, &lt;numeric&gt; e &lt;memory&gt;:

Algoritmos da standard library para os quais versões paralelizadas são fornecidas
---

  * [std::adjacent_difference](<#/doc/algorithm/adjacent_difference>)
  * [std::adjacent_find](<#/doc/algorithm/adjacent_find>)
  * [std::all_of](<#/doc/algorithm/all_any_none_of>)
  * [std::any_of](<#/doc/algorithm/all_any_none_of>)
  * [std::copy](<#/doc/algorithm/copy>)
  * [std::copy_if](<#/doc/algorithm/copy>)
  * [std::copy_n](<#/doc/algorithm/copy_n>)
  * [std::count](<#/doc/algorithm/count>)
  * [std::count_if](<#/doc/algorithm/count>)
  * [std::equal](<#/doc/algorithm/equal>)
  * [std::fill](<#/doc/algorithm/fill>)
  * [std::fill_n](<#/doc/algorithm/fill_n>)
  * [std::find](<#/doc/algorithm/find>)
  * [std::find_end](<#/doc/algorithm/find_end>)
  * [std::find_first_of](<#/doc/algorithm/find_first_of>)
  * [std::find_if](<#/doc/algorithm/find>)
  * [std::find_if_not](<#/doc/algorithm/find>)
  * [std::generate](<#/doc/algorithm/generate>)
  * [std::generate_n](<#/doc/algorithm/generate_n>)
  * [std::includes](<#/doc/algorithm/includes>)
  * [std::inner_product](<#/doc/algorithm/inner_product>)
  * [std::inplace_merge](<#/doc/algorithm/inplace_merge>)
  * [std::is_heap](<#/doc/algorithm/is_heap>)
  * [std::is_heap_until](<#/doc/algorithm/is_heap_until>)
  * [std::is_partitioned](<#/doc/algorithm/is_partitioned>)
  * [std::is_sorted](<#/doc/algorithm/is_sorted>)
  * [std::is_sorted_until](<#/doc/algorithm/is_sorted_until>)
  * [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>)
  * [std::max_element](<#/doc/algorithm/max_element>)
  * [std::merge](<#/doc/algorithm/merge>)
  * [std::min_element](<#/doc/algorithm/min_element>)
  * [std::minmax_element](<#/doc/algorithm/minmax_element>)
  * [std::mismatch](<#/doc/algorithm/mismatch>)
  * [`std::move`](<#/doc/algorithm/move>)
  * [std::none_of](<#/doc/algorithm/all_any_none_of>)
  * [std::nth_element](<#/doc/algorithm/nth_element>)
  * [std::partial_sort](<#/doc/algorithm/partial_sort>)
  * [std::partial_sort_copy](<#/doc/algorithm/partial_sort_copy>)
  * [std::partition](<#/doc/algorithm/partition>)
  * [std::partition_copy](<#/doc/algorithm/partition_copy>)
  * [`std::remove`](<#/doc/algorithm/remove>)
  * [std::remove_copy](<#/doc/algorithm/remove_copy>)
  * [std::remove_copy_if](<#/doc/algorithm/remove_copy>)
  * [std::remove_if](<#/doc/algorithm/remove>)
  * [std::replace](<#/doc/algorithm/replace>)
  * [std::replace_copy](<#/doc/algorithm/replace_copy>)
  * [std::replace_copy_if](<#/doc/algorithm/replace_copy>)
  * [std::replace_if](<#/doc/algorithm/replace>)
  * [std::reverse](<#/doc/algorithm/reverse>)
  * [std::reverse_copy](<#/doc/algorithm/reverse_copy>)
  * [std::rotate](<#/doc/algorithm/rotate>)
  * [std::rotate_copy](<#/doc/algorithm/rotate_copy>)
  * [std::search](<#/doc/algorithm/search>)
  * [std::search_n](<#/doc/algorithm/search_n>)
  * [std::set_difference](<#/doc/algorithm/set_difference>)
  * [std::set_intersection](<#/doc/algorithm/set_intersection>)
  * [std::set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>)
  * [std::set_union](<#/doc/algorithm/set_union>)
  * [std::sort](<#/doc/algorithm/sort>)
  * [std::stable_partition](<#/doc/algorithm/stable_partition>)
  * [std::stable_sort](<#/doc/algorithm/stable_sort>)
  * [std::swap_ranges](<#/doc/algorithm/swap_ranges>)
  * [std::transform](<#/doc/algorithm/transform>)
  * [std::uninitialized_copy](<#/doc/memory/uninitialized_copy>)
  * [std::uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)
  * [std::uninitialized_fill](<#/doc/memory/uninitialized_fill>)
  * [std::uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>)
  * [std::unique](<#/doc/algorithm/unique>)
  * [std::unique_copy](<#/doc/algorithm/unique_copy>)

### Novos algoritmos

Definido no header `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`
---
[ for_each](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/for_each&action=edit&redlink=1> "cpp/experimental/for each \(page does not exist\)") | similar a [std::for_each](<#/doc/algorithm/for_each>) exceto que retorna void
(template de função)
[ for_each_n](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/for_each_n&action=edit&redlink=1> "cpp/experimental/for each n \(page does not exist\)") | aplica um objeto de função aos primeiros n elementos de uma sequência
(template de função)
Definido no header `[<experimental/numeric>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/numeric&action=edit&redlink=1> "cpp/header/experimental/numeric \(page does not exist\)")`

```cpp
 reduce(parallelism TS)
(template de função)
 exclusive_scan")
(template de função)
 inclusive_scan")
(template de função)
 transform_reduce(parallelism TS)
(template de função)
 transform_exclusive_scan")
(template de função)
 transform_inclusive_scan")
(template de função)
```

# Extensões das bibliotecas padrão C++

A Versão 1 das Extensões C++ para Fundamentos de Biblioteca, ISO/IEC TS 19568:2015, define os seguintes novos componentes para a biblioteca padrão C++:

## Não selecionados para inclusão no C++17

Os seguintes componentes da ISO/IEC TS 19568:2015 não foram selecionados para inclusão no C++17.

#### Versões modificadas de classes existentes para suportar allocators com type-erasure

Definido no header `[<experimental/functional>](<#/doc/header/experimental/functional>)`
---
[ function](<#/doc/experimental/function>) | uma versão modificada de [std::function](<#/doc/utility/functional/function>) com suporte para allocators com type-erasure
(class template)
Definido no header `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```cpp
 promise
(class template)
 packaged_task
(class template)
```

#### Adaptadores de recurso de memória

[ resource_adaptor](<#/doc/experimental/resource_adaptor>) | adapta um allocator em um memory_resource
(alias template)

### Utilitários gerais

Definido no header `[<experimental/utility>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/utility&action=edit&redlink=1> "cpp/header/experimental/utility \(page does not exist\)")`
---
[ erased_type](<#/doc/experimental/erased_type>) | tipo placeholder para type erasure, como em allocators
(class)
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
 invocation_typeraw_invocation_type
(class template)
```

### Macros de teste de recurso

Definido no header `[<experimental/optional>](<#/doc/header/experimental/optional>)`
---
__cpp_lib_experimental_optional | um valor de pelo menos 201411 indica que o tipo optional é suportado
(macro constant)
Definido no header `[<experimental/any>](<#/doc/header/experimental/any>)`

```cpp
__cpp_lib_experimental_any
(macro constant)
Definido no header `<experimental/string_view>`
__cpp_lib_experimental_string_view
(macro constant)
Definido no header `<experimental/tuple>")`
__cpp_lib_experimental_apply
(macro constant)
Definido no header `<experimental/type_traits>")`
__cpp_lib_experimental_type_trait_variable_templates
(macro constant)
__cpp_lib_experimental_invocation_type
(macro constant)
Definido no header `<experimental/functional>`
__cpp_lib_experimental_boyer_moore_searching
(macro constant)
__cpp_lib_experimental_function_erased_allocator
(macro constant)
Definido no header `<experimental/future>")`
__cpp_lib_experimental_promise_erased_allocator
(macro constant)
__cpp_lib_experimental_packaged_task_erased_allocator
(macro constant)
Definido no header `<experimental/memory>")`
__cpp_lib_experimental_shared_ptr_arrays
(macro constant)
Definido no header `<experimental/memory_resource>`
__cpp_lib_experimental_memory_resources
(macro constant)
Definido no header `<experimental/algorithm>")`
__cpp_lib_experimental_sample
(macro constant)
```

## Mesclado no C++17

Os seguintes componentes da ISO/IEC TS 19568:2015 foram incluídos no C++17.

### Objetos optional

Definido no header `[<experimental/optional>](<#/doc/header/experimental/optional>)`
---
[ optional](<#/doc/experimental/optional>) | um template de classe representando _objetos optional_
(class template)

### Classe `any`

Definido no header `[<experimental/any>](<#/doc/header/experimental/any>)`
---
[ any](<#/doc/experimental/any>) | um container type-safe para valores únicos de qualquer tipo
(class)

### `string_view`

Definido no header `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`
---
[ basic_string_view](<#/doc/experimental/basic_string_view>) | uma referência não-proprietária a uma string
(class template)

### Allocators com type-erasure e polimórficos

#### Allocators polimórficos e recursos de memória

As entidades nesta seção são declaradas no namespace std::experimental::pmr.

Definido no header `[<experimental/memory_resource>](<#/doc/header/experimental/memory_resource>)`
---
[ memory_resource](<#/doc/experimental/memory_resource>) | uma interface abstrata para classes que encapsulam recursos de memória
(class)
[ synchronized_pool_resource](<#/doc/experimental/synchronized_pool_resource>) | um [memory_resource](<#/doc/experimental/memory_resource>) thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)
[ unsynchronized_pool_resource](<#/doc/experimental/unsynchronized_pool_resource>) | um [memory_resource](<#/doc/experimental/memory_resource>) não thread-safe para gerenciar alocações em pools de diferentes tamanhos de bloco
(class)
[ monotonic_buffer_resource](<#/doc/experimental/monotonic_buffer_resource>) | um memory_resource de propósito especial que libera a memória alocada apenas quando o recurso é destruído
(class)
[ polymorphic_allocator](<#/doc/experimental/polymorphic_allocator>) | um allocator que suporta polimorfismo em tempo de execução baseado no memory_resource com o qual é construído
(class template)
[ new_delete_resource](<#/doc/experimental/new_delete_resource>) | retorna um `memory_resource` estático em todo o programa que usa os [operator new](<#/doc/memory/new/operator_new>) e [operator delete](<#/doc/memory/new/operator_delete>) globais para alocar e desalocar memória
(function)
[ null_memory_resource](<#/doc/experimental/null_memory_resource>) | retorna um `memory_resource` estático que não realiza nenhuma alocação
(function)
[ get_default_resource](<#/doc/experimental/get_default_resource>) | obtém o `memory_resource` padrão
(function)
[ set_default_resource](<#/doc/experimental/set_default_resource>) | define o `memory_resource` padrão
(function)

#### Aliases de conveniência para containers usando allocators polimórficos

[Aliases de conveniência e templates de alias](<#/doc/experimental/lib_extensions/pmr_container>) para containers usando allocators polimórficos são fornecidos no namespace `std::experimental::pmr` para os seguintes templates de classe na standard library:

Lista de templates de container para os quais aliases de conveniência são fornecidos
---

  * [std::vector](<#/doc/container/vector>)
  * [std::deque](<#/doc/container/deque>)
  * [std::forward_list](<#/doc/container/forward_list>)
  * [std::list](<#/doc/container/list>)
  * [std::basic_string](<#/doc/string/basic_string>)
  * [std::map](<#/doc/container/map>)
  * [std::multimap](<#/doc/container/multimap>)
  * [std::set](<#/doc/container/set>)
  * [std::multiset](<#/doc/container/multiset>)
  * [std::match_results](<#/doc/regex/match_results>)
  * [std::unordered_map](<#/doc/container/unordered_map>)
  * [std::unordered_multimap](<#/doc/container/unordered_multimap>)
  * [std::unordered_set](<#/doc/container/unordered_set>)
  * [std::unordered_multiset](<#/doc/container/unordered_multiset>)

### Suporte a array para `shared_ptr`

Definido no header `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`
---
Class | Descrição
---|---
[ shared_ptr](<#/doc/experimental/shared_ptr>) | uma versão modificada de [std::shared_ptr](<#/doc/memory/shared_ptr>) que suporta arrays
(class template)
[ weak_ptr](<#/doc/experimental/weak_ptr>) | uma versão modificada de [std::weak_ptr](<#/doc/memory/weak_ptr>) que suporta arrays
(class template)

### Algoritmos de amostragem e busca

Definido no header `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`
---
[ sample](<#/doc/experimental/sample>) | seleciona n elementos aleatórios de uma sequência
(function template)
[ search](<#/doc/experimental/search>) | aplica um Searcher a uma sequência
(function template)
Definido no header `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```cpp
 default_searcher
(class template)
 make_default_searcher
(function template)
 boyer_moore_searcher
(class template)
 make_boyer_moore_searcher
(function template)
 boyer_moore_horspool_searcher
(class template)
 make_boyer_moore_horspool_searcher
(function template)
```

### Utilitários gerais

Definido no header `[<experimental/tuple>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/tuple&action=edit&redlink=1> "cpp/header/experimental/tuple \(page does not exist\)")`
---
[ apply](<#/doc/experimental/apply>) | chama uma função para uma tuple de argumentos
(function template)

Além disso, o TS fornece [numerosos templates de variável `constexpr`](<#/doc/experimental/type_trait_variable_templates>) para os seguintes type traits e outros templates de classe na standard library:

Lista de type traits e outros templates de classe para os quais templates de variável são fornecidos
---

  * [std::is_void](<#/doc/types/is_void>)
  * [std::is_null_pointer](<#/doc/types/is_null_pointer>)
  * [std::is_integral](<#/doc/types/is_integral>)
  * [std::is_floating_point](<#/doc/types/is_floating_point>)
  * [std::is_array](<#/doc/types/is_array>)
  * [std::is_pointer](<#/doc/types/is_pointer>)
  * [std::is_lvalue_reference](<#/doc/types/is_lvalue_reference>)
  * [std::is_rvalue_reference](<#/doc/types/is_rvalue_reference>)
  * [std::is_member_object_pointer](<#/doc/types/is_member_object_pointer>)
  * [std::is_member_function_pointer](<#/doc/types/is_member_function_pointer>)
  * [std::is_enum](<#/doc/types/is_enum>)
  * [std::is_union](<#/doc/types/is_union>)
  * [std::is_class](<#/doc/types/is_class>)
  * [std::is_function](<#/doc/types/is_function>)
  * [std::is_reference](<#/doc/types/is_reference>)
  * [std::is_arithmetic](<#/doc/types/is_arithmetic>)
  * [std::is_fundamental](<#/doc/types/is_fundamental>)
  * [std::is_object](<#/doc/types/is_object>)
  * [std::is_scalar](<#/doc/types/is_scalar>)
  * [std::is_compound](<#/doc/types/is_compound>)
  * [std::is_member_pointer](<#/doc/types/is_member_pointer>)
  * [std::is_const](<#/doc/types/is_const>)
  * [std::is_volatile](<#/doc/types/is_volatile>)
  * [std::is_trivial](<#/doc/types/is_trivial>)
  * [std::is_trivially_copyable](<#/doc/types/is_trivially_copyable>)
  * [std::is_standard_layout](<#/doc/types/is_standard_layout>)
  * [std::is_pod](<#/doc/types/is_pod>)
  * [std::is_literal_type](<#/doc/types/is_literal_type>)
  * [std::is_empty](<#/doc/types/is_empty>)
  * [std::is_polymorphic](<#/doc/types/is_polymorphic>)
  * [std::is_abstract](<#/doc/types/is_abstract>)
  * [std::is_final](<#/doc/types/is_final>)
  * [std::is_signed](<#/doc/types/is_signed>)
  * [std::is_unsigned](<#/doc/types/is_unsigned>)
  * [std::is_constructible](<#/doc/types/is_constructible>)
  * [std::is_trivially_constructible](<#/doc/types/is_constructible>)
  * [std::is_nothrow_constructible](<#/doc/types/is_constructible>)
  * [std::is_default_constructible](<#/doc/types/is_default_constructible>)
  * [std::is_trivially_default_constructible](<#/doc/types/is_default_constructible>)
  * [std::is_nothrow_default_constructible](<#/doc/types/is_default_constructible>)
  * [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)
  * [std::is_trivially_copy_constructible](<#/doc/types/is_copy_constructible>)
  * [std::is_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)
  * [std::is_move_constructible](<#/doc/types/is_move_constructible>)
  * [std::is_trivially_move_constructible](<#/doc/types/is_move_constructible>)
  * [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)
  * [std::is_assignable](<#/doc/types/is_assignable>)
  * [std::is_trivially_assignable](<#/doc/types/is_assignable>)
  * [std::is_nothrow_assignable](<#/doc/types/is_assignable>)
  * [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)
  * [std::is_trivially_copy_assignable](<#/doc/types/is_copy_assignable>)
  * [std::is_nothrow_copy_assignable](<#/doc/types/is_copy_assignable>)
  * [std::is_move_assignable](<#/doc/types/is_move_assignable>)
  * [std::is_trivially_move_assignable](<#/doc/types/is_move_assignable>)
  * [std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)
  * [std::is_destructible](<#/doc/types/is_destructible>)
  * [std::is_trivially_destructible](<#/doc/types/is_destructible>)
  * [std::is_nothrow_destructible](<#/doc/types/is_destructible>)
  * [std::has_virtual_destructor](<#/doc/types/has_virtual_destructor>)
  * [std::alignment_of](<#/doc/types/alignment_of>)
  * [std::rank](<#/doc/types/rank>)
  * [std::extent](<#/doc/types/extent>)
  * [std::is_same](<#/doc/types/is_same>)
  * [std::is_base_of](<#/doc/types/is_base_of>)
  * [std::is_convertible](<#/doc/types/is_convertible>)
  * [std::ratio_equal](<#/doc/numeric/ratio/ratio_equal>)
  * [std::ratio_not_equal](<#/doc/numeric/ratio/ratio_not_equal>)
  * [std::ratio_less](<#/doc/numeric/ratio/ratio_less>)
  * [std::ratio_less_equal](<#/doc/numeric/ratio/ratio_less_equal>)
  * [std::ratio_greater](<#/doc/numeric/ratio/ratio_greater>)
  * [std::ratio_greater_equal](<#/doc/numeric/ratio/ratio_greater_equal>)
  * std::tuple_size
  * [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)
  * [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)
  * [std::is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)
  * [std::is_bind_expression](<#/doc/utility/functional/is_bind_expression>)
  * [std::is_placeholder](<#/doc/utility/functional/is_placeholder>)
  * [std::uses_allocator](<#/doc/memory/uses_allocator>)

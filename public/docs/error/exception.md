# std::exception

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
class exception;
Fornece uma interface consistente para lidar com erros através da expressão throw.
```

Todas as exceções geradas pela standard library herdam de `std::exception`.

```cpp
Todas as funções membro de `std::exception` são constexpr.  // (desde C++26)
```

### Funções membro

[ (construtor)](<#/doc/error/exception/exception>) | constrói o objeto exception
(função membro pública)
[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto exception
(função membro pública virtual)
[ operator=](<#/>) | copia o objeto exception
(função membro pública)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual)

### Requisitos de exceção padrão

Cada classe `T` da standard library que deriva de `std::exception` possui as seguintes funções membro publicamente acessíveis, cada uma delas não saindo com uma exceção (até C++11) tendo uma [especificação de exceção non-throwing](<#/doc/language/noexcept_spec>) (desde C++11):

*   [construtor padrão](<#/doc/language/default_constructor>) (a menos que outros construtores sejam fornecidos)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [operador de atribuição de cópia](<#/doc/language/as_operator>)

O construtor de cópia e o operador de atribuição de cópia satisfazem a seguinte pós-condição:

*   Se dois objetos lhs e rhs ambos têm o tipo dinâmico `T` e lhs é uma cópia de rhs, então [std::strcmp](<#/doc/string/byte/strcmp>)(lhs.what(), rhs.what()) é igual a ​0​.

A função membro `what()` de cada `T` satisfaz as restrições especificadas para [std::exception::what()](<#/doc/error/exception/what>).

### Exceções padrão

*   [`logic_error`](<#/doc/error/logic_error>)

*   [`invalid_argument`](<#/doc/error/invalid_argument>)
*   [`domain_error`](<#/doc/error/domain_error>)
*   [`length_error`](<#/doc/error/length_error>)
*   [`out_of_range`](<#/doc/error/out_of_range>)
*   [`future_error`](<#/doc/thread/future_error>) (desde C++11)

*   [`runtime_error`](<#/doc/error/runtime_error>)

*   [`range_error`](<#/doc/error/range_error>)
*   [`overflow_error`](<#/doc/error/overflow_error>)
*   [`underflow_error`](<#/doc/error/underflow_error>)
*   [`regex_error`](<#/doc/regex/regex_error>) (desde C++11)
*   [`system_error`](<#/doc/error/system_error>) (desde C++11)

*   [`ios_base::failure`](<#/doc/io/ios_base/failure>) (desde C++11)
*   [`filesystem::filesystem_error`](<#/doc/filesystem/filesystem_error>) (desde C++17)

*   [`tx_exception`](<#/doc/error/tx_exception>) (TM TS)
*   [`nonexistent_local_time`](<#/doc/chrono/nonexistent_local_time>) (desde C++20)
*   [`ambiguous_local_time`](<#/doc/chrono/ambiguous_local_time>) (desde C++20)
*   [`format_error`](<#/doc/utility/format/format_error>) (desde C++20)

*   [`bad_typeid`](<#/doc/types/bad_typeid>)
*   [`bad_cast`](<#/doc/types/bad_cast>)

*   [`bad_any_cast`](<#/doc/utility/any/bad_any_cast>) (desde C++17)

*   [`bad_optional_access`](<#/doc/utility/optional/bad_optional_access>) (desde C++17)
*   [`bad_expected_access`](<#/doc/utility/expected/bad_expected_access>) (desde C++23)
*   [`bad_weak_ptr`](<#/doc/memory/bad_weak_ptr>) (desde C++11)
*   [`bad_function_call`](<#/doc/utility/functional/bad_function_call>) (desde C++11)
*   [`bad_alloc`](<#/doc/memory/new/bad_alloc>)

*   [`bad_array_new_length`](<#/doc/memory/new/bad_array_new_length>) (desde C++11)

*   [`bad_exception`](<#/doc/error/bad_exception>)
*   [`ios_base::failure`](<#/doc/io/ios_base/failure>) (até C++11)
*   [`bad_variant_access`](<#/doc/utility/variant/bad_variant_access>) (desde C++17)

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | não havia requisito para classes da standard library derivadas de `std::exception` | adicionado
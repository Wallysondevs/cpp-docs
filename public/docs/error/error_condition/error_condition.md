# std::error_condition::error_condition

```cpp
error_condition() noexcept;                                       // (1) (desde C++11)
error_condition( int val, const error_category& cat ) noexcept;   // (2) (desde C++11)
template< class ErrorConditionEnum >
error_condition( ErrorConditionEnum e ) noexcept;                 // (3) (desde C++11)
error_condition( const error_condition& other ) = default;        // (4) (desde C++11)
                                                                  // (implicitly declared)
error_condition( error_condition&& other ) = default;             // (5) (desde C++11)
                                                                  // (implicitly declared)
```
Constrói uma nova condição de erro.

1) Construtor padrão. Inicializa a condição de erro com categoria genérica e valor de erro ​0​.

2) Inicializa a condição de erro com o valor de erro `val` e a categoria de erro `cat`.

3) Inicializa a condição de erro com o enum `e`. Efetivamente chama `make_error_condition` que é encontrada apenas por [argument-dependent lookup](<#/doc/language/adl>) para `e`. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)&lt;ErrorConditionEnum&gt;::value for true.

4,5) Construtor de cópia e construtor de movimento definidos implicitamente. Inicializa a condição de erro com o conteúdo de `other`.

### Parâmetros

| other | - | outra condição de erro para inicializar |
|---|---|---|
| val | - | valor de erro |
| cat | - | categoria de erro |
| e | - | enum de condição de erro |

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

| DR | Aplicado a | Comportamento conforme publicado | Comportamento correto |
|---|---|---|---|
| [LWG 3629](<https://cplusplus.github.io/LWG/issue3629>) | C++11 | apenas sobrecargas de `std::make_error_condition` eram usadas | Sobrecargas encontradas por ADL são usadas |

### Veja também

| [ make_error_condition(std::errc)](<#/doc/error/errc/make_error_condition>)(C++11) | cria uma condição de erro para um valor `errc` e |
|---|---|
| (função)
| [ make_error_condition(std::io_errc)](<#/doc/io/io_errc/make_error_condition>)(C++11) | constrói uma condição de erro de iostream |
| (função)
| [ make_error_condition(std::future_errc)](<#/doc/thread/future_errc/make_error_condition>)(C++11) | constrói uma `error_condition` de future |
| (função)
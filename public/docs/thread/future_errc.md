# std::future_errc

Definido no header `[<future>](<#/doc/header/future>)`

```cpp
enum class future_errc {
broken_promise = /* implementation-defined */,
future_already_retrieved = /* implementation-defined */,
promise_already_satisfied = /* implementation-defined */,
no_state = /* implementation-defined */
};  // (desde C++11)
```

A enumeração com escopo `std::future_errc` define os códigos de erro reportados por [std::future](<#/doc/thread/future>) e classes relacionadas em objetos de exceção [std::future_error](<#/doc/thread/future_error>). Apenas quatro códigos de erro são obrigatórios, embora a implementação possa definir códigos de erro adicionais. Como a especialização apropriada de [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>) é fornecida, valores do tipo `std::future_errc` são implicitamente conversíveis para [std::error_code](<#/doc/error/error_code>).

Todos os códigos de erro são distintos e não-zero.

### Constantes Membro

Nome | Explicação
---|---
`broken_promise` | a tarefa assíncrona abandonou seu estado compartilhado
`future_already_retrieved` | o conteúdo do estado compartilhado já foi acessado através de [std::future](<#/doc/thread/future>)
`promise_already_satisfied` | tentativa de armazenar um valor no estado compartilhado duas vezes
`no_state` | tentativa de acessar [std::promise](<#/doc/thread/promise>) ou [std::future](<#/doc/thread/future>) sem um estado compartilhado associado

### Funções Não-Membro

[ make_error_code(std::future_errc)](<#/doc/thread/future_errc/make_error_code>)(C++11) | constrói um código de erro de future
(função)
[ make_error_condition(std::future_errc)](<#/doc/thread/future_errc/make_error_condition>)(C++11) | constrói uma `error_condition` de future
(função)

### Classes Auxiliares

[ is_error_code_enum<std::future_errc>](<#/doc/thread/future_errc/is_error_code_enum>)(C++11) | estende o type trait [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>) para identificar códigos de erro de future
(modelo de classe)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2056](<https://cplusplus.github.io/LWG/issue2056>) | C++11 | `broken_promise` foi especificado como zero, o que é convencionalmente usado para significar "nenhum erro" | especificado como não-zero

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | mantém um código de erro dependente da plataforma
(classe)
[ error_condition](<#/doc/error/error_condition>)(C++11) | mantém um código de erro portátil
(classe)
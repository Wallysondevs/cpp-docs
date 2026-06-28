# std::future_category

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
const std::error_category& future_category() noexcept;
```

Obtém uma referência para o objeto de categoria de erro estático para os erros relacionados a futures e promises. O objeto é obrigado a sobrescrever a função virtual error_category::name() para retornar um ponteiro para a string "future". É usado para identificar códigos de erro fornecidos nas exceções do tipo [std::future_error](<#/doc/thread/future_error>).

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto estático de tipo de tempo de execução não especificado, derivado de [std::error_category](<#/doc/error/error_category>).

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ future_errc](<#/doc/thread/future_errc>)(C++11) | identifica os códigos de erro de future
(enum)
[ future_error](<#/doc/thread/future_error>)(C++11) | reporta um erro relacionado a futures ou promises
(classe)
[ error_category](<#/doc/error/error_category>)(C++11) | classe base para categorias de erro
(classe)
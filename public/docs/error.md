# Biblioteca de Diagnósticos

### Tratamento de exceções
  
O cabeçalho [`<exception>`](<#/doc/header/exception>) fornece várias classes e funções relacionadas ao tratamento de exceções em programas C++.

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`  
---  
[ exception](<#/doc/error/exception>) | classe base para exceções lançadas pelos componentes da standard library   
(class)  
  
##### Captura e armazenamento de objetos de exceção   
  
[ uncaught_exceptionuncaught_exceptions](<#/doc/error/exception/uncaught_exception>)(removido em C++20*)(C++17) | verifica se o tratamento de exceções está atualmente em andamento   
(function)  
[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para tratamento de objetos de exceção   
(typedef)  
[ make_exception_ptr](<#/doc/error/make_exception_ptr>)(C++11) | cria um [std::exception_ptr](<#/doc/error/exception_ptr>) a partir de um objeto de exceção   
(function template)  
[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um [std::exception_ptr](<#/doc/error/exception_ptr>)   
(function)  
[ rethrow_exception](<#/doc/error/rethrow_exception>)(C++11) | lança a exceção de um [std::exception_ptr](<#/doc/error/exception_ptr>)   
(function)  
[ nested_exception](<#/doc/error/nested_exception>)(C++11) | um tipo mixin para capturar e armazenar exceções atuais   
(class)  
[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com [std::nested_exception](<#/doc/error/nested_exception>) misturado   
(function template)  
[ rethrow_if_nested](<#/doc/error/rethrow_if_nested>)(C++11) | lança a exceção de um [std::nested_exception](<#/doc/error/nested_exception>)   
(function template)  
  
##### Tratamento de falhas no tratamento de exceções   
  
Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`  

```cpp
 terminate
(function)
 terminate_handler
(typedef)
 get_terminate(C++11)
(function)
 set_terminate
(function)
 bad_exception
(class)
```

  
##### Tratamento de violações de especificação de exceção (até C++17)  
  
[ unexpected](<#/doc/error/unexpected>)(obsoleto em C++11)(removido em C++17) | função chamada quando a especificação de exceção dinâmica é violada   
(function)  
[ unexpected_handler](<#/doc/error/exception/unexpected_handler>)(obsoleto em C++11)(removido em C++17) | o tipo da função chamada por [std::unexpected](<#/doc/error/unexpected>)   
(typedef)  
[ get_unexpected](<#/doc/error/exception/get_unexpected>)(obsoleto em C++11)(removido em C++17) | obtém o `unexpected_handler` atual   
(function)  
[ set_unexpected](<#/doc/error/exception/set_unexpected>)(obsoleto em C++11)(removido em C++17) | altera a função a ser chamada por [std::unexpected](<#/doc/error/unexpected>)   
(function)  
  
### Categorias de exceção

Várias classes de conveniência são predefinidas no cabeçalho `<stdexcept>` para relatar condições de erro específicas. Essas classes podem ser divididas em duas categorias: erros de _lógica_ e erros de _tempo de execução_. Erros de lógica são uma consequência de lógica falha dentro do programa e podem ser evitáveis. Erros de tempo de execução são devido a eventos fora do escopo do programa e não podem ser facilmente previstos.

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`  
---  
[ logic_error](<#/doc/error/logic_error>) | classe de exceção para indicar violações de pré-condições lógicas ou invariantes de classe   
(class)  
[ invalid_argument](<#/doc/error/invalid_argument>) | classe de exceção para relatar argumentos inválidos   
(class)  
[ domain_error](<#/doc/error/domain_error>) | classe de exceção para relatar erros de domínio   
(class)  
[ length_error](<#/doc/error/length_error>) | classe de exceção para relatar tentativas de exceder o tamanho máximo permitido   
(class)  
[ out_of_range](<#/doc/error/out_of_range>) | classe de exceção para relatar argumentos fora do range esperado   
(class)  
[ runtime_error](<#/doc/error/runtime_error>) | classe de exceção para indicar condições detectáveis apenas em tempo de execução   
(class)  
[ range_error](<#/doc/error/range_error>) | classe de exceção para relatar erros de range em computações internas   
(class)  
[ overflow_error](<#/doc/error/overflow_error>) | classe de exceção para relatar overflows aritméticos   
(class)  
[ underflow_error](<#/doc/error/underflow_error>) | classe de exceção para relatar underflows aritméticos   
(class)  
[ tx_exception](<#/doc/error/tx_exception>)(TM TS) | classe de exceção para cancelar transações atômicas   
(class template)  
  
### Números de erro

Definido no cabeçalho `[<cerrno>](<#/doc/header/cerrno>)`  
---  
[ errno](<#/doc/error/errno>) | macro que se expande para uma variável de número de erro thread-local compatível com POSIX  
(macro variable)  
[ E2BIG, EACCES, ..., EXDEV](<#/doc/error/errno_macros>) | macros para condições de erro padrão compatíveis com POSIX   
(macro constant)  
  
### Erro de sistema (desde C++11)

O cabeçalho `<system_error>` define tipos e funções usadas para relatar condições de erro originadas do sistema operacional, I/O de streams, [std::future](<#/doc/thread/future>), ou outras APIs de baixo nível.

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`  
---  
[ error_category](<#/doc/error/error_category>)(C++11) | classe base para categorias de erro   
(class)  
[ generic_category](<#/doc/error/generic_category>)(C++11) | identifica a categoria de erro genérica   
(function)  
[ system_category](<#/doc/error/system_category>)(C++11) | identifica a categoria de erro do sistema operacional   
(function)  
[ error_condition](<#/doc/error/error_condition>)(C++11) | mantém um código de erro portátil   
(class)  
[ errc](<#/doc/error/errc>)(C++11) | a enumeração [std::error_condition](<#/doc/error/error_condition>) listando todas as constantes de macro padrão [`<cerrno>`](<#/doc/header/cerrno>)   
(class)  
[ error_code](<#/doc/error/error_code>)(C++11) | mantém um código de erro dependente da plataforma   
(class)  
[ system_error](<#/doc/error/system_error>)(C++11) | classe de exceção usada para relatar condições que possuem um error_code   
(class)  
  
### Asserções

Asserções ajudam a implementar a verificação de pré-condições em programas.

Definido no cabeçalho `[<cassert>](<#/doc/header/cassert>)`  
---  
[ assert](<#/doc/error/assert>) | aborta o programa se a condição especificada pelo usuário não for verdadeira. Pode ser desabilitado para builds de release.   
(function macro)  
  
### [Stacktrace](<#/doc/utility/basic_stacktrace>) (desde C++23)

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`  
---  
[ stacktrace_entry](<#/doc/utility/stacktrace_entry>)(C++23) | representação de uma avaliação em um stacktrace   
(class)  
[ basic_stacktrace](<#/doc/utility/basic_stacktrace>)(C++23) | representação aproximada de uma sequência de invocação que consiste em entradas de stacktrace   
(class template)  
  
### Suporte a depuração (desde C++26)

Definido no cabeçalho `[<debugging>](<#/doc/header/debugging>)`  
---  
[ breakpoint](<#/doc/utility/breakpoint>)(C++26) | pausa o programa em execução quando chamado   
(function)  
[ breakpoint_if_debugging](<#/doc/utility/breakpoint_if_debugging>)(C++26) | chama std::breakpoint se std::is_debugger_present retornar true   
(function)  
[ is_debugger_present](<#/doc/utility/is_debugger_present>)(C++26) | verifica se um programa está sendo executado sob o controle de um depurador   
(function)  
  
### Veja também

[`static_assert` declaration](<#/doc/language/static_assert>) (C++11) | realiza verificação de asserção em tempo de compilação  
[documentação C](<#/>) para tratamento de erros
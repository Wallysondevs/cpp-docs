# std::terminate

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
void terminate();
[[noreturn]] void terminate() noexcept;
```

`std::terminate()` é chamada pelo runtime C++ quando o programa não pode continuar por qualquer dos seguintes motivos:

1) Uma [exceção é lançada](<#/doc/language/throw>) e não é capturada (é definido pela implementação se algum desenrolamento da pilha é feito neste caso).

2) Uma função invocada diretamente pelo mecanismo de tratamento de exceções, enquanto trata uma exceção que ainda não foi capturada, sai via uma exceção (por exemplo, um destrutor de algum objeto local, ou um construtor de cópia construindo um parâmetro de cláusula catch).

3) O construtor ou o destrutor de um objeto estático ou thread-local (desde C++11) lança uma exceção.

4) Uma função registrada com [std::atexit](<#/doc/utility/program/atexit>) ou [std::at_quick_exit](<#/doc/utility/program/at_quick_exit>) (desde C++11) lança uma exceção.

5) Uma [especificação de exceção dinâmica](<#/doc/language/except_spec>) é violada e o handler padrão para [std::unexpected](<#/doc/error/unexpected>) é executado.
```cpp
6) Um handler não padrão para std::unexpected lança uma exceção que viola a especificação de exceção dinâmica previamente violada, se a especificação não incluir std::bad_exception.  // (até C++17)
7) Uma especificação noexcept é violada (é definido pela implementação se algum desenrolamento da pilha é feito neste caso).
8) std::nested_exception::rethrow_nested é chamada para um objeto que não está segurando uma exceção capturada.
9) Uma exceção é lançada da função inicial de std::thread.
10) Um std::thread joinable é destruído ou atribuído.
11) std::condition_variable::wait, std::condition_variable::wait_until, ou std::condition_variable::wait_for falha em atingir sua pós-condição (por exemplo, se o religamento do mutex lançar uma exceção).  // (desde C++11)
12) Uma função invocada por um algoritmo paralelo sai via uma exceção não capturada e a política de execução especifica a terminação.  // (desde C++17)
```

`std::terminate()` também pode ser chamada diretamente do programa.

Quando `std::terminate` é chamada devido a uma exceção lançada, um handler try/catch implícito é considerado ativo. Assim, chamar [std::current_exception](<#/doc/error/current_exception>) retornará a exceção lançada.

Em qualquer caso, `std::terminate` chama o [std::terminate_handler](<#/doc/error/terminate_handler>) atualmente instalado. O [std::terminate_handler](<#/doc/error/terminate_handler>) padrão chama [std::abort](<#/doc/utility/program/abort>).

Se um destrutor redefiniu o handler de terminação durante o desenrolamento da pilha e o desenrolamento posteriormente levou a `terminate` ser chamada, o handler que foi instalado no final da expressão throw é o que será chamado. (nota: era ambíguo se relançar aplicava os novos handlers) | (até C++11)
---|---
Se um destrutor redefiniu o handler de terminação durante o desenrolamento da pilha, é não especificado qual handler é chamado se o desenrolamento posteriormente levar a `terminate` ser chamada. | (desde C++11)

### Notas

Se o mecanismo de handler não for desejado, por exemplo, porque requer operações atômicas que podem aumentar o tamanho do binário, uma chamada direta para [std::abort](<#/doc/utility/program/abort>) é preferida ao terminar o programa anormalmente.

Alguns intrinsics do compilador, por exemplo, [`__builtin_trap`](<https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html>) (gcc, clang e icc) ou [`__debugbreak`](<https://docs.microsoft.com/en-us/cpp/intrinsics/debugbreak?view=msvc-160>) (msvc), podem ser usados para terminar o programa o mais rápido possível.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2111](<https://cplusplus.github.io/LWG/issue2111>) | C++11 | o efeito de chamar [std::set_terminate](<#/doc/error/set_terminate>) durante o desenrolamento da pilha difere do C++98 e quebra algumas ABIs | tornado não especificado

### Veja também

[ terminate_handler](<#/doc/error/terminate_handler>) | o tipo da função chamada por **std::terminate**
(typedef)
[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ breakpoint](<#/doc/utility/breakpoint>) (C++26) | pausa o programa em execução quando chamada
(função)
# std::signal

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`

```c
/* signal-handler */* signal( int sig, /* signal-handler */* handler );
extern "C" using /* signal-handler */ = void(int);
```

Altera o tratamento do sinal sig. Dependendo de handler, o sinal pode ser ignorado, definido para o padrão, ou tratado por uma função definida pelo usuário.

Quando o signal handler é definido para uma função e um sinal ocorre, é definido pela implementação se std::signal(sig, [SIG_DFL](<#/doc/utility/program/SIG_strategies>)) será executado imediatamente antes do início do signal handler. Além disso, a implementação pode impedir que um conjunto de sinais definido pela implementação ocorra enquanto o signal handler é executado.

Para alguns dos sinais, a implementação pode chamar std::signal(sig, [SIG_IGN](<#/doc/utility/program/SIG_strategies>)) na inicialização do programa. Para os demais, a implementação deve chamar std::signal(sig, [SIG_DFL](<#/doc/utility/program/SIG_strategies>)).

(Nota: POSIX introduziu [`sigaction`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/sigaction.html>) para padronizar esses comportamentos definidos pela implementação)

### Parâmetros

- **sig** — o sinal para o qual definir o signal handler. Pode ser um valor definido pela implementação ou um dos seguintes valores: | [ SIGABRTSIGFPESIGILLSIGINTSIGSEGVSIGTERM](<#/doc/utility/program/SIG_types>) | define tipos de sinal
(constante de macro)
- **handler** — o signal handler. Deve ser um dos seguintes:

  * macro [SIG_DFL](<#/doc/utility/program/SIG_strategies>). O signal handler é definido para o signal handler padrão.
  * macro [SIG_IGN](<#/doc/utility/program/SIG_strategies>). O sinal é ignorado.
  * Um ponteiro para uma função. A assinatura da função deve ser equivalente à seguinte:

| extern "C" void fun(int sig);

### Valor de retorno

O signal handler anterior em caso de sucesso ou [SIG_ERR](<#/doc/utility/program/SIG_ERR>) em caso de falha (definir um signal handler pode ser desabilitado em algumas implementações).

### Signal handler

As seguintes limitações são impostas à função definida pelo usuário que é instalada como um signal handler.

Se o signal handler for chamado NÃO como resultado de [std::abort](<#/doc/utility/program/abort>) ou [std::raise](<#/doc/utility/program/raise>) (sinal assíncrono), o comportamento é indefinido se

  * o signal handler chamar qualquer função da standard library, exceto

    

  * [std::abort](<#/doc/utility/program/abort>)
  * [std::_Exit](<#/doc/utility/program/_Exit>)
  * [std::quick_exit](<#/doc/utility/program/quick_exit>)
  * `std::signal` com o primeiro argumento sendo o número do sinal atualmente tratado (um handler assíncrono pode se registrar novamente, mas não outros sinais).

  * o signal handler referenciar qualquer objeto com duração de armazenamento estática que não seja [std::atomic](<#/doc/atomic/atomic>) ou (desde C++11) volatile [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>).

| (até C++17)
Uma _operação atômica lock-free simples_ é uma invocação de uma função f de [`<atomic>`](<#/doc/header/atomic>) ou [`<stdatomic.h>`](<#/doc/header/stdatomic.h>)(desde C++23), tal que:

  * f é a função [std::atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>),
  * f é a função membro `is_lock_free` (por exemplo, [`std::atomic::is_lock_free()`](<#/doc/atomic/atomic/is_lock_free>)),
  * f é uma função membro não estática de [std::atomic_flag](<#/doc/atomic/atomic_flag>),
  * f é uma função não membro, e o primeiro parâmetro de f tem o tipo _cv_ [std::atomic_flag](<#/doc/atomic/atomic_flag>)*,
  * f é uma função membro não estática invocada em um objeto obj, tal que obj.is_lock_free() retorna true, ou
  * f é uma função não membro, e para cada argumento ponteiro-para-atômico arg passado para f, [std::atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(arg) retorna true.

O comportamento é indefinido se qualquer signal handler realizar qualquer um dos seguintes:

  * chamada para qualquer função da biblioteca, exceto para operações atômicas lock-free simples e as seguintes funções _signal-safe_ (note, em particular, que a alocação dinâmica não é signal-safe):

    

  * `std::signal` com o primeiro argumento sendo o número do sinal atualmente tratado (o signal handler pode se registrar novamente, mas não outros sinais).
  * funções membro de [std::numeric_limits](<#/doc/types/numeric_limits>)
  * [std::_Exit](<#/doc/utility/program/_Exit>)
  * [std::abort](<#/doc/utility/program/abort>)
  * [std::quick_exit](<#/doc/utility/program/quick_exit>)
  * As funções membro de [std::initializer_list](<#/doc/utility/initializer_list>) e as sobrecargas de `std::initializer_list` de [std::begin](<#/doc/iterator/begin>) e [std::end](<#/doc/iterator/end>)
  * [std::forward](<#/doc/utility/forward>), std::move, [std::move_if_noexcept](<#/doc/utility/move_if_noexcept>)
  * Todas as funções de [`<type_traits>`](<#/doc/header/type_traits>)
  * [std::memcpy](<#/doc/string/byte/memcpy>) e [std::memmove](<#/doc/string/byte/memmove>)

  * acesso a um objeto com duração de armazenamento de thread
  * uma expressão [`dynamic_cast`](<#/doc/language/dynamic_cast>)
  * uma expressão [`throw`](<#/doc/language/throw>)
  * entrada em um [`try block`](<#/doc/language/try>)
  * inicialização de uma variável estática que realiza [inicialização dinâmica não local](<#/doc/language/initialization>) (incluindo atrasada até o primeiro uso ODR)
  * espera pela conclusão da inicialização de qualquer variável com duração de armazenamento estática devido a outro thread a inicializando concorrentemente

| (desde C++17)

Se a função definida pelo usuário retornar ao tratar [SIGFPE](<#/doc/utility/program/SIG_types>), [SIGILL](<#/doc/utility/program/SIG_types>), [SIGSEGV](<#/doc/utility/program/SIG_types>) ou qualquer outro sinal definido pela implementação que especifique uma exceção computacional, o comportamento é indefinido.

Se o signal handler for chamado como resultado de [std::abort](<#/doc/utility/program/abort>) ou [std::raise](<#/doc/utility/program/raise>) (sinal síncrono), o comportamento é indefinido se o signal handler chamar [std::raise](<#/doc/utility/program/raise>).

Na entrada do signal handler, o estado do [ambiente de ponto flutuante](<#/doc/numeric/fenv>) e os valores de todos os objetos são não especificados, exceto para

  * objetos do tipo volatile [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>)

|

  * objetos de tipos [std::atomic](<#/doc/atomic/atomic>) lock-free
  * efeitos colaterais tornados visíveis através de [std::atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)

| (desde C++11)

No retorno de um signal handler, o valor de qualquer objeto modificado pelo signal handler que não seja volatile [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) ou [std::atomic](<#/doc/atomic/atomic>) lock-free é indeterminado.

(até C++14)
Uma chamada para a função `signal()` [sincroniza-com](<#/doc/atomic/memory_order>) qualquer invocação resultante do signal handler. Se um signal handler for executado como resultado de uma chamada para [std::raise](<#/doc/utility/program/raise>) (sincronamente), então a execução do handler é _sequenciada-depois_ da invocação de `std::raise` e _sequenciada-antes_ do retorno dela e é executada no mesmo thread que std::raise. A execução dos handlers para outros sinais é _não sequenciada_ em relação ao resto do programa e é executada em um thread não especificado. Dois acessos ao mesmo objeto do tipo volatile [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) não resultam em uma data race se ambos ocorrerem no mesmo thread, mesmo que um ou mais ocorram em um signal handler. Para cada invocação de signal handler, as avaliações realizadas pelo thread que invoca um signal handler podem ser divididas em dois grupos A e B, de modo que nenhuma avaliação em B _aconteça-antes_ das avaliações em A, e as avaliações de tais objetos volatile [std::sig_atomic_t](<#/doc/utility/program/sig_atomic_t>) assumem valores como se todas as avaliações em A [tivessem-acontecido-antes](<#/doc/atomic/memory_order>) da execução do signal handler e a execução do signal handler _tivesse-acontecido-antes_ de todas as avaliações em B. | (desde C++14)

### Notas

POSIX exige que `signal` seja thread-safe, e [especifica uma lista de funções de biblioteca async-signal-safe](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html#tag_15_04>) que podem ser chamadas de qualquer signal handler.

Espera-se que os signal handlers tenham [ligação C](<#/doc/language/language_linkage>) e, em geral, usem apenas os recursos do subconjunto comum de C e C++. No entanto, implementações comuns permitem que uma função com ligação C++ seja usada como um signal handler.

### Exemplo

Execute este código
```cpp
    #include <csignal>
    #include <iostream>
    
    namespace
    {
        volatile std::sig_atomic_t gSignalStatus;
    }
    
    void signal_handler(int signal)
    {
        gSignalStatus = signal;
    }
    
    int main()
    {
        // Instala um signal handler
        std::signal(SIGINT, signal_handler);
    
        std::cout << "SignalValue: " << gSignalStatus << '\n';
        std::cout << "Sending signal: " << SIGINT << '\n';
        std::raise(SIGINT);
        std::cout << "SignalValue: " << gSignalStatus << '\n';
    }
```

Saída possível:
```
    SignalValue: 0
    Sending signal: 2
    SignalValue: 2
```

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 17.13.5 Signal handlers [support.signal]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 17.13.5 Signal handlers [support.signal]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 21.10.4 Signal handlers [support.signal]

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3756](<https://cplusplus.github.io/LWG/issue3756>) | C++17 | não estava claro se [std::atomic_flag](<#/doc/atomic/atomic_flag>) é signal-safe | é

### Ver também

[ raise](<#/doc/utility/program/raise>) | executa o signal handler para um sinal específico
(função)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(C++11) | barreira entre um thread e um signal handler executado no mesmo thread
(função)
[documentação C](<#/>) para signal
# std::stop_source

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
class stop_source;
```

A classe `stop_source` fornece os meios para emitir uma solicitação de parada, como para o cancelamento de [std::jthread](<#/doc/thread/jthread>). Uma solicitação de parada feita para um objeto `stop_source` é visível para todos os `stop_source`s e [std::stop_token](<#/doc/thread/stop_token>)s do mesmo estado de parada associado; quaisquer [std::stop_callback](<#/doc/thread/stop_callback>)(s) registrados para [std::stop_token](<#/doc/thread/stop_token>)(s) associados serão invocados, e quaisquer objetos [std::condition_variable_any](<#/doc/thread/condition_variable_any>) esperando em [std::stop_token](<#/doc/thread/stop_token>)(s) associados serão despertados.

Uma vez que uma parada é solicitada, ela não pode ser retirada. Solicitações de parada adicionais não têm efeito.

### Funções membro

[ (construtor)](<#/doc/thread/stop_source/stop_source>) | constrói um novo objeto `stop_source`
(função membro pública)
[ (destrutor)](<#/doc/thread/stop_source/~stop_source>) | destrói o objeto `stop_source`
(função membro pública)
[ operator=](<#/>) | atribui o objeto `stop_source`
(função membro pública)

##### Modificadores

[ request_stop](<#/doc/thread/stop_source/request_stop>) | faz uma solicitação de parada para o estado de parada associado, se houver
(função membro pública)
[ swap](<#/doc/thread/stop_source/swap>) | troca dois objetos `stop_source`
(função membro pública)

##### Observadores

[ get_token](<#/doc/thread/stop_source/get_token>) | retorna um `stop_token` para o estado de parada associado
(função membro pública)
[ stop_requested](<#/doc/thread/stop_source/stop_requested>) | verifica se o estado de parada associado foi solicitado a parar
(função membro pública)
[ stop_possible](<#/doc/thread/stop_source/stop_possible>) | verifica se o estado de parada associado pode ser solicitado a parar
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/thread/stop_source/operator_cmp>)(C++20) | compara dois objetos `std::stop_source`
(função)
[ swap(std::stop_source)](<#/doc/thread/stop_source/swap2>)(C++20) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Tags auxiliares

[ nostopstatenostopstate_t](<#/doc/thread/stop_source/nostopstate_t>)(C++20) | uma tag usada para `stop_source` para indicar nenhum estado de parada associado na construção
(tag)

### Notas

Para os propósitos de cancelamento de [std::jthread](<#/doc/thread/jthread>), o objeto `stop_source` deve ser recuperado do objeto [std::jthread](<#/doc/thread/jthread>) usando [`get_stop_source()`](<#/doc/thread/jthread/get_stop_source>); ou a parada deve ser solicitada diretamente do objeto [std::jthread](<#/doc/thread/jthread>) usando [`request_stop()`](<#/doc/thread/jthread/request_stop>). Isso então usará o mesmo estado de parada associado que foi passado para o argumento da função invocada de [std::jthread](<#/doc/thread/jthread>) (ou seja, a função sendo executada em sua thread).

Para outros usos, no entanto, um `stop_source` pode ser construído separadamente usando o construtor padrão, que cria um novo estado de parada.

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_jthread`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | [Stop token](<#/doc/thread/stop_token>) e [thread de junção](<#/doc/thread/jthread>)

### Exemplo

Run this code
```cpp
    #include <chrono>
    #include <iostream>
    #include <stop_token>
    #include <thread>
     
    using namespace std::chrono_literals;
     
    void worker_fun(int id, std::stop_token stoken)
    { 
        for (int i = 10; i; --i)
        {
            std::this_thread::sleep_for(300ms);
            if (stoken.stop_requested())
            {
                std::printf("  worker%d is requested to stop\n", id);
                return;
            }
            std::printf("  worker%d goes back to sleep\n", id);
        }
    }
     
    int main()
    {
        std::jthread threads[4];
        std::cout << std::boolalpha;
        auto print = 
        {
            std::printf("stop_source stop_possible = %s, stop_requested = %s\n",
                        source.stop_possible() ? "true" : "false",
                        source.stop_requested() ? "true" : "false");
        };
     
        // Common source
        std::stop_source stop_source;
     
        print(stop_source);
     
        // Create worker threads
        for (int i = 0; i < 4; ++i)
            threads[i] = std::jthread(worker_fun, i + 1, stop_source.get_token());
     
        std::this_thread::sleep_for(500ms);
     
        std::puts("Request stop");
        stop_source.request_stop();
     
        print(stop_source);
     
        // Note: destructor of jthreads will call join so no need for explicit calls
    }
```

Saída possível:
```
    stop_source stop_possible = true, stop_requested = false
      worker2 goes back to sleep
      worker3 goes back to sleep
      worker1 goes back to sleep
      worker4 goes back to sleep
    Request stop
    stop_source stop_possible = true, stop_requested = true
      worker3 is requested to stop
      worker1 is requested to stop
      worker2 is requested to stop
      worker4 is requested to stop
```
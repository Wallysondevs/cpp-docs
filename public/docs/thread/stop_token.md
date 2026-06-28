# std::stop_token

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
class stop_token;
```

A classe `stop_token` fornece os meios para verificar se uma solicitação de parada foi feita ou pode ser feita, para seu objeto [`std::stop_source`](<#/doc/thread/stop_source>) associado. É essencialmente uma "visão" thread-safe do estado de parada associado.

O `stop_token` também pode ser passado para o construtor de [`std::stop_callback`](<#/doc/thread/stop_callback>), de modo que o callback será invocado se o [std::stop_source](<#/doc/thread/stop_source>) associado ao `stop_token` for solicitado a parar. E o `stop_token` pode ser passado para as funções de espera interrompíveis de [std::condition_variable_any](<#/doc/thread/condition_variable_any>), para interromper a espera da condition variable se a parada for solicitada.

### Modelos de alias de membro

Type | Definition
---|---
callback_type&lt;Callback&gt; (desde C++26) | [std::stop_callback](<#/doc/thread/stop_callback>)&lt;Callback&gt;

### Funções membro

[ (constructor)](<#/doc/thread/stop_token/stop_token>) | constrói um novo objeto `stop_token`
(função membro pública)
[ (destructor)](<#/doc/thread/stop_token/~stop_token>) | destrói o objeto `stop_token`
(função membro pública)
[ operator=](<#/>) | atribui o objeto `stop_token`
(função membro pública)

##### Modificadores

[ swap](<#/doc/thread/stop_token/swap>) | troca dois objetos `stop_token`
(função membro pública)

##### Observadores

[ stop_requested](<#/doc/thread/stop_token/stop_requested>) | verifica se o estado de parada associado foi solicitado a parar
(função membro pública)
[ stop_possible](<#/doc/thread/stop_token/stop_possible>) | verifica se o estado de parada associado pode ser solicitado a parar
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/thread/stop_token/operator_cmp>)(C++20) | compara dois objetos `std::stop_token`
(função)
[ swap(std::stop_token)](<#/doc/thread/stop_token/swap2>)(C++20) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Notas

Um objeto `stop_token` geralmente não é construído independentemente, mas sim recuperado de uma [std::jthread](<#/doc/thread/jthread>) ou [std::stop_source](<#/doc/thread/stop_source>). Isso faz com que ele compartilhe o mesmo estado de parada associado que a [std::jthread](<#/doc/thread/jthread>) ou [std::stop_source](<#/doc/thread/stop_source>).

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_jthread`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | [Stop token](<#/doc/thread/stop_token>) e [thread de junção](<#/doc/thread/jthread>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <thread>
     
    using namespace std::literals::chrono_literals;
     
    void f(std::stop_token stop_token, int value)
    {
        while (!stop_token.stop_requested())
        {
            std::cout << value++ << ' ' << std::flush;
            std::this_thread::sleep_for(200ms);
        }
        std::cout << std::endl;
    }
     
    int main()
    {
        std::jthread thread(f, 5); // imprime 5 6 7 8... por aproximadamente 3 segundos
        std::this_thread::sleep_for(3s);
        // O destrutor de jthread chama request_stop() e join().
    }
```

Saída possível:
```
    5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
```
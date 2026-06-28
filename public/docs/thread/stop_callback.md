# std::stop_callback

Definido no cabeçalho `[<stop_token>](<#/doc/header/stop_token>)`

```c
template< class Callback >
class stop_callback;
```

O template de classe `stop_callback` fornece um tipo de objeto RAII que registra uma função de callback para um objeto [`std::stop_token`](<#/doc/thread/stop_token>) associado, de modo que a função de callback será invocada quando a [`std::stop_source`](<#/doc/thread/stop_source>) associada ao [`std::stop_token`](<#/doc/thread/stop_token>) for solicitada a parar.

Funções de callback registradas através do construtor de `stop_callback` são invocadas ou na mesma thread que invoca com sucesso request_stop() para uma [`std::stop_source`](<#/doc/thread/stop_source>) do [`std::stop_token`](<#/doc/thread/stop_token>) associado ao `stop_callback`; ou, se a parada já tiver sido solicitada antes do registro do construtor, então o callback é invocado na thread que constrói o `stop_callback`.

Mais de um `stop_callback` pode ser criado para o mesmo [`std::stop_token`](<#/doc/thread/stop_token>), a partir da mesma ou de diferentes threads concorrentemente. Nenhuma garantia é fornecida para a ordem em que serão executados, mas serão invocados de forma síncrona; exceto para `stop_callback`(s) construídos depois que a parada já foi solicitada para o [`std::stop_token`](<#/doc/thread/stop_token>), conforme descrito anteriormente.

Se uma invocação de um callback sair via uma exceção, então [std::terminate](<#/doc/error/terminate>) é chamado.

`std::stop_callback` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [MoveConstructible](<#/doc/named_req/MoveConstructible>), nem [MoveAssignable](<#/doc/named_req/MoveAssignable>).

O tipo do parâmetro de template `Callback` deve ser tanto [`invocable`](<#/doc/concepts/invocable>) quanto [`destructible`](<#/doc/concepts/destructible>). Qualquer valor de retorno é ignorado.

### Tipos Membro

Tipo | Definição
---|---
`callback_type` | `Callback`

### Funções Membro

[ (construtor)](<#/doc/thread/stop_callback/stop_callback>) | constrói um novo objeto `stop_callback`
(função membro pública)
[ (destrutor)](<#/doc/thread/stop_callback/~stop_callback>) | destrói o objeto `stop_callback`
(função membro pública)
operator=[deleted] | `stop_callback` não é atribuível
(função membro pública)

### [Guias de Dedução](<#/doc/thread/stop_callback/deduction_guides>)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <mutex>
    #include <sstream>
    #include <thread>
    
    using namespace std::chrono_literals;
    
    // Use a helper class for atomic std::cout streaming.
    class Writer
    {
        std::ostringstream buffer;
    public:
        ~Writer()
        {
            std::cout << buffer.str();
        }
        Writer& operator<<(auto input)
        {
            buffer << input;
            return *this;
        }
    };
    
    int main()
    {
        // A worker thread.
        // It will wait until it is requested to stop.
        std::jthread worker([] (std::stop_token stoken)
        {
            Writer() << "Worker thread's id: " << std::this_thread::get_id() << '\n';
            std::mutex mutex;
            std::unique_lock lock(mutex);
            std::condition_variable_any().wait(lock, stoken,
                [&stoken] { return stoken.stop_requested(); });
        });
    
        // Register a stop callback on the worker thread.
        std::stop_callback callback(worker.get_stop_token(), []
        {
            Writer() << "Stop callback executed by thread: "
                << std::this_thread::get_id() << '\n';
        });
    
        // Stop_callback objects can be destroyed prematurely to prevent execution.
        {
            std::stop_callback scoped_callback(worker.get_stop_token(), []
            {
                // This will not be executed.
                Writer() << "Scoped stop callback executed by thread: "
                    << std::this_thread::get_id() << '\n';
            });
        }
    
        // Demonstrate which thread executes the stop_callback and when.
        // Define a stopper function.
        auto stopper_func = [&worker]
        {
            if (worker.request_stop())
                Writer() << "Stop request executed by thread: "
                    << std::this_thread::get_id() << '\n';
            else
                Writer() << "Stop request not executed by thread: "
                    << std::this_thread::get_id() << '\n';
        };
    
        // Let multiple threads compete for stopping the worker thread.
        std::jthread stopper1(stopper_func);
        std::jthread stopper2(stopper_func);
        stopper1.join();
        stopper2.join();
    
        // After a stop has already been requested,
        // a new stop_callback executes immediately.
        Writer() << "Main thread: " << std::this_thread::get_id() << '\n';
        std::stop_callback callback_after_stop(worker.get_stop_token(), []
        {
            Writer() << "Stop callback executed by thread: "
                << std::this_thread::get_id() << '\n';
        });
    }
```

Saída possível:
```
    Worker thread's id: 140460265039616
    Stop callback executed by thread: 140460256646912
    Stop request executed by thread: 140460256646912
    Stop request not executed by thread: 140460248254208
    Main thread: 140460265043776
    Stop callback executed by thread: 140460265043776
```
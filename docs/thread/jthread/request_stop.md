# std::jthread::request_stop

```cpp
bool request_stop() noexcept;  // (desde C++20)
```

  
Emite uma solicitação de parada para o stop-state interno, se uma parada ainda não tiver sido solicitada.

A determinação é feita atomicamente, e se a parada foi solicitada, o stop-state é atomicamente atualizado para evitar condições de corrida, de modo que:

  * stop_requested() e stop_possible() podem ser invocados concorrentemente em outros [std::stop_token](<#/doc/thread/stop_token>)s e [std::stop_source](<#/doc/thread/stop_source>)s do mesmo stop-state compartilhado.
  * request_stop() pode ser invocado concorrentemente de múltiplas threads no mesmo objeto `jthread` ou em outros objetos [std::stop_source](<#/doc/thread/stop_source>) associados ao mesmo stop-state, e apenas um realmente executará a solicitação de parada.

No entanto, consulte a seção Notas.

### Parâmetros

(nenhum)

### Valor de retorno

true se esta invocação fez uma solicitação de parada, caso contrário false.

### Pós-condições

Para um [std::stop_token](<#/doc/thread/stop_token>) recuperado por get_stop_token() ou um [std::stop_source](<#/doc/thread/stop_source>) recuperado por get_stop_source(), stop_requested() é true.

### Notas

Se request_stop() emitir uma solicitação de parada (ou seja, retornar true), então quaisquer std::stop_callbacks registrados para o mesmo stop-state associado serão invocados sincronicamente, na mesma thread em que request_stop() foi emitido. Se uma invocação de um callback sair via uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado.

Se uma solicitação de parada já tiver sido feita, esta função retorna false. No entanto, não há garantia de que outra thread ou objeto [std::stop_source](<#/doc/thread/stop_source>) que acabou de solicitar (com sucesso) uma parada para o mesmo stop-state não esteja ainda no meio da invocação de uma função [std::stop_callback](<#/doc/thread/stop_callback>).

Se request_stop() emitir uma solicitação de parada (ou seja, retornar true), então todas as variáveis de condição do tipo base [std::condition_variable_any](<#/doc/thread/condition_variable_any>) registradas com uma espera interrompível para [std::stop_token](<#/doc/thread/stop_token>)s associados ao stop-state interno da `jthread` serão despertadas.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <mutex>
    #include <thread>
    
    using namespace std::chrono_literals;
    
    // Helper function to quickly show which thread printed what
    void print(auto txt)
    {
        std::cout << std::this_thread::get_id() << ' ' << txt;
    }
    
    int main()
    {
        // A sleepy worker thread
        std::jthread sleepy_worker(
            
            {
                for (int i = 10; i; --i)
                {
                    std::this_thread::sleep_for(300ms);
                    if (stoken.stop_requested())
                    {
                        print("Sleepy worker is requested to stop\n");
                        return;
                    }
                    print("Sleepy worker goes back to sleep\n");
                }
            });
    
        // A waiting worker thread
        // The condition variable will be awoken by the stop request.
        std::jthread waiting_worker(
            
            {
                std::mutex mutex;
                std::unique_lock lock(mutex);
                std::condition_variable_any().wait(lock, stoken, []{ return false; });
                print("Waiting worker is requested to stop\n");
                return;
            });
    
        // Sleep this thread to give threads time to spin
        std::this_thread::sleep_for(400ms);
    
        // std::jthread::request_stop() can be called explicitly:
        print("Requesting stop of sleepy worker\n");
        sleepy_worker.request_stop();
        sleepy_worker.join();
        print("Sleepy worker joined\n");
    
        // Or automatically using RAII:
        // waiting_worker's destructor will call request_stop()
        // and join the thread automatically.
    }
```

Saída possível:
```
    140287602706176 Sleepy worker goes back to sleep
    140287623300928 Requesting stop of sleepy worker
    140287602706176 Sleepy worker is requested to stop
    140287623300928 Sleepy worker joined
    140287594313472 Waiting worker is requested to stop
```
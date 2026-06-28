# std::stop_token::stop_requested

```cpp
bool stop_requested() const noexcept;  // (desde C++20)
```

Verifica se o objeto [`stop_token`](<#/doc/thread/stop_token>) possui um estado de parada associado e se esse estado recebeu uma solicitação de parada. Um stop_token construído por padrão não possui estado de parada associado e, portanto, não teve uma parada solicitada.

### Parâmetros

(nenhum)

### Valor de retorno

true se o objeto stop_token possui um estado de parada associado e recebeu uma solicitação de parada, false caso contrário.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <mutex>
    #include <string_view>
    #include <thread>
    using namespace std::chrono_literals;
    
    int main()
    {
        std::cout << std::boolalpha;
        auto print = 
        {
            std::cout << name << ": stop_possible = " << token.stop_possible();
            std::cout << ", stop_requested = " << token.stop_requested() << '\n';
        };
    
        // A worker thread that will listen to stop requests
        auto stop_worker = std::jthread(
        {
            for (int i = 10; i; --i)
            {
                std::this_thread::sleep_for(300ms);
                if (stoken.stop_requested())
                {
                    std::cout << "  Sleepy worker is requested to stop\n";
                    return;
                }
                std::cout << "  Sleepy worker goes back to sleep\n";
            }
        });
    
        // A worker thread that will only stop when completed
        auto inf_worker = std::jthread(
        {
            for (int i = 5; i; --i)
            {
                std::this_thread::sleep_for(300ms);
                std::cout << "  Run as long as we want\n";
            }
        });
    
        std::stop_token def_token;
        std::stop_token stop_token = stop_worker.get_stop_token();
        std::stop_token inf_token = inf_worker.get_stop_token();
        print("def_token ", def_token);
        print("stop_token", stop_token);
        print("inf_token ", inf_token);
    
        std::cout << "\nRequest and join stop_worker:\n";
        stop_worker.request_stop();
        stop_worker.join();
    
        std::cout << "\nRequest and join inf_worker:\n";
        inf_worker.request_stop();
        inf_worker.join();
        std::cout << '\n';
    
        print("def_token ", def_token);
        print("stop_token", stop_token);
        print("inf_token ", inf_token);
    }
```

Saída possível:
```
    def_token : stop_possible = false, stop_requested = false
    stop_token: stop_possible = true, stop_requested = false
    inf_token : stop_possible = true, stop_requested = false
    
    Request and join stop_worker:
      Run as long as we want
      Sleepy worker is requested to stop
    
    Request and join inf_worker:
      Run as long as we want
      Run as long as we want
      Run as long as we want
      Run as long as we want
    
    def_token : stop_possible = false, stop_requested = false
    stop_token: stop_possible = true, stop_requested = true
    inf_token : stop_possible = true, stop_requested = true
```
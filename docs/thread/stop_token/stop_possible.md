# std::stop_token::stop_possible

```cpp
bool stop_possible() const noexcept;  // (desde C++20)
```

Verifica se o objeto `stop_token` possui um estado de parada associado, e se esse estado já teve uma parada solicitada ou se possui objeto(s) [std::stop_source](<#/doc/thread/stop_source>) associado(s).

Um `stop_token` construído por padrão não possui estado de parada associado e, portanto, não pode ser parado; o estado de parada associado para o qual nenhum objeto [std::stop_source](<#/doc/thread/stop_source>) existe também não pode ser parado se tal solicitação ainda não tiver sido feita.

### Parâmetros

(nenhum)

### Valor de retorno

false se o objeto `stop_token` não tiver estado de parada associado, ou se ainda não recebeu uma solicitação de parada e não há objeto(s) [std::stop_source](<#/doc/thread/stop_source>) associado(s); true caso contrário.

### Observações

Se o objeto `stop_token` tiver estado de parada associado e uma solicitação de parada já tiver sido feita, esta função ainda retorna true.

Se o objeto `stop_token` tiver estado de parada associado de uma [std::jthread](<#/doc/thread/jthread>)—por exemplo, o `stop_token` foi recuperado invocando get_stop_token() em um objeto [std::jthread](<#/doc/thread/jthread>)—então esta função sempre retorna true. Uma [std::jthread](<#/doc/thread/jthread>) sempre possui um objeto [std::stop_source](<#/doc/thread/stop_source>) interno, mesmo que a função invocadora da thread não o verifique.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <condition_variable>
    #include <format>
    #include <iostream>
    #include <mutex>
    #include <string_view>
    #include <thread>
    using namespace std::chrono_literals;
    
    int main()
    {
        std::cout << std::boolalpha;
        auto print =  name, const std::stop_token& token)
        {
            std::cout << std::format("{}: stop_possible = {:s}, stop_requested = {:s}\n", 
                name, token.stop_possible(), token.stop_requested()
            );
        };
    
        // A worker thread that will listen to stop requests
        auto stop_worker = std::jthread( stoken)
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
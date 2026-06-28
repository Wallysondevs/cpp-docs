# std::thread::joinable

```cpp
bool joinable() const noexcept;  // (desde C++11)
```

  
Verifica se o objeto `std::thread` identifica um thread de execução ativo. Especificamente, retorna true se get_id() != [std::thread::id](<#/doc/thread/thread/id>)(). Assim, um `thread` construído por padrão não é joinable.

Um thread que terminou de executar código, mas ainda não foi unido (joined), ainda é considerado um thread de execução ativo e, portanto, é joinable.

### Parâmetros

(nenhum)

### Valor de retorno

true se o objeto `std::thread` identifica um thread de execução ativo, false caso contrário.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <thread>
    using namespace std::chrono_literals;
     
    void foo()
    {
        std::this_thread::sleep_for(500ms);
    }
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::thread t;
        std::cout << "before starting, joinable: " << t.joinable() << '\n';
     
        t = std::thread{foo};
        std::cout << "after starting, joinable: " << t.joinable() << '\n';
     
        t.join();
        std::cout << "after joining, joinable: " << t.joinable() << '\n';
     
        t = std::thread{foo};
        t.detach();
        std::cout << "after detaching, joinable: " << t.joinable() << '\n';
        std::this_thread::sleep_for(1500ms);
    }
```

Saída: 
```
    before starting, joinable: false
    after starting, joinable: true
    after joining, joinable: false
    after detaching, joinable: false
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 33.4.3.6 Members [thread.thread.member] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 32.4.2.5 Members [thread.thread.member] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 33.3.2.5 thread members [thread.thread.member] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 30.3.1.5 thread members [thread.thread.member] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 30.3.1.5 thread members [thread.thread.member] 

### Veja também

[ get_id](<#/doc/thread/thread/get_id>) | retorna o _id_ do thread   
(função membro pública)  
[ join](<#/doc/thread/thread/join>) | aguarda o thread finalizar sua execução   
(função membro pública)  
[ detach](<#/doc/thread/thread/detach>) | permite que o thread execute independentemente do manipulador do thread   
(função membro pública)
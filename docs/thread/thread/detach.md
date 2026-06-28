# std::thread::detach

```cpp
void detach();  // (desde C++11)
```

Separa o thread de execução do objeto thread, permitindo que a execução continue de forma independente. Quaisquer recursos alocados serão liberados assim que o thread terminar.

Após chamar `detach`, *this não possui mais nenhum thread.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Pós-condições

[joinable](<#/doc/thread/thread/joinable>) é falso.

### Exceções

[std::system_error](<#/doc/error/system_error>) se joinable() == false ou ocorrer um erro.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    void independentThread() 
    {
        std::cout << "Starting concurrent thread.\n";
        std::this_thread::sleep_for(std::chrono::seconds(2));
        std::cout << "Exiting concurrent thread.\n";
    }
    
    void threadCaller() 
    {
        std::cout << "Starting thread caller.\n";
        std::thread t(independentThread);
        t.detach();
        std::this_thread::sleep_for(std::chrono::seconds(1));
        std::cout << "Exiting thread caller.\n";
    }
    
    int main() 
    {
        threadCaller();
        std::this_thread::sleep_for(std::chrono::seconds(5));
    }
```

Saída possível:
```
    Starting thread caller.
    Starting concurrent thread.
    Exiting thread caller.
    Exiting concurrent thread.
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 33.4.3.6 Membros [thread.thread.member] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 32.4.2.5 Membros [thread.thread.member] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 33.3.2.5 Membros de thread [thread.thread.member] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 30.3.1.5 Membros de thread [thread.thread.member] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 30.3.1.5 Membros de thread [thread.thread.member] 

### Veja também

[ join](<#/doc/thread/thread/join>) | aguarda o thread terminar sua execução
(função membro pública)
[ joinable](<#/doc/thread/thread/joinable>) | verifica se o thread é joinable, ou seja, potencialmente em execução em um contexto paralelo
(função membro pública)
[Documentação C](<#/>) para thrd_detach
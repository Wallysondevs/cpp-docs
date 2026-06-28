# std::jthread::detach

```cpp
void detach();  // (desde C++20)
```

Separa o thread de execução do objeto jthread, permitindo que a execução continue independentemente. Quaisquer recursos alocados serão liberados assim que o thread for encerrado.

Após chamar `detach`, *this não possui mais nenhum thread.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Pós-condições

joinable é false.

### Exceções

[std::system_error](<#/doc/error/system_error>) se joinable() == false ou se ocorrer um erro.

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
        std::jthread t(independentThread);
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

    

  * 33.4.4.3 Members [thread.jthread.mem] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 32.4.3.2 Members [thread.jthread.mem] 

### Veja também

[ join](<#/doc/thread/jthread/join>) | aguarda o thread finalizar sua execução
(função membro pública)
[ joinable](<#/doc/thread/jthread/joinable>) | verifica se o thread é joinable, ou seja, potencialmente em execução em um contexto paralelo
(função membro pública)
[Documentação C](<#/>) para thrd_detach
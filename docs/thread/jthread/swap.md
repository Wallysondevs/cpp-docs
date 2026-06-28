# std::jthread::swap

```cpp
void swap( std::jthread& other ) noexcept;  // (desde C++20)
```

  
Troca os handles subjacentes de dois objetos jthread.

### Parâmetros

other  |  \-  |  o jthread para trocar   
  
### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    void foo()
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    void bar()
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    int main()
    {
        std::jthread t1(foo);
        std::jthread t2(bar);
    
        std::cout << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
        std::swap(t1, t2);
    
        std::cout << "after std::swap(t1, t2):" << '\n'
                  << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
        t1.swap(t2);
    
        std::cout << "after t1.swap(t2):" << '\n'
                  << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
    
    }
```

Saída possível: 
```
    thread 1 id: 140185268262656
    thread 2 id: 140185259869952
    after std::swap(t1, t2):
    thread 1 id: 140185259869952
    thread 2 id: 140185268262656
    after t1.swap(t2):
    thread 1 id: 140185268262656
    thread 2 id: 140185259869952
```

### Veja também

[ swap(std::jthread)](<#/doc/thread/jthread/swap2>)(C++20) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(função)  
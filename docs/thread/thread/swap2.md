# std::swap(std::thread)

```cpp
void swap( std::thread& lhs, std::thread& rhs ) noexcept;  // (desde C++11)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::thread](<#/doc/thread/thread>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — threads cujos estados serão trocados

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
        using std::swap;
    
        std::thread t1(foo);
        std::thread t2(bar);
    
        std::cout << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
        swap(t1, t2);
    
        std::cout << "after std::swap(t1, t2):" << '\n'
                  << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
        t1.swap(t2);
    
        std::cout << "after t1.swap(t2):" << '\n'
                  << "thread 1 id: " << t1.get_id() << '\n'
                  << "thread 2 id: " << t2.get_id() << '\n';
    
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    thread 1 id: 1892
    thread 2 id: 2584
    after std::swap(t1, t2):
    thread 1 id: 2584
    thread 2 id: 1892
    after t1.swap(t2):
    thread 1 id: 1892
    thread 2 id: 2584
```

### Veja também

[ swap](<#/doc/thread/thread/swap>) | troca dois objetos thread
(função membro pública)
# swap(std::jthread)

```cpp
friend void swap( jthread& lhs, jthread& rhs ) noexcept;  // (desde C++20)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::jthread](<#/doc/thread/jthread>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. Esta função não é visível para `lookup` não qualificado ou qualificado comum, e só pode ser encontrada por `argument-dependent lookup` quando `std::jthread` é uma classe associada dos argumentos.

### Parâmetros

- **lhs, rhs** — jthreads cujos estados devem ser trocados

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
    
        std::jthread t1(foo);
        std::jthread t2(bar);
    
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

[ swap](<#/doc/thread/jthread/swap>) | troca dois objetos jthread
(função membro pública)
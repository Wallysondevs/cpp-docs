# std::this_thread::get_id

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
std::thread::id get_id() noexcept;
```

Retorna o _id_ da thread atual.

### Parâmetros

(nenhum)

### Valor de retorno

O _id_ da thread atual.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <syncstream>
    #include <thread>
    using namespace std::chrono_literals;
    
    void foo()
    {
        std::thread::id this_id = std::this_thread::get_id();
    
        std::osyncstream(std::cout) << "thread " << this_id << " sleeping...\n";
    
        std::this_thread::sleep_for(500ms);
    }
    
    int main()
    {
        std::jthread t1{foo};
        std::jthread t2{foo};
    }
```

Saída possível:
```
    thread 140113018054400 sleeping...
    thread 140113009661696 sleeping...
```

### Veja também

[ get_id](<#/doc/thread/thread/get_id>) | retorna o _id_ da thread
(função membro pública de `std::thread`)
[Documentação C](<#/>) para thrd_current
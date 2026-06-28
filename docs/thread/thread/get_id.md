# std::thread::get_id

```cpp
std::thread::id get_id() const noexcept;  // (desde C++11)
```

Retorna um valor de [std::thread::id](<#/doc/thread/thread/id>) que identifica a thread associada a *this.

### Parâmetros

(nenhum)

### Valor de retorno

Um valor do tipo [std::thread::id](<#/doc/thread/thread/id>) que identifica a thread associada a *this. Se não houver thread associada, um [std::thread::id](<#/doc/thread/thread/id>) construído por padrão é retornado.

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
    
    int main()
    {
        std::thread t1(foo);
        std::thread::id t1_id = t1.get_id();
    
        std::thread t2(foo);
        std::thread::id t2_id = t2.get_id();
    
        std::cout << "t1's id: " << t1_id << '\n';
        std::cout << "t2's id: " << t2_id << '\n';
    
        t1.join();
        t2.join();
    
        std::cout << "t1's id after join: " << t1.get_id() << '\n';
        std::cout << "t2's id after join: " << t2.get_id() << '\n';
    }
```

Saída possível:
```
    t1's id: 140146221688576
    t2's id: 140146213295872
    t1's id after join: thread::id of a non-executing thread
    t2's id after join: thread::id of a non-executing thread
```

### Veja também

[ id](<#/doc/thread/thread/id>) | representa o _id_ de uma thread
(classe membro pública)
[ joinable](<#/doc/thread/thread/joinable>) | verifica se a thread é joinable, ou seja, potencialmente em execução em um contexto paralelo
(função membro pública)
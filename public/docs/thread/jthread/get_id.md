# std::jthread::get_id

```cpp
std::jthread::id get_id() const noexcept;  // (desde C++20)
```

  
Retorna um valor de std::jthread::id (que é um alias de tipo para [std::thread::id](<#/doc/thread/thread/id>)) identificando a thread associada a *this. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um valor do tipo std::jthread::id identificando a thread associada a *this. Se não houver thread associada, um std::jthread::id construído por padrão é retornado. 

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
        std::jthread t1(foo);
        std::jthread::id t1_id = t1.get_id();
    
        std::jthread t2(foo);
        std::jthread::id t2_id = t2.get_id();
    
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
(classe membro pública de `std::thread`)  
[ joinable](<#/doc/thread/jthread/joinable>) | verifica se a thread é joinable, ou seja, potencialmente executando em contexto paralelo   
(função membro pública)
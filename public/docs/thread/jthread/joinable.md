# std::jthread::joinable

```cpp
bool joinable() const noexcept;  // (desde C++20)
```

Verifica se o objeto `std::jthread` identifica um thread de execução ativo. Especificamente, retorna true se get_id() != std::jthread::id(). Assim, um `jthread` construído por padrão não é joinable.

Um thread que terminou de executar código, mas ainda não foi unido (joined), ainda é considerado um thread de execução ativo e, portanto, é joinable.

### Parâmetros

(nenhum)

### Valor de retorno

true se o objeto `std::jthread` identifica um thread de execução ativo, false caso contrário.

### Exemplo

Execute este código
```cpp
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
    
        std::jthread t;
        std::cout << "before starting, joinable: " << t.joinable() << '\n';
    
        t = std::jthread{foo};
        std::cout << "after starting, joinable: " << t.joinable() << '\n';
    
        t.join();
        std::cout << "after joining, joinable: " << t.joinable() << '\n';
    
        t = std::jthread{foo};
        t.detach();
        std::cout << "after detaching, joinable: " << t.joinable() << '\n';
    
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

* 33.4.4.3 Membros [thread.jthread.mem]

* Padrão C++20 (ISO/IEC 14882:2020):

* 32.4.3.2 Membros [thread.jthread.mem]

### Veja também

[ get_id](<#/doc/thread/jthread/get_id>) | retorna o _id_ do thread
(função membro pública)
[ join](<#/doc/thread/jthread/join>) | aguarda o thread finalizar sua execução
(função membro pública)
[ detach](<#/doc/thread/jthread/detach>) | permite que o thread execute independentemente do seu manipulador (thread handle)
(função membro pública)
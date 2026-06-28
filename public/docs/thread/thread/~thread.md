# std::thread::~thread

```cpp
~thread();  // (desde C++11)
```

  
Destrói o objeto thread.

Se *this tiver uma thread associada (joinable() == true), [std::terminate](<#/doc/error/terminate>)() é chamada.

### Observações

Um objeto thread não tem uma thread associada (e é seguro destruir) depois que

  * foi construído por padrão.
  * foi movido de.
  * [join()](<#/doc/thread/thread/join>) foi chamado.
  * [detach()](<#/doc/thread/thread/detach>) foi chamado.

### Exemplo

Execute este código
```
    #include <thread>
    using namespace std::chrono_literals;
     
    int main()
    {
        auto bleah = std::thread{[]{ std::this_thread::sleep_for(13ms); }};
     
    }   // ~thread calls std::terminate()
```

Saída possível: 
```
    terminate called without an active exception
```

### Veja também

[ (destrutor)](<#/doc/thread/jthread/~jthread>) | se a thread for joinable, então uma parada é solicitada e a thread se junta   
(função membro pública de `std::jthread`)  
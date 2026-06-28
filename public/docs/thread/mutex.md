# std::mutex

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
class mutex;
```

A classe `mutex` é uma primitiva de sincronização que pode ser usada para proteger dados compartilhados de serem acessados simultaneamente por múltiplas threads.

`mutex` oferece semânticas de propriedade exclusiva e não recursiva:

*   Uma thread chamadora _possui_ um `mutex` a partir do momento em que ela chama com sucesso [`lock`](<#/doc/thread/mutex/lock>) ou [`try_lock`](<#/doc/thread/mutex/try_lock>) até que ela chame [`unlock`](<#/doc/thread/mutex/unlock>).
*   Quando uma thread possui um `mutex`, todas as outras threads serão bloqueadas (para chamadas a [`lock`](<#/doc/thread/mutex/lock>)) ou receberão um valor de retorno falso (para [`try_lock`](<#/doc/thread/mutex/try_lock>)) se tentarem reivindicar a propriedade do `mutex`.
*   Uma thread chamadora não deve possuir o `mutex` antes de chamar [`lock`](<#/doc/thread/mutex/lock>) ou [`try_lock`](<#/doc/thread/mutex/try_lock>).

O comportamento de um programa é indefinido se um `mutex` for destruído enquanto ainda estiver sendo possuído por qualquer thread, ou se uma thread terminar enquanto possuir um `mutex`. A classe `mutex` satisfaz todos os requisitos de [Mutex](<#/doc/named_req/Mutex>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

`std::mutex` não é copiável nem movível.

### Tipos aninhados

Nome | Definição
---|---
`native_handle_type` (opcional*) | definido pela implementação

### Funções membro

[ (constructor)](<#/doc/thread/mutex/mutex>) | constrói o mutex
(função membro pública)
[ (destructor)](<#/doc/thread/mutex/~mutex>) | destrói o mutex
(função membro pública)
operator=[deleted] | não atribuível por cópia
(função membro pública)

##### Bloqueio

[ lock](<#/doc/thread/mutex/lock>) | bloqueia o mutex, aguarda se o mutex não estiver disponível
(função membro pública)
[ try_lock](<#/doc/thread/mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ unlock](<#/doc/thread/mutex/unlock>) | desbloqueia o mutex
(função membro pública)

##### Handle nativo

[ native_handle](<#/doc/thread/mutex/native_handle>) | retorna o objeto handle nativo subjacente definido pela implementação
(função membro pública)

### Notas

`std::mutex` geralmente não é acessado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>), [std::lock_guard](<#/doc/thread/lock_guard>), ou [std::scoped_lock](<#/doc/thread/scoped_lock>)(desde C++17) gerenciam o bloqueio de uma maneira mais segura contra exceções.

### Exemplo

Este exemplo mostra como um `mutex` pode ser usado para proteger um [std::map](<#/doc/container/map>) compartilhado entre duas threads.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <map>
    #include <mutex>
    #include <string>
    #include <thread>
     
    std::map<std::string, std::string> g_pages;
    std::mutex g_pages_mutex;
     
    void save_page(const std::string& url)
    {
        // simula uma longa busca de página
        std::this_thread::sleep_for(std::chrono::seconds(2));
        std::string result = "fake content";
     
        std::lock_guard<std::mutex> guard(g_pages_mutex);
        g_pages[url] = result;
    }
     
    int main() 
    {
        std::thread t1(save_page, "http://foo");
        std::thread t2(save_page, "http://bar");
        t1.join();
        t2.join();
     
        // seguro acessar g_pages sem bloqueio agora, pois as threads foram unidas
        for (const auto& [url, page] : g_pages)
            std::cout << url << " => " << page << '\n';
    }
```

Saída:
```
    http://bar => fake content
    http://foo => fake content
```

### Veja também

[ recursive_mutex](<#/doc/thread/recursive_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser bloqueada recursivamente pela mesma thread
(classe)
[ lock_guard](<#/doc/thread/lock_guard>)(C++11) | implementa um wrapper de propriedade de mutex estritamente baseado em escopo
(modelo de classe)
[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um wrapper de propriedade de mutex movível
(modelo de classe)
[ scoped_lock](<#/doc/thread/scoped_lock>)(C++17) | wrapper RAII para múltiplos mutexes que evita deadlock
(modelo de classe)
[ condition_variable](<#/doc/thread/condition_variable>)(C++11) | fornece uma variável de condição associada a um [std::unique_lock](<#/doc/thread/unique_lock>)
(classe)
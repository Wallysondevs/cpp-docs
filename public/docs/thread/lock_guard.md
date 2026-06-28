# std::lock_guard

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
template< class Mutex >
class lock_guard;
```

A classe `lock_guard` é um wrapper de mutex que fornece um mecanismo conveniente [estilo RAII](<#/doc/language/raii>) para possuir um mutex pela duração de um bloco de escopo.

Quando um objeto `lock_guard` é criado, ele tenta assumir a posse do mutex que lhe foi dado. Quando o controle sai do escopo no qual o objeto `lock_guard` foi criado, o `lock_guard` é destruído e o mutex é liberado.

A classe `lock_guard` não é copiável.

### Parâmetros de template

- **Mutex** — o tipo do mutex a ser bloqueado. O tipo deve satisfazer os requisitos [BasicLockable](<#/doc/named_req/BasicLockable>)

### Tipos de membro

Tipo de membro | Definição
---|---
`mutex_type` | Mutex

### Funções de membro

[ (construtor)](<#/doc/thread/lock_guard/lock_guard>) | constrói um `lock_guard`, opcionalmente bloqueando o mutex fornecido
(função de membro pública)
[ (destrutor)](<#/doc/thread/lock_guard/~lock_guard>) | destrói o objeto `lock_guard`, desbloqueia o mutex subjacente
(função de membro pública)
operator=[deleted] | não atribuível por cópia
(função de membro pública)

### Notas

Um erro comum de iniciante é "esquecer" de dar um nome a uma variável `lock_guard`, por exemplo, `std::lock_guard(mtx);` (que constrói por padrão uma variável `lock_guard` chamada `mtx`) ou `std::lock_guard{mtx};` (que constrói um objeto prvalue que é imediatamente destruído), não construindo assim um lock que mantenha um mutex pelo resto do escopo.

[`std::scoped_lock`](<#/doc/thread/scoped_lock>) oferece uma alternativa para `lock_guard` que fornece a capacidade de bloquear múltiplos mutexes usando um algoritmo de prevenção de deadlock. | (desde C++17)

### Exemplo

Demonstra incrementos seguros e inseguros de uma variável volátil por duas threads.

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <string_view>
    #include <syncstream>
    #include <thread>
    
    volatile int g_i = 0;
    std::mutex g_i_mutex;  // protects g_i
    
    void safe_increment(int iterations)
    {
        const std::lock_guard<std::mutex> lock(g_i_mutex);
        while (iterations-- > 0)
            g_i = g_i + 1;
        std::cout << "thread #" << std::this_thread::get_id() << ", g_i: " << g_i << '\n';
    
        // g_i_mutex is automatically released when lock goes out of scope
    }
    
    void unsafe_increment(int iterations)
    {
        while (iterations-- > 0)
            g_i = g_i + 1;
        std::osyncstream(std::cout) << "thread #" << std::this_thread::get_id()
                                    << ", g_i: " << g_i << '\n';
    }
    
    int main()
    {
        auto test = 
        {
            g_i = 0;
            std::cout << fun_name << ":\nbefore, g_i: " << g_i << '\n';
            {
                std::jthread t1(fun, 1'000'000);
                std::jthread t2(fun, 1'000'000);
            }
            std::cout << "after, g_i: " << g_i << "\n\n";
        };
        test("safe_increment", safe_increment);
        test("unsafe_increment", unsafe_increment);
    }
```

Saída possível:
```
    safe_increment:
    before, g_i: 0
    thread #140121493231360, g_i: 1000000
    thread #140121484838656, g_i: 2000000
    after, g_i: 2000000
    
    unsafe_increment:
    before, g_i: 0
    thread #140121484838656, g_i: 1028945
    thread #140121493231360, g_i: 1034337
    after, g_i: 1034337
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2981](<https://cplusplus.github.io/LWG/issue2981>) | C++17 | guia de dedução redundante de `lock_guard<Mutex>` foi fornecido | removido

### Veja também

[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um wrapper de posse de mutex móvel
(modelo de classe)
[ scoped_lock](<#/doc/thread/scoped_lock>)(C++17) | wrapper RAII para múltiplos mutexes que evita deadlock
(modelo de classe)
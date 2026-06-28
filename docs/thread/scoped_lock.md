# std::scoped_lock

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
template< class... MutexTypes >
class scoped_lock;
```

A classe `scoped_lock` é um invólucro de mutex que fornece um mecanismo conveniente [estilo RAII](<https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization> "enwiki:Resource Acquisition Is Initialization") para possuir zero ou mais mutexes durante a duração de um bloco de escopo.

Quando um objeto `scoped_lock` é criado, ele tenta assumir a posse dos mutexes que lhe são dados. Quando o controle sai do escopo em que o objeto `scoped_lock` foi criado, o `scoped_lock` é destruído e os mutexes são liberados. Se vários mutexes forem fornecidos, um algoritmo de prevenção de deadlock é usado como se por [std::lock](<#/doc/thread/lock>).

A classe `scoped_lock` não é copiável.

### Parâmetros de template

MutexTypes | \- | os tipos dos mutexes a serem bloqueados. Os tipos devem atender aos requisitos [Lockable](<#/doc/named_req/Lockable>), a menos que `sizeof...(MutexTypes) == 1`, caso em que o único tipo deve atender a [BasicLockable](<#/doc/named_req/BasicLockable>)

### Tipos de membro

Tipo de membro | Definição
`mutex_type`
(presente condicionalmente) | Se `sizeof...(MutexTypes) == 1`, o tipo de membro `mutex_type` é o mesmo que `Mutex`, o único tipo em `MutexTypes...`. Caso contrário, não há membro `mutex_type`.

### Funções membro

[ (construtor)](<#/doc/thread/scoped_lock/scoped_lock>) | constrói um `scoped_lock`, opcionalmente bloqueando os mutexes fornecidos
(função membro pública)
[ (destrutor)](<#/doc/thread/scoped_lock/~scoped_lock>) | destrói o objeto `scoped_lock`, desbloqueia os mutexes subjacentes
(função membro pública)
operator=[deleted] | não atribuível por cópia
(função membro pública)

### Notas

Um erro comum de iniciante é "esquecer" de dar um nome a uma variável `scoped_lock`, por exemplo, `std::scoped_lock(mtx);` (que constrói por padrão uma variável `scoped_lock` chamada `mtx`) ou `std::scoped_lock{mtx};` (que constrói um objeto prvalue que é imediatamente destruído), não construindo, assim, um lock que mantém um mutex pelo resto do escopo.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_scoped_lock`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | [`std::scoped_lock`](<#/doc/thread/scoped_lock>)

### Exemplo

O exemplo a seguir usa `std::scoped_lock` para bloquear pares de mutexes sem deadlock e é estilo RAII.

Execute este código
```cpp
    #include <chrono>
    #include <functional>
    #include <iostream>
    #include <mutex>
    #include <string>
    #include <thread>
    #include <vector>
    using namespace std::chrono_literals;
    
    struct Employee
    {
        std::vector<std::string> lunch_partners;
        std::string id;
        std::mutex m;
        Employee(std::string id) : id(id) {}
        std::string partners() const
        {
            std::string ret = "Employee " + id + " has lunch partners: ";
            for (int count{}; const auto& partner : lunch_partners)
                ret += (count++ ? ", " : "") + partner;
            return ret;
        }
    };
    
    void send_mail(Employee&, Employee&)
    {
        // Simula uma operação de mensagem demorada
        std::this_thread::sleep_for(1s);
    }
    
    void assign_lunch_partner(Employee& e1, Employee& e2)
    {
        static std::mutex io_mutex;
        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << e1.id << " and " << e2.id << " are waiting for locks" << std::endl;
        }
    
        {
            // Use std::scoped_lock para adquirir dois locks sem se preocupar com
            // outras chamadas para assign_lunch_partner nos causando deadlock,
            // e também fornece um mecanismo conveniente estilo RAII
    
            std::scoped_lock lock(e1.m, e2.m);
    
            // Código equivalente 1 (usando std::lock e std::lock_guard)
            // std::lock(e1.m, e2.m);
            // std::lock_guard<std::mutex> lk1(e1.m, std::adopt_lock);
            // std::lock_guard<std::mutex> lk2(e2.m, std::adopt_lock);
    
            // Código equivalente 2 (se unique_lock's forem necessários, por exemplo, para variáveis de condição)
            // std::unique_lock<std::mutex> lk1(e1.m, std::defer_lock);
            // std::unique_lock<std::mutex> lk2(e2.m, std::defer_lock);
            // std::lock(lk1, lk2);
            {
                std::lock_guard<std::mutex> lk(io_mutex);
                std::cout << e1.id << " and " << e2.id << " got locks" << std::endl;
            }
            e1.lunch_partners.push_back(e2.id);
            e2.lunch_partners.push_back(e1.id);
        }
    
        send_mail(e1, e2);
        send_mail(e2, e1);
    }
    
    int main()
    {
        Employee alice("Alice"), bob("Bob"), christina("Christina"), dave("Dave");
    
        // Atribui em threads paralelas porque enviar e-mails aos usuários sobre atribuições de almoço
        // leva muito tempo
        std::vector<std::thread> threads;
        threads.emplace_back(assign_lunch_partner, std::ref(alice), std::ref(bob));
        threads.emplace_back(assign_lunch_partner, std::ref(christina), std::ref(bob));
        threads.emplace_back(assign_lunch_partner, std::ref(christina), std::ref(alice));
        threads.emplace_back(assign_lunch_partner, std::ref(dave), std::ref(bob));
    
        for (auto& thread : threads)
            thread.join();
        std::cout << alice.partners() << '\n'  << bob.partners() << '\n'
                  << christina.partners() << '\n' << dave.partners() << '\n';
    }
```

Saída possível:
```
    Alice and Bob are waiting for locks
    Alice and Bob got locks
    Christina and Bob are waiting for locks
    Christina and Alice are waiting for locks
    Dave and Bob are waiting for locks
    Dave and Bob got locks
    Christina and Alice got locks
    Christina and Bob got locks
    Employee Alice has lunch partners: Bob, Christina
    Employee Bob has lunch partners: Alice, Dave, Christina
    Employee Christina has lunch partners: Alice, Bob
    Employee Dave has lunch partners: Bob
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2981](<https://cplusplus.github.io/LWG/issue2981>) | C++17 | guia de dedução redundante de `scoped_lock<MutexTypes...>` foi fornecido | removido

### Veja também

[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um invólucro de posse de mutex móvel
(modelo de classe)
[ lock_guard](<#/doc/thread/lock_guard>)(C++11) | implementa um invólucro de posse de mutex estritamente baseado em escopo
(modelo de classe)
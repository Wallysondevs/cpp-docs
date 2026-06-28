# std::shared_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T > class shared_ptr;
```

`std::shared_ptr` é um ponteiro inteligente que mantém a propriedade compartilhada de um objeto através de um ponteiro. Vários objetos `shared_ptr` podem possuir o mesmo objeto. O objeto é destruído e sua memória desalocada quando qualquer um dos seguintes eventos ocorre:

*   o último `shared_ptr` restante que possui o objeto é destruído;
*   o último `shared_ptr` restante que possui o objeto recebe outro ponteiro via [operator=](<#/>) ou [reset()](<#/doc/memory/shared_ptr/reset>).

O objeto é destruído usando uma [expressão delete](<#/doc/language/delete>) ou um deleter personalizado que é fornecido ao `shared_ptr` durante a construção.

Um `shared_ptr` pode compartilhar a propriedade de um objeto enquanto armazena um ponteiro para outro objeto. Este recurso pode ser usado para apontar para objetos membro enquanto possui o objeto ao qual eles pertencem. O ponteiro armazenado é aquele acessado por [get()](<#/doc/memory/shared_ptr/get>), pelos operadores de desreferência e de comparação. O ponteiro gerenciado é aquele passado para o deleter quando a contagem de uso (use count) atinge zero.

Um `shared_ptr` também pode não possuir nenhum objeto, caso em que é chamado de _vazio_ (um `shared_ptr` vazio pode ter um ponteiro armazenado não nulo se o construtor de aliasing foi usado para criá-lo).

Todas as especializações de `shared_ptr` atendem aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [LessThanComparable](<#/doc/named_req/LessThanComparable>) e são [convertíveis contextualmente](<#/doc/language/implicit_cast>) para `bool`.

Todas as funções membro (incluindo construtor de cópia e atribuição de cópia) podem ser chamadas por múltiplas threads em diferentes objetos `shared_ptr` sem sincronização adicional, mesmo que esses objetos sejam cópias e compartilhem a propriedade do mesmo objeto. Se múltiplas threads de execução acessarem o mesmo objeto `shared_ptr` sem sincronização e qualquer um desses acessos usar uma função membro não-const de `shared_ptr`, então ocorrerá uma data race; o [`std::atomic<shared_ptr>`](<#/doc/memory/shared_ptr/atomic2>) pode ser usado para prevenir a data race.

### Tipos membro

Tipo membro | Definição
---|---
`element_type` | | T | (até C++17)
[std::remove_extent_t](<#/doc/types/remove_extent>)&lt;T&gt; | (desde C++17)
`weak_type` (desde C++17) | [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;

### Funções membro

[ (construtor)](<#/doc/memory/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)
[ (destrutor)](<#/doc/memory/shared_ptr/~shared_ptr>) | destrói o objeto possuído se não houver mais `shared_ptr`s apontando para ele
(função membro pública)
[ operator=](<#/>) | atribui o `shared_ptr`
(função membro pública)

##### Modificadores

[ reset](<#/doc/memory/shared_ptr/reset>) | substitui o objeto gerenciado
(função membro pública)
[ swap](<#/doc/memory/shared_ptr/swap>) | troca os objetos gerenciados
(função membro pública)

##### Observadores

[ get](<#/doc/memory/shared_ptr/get>) | retorna o ponteiro armazenado
(função membro pública)
[ operator*operator->](<#/doc/memory/shared_ptr/operator_star_>) | desreferencia o ponteiro armazenado
(função membro pública)
[ operator[]](<#/doc/memory/shared_ptr/operator_at>)(C++17) | fornece acesso indexado ao array armazenado
(função membro pública)
[ use_count](<#/doc/memory/shared_ptr/use_count>) | retorna o número de objetos `shared_ptr` que referenciam o mesmo objeto gerenciado
(função membro pública)
[ unique](<#/doc/memory/shared_ptr/unique>)(até C++20) | verifica se o objeto gerenciado é gerenciado apenas pelo objeto `shared_ptr` atual
(função membro pública)
[ operator bool](<#/doc/memory/shared_ptr/operator_bool>) | verifica se o ponteiro armazenado não é nulo
(função membro pública)
[ owner_before](<#/doc/memory/shared_ptr/owner_before>) | fornece ordenação de shared pointers baseada no proprietário
(função membro pública)
[ owner_hash](<#/doc/memory/shared_ptr/owner_hash>)(C++26) | fornece hashing de shared pointers baseado no proprietário
(função membro pública)
[ owner_equal](<#/doc/memory/shared_ptr/owner_equal>)(C++26) | fornece comparação de igualdade de shared pointers baseada no proprietário
(função membro pública)

### Funções não-membro

[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto alocado usando um alocador
(modelo de função)
[ static_pointer_castdynamic_pointer_castconst_pointer_castreinterpret_pointer_cast](<#/doc/memory/shared_ptr/pointer_cast>)(C++17) | aplica [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`const_cast`](<#/doc/language/const_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) ao ponteiro armazenado
(modelo de função)
[ get_deleter](<#/doc/memory/shared_ptr/get_deleter>) | retorna o deleter do tipo especificado, se possuído
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/shared_ptr/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara com outro `shared_ptr` ou com nullptr
(modelo de função)
[ operator<<(std::shared_ptr)](<#/doc/memory/shared_ptr/operator_ltlt>) | envia o valor do ponteiro armazenado para um stream de saída
(modelo de função)
[ std::swap(std::shared_ptr)](<#/doc/memory/shared_ptr/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::atomic_is_lock_free(std::shared_ptr)std::atomic_load(std::shared_ptr)std::atomic_load_explicit(std::shared_ptr)std::atomic_store(std::shared_ptr)std::atomic_store_explicit(std::shared_ptr)std::atomic_exchange(std::shared_ptr)std::atomic_exchange_explicit(std::shared_ptr)std::atomic_compare_exchange_weak(std::shared_ptr)std::atomic_compare_exchange_strong(std::shared_ptr)std::atomic_compare_exchange_weak_explicit(std::shared_ptr)std::atomic_compare_exchange_strong_explicit(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para `std::shared_ptr`
(modelo de função)

### Classes auxiliares

[ std::atomic<std::shared_ptr>](<#/doc/memory/shared_ptr/atomic2>)(C++20) | shared pointer atômico
(especialização de modelo de classe)
[ std::hash<std::shared_ptr>](<#/doc/memory/shared_ptr/hash>)(desde C++11) | suporte a hash para `std::shared_ptr`
(especialização de modelo de classe)

### [Guias de dedução](<#/doc/memory/shared_ptr/deduction_guides>) (desde C++17)

### Notas

A propriedade de um objeto só pode ser compartilhada com outro `shared_ptr` através da construção de cópia ou atribuição de cópia de seu valor para outro `shared_ptr`. Construir um novo `shared_ptr` usando o ponteiro bruto subjacente possuído por outro `shared_ptr` leva a comportamento indefinido.

`std::shared_ptr` pode ser usado com um [tipo incompleto](<#/doc/language/incomplete_type>) `T`. No entanto, o construtor a partir de um ponteiro bruto (template&lt;class Y&gt; shared_ptr(Y*)) e a função membro template&lt;class Y&gt; void reset(Y*) só podem ser chamados com um ponteiro para um tipo completo (note que [std::unique_ptr](<#/doc/memory/unique_ptr>) pode ser construído a partir de um ponteiro bruto para um tipo incompleto).

O `T` em std::shared_ptr&lt;T&gt; pode ser um tipo de função: neste caso, ele gerencia um ponteiro para função, em vez de um ponteiro para objeto. Isso é às vezes usado para manter uma biblioteca dinâmica ou um plugin carregado enquanto qualquer uma de suas funções for referenciada:
```cpp
    void del(void(*)()) {}
    
    void fun() {}
    
    int main()
    {
        std::shared_ptr<void()> ee(fun, del);
        (*ee)();
    }
```

### Notas de implementação

Em uma implementação típica, `shared_ptr` mantém apenas dois ponteiros:

*   o ponteiro armazenado (aquele retornado por [get()](<#/doc/memory/shared_ptr/get>));
*   um ponteiro para o _bloco de controle_.

O bloco de controle é um objeto alocado dinamicamente que contém:

*   ou um ponteiro para o objeto gerenciado ou o próprio objeto gerenciado;
*   o deleter (com tipo apagado);
*   o alocador (com tipo apagado);
*   o número de `shared_ptr`s que possuem o objeto gerenciado;
*   o número de `weak_ptr`s que referenciam o objeto gerenciado.

Quando um `shared_ptr` é criado chamando [std::make_shared](<#/doc/memory/shared_ptr/make_shared>) ou [std::allocate_shared](<#/doc/memory/shared_ptr/allocate_shared>), a memória para o bloco de controle e para o objeto gerenciado é criada com uma única alocação. O objeto gerenciado é construído no local em um membro de dados do bloco de controle. Quando um `shared_ptr` é criado através de um dos construtores de `shared_ptr`, o objeto gerenciado e o bloco de controle devem ser alocados separadamente. Neste caso, o bloco de controle armazena um ponteiro para o objeto gerenciado.

O ponteiro mantido diretamente pelo `shared_ptr` é aquele retornado por [get()](<#/doc/memory/shared_ptr/get>), enquanto o ponteiro/objeto mantido pelo bloco de controle é aquele que será excluído quando o número de proprietários compartilhados atingir zero. Esses ponteiros não são necessariamente iguais.

O destrutor de `shared_ptr` decrementa o número de proprietários compartilhados do bloco de controle. Se esse contador atingir zero, o bloco de controle chama o destrutor do objeto gerenciado. O bloco de controle não se desaloca até que o contador de [std::weak_ptr](<#/doc/memory/weak_ptr>) também atinja zero.

Em implementações existentes, o número de weak pointers é incrementado ([1](<https://stackoverflow.com/questions/43297517/stdshared-ptr-internals-weak-count-more-than-expected>), [2](<https://www.reddit.com/r/cpp/comments/3eia29/stdshared_ptrs_secret_constructor/ctfeh1p>)) se houver um shared pointer para o mesmo bloco de controle.

Para satisfazer os requisitos de segurança de thread, os contadores de referência são tipicamente incrementados usando um equivalente de [std::atomic::fetch_add](<#/doc/atomic/atomic/fetch_add>) com [std::memory_order_relaxed](<#/doc/atomic/memory_order>) (o decremento requer uma ordenação mais forte para destruir o bloco de controle com segurança).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <memory>
    #include <mutex>
    #include <thread>
    
    using namespace std::chrono_literals;
    
    struct Base
    {
        Base() { std::cout << "Base::Base()\n"; }
    
        // Nota: destrutor não virtual está OK aqui
        ~Base() { std::cout << "Base::~Base()\n"; }
    };
    
    struct Derived : public Base
    {
        Derived() { std::cout << "Derived::Derived()\n"; }
    
        ~Derived() { std::cout << "Derived::~Derived()\n"; }
    };
    
    void print(auto rem, std::shared_ptr<Base> const& sp)
    {
        std::cout << rem << "\n\tget() = " << sp.get()
                  << ", use_count() = " << sp.use_count() << '\n';
    }
    
    void thr(std::shared_ptr<Base> p)
    {
        std::this_thread::sleep_for(987ms);
        std::shared_ptr<Base> lp = p; // thread-safe, mesmo que o
                                      // use_count compartilhado seja incrementado
        {
            static std::mutex io_mutex;
            std::lock_guard<std::mutex> lk(io_mutex);
            print("Ponteiro local em uma thread:", lp);
        }
    }
    
    int main()
    {
        std::shared_ptr<Base> p = std::make_shared<Derived>();
    
        print("Criado um Derived compartilhado (como um ponteiro para Base)", p);
    
        std::thread t1{thr, p}, t2{thr, p}, t3{thr, p};
        p.reset(); // libera a propriedade da main
    
        print("Propriedade compartilhada entre 3 threads e propriedade liberada da main:", p);
    
        t1.join();
        t2.join();
        t3.join();
    
        std::cout << "Todas as threads concluídas, a última excluiu Derived.\n";
    }
```

Saída possível:
```
    Base::Base()
    Derived::Derived()
    Criado um Derived compartilhado (como um ponteiro para Base)
    	get() = 0x118ac30, use_count() = 1
    Propriedade compartilhada entre 3 threads e propriedade liberada da main:
    	get() = 0, use_count() = 0
    Ponteiro local em uma thread:
    	get() = 0x118ac30, use_count() = 5
    Ponteiro local em uma thread:
    	get() = 0x118ac30, use_count() = 4
    Ponteiro local em uma thread:
    	get() = 0x118ac30, use_count() = 2
    Derived::~Derived()
    Base::~Base()
    Todas as threads concluídas, a última excluiu Derived.
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct MyObj
    {
        MyObj() { std::cout << "MyObj constructed\n"; }
    
        ~MyObj() { std::cout << "MyObj destructed\n"; }
    };
    
    struct Container : std::enable_shared_from_this<Container> // nota: herança pública
    {
        std::shared_ptr<MyObj> memberObj;
    
        void CreateMember() { memberObj = std::make_shared<MyObj>(); }
    
        std::shared_ptr<MyObj> GetAsMyObj()
        {
            // Use um shared ptr de aliasing para o membro
            return std::shared_ptr<MyObj>(shared_from_this(), memberObj.get());
        }
    };
    
    #define COUT(str) std::cout << '\n' << str << '\n'
    
    #define DEMO(...) std::cout << #__VA_ARGS__ << " = " << __VA_ARGS__ << '\n'
    
    int main()
    {
        COUT("Criando container compartilhado");
        std::shared_ptr<Container> cont = std::make_shared<Container>();
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
    
        COUT("Criando membro");
        cont->CreateMember();
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
    
        COUT("Criando outro container compartilhado");
        std::shared_ptr<Container> cont2 = cont;
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
        DEMO(cont2.use_count());
        DEMO(cont2->memberObj.use_count());
    
        COUT("GetAsMyObj");
        std::shared_ptr<MyObj> myobj1 = cont->GetAsMyObj();
        DEMO(myobj1.use_count());
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
        DEMO(cont2.use_count());
        DEMO(cont2->memberObj.use_count());
    
        COUT("Copiando objeto de aliasing");
        std::shared_ptr<MyObj> myobj2 = myobj1;
        DEMO(myobj1.use_count());
        DEMO(myobj2.use_count());
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
        DEMO(cont2.use_count());
        DEMO(cont2->memberObj.use_count());
    
        COUT("Reiniciando cont2");
        cont2.reset();
        DEMO(myobj1.use_count());
        DEMO(myobj2.use_count());
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
    
        COUT("Reiniciando myobj2");
        myobj2.reset();
        DEMO(myobj1.use_count());
        DEMO(cont.use_count());
        DEMO(cont->memberObj.use_count());
    
        COUT("Reiniciando cont");
        cont.reset();
        DEMO(myobj1.use_count());
        DEMO(cont.use_count());
    }
```

Saída:
```
    Criando container compartilhado
    cont.use_count() = 1
    cont->memberObj.use_count() = 0
    
    Criando membro
    MyObj constructed
    cont.use_count() = 1
    cont->memberObj.use_count() = 1
    
    Criando outro container compartilhado
    cont.use_count() = 2
    cont->memberObj.use_count() = 1
    cont2.use_count() = 2
    cont2->memberObj.use_count() = 1
    
    GetAsMyObj
    myobj1.use_count() = 3
    cont.use_count() = 3
    cont->memberObj.use_count() = 1
    cont2.use_count() = 3
    cont2->memberObj.use_count() = 1
    
    Copiando objeto de aliasing
    myobj1.use_count() = 4
    myobj2.use_count() = 4
    cont.use_count() = 4
    cont->memberObj.use_count() = 1
    cont2.use_count() = 4
    cont2->memberObj.use_count() = 1
    
    Reiniciando cont2
    myobj1.use_count() = 3
    myobj2.use_count() = 3
    cont.use_count() = 3
    cont->memberObj.use_count() = 1
    
    Reiniciando myobj2
    myobj1.use_count() = 2
    cont.use_count() = 2
    cont->memberObj.use_count() = 1
    
    Reiniciando cont
    myobj1.use_count() = 1
    cont.use_count() = 0
    MyObj destructed
```

### Veja também

[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | ponteiro inteligente com semântica de propriedade única de objeto
(modelo de classe)
[ weak_ptr](<#/doc/memory/weak_ptr>)(C++11) | referência fraca a um objeto gerenciado por **std::shared_ptr**
(modelo de classe)
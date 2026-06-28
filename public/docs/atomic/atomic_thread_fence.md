# std::atomic_thread_fence

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
extern "C" void atomic_thread_fence( std::memory_order order ) noexcept;
```

Estabelece a [ordem de sincronização de memória](<#/doc/atomic/memory_order>) de acessos não atômicos e atômicos relaxados, conforme instruído por order, sem uma operação atômica associada. Note, no entanto, que pelo menos uma operação atômica é necessária para configurar a sincronização, conforme descrito abaixo.

#### Sincronização Fence-atômica

Uma release fence F no thread A sincroniza-com uma [operação acquire](<#/doc/atomic/memory_order>) atômica Y no thread B, se

*   existir um store atômico X (com qualquer memory order),
*   Y lê o valor escrito por X (ou o valor seria escrito pela [sequência release encabeçada por X](<#/doc/atomic/memory_order>) se X fosse uma operação release),
*   F é sequenced-before X no thread A.

Neste caso, todos os stores não atômicos e atômicos relaxados que são [sequenced-before](<#/doc/atomic/memory_order>) F no thread A irão [happen-before](<#/doc/atomic/memory_order>) todos os loads não atômicos e atômicos relaxados dos mesmos locais feitos no thread B após Y.

#### Sincronização Atômica-Fence

Uma [operação release](<#/doc/atomic/memory_order>) atômica X no thread A sincroniza-com uma acquire fence F no thread B, se

*   existir um read atômico Y (com qualquer memory order),
*   Y lê o valor escrito por X (ou pela [sequência release encabeçada por X](<#/doc/atomic/memory_order>)),
*   Y é sequenced-before F no thread B.

Neste caso, todos os stores não atômicos e atômicos relaxados que são [sequenced-before](<#/doc/atomic/memory_order>) X no thread A irão [happen-before](<#/doc/atomic/memory_order>) todos os loads não atômicos e atômicos relaxados dos mesmos locais feitos no thread B após F.

#### Sincronização Fence-Fence

Uma release fence FA no thread A sincroniza-com uma acquire fence FB no thread B, se

*   existir um objeto atômico M,
*   existir uma escrita atômica X (com qualquer memory order) que modifica M no thread A,
*   FA é sequenced-before X no thread A,
*   existir um read atômico Y (com qualquer memory order) no thread B,
*   Y lê o valor escrito por X (ou o valor seria escrito pela [sequência release encabeçada por X](<#/doc/atomic/memory_order>) se X fosse uma operação release),
*   Y é sequenced-before FB no thread B.

Neste caso, todos os stores não atômicos e atômicos relaxados que são [sequenced-before](<#/doc/atomic/memory_order>) FA no thread A irão [happen-before](<#/doc/atomic/memory_order>) todos os loads não atômicos e atômicos relaxados dos mesmos locais feitos no thread B após FB.

### Parâmetros

- **order** — a memory ordering executada por esta fence

### Valor de retorno

(nenhum)

### Notas

Em x86 (incluindo x86-64), as funções `atomic_thread_fence` não emitem instruções de CPU e afetam apenas o movimento de código em tempo de compilação, exceto para std::atomic_thread_fence([std::memory_order_seq_cst](<#/doc/atomic/memory_order>)).

`atomic_thread_fence` impõe restrições de sincronização mais fortes do que uma operação de store atômico com a mesma [std::memory_order](<#/doc/atomic/memory_order>). Enquanto uma operação store-release atômica impede que todas as leituras e escritas precedentes se movam para além do store-release, uma `atomic_thread_fence` com ordenação [std::memory_order_release](<#/doc/atomic/memory_order>) impede que todas as leituras e escritas precedentes se movam para além de todos os stores subsequentes.

A sincronização fence-fence pode ser usada para adicionar sincronização a uma sequência de várias operações atômicas relaxadas, por exemplo:
```cpp
    // Global
    std::string computation(int);
    void print(std::string);
    
    std::atomic<int> arr[3] = {-1, -1, -1};
    std::string data[1000]; //non-atomic data
    
    // Thread A, calcula 3 valores.
    void ThreadA(int v0, int v1, int v2)
    {
    //  assert(0 <= v0, v1, v2 < 1000);
        data[v0] = computation(v0);
        data[v1] = computation(v1);
        data[v2] = computation(v2);
        std::atomic_thread_fence(std::memory_order_release);
        std::atomic_store_explicit(&arr[0], v0, std::memory_order_relaxed);
        std::atomic_store_explicit(&arr[1], v1, std::memory_order_relaxed);
        std::atomic_store_explicit(&arr[2], v2, std::memory_order_relaxed);
    }
    
    // Thread B, imprime entre 0 e 3 valores já calculados.
    void ThreadB()
    {
        int v0 = std::atomic_load_explicit(&arr[0], std::memory_order_relaxed);
        int v1 = std::atomic_load_explicit(&arr[1], std::memory_order_relaxed);
        int v2 = std::atomic_load_explicit(&arr[2], std::memory_order_relaxed);
        std::atomic_thread_fence(std::memory_order_acquire);
    //  v0, v1, v2 podem ser -1, alguns ou todos eles.
    //  Caso contrário, é seguro ler os dados não atômicos por causa das fences:
        if (v0 != -1)
            print(data[v0]);
        if (v1 != -1)
            print(data[v1]);
        if (v2 != -1)
            print(data[v2]);
    }
```

### Exemplo

Percorre um array de caixas de correio e processa apenas aquelas destinadas a nós, sem sincronização desnecessária. Este exemplo usa sincronização atômica-fence.
```cpp
    const int num_mailboxes = 32;
    std::atomic<int> mailbox_receiver[num_mailboxes];
    std::string mailbox_data[num_mailboxes];
    
    // Os threads escritores atualizam dados compartilhados não atômicos 
    // e então atualizam mailbox_receiver[i] da seguinte forma:
    mailbox_data[i] = ...;
    std::atomic_store_explicit(&mailbox_receiver[i], receiver_id, std::memory_order_release);
    
    // O thread leitor precisa verificar todas as mailbox[i], mas só precisa sincronizar com uma.
    for (int i = 0; i < num_mailboxes; ++i)
        if (std::atomic_load_explicit(&mailbox_receiver[i],
            std::memory_order_relaxed) == my_id)
        {
            // sincroniza com apenas um escritor
            std::atomic_thread_fence(std::memory_order_acquire);
            // garantido para observar tudo feito no thread escritor
            // antes do atomic_store_explicit()
            do_work(mailbox_data[i]);
        }
```

### Veja também

[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
(enum)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(C++11) | fence entre um thread e um manipulador de sinal executado no mesmo thread
(função)
[Documentação C](<#/>) para atomic_thread_fence
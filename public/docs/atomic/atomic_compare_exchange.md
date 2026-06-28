# std::atomic_compare_exchange_weak, std::atomic_compare_exchange_strong, std::atomic_compare_exchange_weak_explicit, std::atomic_compare_exchange_strong_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
bool atomic_compare_exchange_weak
( std::atomic<T>* obj, typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
bool atomic_compare_exchange_weak
( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
bool atomic_compare_exchange_strong
( std::atomic<T>* obj, typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
bool atomic_compare_exchange_strong
( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired ) noexcept;
template< class T >
bool atomic_compare_exchange_weak_explicit
( std::atomic<T>* obj, typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired,
std::memory_order success, std::memory_order failure ) noexcept;
template< class T >
bool atomic_compare_exchange_weak_explicit
( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired,
std::memory_order success, std::memory_order failure ) noexcept;
template< class T >
bool atomic_compare_exchange_strong_explicit
( std::atomic<T>* obj, typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired,
std::memory_order success, std::memory_order failure ) noexcept;
template< class T >
bool atomic_compare_exchange_strong_explicit
( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type* expected,
typename std::atomic<T>::value_type desired,
std::memory_order success, std::memory_order failure ) noexcept;
```

Compara atomicamente a [representação do objeto](<#/doc/language/objects>)(até C++20)[representação do valor](<#/doc/language/objects>)(desde C++20) do objeto apontado por obj com a do objeto apontado por expected, e se forem bit a bit iguais, substitui o primeiro por desired (realiza uma operação de leitura-modificação-escrita). Caso contrário, carrega o valor real apontado por obj em *expected (realiza uma operação de carregamento).

Sobrecargas | Modelo de memória para
---|---
operação de leitura-modificação-escrita | operação de carregamento
(1-4) | [std::memory_order_seq_cst](<#/doc/atomic/memory_order>) | [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)
(5-8) | success | failure

Estas funções são definidas em termos de [funções membro](<#/doc/atomic/atomic/compare_exchange>) de [std::atomic](<#/doc/atomic/atomic>):

1,2) obj->compare_exchange_weak(*expected, desired)

3,4) obj->compare_exchange_strong(*expected, desired)

5,6) obj->compare_exchange_weak(*expected, desired, success, failure)

7,8) obj->compare_exchange_strong(*expected, desired, success, failure)

Se failure for mais forte que success ou(até C++17) for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser testado e modificado
- **expected** — ponteiro para o valor esperado a ser encontrado no objeto atômico
- **desired** — o valor a ser armazenado no objeto atômico se for o esperado
- **success** — a ordenação de sincronização de memória para a operação de leitura-modificação-escrita se a comparação for bem-sucedida
- **failure** — a ordenação de sincronização de memória para a operação de carregamento se a comparação falhar

### Valor de retorno

O resultado da comparação: true se *obj era igual a *expected, false caso contrário.

### Notas

`std::atomic_compare_exchange_weak` e `std::atomic_compare_exchange_weak_explicit` (as versões fracas) podem falhar espuriamente, ou seja, agir como se *obj != *expected mesmo que sejam iguais. Quando uma operação de comparação e troca está em um loop, elas proporcionarão melhor desempenho em algumas plataformas.

Quando uma operação de comparação e troca fraca exigiria um loop e uma forte não, a forte é preferível, a menos que a representação do objeto de `T` possa incluir bits de preenchimento,(até C++20) bits de armadilha, ou ofereça múltiplas representações de objeto para o mesmo valor (por exemplo, NaN de ponto flutuante). Nesses casos, a comparação e troca fraca geralmente funciona porque converge rapidamente para alguma representação de objeto estável.

Para uma union com bits que participam das representações de valor de alguns membros, mas não de outros, a comparação e troca pode sempre falhar porque esses bits de preenchimento têm valores indeterminados quando não participam da representação de valor do membro ativo.

Bits de preenchimento que nunca participam da representação de valor de um objeto são ignorados. | (desde C++20)

### Exemplo

As operações de comparação e troca são frequentemente usadas como blocos de construção básicos de estruturas de dados lock-free.

Execute este código
```cpp
    #include <atomic>
    
    template<class T>
    struct node
    {
        T data;
        node* next;
        node(const T& data) : data(data), next(nullptr) {}
    };
    
    template<class T>
    class stack
    {
        std::atomic<node<T>*> head;
    public:
        void push(const T& data)
        {
            node<T>* new_node = new node<T>(data);
    
            // put the current value of head into new_node->next
            new_node->next = head.load(std::memory_order_relaxed);
    
            // now make new_node the new head, but if the head
            // is no longer what's stored in new_node->next
            // (some other thread must have inserted a node just now)
            // then put that new head into new_node->next and try again
            while (!std::atomic_compare_exchange_weak_explicit(
                       &head, &new_node->next, new_node,
                       std::memory_order_release, std::memory_order_relaxed))
                ; // the body of the loop is empty
    // note: the above loop is not thread-safe in at least
    // GCC prior to 4.8.3 (bug 60272), clang prior to 2014-05-05 (bug 18899)
    // MSVC prior to 2014-03-17 (bug 819819). See member function version for workaround
        }
    };
    
    int main()
    {
        stack<int> s;
        s.push(1);
        s.push(2);
        s.push(3);
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência de tipo exata era exigida porque
`T` era deduzido de múltiplos argumentos | `T` é deduzido apenas
de obj

### Veja também

[ compare_exchange_weakcompare_exchange_strong](<#/doc/atomic/atomic/compare_exchange>) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou um carregamento atômico se não
---|---
(função membro pública de `std::atomic<T>`) |
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(modelo de função) |
[ std::atomic_compare_exchange_weak(std::shared_ptr) std::atomic_compare_exchange_strong(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto desde C++20)(removido em C++26) | especializa operações atômicas para std::shared_ptr
(modelo de função) |
[Documentação C](<#/>) para atomic_compare_exchange, atomic_compare_exchange_explicit